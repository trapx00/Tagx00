# -*- coding: utf-8 -*-
from flask import (
    Flask,
    json,
    request,
    jsonify
)

from pickup import pickup

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'import_thing'


@app.route('/extractKeyWord', methods=['POST'])
def extractKeyWord():
    data = json.loads(request.data.decode('utf-8'))
    return jsonify({'keys': pickup.pickup(data['content'])})


if __name__ == '__main__':
    app.run(port=8888)
