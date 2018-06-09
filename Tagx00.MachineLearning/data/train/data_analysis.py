import json
import numpy as np
import matplotlib.pyplot as plt

n_size = 3
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
train_data_size = train_data.__len__()
X = range(train_data_size)
Y = np.empty(train_data_size)
for i in range(train_data_size):
    for j in range(n_size):
        Y[i] += train_data[i][j][0] * train_data[i][j][1]

plt.title("compute adoption rate by confidence")
plt.xlim(xmax=150, xmin=0)
plt.ylim(ymax=1, ymin=0)
plt.xlabel("image index")
plt.ylabel("adoption rate")
plt.plot(X, Y)
plt.show()
