import json

import numpy as np
import tensorflow as tf

from path_util import PathUtil

learning_rate = 0.003
training_epochs = 1000
batch_size = 10
n_size = 3
dismiss_percent = 0.05

n_hidden_units = 128


class Tag:
    def __init__(self):
        self.last_index = 0
        self.dismiss_value = 0.4
        self.train_data = []
        self.test_data = []

        self.keep_prob = tf.placeholder(tf.float32)
        # weight = tf.Variable(tf.random_normal([n_size, n_size]))
        # biases = tf.Variable(tf.zeros([batch_size, n_size]) + 0.1)

        self.X = tf.placeholder(tf.float32, [None, n_size])
        self.scale = tf.placeholder(tf.float32)
        self.X = self.X + tf.multiply(self.scale, tf.random_normal([batch_size, n_size]))
        self.Y = tf.placeholder(tf.float32, [None, n_size])

        weights_input = tf.Variable(tf.random_normal([n_size, n_hidden_units]))
        biases_input = tf.Variable(tf.zeros([1, n_hidden_units]) + 0.1)
        wx_plus_b_input = tf.matmul(self.X, weights_input) + biases_input
        wx_plus_b_input = tf.nn.dropout(wx_plus_b_input, self.keep_prob)
        wx_plus_b_input = tf.nn.relu(wx_plus_b_input)

        weights_output = tf.Variable(tf.random_normal([n_hidden_units, n_size]))
        biases_output = tf.Variable(tf.zeros([1, n_size]) + 0.1)
        wx_plus_b_output = tf.matmul(wx_plus_b_input, weights_output) + biases_output
        wx_plus_b_output = tf.nn.dropout(wx_plus_b_output, self.keep_prob)
        self.y_pred = tf.nn.softmax(wx_plus_b_output)

        # y_pred = tf.sigmoid(tf.matmul(X, weight) + biases)
        # cost = tf.reduce_mean(tf.square(y_pred - Y))
        # cost = -tf.reduce_mean(tf.multiply(y_pred, Y))
        # cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(y_pred), reduction_indices=[1]))
        self.cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(logits=self.y_pred, labels=self.Y))

        self.optimizer = tf.train.AdamOptimizer(learning_rate).minimize(self.cost)

        self.saver = tf.train.Saver()
        self.sess = tf.Session()
        self.sess.run(tf.global_variables_initializer())

    def recommend(self, data):
        tags = []
        confs = []
        for tag_conf_tuples in data:
            tag_list = []
            conf_list = []
            tag_conf_tuples = tag_conf_tuples["tagConfTuples"]
            for i in range(n_size):
                if i < tag_conf_tuples.__len__():
                    tag_list.append(tag_conf_tuples[i]['tag'])
                    conf_list.append(tag_conf_tuples[i]['confidence'])
                else:
                    tag_list.append("")
                    conf_list.append(0)
            tags.append(tag_list)
            confs.append(conf_list)

        self.load_models()
        pred = self.sess.run(self.y_pred, feed_dict={self.X: confs, self.scale: 1, self.keep_prob: 1})
        result = []
        for i in range(pred.__len__()):
            result_tuple = []
            for j in range(n_size):
                if pred[i][j] > self.dismiss_value and tags[i][j].__len__() > 0:
                    result_tuple.append({"tag": tags[i][j], "confidence": pred[i][j]})
            result.append({"tagConfTuples": result_tuple})
        return result

    def calculate_confidence(self):
        X, Y = self.all_train_data()
        total_train = self.train_data.__len__()
        all_result = self.sess.run(self.y_pred,
                                   feed_dict={self.X: X, self.scale: 1,
                                              self.keep_prob: 1})
        hit_confidence = []
        for i in range(total_train):
            for j in range(n_size):
                if Y[i][j] == 1:
                    hit_confidence.append(all_result[i][j])
        sorted(hit_confidence)
        self.dismiss_value = hit_confidence[np.math.floor(dismiss_percent * total_train)]

    def all_train_data(self):
        total_train = self.train_data.__len__()
        X = np.empty([total_train, n_size])
        Y = np.empty([total_train, n_size])
        for i in range(total_train):
            for j in range(n_size):
                X[i] = self.train_data[i][j][0]
                Y[i] = self.train_data[i][j][1]
        return X, Y

    def next_train_batch(self, index):
        batch_x = np.empty([batch_size, n_size])
        batch_y = np.empty([batch_size, n_size])
        for i in range(n_size):
            for j in range(batch_size):
                batch_x[j][i] = self.train_data[self.next_index_one(index, j)][i][0]
                batch_y[j][i] = self.train_data[self.next_index_one(index, j)][i][1]
        return batch_x, batch_y

    def next_index_one(self, index, offset):
        total_train = self.train_data.__len__()
        return (index + offset) % total_train

    def next_index(self):
        total_train = self.train_data.__len__()
        return (self.last_index + batch_size) % total_train

    def compute_accuracy(self):
        batch_xs, batch_ys = self.next_test_batch()
        pred = self.sess.run(self.y_pred,
                             feed_dict={self.X: batch_xs, self.scale: 1, self.keep_prob: 1})
        accuracy = 0
        for i in range(batch_size):
            is_reject = True
            for j in range(n_size):
                if pred[i][j] > self.dismiss_value or batch_ys[i][j] is not 0:
                    is_reject = False
                    break
            if is_reject:
                accuracy += 1
            else:
                total_confidence = 0
                for k in range(n_size):
                    total_confidence += pred[i][k]
                for k in range(n_size):
                    accuracy += (pred[i][k] / total_confidence) * batch_ys[i][k]
        accuracy = accuracy / batch_size
        print(accuracy)

    def next_test_batch(self):
        batch_x = np.empty([batch_size, n_size])
        batch_y = np.empty([batch_size, n_size])
        for i in range(n_size):
            for j in range(batch_size):
                batch_x[j][i] = self.test_data[self.next_index_one(0, j)][i][0]
                batch_y[j][i] = self.test_data[self.next_index_one(0, j)][i][1]
        return batch_x, batch_y

    def train(self):
        self.train_data = self.load_train_data()
        self.test_data = self.load_test_data()
        total_train = self.train_data.__len__()
        total_batch = int(total_train / batch_size)
        self.load_models()
        for epoch in range(training_epochs):
            for i in range(total_batch):
                batch_xs, batch_ys = self.next_train_batch(self.last_index)
                self.last_index = self.next_index()
                _, c = self.sess.run([self.optimizer, self.cost],
                                     feed_dict={self.X: batch_xs, self.Y: batch_ys, self.scale: 1,
                                                self.keep_prob: 0.7})
                if epoch % 10 == 9:
                    self.compute_accuracy()
        self.save_models()

    def compute_origin_accuracy(self):
        batch_xs, batch_ys = self.next_test_batch()
        accuracy = 0
        for i in range(batch_size):
            is_reject = True
            for j in range(n_size):
                if batch_xs[i][j] > self.dismiss_value or batch_ys[i][j] is not 0:
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

    def save_models(self):
        self.saver.save(self.sess, PathUtil.get_path() + "trainmodels/model.ckpt")

    def load_models(self):
        self.saver.restore(self.sess, PathUtil.get_path() +
                           "trainmodels/model.ckpt")

    @staticmethod
    def load_train_data():
        train_data = []
        with open(PathUtil.get_path() + "proval/train.txt",
                  "r") as file:
            all_data = file.readlines()
            for j in range(all_data.__len__()):
                data = json.loads(all_data[j].replace('\n', "").replace('\'', '\"'))
                tags = data["response"]
                tags = sorted(tags, key=lambda x: x["confidence"], reverse=True)
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
        return train_data

    @staticmethod
    def load_test_data():
        test_data = []
        with open(PathUtil.get_path() + "proval/test.txt", "r") as file:
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
        return test_data


tag = Tag()
tag.train()
