from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.qsyxhqm.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/members')
def getmembers():
    return render_template('members_layout.html')

@app.route("/join", methods=["POST"])
def join_post():
    name_receive = request.form['name_give']
    doc = {
        'enName' :name_receive
    }
    db.join.insert_one(doc)

    return jsonify({'msg':'합류 신청 완료!'})

@app.route("/join", methods=["GET"])
def join_get():
    first_name = list(db.join.find({}, {'_id': False}))
    return jsonify({'firstName':first_name})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)