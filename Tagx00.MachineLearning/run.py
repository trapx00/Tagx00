# -*- coding: utf-8 -*-
from flask import (
    Flask,
    json,
    request,
    jsonify)

from api_util import write_baidu_results, get_baidu_results, get_baidu_api
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
    result = tag.recommend(data['recommendTagItemList'], data['baiduResults'])
    return json.dumps({'recommendTagItemList': result}, cls=MyEncoder)


@app.route('/trainRecommend', methods=['POST'])
def trainRecommend():
    data = json.loads(request.data.decode('utf-8'))
    with open(PathUtil.get_path() + "proval/train_aliyun.txt", "a+") as file:
        with open(PathUtil.get_path() + "proval/train_baidu.txt", "a+") as file_baidu:
            for i in range(data.__len__()):
                aliyun_data = {}
                aliyun_data["url"] = data[i]["url"]
                aliyun_data["tags"] = data[i]["tags"]
                aliyun_data["response"] = data[i]["response"]
                baidu_data = {}
                baidu_data["url"] = data[i]["url"]
                baidu_data["tags"] = data[i]["tags"]
                baidu_data["response"] = data[i]["baiduResponse"]
                file.write('\n')
                file.write(str(aliyun_data))
                file_baidu.write('\n')
                file_baidu.write(str(baidu_data))
    tag.train()
    return "success"


@app.route('/baiduApi', methods=['POST'])
def baiduApi():
    data = json.loads(request.data.decode('utf-8'))["imageUrl"]
    return jsonify({"objects": get_baidu_api(data)})


if __name__ == '__main__':
    PathUtil.init_path()
    app.run(port=8888)
