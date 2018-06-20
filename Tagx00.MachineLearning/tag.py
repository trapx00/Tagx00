import json

import numpy as np
import tensorflow as tf

from path_util import PathUtil

learning_rate_aliyun = 0.003
training_epochs_aliyun = 100
learning_rate_baidu = 0.003
training_epochs_baidu = 100
learning_rate = 0.003
training_epochs = 2000
batch_size = 3
n_size = 5
dismiss_percent = 0.05

n_hidden_units = 128


class Tag:
    def __init__(self):
        self.last_index_aliyun = 0
        self.last_index_baidu = 0
        self.last_index = 0
        self.dismiss_value = 0.4
        self.aliyun_train_data = []
        self.baidu_train_data = []
        self.aliyun_test_data = []
        self.baidu_test_data = []

        self.keep_prob = tf.placeholder(tf.float32)
        # weight = tf.Variable(tf.random_normal([n_size, n_size]))
        # biases = tf.Variable(tf.zeros([batch_size, n_size]) + 0.1)

        self.X_aliyun = tf.placeholder(tf.float32, [None, n_size])
        self.X_baidu = tf.placeholder(tf.float32, [None, n_size])
        self.scale = tf.placeholder(tf.float32)
        self.Y_aliyun = tf.placeholder(tf.float32, [None, n_size])
        self.Y_baidu = tf.placeholder(tf.float32, [None, n_size])

        weights_input_aliyun = tf.Variable(tf.random_normal([n_size, n_hidden_units]))
        biases_input_aliyun = tf.Variable(tf.zeros([1, n_hidden_units]) + 0.1)
        wx_plus_b_input_aliyun = tf.matmul(self.X_aliyun, weights_input_aliyun) + biases_input_aliyun
        wx_plus_b_input_aliyun = tf.nn.dropout(wx_plus_b_input_aliyun, self.keep_prob)
        wx_plus_b_input_aliyun = tf.nn.relu(wx_plus_b_input_aliyun)

        weights_output_aliyun = tf.Variable(tf.random_normal([n_hidden_units, n_size]))
        biases_output_aliyun = tf.Variable(tf.zeros([1, n_size]) + 0.1)
        wx_plus_b_output_aliyun = tf.matmul(wx_plus_b_input_aliyun, weights_output_aliyun) + biases_output_aliyun
        wx_plus_b_output_aliyun = tf.nn.dropout(wx_plus_b_output_aliyun, self.keep_prob)
        self.y_pred_aliyun = tf.sigmoid(wx_plus_b_output_aliyun)

        self.cost_aliyun = tf.reduce_mean(
            tf.nn.softmax_cross_entropy_with_logits_v2(logits=self.y_pred_aliyun, labels=self.Y_aliyun))
        self.optimizer_aliyun = tf.train.AdamOptimizer(learning_rate_aliyun).minimize(self.cost_aliyun)

        weights_input_baidu = tf.Variable(tf.random_normal([n_size, n_hidden_units]))
        biases_input_baidu = tf.Variable(tf.zeros([1, n_hidden_units]) + 0.1)
        wx_plus_b_input_baidu = tf.matmul(self.X_baidu, weights_input_baidu) + biases_input_baidu
        wx_plus_b_input_baidu = tf.nn.dropout(wx_plus_b_input_baidu, self.keep_prob)
        wx_plus_b_input_baidu = tf.nn.relu(wx_plus_b_input_baidu)

        weights_output_baidu = tf.Variable(tf.random_normal([n_hidden_units, n_size]))
        biases_output_baidu = tf.Variable(tf.zeros([1, n_size]) + 0.1)
        wx_plus_b_output_baidu = tf.matmul(wx_plus_b_input_baidu, weights_output_baidu) + biases_output_baidu
        wx_plus_b_output_baidu = tf.nn.dropout(wx_plus_b_output_baidu, self.keep_prob)
        self.y_pred_baidu = tf.sigmoid(wx_plus_b_output_baidu)

        self.cost_baidu = tf.reduce_mean(
            tf.nn.softmax_cross_entropy_with_logits_v2(logits=self.y_pred_baidu, labels=self.Y_baidu))
        self.optimizer_baidu = tf.train.AdamOptimizer(learning_rate_baidu).minimize(self.cost_baidu)

        # y_pred = tf.sigmoid(tf.matmul(X, weight) + biases)
        # cost = tf.reduce_mean(tf.square(y_pred - Y))
        # cost = -tf.reduce_mean(tf.multiply(y_pred, Y))
        # cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(y_pred), reduction_indices=[1]))

        # 进行集成
        self.X = tf.placeholder(tf.float32, [None, n_size * 2])
        self.Y = tf.placeholder(tf.float32, [None, n_size * 2])

        weights_input = tf.Variable(tf.random_normal([n_size * 2, n_hidden_units]))
        biases_input = tf.Variable(tf.zeros([1, n_hidden_units]) + 0.1)
        wx_plus_b_input = tf.matmul(self.X, weights_input) + biases_input
        wx_plus_b_input = tf.nn.dropout(wx_plus_b_input, self.keep_prob)
        wx_plus_b_input = tf.nn.relu(wx_plus_b_input)

        weights_output = tf.Variable(tf.random_normal([n_hidden_units, n_size * 2]))
        biases_output = tf.Variable(tf.zeros([1, n_size * 2]) + 0.1)
        wx_plus_b_output = tf.matmul(wx_plus_b_input, weights_output) + biases_output
        wx_plus_b_output = tf.nn.dropout(wx_plus_b_output, self.keep_prob)
        self.y_pred = tf.sigmoid(wx_plus_b_output)

        self.cost = tf.reduce_mean(
            tf.nn.softmax_cross_entropy_with_logits_v2(logits=self.y_pred, labels=self.Y))
        self.optimizer = tf.train.AdamOptimizer(learning_rate_aliyun).minimize(self.cost)

        self.saver = tf.train.Saver()
        self.sess = tf.Session()
        self.sess.run(tf.global_variables_initializer())

    def aliyun_recommend(self, data):
        tags = []
        confs = []
        for tag_conf_tuples in data:
            tag_list = []
            conf_list = []
            tag_conf_tuples = tag_conf_tuples["tagConfTuples"]
            tag_conf_tuples = sorted(tag_conf_tuples, key=lambda x: x["confidence"], reverse=True)
            for i in range(n_size):
                if i < tag_conf_tuples.__len__():
                    tag_list.append(tag_conf_tuples[i]['tag'])
                    conf_list.append(tag_conf_tuples[i]['confidence'])
                else:
                    tag_list.append("")
                    conf_list.append(0)
            tags.append(tag_list)
            confs.append(conf_list)

        # try:
        #     self.load_models()
        # except Exception:
        #     return data
        pred = self.sess.run(self.y_pred_aliyun, feed_dict={self.X_aliyun: confs, self.scale: 1, self.keep_prob: 1})
        # result = []
        # for i in range(pred.__len__()):
        #     result_tuple = []
        #     is_reject = True
        #     for j in range(n_size):
        #         if pred[i][j] > self.dismiss_value:
        #             is_reject = False
        #             break
        #     if not is_reject:
        #         for j in range(n_size):
        #             if tags[i][j].__len__() != 0:
        #                 result_tuple.append({"tag": tags[i][j], "confidence": format(pred[i][j], '0.2f')})
        #     result.append({"tagConfTuples": result_tuple})
        return tags, pred

    def baidu_recommend(self, data):
        tags = []
        confs = []
        for tag_conf_tuples in data:
            tag_list = []
            conf_list = []
            tag_conf_tuples = tag_conf_tuples["tagConfTuples"]  # 数据结构不一样
            tag_conf_tuples = sorted(tag_conf_tuples, key=lambda x: x["confidence"], reverse=True)
            for i in range(n_size):
                if i < tag_conf_tuples.__len__():
                    tag_list.append(tag_conf_tuples[i]['tag'])
                    conf_list.append(tag_conf_tuples[i]['confidence'])
                else:
                    tag_list.append("")
                    conf_list.append(0)
            tags.append(tag_list)
            confs.append(conf_list)

        # try:
        #     self.load_models()
        # except Exception:
        #     return data
        pred = self.sess.run(self.y_pred_baidu, feed_dict={self.X_baidu: confs, self.scale: 1, self.keep_prob: 1})
        # result = []
        # for i in range(pred.__len__()):
        #     result_tuple = []
        #     is_reject = True
        #     for j in range(n_size):
        #         if pred[i][j] > self.dismiss_value:
        #             is_reject = False
        #             break
        #     if not is_reject:
        #         for j in range(n_size):
        #             if tags[i][j].__len__() != 0:
        #                 result_tuple.append({"tag": tags[i][j], "confidence": format(pred[i][j], '0.2f')})
        #     result.append({"tagConfTuples": result_tuple})
        return tags, pred

    def inter_recommend(self, tags, confs):
        # tags = []
        # confs = []
        # for tag_conf_tuples in data:
        #     tag_list = []
        #     conf_list = []
        #     tag_conf_tuples = tag_conf_tuples["tagConfTuples"]
        #     tag_conf_tuples = sorted(tag_conf_tuples, key=lambda x: x["confidence"], reverse=True)
        #     for i in range(n_size):
        #         if i < tag_conf_tuples.__len__():
        #             tag_list.append(tag_conf_tuples[i]['tag'])
        #             conf_list.append(tag_conf_tuples[i]['confidence'])
        #         else:
        #             tag_list.append("")
        #             conf_list.append(0)
        #     tags.append(tag_list)
        #     confs.append(conf_list)

        # try:
        #     self.load_models()
        # except Exception:
        #     return data
        pred = self.sess.run(self.y_pred, feed_dict={self.X: confs, self.scale: 1, self.keep_prob: 1})
        result = []
        for i in range(pred.__len__()):
            result_tuple = []
            is_reject = True
            for j in range(n_size):
                if pred[i][j] > self.dismiss_value:
                    is_reject = False
                    break
            if not is_reject:
                for j in range(n_size):
                    if tags[i][j].__len__() != 0:
                        result_tuple.append({"tag": tags[i][j], "confidence": format(pred[i][j], '0.2f')})
            result.append({"tagConfTuples": result_tuple})
        return result

    def recommand(self, data_aliyun, data_baidu):
        try:
            self.load_models()
        except Exception:
            return data_aliyun

        tags_aliyun, pred_aliyun = self.aliyun_recommend(data_aliyun)
        tags_baidu, pred_baidu = self.baidu_recommend(data_baidu)

        tags = tags_aliyun
        confs = pred_aliyun

        for i in range(n_size):
            tags.append(tags_baidu[i])
            confs.append(pred_baidu[i])

        pred = self.inter_recommend(tags, confs)

        return_tags = []
        return_confs = []
        for i in range(tags.__len__()):
            for j in range(return_tags.__len__()):
                if tags[i] == return_tags[j]:
                    return_confs[j] += confs[i]
                else:
                    return_tags.append(tags[i])
                    return_confs.append(confs[i])

        result = []
        for i in range(pred.__len__()):
            result_tuple = []
            is_reject = True
            for j in range(return_tags.__len__()):
                if return_confs[i][j] > self.dismiss_value:
                    is_reject = False
                    break
            if not is_reject:
                for j in range(return_tags.__len__()):
                    if return_confs[i][j].__len__() != 0:
                        result_tuple.append(
                            {"tag": return_tags[i][j], "confidence": format(return_confs[i][j], '0.2f')})
            result.append({"tagConfTuples": result_tuple})

        # for i in range(n_size):
        #     now_tag_length = tags.__len__()
        #     for j in range(now_tag_length):
        #         if tags[j] == tags_baidu[i]:
        #             confs[j] += pred_baidu[i]
        #         else:
        #             tags.append(tags_baidu[j])
        #             confs.append(pred_baidu[j])
        #
        # for i in range(n_size * 2):
        #     if i >= tags.__len__():
        #         tags.append("")
        #         confs.append(0)
        #
        # pred = self.inter_recommend(tags, confs)
        return pred

    def calculate_confidence(self):
        all_xs_aliyun, all_ys_aliyun = self.all_aliyun_train_data()
        all_ys_aliyun_pred = self.sess.run([self.y_pred_aliyun],
                                           feed_dict={self.X_aliyun: all_xs_aliyun,
                                                      self.Y_aliyun: all_ys_aliyun,
                                                      self.scale: 0.1,
                                                      self.keep_prob: 1})
        all_xs_baidu, all_ys_baidu = self.next_test_batch_baidu()
        all_ys_baidu_pred = self.sess.run([self.y_pred_baidu],
                                          feed_dict={self.X_baidu: all_xs_baidu,
                                                     self.Y_baidu: all_ys_baidu,
                                                     self.scale: 0.1,
                                                     self.keep_prob: 1})
        bacth_xs, batch_ys = self.inter_data(all_ys_aliyun_pred[0], all_ys_aliyun, all_ys_baidu_pred[0],
                                             all_ys_aliyun)
        pred = self.sess.run([self.y_pred],
                             feed_dict={self.X: bacth_xs,
                                        self.Y: batch_ys,
                                        self.keep_prob: 1})
        total_train = all_xs_aliyun.__len__()
        hit_confidence = []
        for i in range(total_train):
            for j in range(n_size):
                if batch_ys[i][j] == 1:
                    hit_confidence.append(pred[i][j])
        sorted(hit_confidence)
        self.dismiss_value = hit_confidence[np.math.floor(dismiss_percent * total_train)]

    def all_aliyun_train_data(self):
        total_train = self.aliyun_train_data.__len__()
        X = np.empty([total_train, n_size])
        Y = np.empty([total_train, n_size])
        for i in range(total_train):
            for j in range(n_size):
                X[i] = self.aliyun_train_data[i][j][0]
                Y[i] = self.aliyun_train_data[i][j][1]
        return X, Y

    def all_baidu_train_data(self):
        total_train = self.baidu_train_data.__len__()
        X = np.empty([total_train, n_size])
        Y = np.empty([total_train, n_size])
        for i in range(total_train):
            for j in range(n_size):
                X[i] = self.baidu_train_data[i][j][0]
                Y[i] = self.baidu_train_data[i][j][1]
        return X, Y

    def next_train_batch_baidu(self, index):
        batch_x = np.empty([batch_size, n_size])
        batch_y = np.empty([batch_size, n_size])
        for i in range(n_size):
            for j in range(batch_size):
                batch_x[j][i] = self.baidu_train_data[self.next_index_one(index, j)][i][0]
                batch_y[j][i] = self.baidu_train_data[self.next_index_one(index, j)][i][1]
        return batch_x, batch_y

    def next_train_batch_aliyun(self, index):
        batch_x = np.empty([batch_size, n_size])
        batch_y = np.empty([batch_size, n_size])
        for i in range(n_size):
            for j in range(batch_size):
                batch_x[j][i] = self.aliyun_train_data[self.next_index_one(index, j)][i][0]
                batch_y[j][i] = self.aliyun_train_data[self.next_index_one(index, j)][i][1]
        return batch_x, batch_y

    def next_index_one(self, index, offset):
        total_train = self.aliyun_train_data.__len__()
        return (index + offset) % total_train

    def next_index(self):
        total_train = self.aliyun_train_data.__len__()
        return (self.last_index_aliyun + batch_size) % total_train

    def compute_accuracy(self):
        batch_xs_aliyun, batch_ys_aliyun = self.next_test_batch_aliyun()
        batch_ys_aliyun_pred = self.sess.run([self.y_pred_aliyun],
                                             feed_dict={self.X_aliyun: batch_xs_aliyun,
                                                        self.Y_aliyun: batch_ys_aliyun,
                                                        self.scale: 0.1,
                                                        self.keep_prob: 1})
        batch_xs_baidu, batch_ys_baidu = self.next_test_batch_baidu()
        batch_ys_baidu_pred = self.sess.run([self.y_pred_baidu],
                                            feed_dict={self.X_baidu: batch_xs_baidu,
                                                       self.Y_baidu: batch_ys_baidu,
                                                       self.scale: 0.1,
                                                       self.keep_prob: 1})
        bacth_xs, batch_ys = self.inter_data(batch_ys_aliyun_pred[0], batch_ys_aliyun, batch_ys_baidu_pred[0],
                                             batch_ys_baidu)
        pred = self.sess.run([self.y_pred],
                             feed_dict={self.X: bacth_xs,
                                        self.Y: batch_ys,
                                        self.keep_prob: 1})
        accuracy = 0
        for i in range(batch_size):
            is_reject = True
            for j in range(n_size * 2):
                if pred[0][i][j] > self.dismiss_value or batch_ys[i][j] is not 0:
                    is_reject = False
                    break
            if is_reject:
                accuracy += 1
            else:
                total_confidence = 0
                for k in range(n_size):
                    total_confidence += pred[0][i][k]
                for k in range(n_size):
                    accuracy += (pred[0][i][k] / total_confidence) * batch_ys[i][k]
        accuracy = accuracy / batch_size
        print(accuracy)

    def next_test_batch_aliyun(self):
        batch_x = np.empty([batch_size, n_size])
        batch_y = np.empty([batch_size, n_size])
        for i in range(n_size):
            for j in range(batch_size):
                batch_x[j][i] = self.aliyun_test_data[self.next_index_one(0, j)][i][0]
                batch_y[j][i] = self.aliyun_test_data[self.next_index_one(0, j)][i][1]
        return batch_x, batch_y

    def next_test_batch_baidu(self):
        batch_x = np.empty([batch_size, n_size])
        batch_y = np.empty([batch_size, n_size])
        for i in range(n_size):
            for j in range(batch_size):
                batch_x[j][i] = self.baidu_test_data[self.next_index_one(0, j)][i][0]
                batch_y[j][i] = self.baidu_test_data[self.next_index_one(0, j)][i][1]
        return batch_x, batch_y

    def train(self):
        self.aliyun_train_data = self.load_aliyun_train_data()
        self.baidu_train_data = self.load_baidu_train_data()
        self.aliyun_test_data = self.load_aliyun_test_data()
        self.baidu_test_data = self.load_baidu_test_data()
        total_train = self.aliyun_train_data.__len__()
        total_batch = int(total_train / batch_size)
        try:
            self.load_models()
        except Exception:
            pass
        for epoch in range(training_epochs_aliyun):
            for i in range(total_batch):
                batch_xs_aliyun, batch_ys_aliyun = self.next_train_batch_aliyun(self.last_index_aliyun)
                self.last_index_aliyun = self.next_index()
                _, pred_aliyun = self.sess.run([self.optimizer_aliyun, self.y_pred_aliyun],
                                               feed_dict={self.X_aliyun: batch_xs_aliyun,
                                                          self.Y_aliyun: batch_ys_aliyun,
                                                          self.scale: 0.1,
                                                          self.keep_prob: 0.5})

        for epoch in range(training_epochs_baidu):
            for i in range(total_batch):
                batch_xs_baidu, batch_ys_baidu = self.next_train_batch_baidu(self.last_index_aliyun)
                self.last_index_baidu = self.next_index()
                _, pred_baidu = self.sess.run([self.optimizer_baidu, self.y_pred_baidu],
                                              feed_dict={self.X_baidu: batch_xs_baidu,
                                                         self.Y_baidu: batch_ys_baidu,
                                                         self.scale: 0.1,
                                                         self.keep_prob: 0.5})
        for epoch in range(training_epochs):
            for i in range(total_batch):
                batch_xs_aliyun, batch_ys_aliyun = self.next_train_batch_aliyun(self.last_index)
                batch_ys_aliyun_pred = self.sess.run([self.y_pred_aliyun],
                                                     feed_dict={self.X_aliyun: batch_xs_aliyun,
                                                                self.Y_aliyun: batch_ys_aliyun,
                                                                self.scale: 0.1,
                                                                self.keep_prob: 1})
                batch_xs_baidu, batch_ys_baidu = self.next_train_batch_baidu(self.last_index)
                batch_ys_baidu_pred = self.sess.run([self.y_pred_baidu],
                                                    feed_dict={self.X_baidu: batch_xs_baidu,
                                                               self.Y_baidu: batch_ys_baidu,
                                                               self.scale: 0.1,
                                                               self.keep_prob: 1})
                bacth_xs, batch_ys = self.inter_data(batch_ys_aliyun_pred[0], batch_ys_aliyun, batch_ys_baidu_pred[0],
                                                     batch_ys_baidu)
                self.last_index = self.next_index()
                _ = self.sess.run([self.optimizer],
                                  feed_dict={self.X: bacth_xs,
                                             self.Y: batch_ys,
                                             self.keep_prob: 0.5})
                if epoch % 10 == 9:
                    self.compute_accuracy()
        self.save_models()

    def inter_data(self, batch_xs_aliyun, batch_ys_aliyun, batch_xs_baidu, batch_ys_baidu):
        batch_x = np.empty([batch_size, n_size * 2])
        batch_y = np.empty([batch_size, n_size * 2])
        for i in range(n_size * 2):
            for j in range(batch_size):
                if i < n_size:
                    batch_x[j][i] = batch_xs_aliyun[j][i]
                    batch_y[j][i] = batch_ys_aliyun[j][i]
                else:
                    batch_x[j][i] = batch_xs_baidu[j][i - n_size]
                    batch_y[j][i] = batch_ys_baidu[j][i - n_size]
        return batch_x, batch_y

    def compute_origin_accuracy(self):
        batch_xs, batch_ys = self.next_test_batch_aliyun()
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
        self.saver.restore(self.sess, PathUtil.get_path() + "trainmodels/model.ckpt")

    @staticmethod
    def load_aliyun_train_data():
        aliyun_train_data = []
        with open(PathUtil.get_path() + "proval/train_aliyun.txt",
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
                aliyun_train_data.append(tag)
        return aliyun_train_data

    @staticmethod
    def load_baidu_train_data():
        baidu_train_data = []
        with open(PathUtil.get_path() + "proval/train_baidu.txt",
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
                baidu_train_data.append(tag)
        return baidu_train_data

    @staticmethod
    def load_aliyun_test_data():
        test_data = []
        with open(PathUtil.get_path() + "proval/test_aliyun.txt", "r") as file:
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
                test_data.append(tag)
        return test_data

    @staticmethod
    def load_baidu_test_data():
        test_data = []
        with open(PathUtil.get_path() + "proval/test_baidu.txt", "r") as file:
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
                test_data.append(tag)
        return test_data


tag = Tag()
tag.train()
