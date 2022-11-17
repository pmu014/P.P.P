$(document).ready(function () {
    function getUrlParams() {
        var params = {};

        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function(str, key, value) {
                params[key] = value;
            }
        );

        return params;
    }
    const params = getUrlParams()
    const id = params.id
    console.log({params})
    show_members(id);
    console.log("test")
});

function show_members(id) {

    $.ajax({
        type: "GET",
        // url: "/members_db",
        url: `/members/${id}`,
        data: {},
        success: function (response) {
            let i = 0
            let rows = response['members']
            console.log(rows)
            let koName = rows[i]['koName']
            let enName = rows[i]['enName']
            let mbti = rows[i]['mbti']
            let introduce = rows[i]['introduce']
            let strengths = rows[i]['strengths']
            let blog = rows[i]['blog']
            let email = rows[i]['email']
            let github = rows[i]['github']
            let index = rows[i]['index']
            let temp_html = `
            <div class="head">
                <h1>N5a[${index}] = ["${enName}"]</h1>
            </div>
            <div class="main-text">
                 <div class="MBTI" style="color:mediumpurple ">
                        <h1>${mbti}</h1>
                        <h2>${koName}</h2>
                 </div>
                 <div class="ppp">
                     <div class="pp">
                         <div class="p">
                             <h1>자기소개</h1>
                             <p>${introduce}</p>
                         </div>
                         <div class="p">
                            <h1>객관적으로 살펴본 자신의 장점</h1>
                            <p>${strengths}</p>
                         </div>
                     </div>
                     <div class="p">
                         <h3>Blog : ${blog}</h3>
                         <h3>Email : ${email}</h3>
                         <h3>github : ${github}</h3>
                     </div>
                 </div>
            </div>`
            $('#mb').append(temp_html)
        }
    });
}