import json

import numpy as np
import tensorflow as tf

total_train = 100
learning_rate = 0.01
training_epochs = 100
batch_size = 10
n_size = 6

weight = tf.Variable(tf.random_normal([n_size, n_size]))
biases = tf.Variable(tf.random_normal([n_size]))

X = tf.placeholder(tf.float32, [n_size, None])
Y = tf.placeholder(tf.float32, [n_size, None])


def next_train_batch():
    X = np.empty([n_size, batch_size])
    with open("../proval/train.txt", "r") as file:
        data = json.loads(file.readline().replace('\n', ""))
        tags = data["response"]
        print(data)


def next_test_batch():
    pass


def save_models():
    saver = tf.train.Saver()
    saver.save(sess, "trainmodels/model.ckpt")


def compute_accuracy():
    batch_xs, batch_ys = next_test_batch()
    pred = sess.run(y_pred, feed_dict={X: batch_xs, Y: batch_ys})
    one_hole_pred = tf.argmax(pred, 0)
    one_hole_real = tf.argmax(batch_ys, 0)
    print(tf.reduce_mean(tf.square(one_hole_pred - one_hole_real)))


next_train_batch()

y_pred = tf.multiply(weight, X) + biases
cost = tf.reduce_mean(tf.abs(Y - y_pred))

optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)
sess = tf.Session()
sess.run(tf.global_variables_initializer())
total_batch = int(total_train / batch_size)

for epoch in range(training_epochs):
    for i in range(total_batch):
        batch_xs, batch_ys = next_train_batch()
        _, c = sess.run([optimizer, cost], feed_dict={X: batch_xs, Y: batch_ys})
        print(c)
        if i % 10 == 0:
            compute_accuracy()
