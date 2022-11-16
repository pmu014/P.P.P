
function join() {
    let koName = $('#koName').val()
    let enName = $('#enName').val()
    let mbti = $('#mbti').val()
    let introduce = $('#introduce').val()
    let strengths = $('#strengths').val()
    let blog = $('#blog').val()
    let email = $('#email').val()
    let github = $('#github').val()

    console.log(blog)
    $.ajax({
        type: "POST",
        url: "/members_db",
        data: {koName_give: koName,
                enName_give: enName,
                mbti_give: mbti,
                introduce_give: introduce,
                strengths_give: strengths,
                blog_give: blog,
                email_give: email,
                github_give: github},
        success: function (response) {
            alert(response)
            window.location.reload()
        }
    })
}