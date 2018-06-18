# -*- coding: utf-8 -*-
from flask import (
    Flask,
    json,
    request,
    jsonify)

from my_encoder import MyEncoder
from path_util import PathUtil
from pickup import pickup
from tag import tag

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'import_thing'
app.config['JSON_AS_ASCII'] = False


@app.route('/extractKeyWord', methods=['POST'])
def extractKeyWord():
    data = json.loads(request.data.decode('utf-8'))
    result = pickup.pickup(data['content'])
    return jsonify({'keys': result})


@app.route('/separateSentence', methods=['POST'])
def separateSentence():
    data = json.loads(request.data.decode('utf-8'))
    result = pickup.separate(data['content'])
    return jsonify({'words': result})


@app.route('/getRecommendTag', methods=['POST'])
def getRecommendTag():
    data = json.loads(request.data.decode('utf-8'))
    result = tag.recommend(data['recommendTagItemList'])
    return json.dumps({'recommendTagItemList': result}, cls=MyEncoder)


@app.route('/trainRecommend', methods=['POST'])
def trainRecommend():
    data = json.loads(request.data.decode('utf-8'))
    with open(PathUtil.get_path() + "proval/train.txt", "a+") as file:
        for i in range(data.__len__() - 1):
            file.write(str(data[i]))
            file.write('\n')
        file.write(str(data[data.__len__() - 1]))
    tag.train()
    return "success"


if __name__ == '__main__':
    app.run(port=8888)
