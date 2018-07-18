function login()
{
    let inputs = document.getElementsByTagName("input")
    ajax({
        url: "../../back/business.php",
        method: "POST",
        data: {
            type: "login",
            role: "administrator",
            username: inputs[0].value,
            password: inputs[1].value
        },
        success: (response) =>
        {
            const result = JSON.parse(response)
            console.log(result)
            if (result.code === 812) {
                window.location.href = "index.html"
            }
        }
    })
}