$(document).ready(function () {
    function getUrlParams() {
        let params = {};

        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (str, key, value) {
                params[key] = value;
            }
        );
        return params;
    }

    const params = getUrlParams();
    const id = params.id;

    show_members(id);
    membershow_comment(id);
});

function show_members(id) {
    $.ajax({
        type: 'GET',
        url: `/members/${id}`,
        data: {},
        success: function (response) {
            let rows = response['members']
            for (let i = 0; i < rows.length; i++) {
                let koName = rows[i]['koName']
                let enName = rows[i]['enName']
                let mbti = rows[i]['mbti']
                let introduce = rows[i]['introduce']
                let strengths = rows[i]['strengths']
                let blog = rows[i]['blog']
                let email = rows[i]['email']
                let github = rows[i]['github']
                let index = rows[i]['index']
                let img = rows[i]['img']

                let temp_html = `<div class="head">
                                    <h1>N5a[${index}] = ["${enName}"]</h1>
                                </div>
                                <div class="main-text" style="background: url(${img}) center top">
                                     <div class="MBTI">
                                            <p>${mbti}</p>
                                            <h2>${koName}</h2>
                                     </div>
                                     <div class="text_wrap">                                         
                                             <h3>자기소개</h3>
                                             <div class="introduce">
                                                 <p>${introduce}</p>
                                             </div>
                                             <h3>객관적으로 살펴본 자신의 장점</h3>
                                             <div class="strength">
                                                <p>${strengths}</p>
                                             </div>                                         
                                         <div class="url">
                                             <a href="${blog}"><h4>Blog : ${blog}</h4></a>
                                             <a href="${email}"><h4>Email : ${email}</h4></a>
                                             <a href="${github}"><h4>github : ${github}</h4></a>
                                         </div>
                                     </div>`
                $('#members').append(temp_html)
            }
        }
    });
}

function membersave_comment(id) {
    let memberNum = $('#memberNum option:selected').val()
    let guestName = $('#guestName').val()
    let guestMbti = $('#guestMbti').val()
    let guestComment = $('#guestComment').val()

    $.ajax({
        type: 'POST',
        url: '/mguestBook',
        data: {'memberNum_give': memberNum, 'guestName_give': guestName, 'guestMbti_give': guestMbti, 'guestComment_give': guestComment},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}

function membershow_comment(id) {
    $.ajax({
        type: "GET",
        url: "/mguestBook",
        data: {},
        success: function (response) {
            let rows = response['guests']
            for (let i = 0; i < rows.length; i++) {
                let memberNum = rows[i]['memberNum']
                let guestName = rows[i]['guestName']
                let guestMbti = rows[i]['guestMbti']
                let guestComment = rows[i]['guestComment']

                if (memberNum == id) {
                    let temp_html = `<div class="card">
                                        <figcaption class="blockquote-footer">
                                            ${guestMbti}<cite title="Source Title">${guestName}</cite>
                                        </figcaption>
                                        <blockquote class="blockquote">
                                            <p>${guestComment}</p>
                                        </blockquote>
                                        
                                    </div>`
                    $('#comm-list').append(temp_html)
                    }
                }
            }
    });
}

function open_box() {
    $('#comment-box').show()
}

function close_box() {
    $('#comment-box').hide()
}