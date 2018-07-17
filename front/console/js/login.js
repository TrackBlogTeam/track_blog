function login()
{
    let inputs = document.getElementsByTagName("input")
    ajax({
        url: "http://www.yangjianwei.com/track_blog/back/business.php",
        method: "POST",
        data: {
            username: inputs[0].value,
            password: inputs[1].value
        },
        success: (response) =>
        {
            console.log(response)
        }
    })
}