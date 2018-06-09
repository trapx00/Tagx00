# -*- coding: utf-8 -*-
from flask import (
    Flask,
    json,
    request,
    jsonify,
    Response)

from pickup import pickup

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'import_thing'
app.config['JSON_AS_ASCII'] = False


@app.route('/extractKeyWord', methods=['POST'])
def extractKeyWord():
    data = json.loads(request.data.decode('utf-8'))
    result = pickup.pickup(data['content'])
    return jsonify({'keys': result})


@app.route('/getRecommendTag', methods=['POST'])
def getRecommendTag():
    data = json.loads(request.data.decode('utf-8'))
    result = pickup.pickup(data['content'])
    return jsonify({'keys': result})


if __name__ == '__main__':
    app.run(port=8888)
