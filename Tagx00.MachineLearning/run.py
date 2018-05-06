# -*- coding: utf-8 -*-
from flask import (
    Flask,
    json,
    render_template,
    request,
)

from pickup import pickup

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'import_thing'


@app.route('/extractKeyWord', methods=['POST'])
def extractKeyWord():
    data = json.loads(request.form.data, encoding="utf-8")
    return pickup.pickup(data)


if __name__ == '__main__':
    app.run()
