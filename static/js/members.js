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