import json

import numpy as np
import tensorflow as tf

total_train = 100
learning_rate = 0.01
training_epochs = 100
batch_size = 3
n_size = 6

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
                if tags[i]["value"] in targets:
                    tag.append([tags[i]["confidence"], 1])
                else:
                    tag.append([tags[i]["confidence"], 0])
            else:
                tag.append([0, 0])
        sorted(tag, reverse=True)
        train_data.append(tag)

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
                if tags[i]["value"] in targets:
                    tag.append([tags[i]["confidence"], 1])
                else:
                    tag.append([tags[i]["confidence"], 0])
            else:
                tag.append([0, 0])
        sorted(tag, reverse=True)
        test_data.append(tag)

last_index = 0


def next_train_batch():
    batch_x = np.empty([n_size, batch_size])
    batch_y = np.empty([n_size, batch_size])
    for i in range(n_size):
        for j in range(batch_size):
            batch_x[i][j] = train_data[last_index + j][i][0]
            batch_y[i][j] = train_data[last_index + j][i][1]
    return batch_x, batch_y


def next_test_batch():
    batch_x = np.empty([n_size, batch_size])
    batch_y = np.empty([n_size, batch_size])
    for i in range(n_size):
        for j in range(batch_size):
            batch_x[i][j] = test_data[0][i][0]
            batch_y[i][j] = test_data[0][i][1]
    return batch_x, batch_y


def save_models():
    saver = tf.train.Saver()
    saver.save(sess, "trainmodels/model.ckpt")


def compute_accuracy():
    batch_xs, batch_ys = next_test_batch()
    pred = sess.run(y_pred, feed_dict={X: batch_xs, Y: batch_ys})
    print(sess.run(tf.reduce_mean(tf.square(pred - batch_ys))))


weight = tf.Variable(tf.random_normal([n_size, n_size]))
biases = tf.Variable(tf.random_normal([n_size, batch_size]))

X = tf.placeholder(tf.float32, [n_size, None])
Y = tf.placeholder(tf.float32, [n_size, None])

y_pred = tf.sigmoid(tf.matmul(weight, X) + biases)
cost = tf.reduce_mean(tf.square(Y - y_pred))

optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)
sess = tf.Session()
sess.run(tf.global_variables_initializer())
total_batch = int(total_train / batch_size)

for epoch in range(training_epochs):
    for i in range(total_batch):
        batch_xs, batch_ys = next_train_batch()
        _, c, pred = sess.run([optimizer, cost, y_pred], feed_dict={X: batch_xs, Y: batch_ys})
        print(c)
        if i % 10 == 0:
            print("accuracy")
            compute_accuracy()
