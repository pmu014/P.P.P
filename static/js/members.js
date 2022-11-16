$(document).ready(function () {
    show_members();
});

function show_members() {
    $.ajax({
        type: "GET",
        url: "/members",
        data: {},
        success: function (response) {
            let rows = response['members']
            for (let i = 0; i < rows.length; i++) {
                let MBTI = rows[i]['MBTI']
                let name = rows[i]['name']
                let si = rows[i]['si']
                let advantage = rows[i]['advantage']
                let blog = rows[i]['blog']
                let email = rows[i]['email']

                let temp_html = `<div class="MBTI" style="color:mediumpurple ">
                                            <h1>${MBTI}</h1>
                                            <h2>${name}</h2>
                                        </div>
                                        <div class="ppp">
                                            <div class="pp">
                                                <div class="pp">
                                                    <h1>자기소개</h1>
                                                    <p>${si}</p>
                                                </div>
                                                <div class="pp">
                                                    <h1>객관적으로 살펴본 자신의 장점</h1>
                                                    <p>${advantage}</p>
                                                </div>
                                            </div>
                                            <div class="p">
                                                <h3>Blog : ${blog}</h3>
                                                <h3>Email : ${email}</h3>
                                            </div>
                                        </div>`
                $('#member').append(temp_html)
            }
        }
    });
}