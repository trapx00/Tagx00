import json

import numpy as np
import tensorflow as tf

learning_rate = 0.003
training_epochs = 100000
batch_size = 10
n_size = 3
last_index = 0
dismiss_value = 0.4
dismiss_percent = 0.05

train_data = []
with open("../proval/train.txt", "r") as file:
    all_data = file.readlines()
    for j in range(all_data.__len__()):
        data = json.loads(all_data[j].replace('\n', ""))
        tags = data["response"]
        targets = data["tags"]
        tag = []
        for i in range(n_size):
            if i < tags.__len__():
                if tags[i]["tag"] in targets:
                    tag.append([tags[i]["confidence"], 1])
                else:
                    tag.append([tags[i]["confidence"], 0])
            else:
                tag.append([0, 0])
        sorted(tag, reverse=True)
        train_data.append(tag)
total_train = train_data.__len__()
test_data = []
with open("../proval/test.txt", "r") as file:
    all_data = file.readlines()
    for j in range(all_data.__len__()):
        data = json.loads(all_data[j].replace('\n', ""))
        tags = data["response"]
        targets = data["tags"]
        tag = []
        for i in range(n_size):
            if i < tags.__len__():
                if tags[i]["tag"] in targets:
                    tag.append([tags[i]["confidence"], 1])
                else:
                    tag.append([tags[i]["confidence"], 0])
            else:
                tag.append([0, 0])
        sorted(tag, reverse=True)
        test_data.append(tag)


def calculate_confidence():
    hit_confidence = []
    for i in range(total_train):
        for j in range(n_size):
            if train_data[i][j][1] == 1:
                hit_confidence.append(train_data[i][j][0])
    sorted(hit_confidence)
    dismiss_value = hit_confidence[np.math.floor(dismiss_percent * total_train)]
    return dismiss_value


def add_layer(inputs, in_size, out_size, activation_function=None):
    weights = tf.Variable(tf.random_normal([in_size, out_size]))
    biases = tf.Variable(tf.zeros([1, out_size]) + 0.1)
    wx_plus_b = tf.matmul(inputs, weights) + biases
    wx_plus_b = tf.nn.dropout(wx_plus_b, keep_prob)
    if activation_function is None:
        outputs = wx_plus_b
    else:
        outputs = activation_function(wx_plus_b)
    return outputs


def next_train_batch(index):
    batch_x = np.empty([batch_size, n_size])
    batch_y = np.empty([batch_size, n_size])
    for i in range(n_size):
        for j in range(batch_size):
            batch_x[j][i] = train_data[next_index_one(index, j)][i][0]
            batch_y[j][i] = train_data[next_index_one(index, j)][i][1]
    return batch_x, batch_y


def all_train_data():
    X = np.empty([total_train, n_size])
    Y = np.empty([total_train, n_size])
    for i in range(total_train):
        for j in range(n_size):
            X[i] = train_data[i][j][0]
            Y[i] = train_data[i][j][1]
    return X, Y


def next_test_batch():
    batch_x = np.empty([batch_size, n_size])
    batch_y = np.empty([batch_size, n_size])
    for i in range(n_size):
        for j in range(batch_size):
            batch_x[j][i] = train_data[next_index_one(0, j)][i][0]
            batch_y[j][i] = train_data[next_index_one(0, j)][i][1]
    return batch_x, batch_y


def save_models():
    saver = tf.train.Saver()
    saver.save(sess, "trainmodels/model.ckpt")


def compute_accuracy():
    batch_xs, batch_ys = next_train_batch(last_index)
    pred = sess.run(y_pred, feed_dict={X: batch_xs, Y: batch_ys})
    accuracy = 0
    for i in range(batch_size):
        is_reject = True
        for j in range(n_size):
            if pred[i][j] > dismiss_value or batch_ys[i][j] is not 0:
                is_reject = False
                break
        if is_reject:
            accuracy += 1
        else:
            total_confidence = 0
            for j in range(n_size):
                total_confidence += pred[i][j]
            for j in range(n_size):
                accuracy += (pred[i][j] / total_confidence) * batch_ys[i][j]
    accuracy = accuracy / batch_size
    print(accuracy)
    return accuracy


def compute_origin_accuracy():
    batch_xs, batch_ys = next_test_batch()
    accuracy = 0
    for i in range(batch_size):
        is_reject = True
        for j in range(n_size):
            if batch_xs[i][j] > dismiss_value or batch_ys[i][j] is not 0:
                is_reject = False
                break
        if is_reject:
            accuracy += 1
        else:
            total_confidence = 0
            for j in range(n_size):
                total_confidence += batch_xs[i][j]
            for j in range(n_size):
                accuracy += (batch_xs[i][j] / total_confidence) * batch_ys[i][j]
    accuracy = accuracy / batch_size
    print(accuracy)


def draw_plt():
    all_xs, all_ys = all_train_data()
    all_pred = sess.run(y_pred, feed_dict={X: all_xs, Y: all_ys, keep_prob: 1})
    accuracys = np.empty(total_train)
    for i in range(total_train):
        accuracy = 0
        is_reject = True
        for j in range(n_size):
            if all_pred[i][j] > dismiss_value or all_ys[i][j] is not 0:
                is_reject = False
                break
        if is_reject:
            accuracy += 1
        else:
            total_confidence = 0
            for j in range(n_size):
                total_confidence += all_pred[i][j]
            for j in range(n_size):
                accuracy += (all_pred[i][j] / total_confidence) * all_ys[i][j]
        accuracys[i] = accuracy
    Xs = range(total_train)
    plt.title("compute adoption rate after train")
    plt.xlim(xmax=150, xmin=0)
    plt.ylim(ymax=1, ymin=0)
    plt.xlabel("image index")
    plt.ylabel("adoption rate")
    plt.plot(Xs, accuracys)
    plt.show()


def draw_plt_test():
    test_xs, test_ys = next_test_batch()
    pred = sess.run(y_pred, feed_dict={X: test_xs, Y: test_ys, keep_prob: 1})
    accuracys = np.empty(total_train)
    for i in range(batch_size):
        accuracy = 0
        is_reject = True
        for j in range(n_size):
            if pred[i][j] > dismiss_value or test_ys[i][j] is not 0:
                is_reject = False
                break
        if is_reject:
            accuracy += 1
        else:
            total_confidence = 0
            for j in range(n_size):
                total_confidence += pred[i][j]
            for j in range(n_size):
                accuracy += (pred[i][j] / total_confidence) * test_ys[i][j]
        accuracys[i] = accuracy
    Xs = range(total_train)
    plt.title("compute adoption rate after train")
    plt.xlim(xmax=10, xmin=0)
    plt.ylim(ymax=1, ymin=0)
    plt.xlabel("image index")
    plt.ylabel("adoption rate")
    plt.plot(Xs, accuracys)
    plt.show()


def next_index_one(index, offset):
    return (index + offset) % total_train


def next_index(last_index):
    return (last_index + batch_size) % total_train


weight = tf.Variable(tf.random_normal([n_size, n_size]))
biases = tf.Variable(tf.zeros([batch_size, n_size]) + 0.1)

X = tf.placeholder(tf.float32, [None, n_size])
Y = tf.placeholder(tf.float32, [None, n_size])

y_pred = tf.sigmoid(tf.matmul(X, weight) + biases)
# cost = tf.reduce_mean(tf.square(y_pred - Y))
# cost = -tf.reduce_mean(tf.multiply(y_pred, Y))
# cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(y_pred), reduction_indices=[1]))
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=y_pred, labels=Y))

optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)
sess = tf.Session()
sess.run(tf.global_variables_initializer())
total_batch = int(total_train / batch_size)

compute_origin_accuracy()
for epoch in range(training_epochs):
    for i in range(total_batch):
        batch_xs, batch_ys = next_train_batch(last_index)
        last_index = next_index(last_index)
        _, c, pred = sess.run([optimizer, cost, y_pred], feed_dict={X: batch_xs, Y: batch_ys})
        if epoch % 10 == 9:
            print("accuracy")
            compute_accuracy()
