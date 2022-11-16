from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.qsyxhqm.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')


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

@app.route("/guestBook", methods=["POST"])
def guest_post():
    guestName_receive = request.form['guestName_give']
    guestMbti_receive = request.form['guestMbti_give']
    guestComment_receive = request.form['guestComment_give']
    doc = {
        'guestName' :guestName_receive,
        'guestMbti': guestMbti_receive,
        'guestComment': guestComment_receive
    }
    db.guests.insert_one(doc)

    return jsonify({'msg':'방명록 작성 완료!'})

@app.route("/guestBook", methods=["GET"])
def guest_get():
    guests_list = list(db.guests.find({}, {'_id': False}))
    return jsonify({'guests':guests_list})

@app.route('/members-layout/:id')
def members_get():
    return render_template('members_layout.html')

@app.route('/members-layout')
def member():
    idx = request.args.get("idx")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)