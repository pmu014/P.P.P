from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
# client = MongoClient('mongodb+srv://test:sparta@cluster0.qsyxhqm.mongodb.net/Cluster0?retryWrites=true&w=majority')
# db = client.dbsparta
client = MongoClient('mongodb+srv://test:test@cluster0.nkgrata.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.test

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/members-layout')
def getmembers():
    return render_template('members_layout.html')
@app.route('/members_up')
def members_up():
    return render_template('members_up.html')
@app.route('/members_db', methods=["POST"])
def members_db():
    koName_receive = request.form['koName_give']
    enName_receive = request.form['enName_give']
    mbti_receive = request.form['mbti_give']
    introduce_receive = request.form['introduce_give']
    strengths_receive = request.form['strengths_give']
    blog_receive = request.form['blog_give']
    email_receive = request.form['email_give']
    github_receive = request.form['github_give']
    member_list = list(db.members.find({}, {'_id': False}))
    print(member_list)
    count = len(member_list)
    doc = {
        'koName': koName_receive,
        'enName': enName_receive,
        'mbti': mbti_receive,
        'introduce': introduce_receive,
        'strengths': strengths_receive,
        'blog': blog_receive,
        'email': email_receive,
        'github': github_receive,
        'index': count
    }
    db.members.insert_one(doc)
    return jsonify({'msg': '조원추가 완료!'})

@app.route("/members/<id>", methods=["GET"])
def members_dbs(id):
    members_list = list(db.members.find({'index': int(id)}, {'_id': False}))
    return jsonify({'members': members_list})

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

@app.route("/tguestBook", methods=["POST"])
def tguest_post():
    guestName_receive = request.form['guestName_give']
    guestMbti_receive = request.form['guestMbti_give']
    guestComment_receive = request.form['guestComment_give']

    doc = {
        'guestName' :guestName_receive,
        'guestMbti': guestMbti_receive,
        'guestComment': guestComment_receive
    }
    db.tguests.insert_one(doc)
    return jsonify({'msg':'방명록 작성 완료!'})

@app.route("/tguestBook", methods=["GET"])
def tguest_get():
    guests_list = list(db.tguests.find({}, {'_id': False}))
    return jsonify({'guests':guests_list})

@app.route("/mguestBook", methods=["POST"])
def mguest_post():
    memberNum_receive = request.form['memberNum_give']
    guestName_receive = request.form['guestName_give']
    guestMbti_receive = request.form['guestMbti_give']
    guestComment_receive = request.form['guestComment_give']

    doc = {
        'memberNum' :memberNum_receive,
        'guestName' :guestName_receive,
        'guestMbti': guestMbti_receive,
        'guestComment': guestComment_receive
    }
    db.mguests.insert_one(doc)
    return jsonify({'msg':'방명록 작성 완료!'})

@app.route("/mguestBook", methods=["GET"])
def mguest_get():
    guests_list = list(db.mguests.find({}, {'_id': False}))
    return jsonify({'guests':guests_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)