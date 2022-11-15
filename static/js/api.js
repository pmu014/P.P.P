$(document).ready(function () {
    show_order();
});
function show_order() {
    $.ajax({
        type: 'GET',
        url: '/join',
        data: {},
        success: function (response) {
            let rows = response['firstName']
            for (let i = 0; i < rows.length; i++) {
                let firstName = rows[i]['enName']

                let temp_html = `
                <li class="req_member">
                    ${firstName}
                    <div class="wait_box">승인 대기중</div>
                </li>`
                $('#name_box').append(temp_html)
            }
        }
    })
}

function join() {
    let koName = $('#koName').val()
    let enName = $('#enName').val()
    let mbti = $('#mbti').val()
    let blog = $('#blog').val()
    let introduce = $('#introduce').val()
    let strengths = $('#strengths').val()
    let joinSubmit = $('#joinSubmit').val()
    let firstName = enName.split(' ')[0].replace(/^[a-z]/, char => char.toUpperCase());

    $.ajax({
        type: "POST",
        url: "/join",
        data: { name_give: firstName },
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}