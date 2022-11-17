from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
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

@app.route("/members_db", methods=["GET"])
def members_dbs():
    members_list = list(db.members.find({}, {'_id': False}))
    return jsonify({'members' :members_list})


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

# @app.route('/members-layout')
# def members_get():
#     return render_template('members_layout.html')

# @app.route('/members-layout/:id')
# def members_get():
#     return render_template('members_layout.html')

# @app.route('/members-layout')
# def member():
#     idx = request.args.get("idx")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)