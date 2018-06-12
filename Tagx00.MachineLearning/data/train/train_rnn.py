import json

import numpy as np
import tensorflow as tf

learning_rate = 0.003
training_epochs = 100000
batch_size = 10
n_size = 3
last_index = 0
time_steps = 10

n_hidden_units = 128
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


def RNN(x, weights, biases):
    x = tf.reshape(x, [-1, n_size])

    x_in = tf.matmul(x, weights["in"]) + biases["in"]
    x_in = tf.reshape(x_in, [-1, time_steps, n_hidden_units])

    lstm_cell = tf.contrib.rnn.BasicLSTMCell(n_hidden_units, forget_bias=1.0, state_is_tuple=True)
    init_state = lstm_cell.zero_state(batch_size, dtype=tf.float32)

    outputs, final_state = tf.nn.dynamic_rnn(lstm_cell, x_in, initial_state=init_state, time_major=False)

    results = tf.sigmoid(tf.matmul(final_state[1], weights["out"]) + biases["out"]

    return results


def next_train_batch(index):
    batch_x = np.empty([batch_size, n_size])
    batch_y = np.empty([batch_size, n_size])
    for i in range(n_size):
        for j in range(batch_size):
            batch_x[j][i] = train_data[next_index_one(index, j)][i][0]
            batch_y[j][i] = train_data[next_index_one(index, j)][i][1]
    return batch_x, batch_y


def next_train_batch_RNN(index):
    batch_x = np.empty([batch_size, time_steps, n_size])
    batch_y = np.empty([batch_size, n_size])
    for i in range(n_size):
        for k in range(time_steps):
            for j in range(batch_size):
                batch_x[j][k][i] = train_data[next_index_one(index, j + k)][i][0]
                batch_y[j][i] = train_data[next_index_one(index, j)][i][1]
    return batch_x, batch_y


def next_test_batch():
    batch_x = np.empty([batch_size, n_size])
    batch_y = np.empty([batch_size, n_size])
    for i in range(n_size):
        for j in range(batch_size):
            batch_x[j][i] = train_data[next_index_one(0, j)][i][0]
            batch_y[j][i] = train_data[next_index_one(0, j)][i][1]
    return batch_x, batch_y


def next_test_batch_RNN():
    batch_x = np.empty([batch_size, time_steps, n_size])
    batch_y = np.empty([batch_size, n_size])
    for i in range(n_size):
        for k in range(time_steps):
            for j in range(batch_size):
                batch_x[j][k][i] = train_data[next_index_one(0, j + k)][i][0]
                batch_y[j][i] = train_data[next_index_one(0, j)][i][1]
    return batch_x, batch_y


def save_models():
    saver = tf.train.Saver()
    saver.save(sess, "trainmodels/model.ckpt")


def compute_accuracy():
    batch_xs, batch_ys = next_test_batch_RNN()
    pred = sess.run(y_pred, feed_dict={X: batch_xs, Y: batch_ys, keep_prob: 1})
    print(sess.run(tf.reduce_mean(tf.multiply(pred, batch_ys))))


def compute_origin_accuracy():
    batch_xs, batch_ys = next_test_batch()
    print(sess.run(tf.reduce_mean(tf.multiply(batch_xs, batch_ys))))


def next_index_one(index, offset):
    return (index + offset) % total_train


def next_index(last_index):
    return (last_index + batch_size) % total_train


weights = {
    "in": tf.Variable(tf.random_normal([n_size, n_hidden_units])),
    "out": tf.Variable(tf.random_normal([n_hidden_units, n_size]))
}

biases = {
    'in': tf.Variable(tf.constant(0.1, shape=[n_hidden_units, ])),
    'out': tf.Variable(tf.constant(0.1, shape=[n_size, ]))
}

keep_prob = tf.placeholder(tf.float32)
# weight = tf.Variable(tf.random_normal([n_size, n_size]))
# biases = tf.Variable(tf.zeros([batch_size, n_size]) + 0.1)

X = tf.placeholder(tf.float32, [None, time_steps, n_size])
Y = tf.placeholder(tf.float32, [None, n_size])

y_pred = RNN(X, weights, biases)
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=y_pred, labels=Y))

# hidden = add_layer(X, n_size, 10, activation_function=tf.nn.relu)
# y_pred = add_layer(hidden, 10, n_size, activation_function=tf.nn.softmax)

# y_pred = tf.sigmoid(tf.matmul(X, weight) + biases)
# cost = tf.reduce_mean(tf.square(y_pred - Y))
# cost = -tf.reduce_mean(tf.multiply(y_pred, Y))
# cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(y_pred), reduction_indices=[1]))

optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)
sess = tf.Session()
sess.run(tf.global_variables_initializer())
total_batch = int(total_train / batch_size)

compute_origin_accuracy()
for epoch in range(training_epochs):
    for i in range(total_batch):
        batch_xs, batch_ys = next_train_batch_RNN(last_index)
        last_index = next_index(last_index)
        _, c, pred = sess.run([optimizer, cost, y_pred], feed_dict={X: batch_xs, Y: batch_ys, keep_prob: 0.7})
        if epoch % 10 == 9:
            print("accuracy")
            compute_accuracy()
