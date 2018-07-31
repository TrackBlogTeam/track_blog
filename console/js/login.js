ajax({
    url: "https://www.track-blog.com/back/api/login.php",
    method: "POST",
    data: {
        role: "administrator",
    },
    success: (response) =>
    {
        const responseObject = JSON.parse(response);
        if (responseObject.code === 814) {
            alert("You have logged. Click confirm to enter index. ");
            window.location.href = "index.html";
        }
    }
});

function login()
{
    let inputs = document.getElementsByTagName("input")
    ajax({
        url: "https://www.track-blog.com/back/api/login.php",
        method: "POST",
        data: {
            role: "administrator",
            username: inputs[0].value,
            password: inputs[1].value
        },
        success: (response) =>
        {
            const responseObject = JSON.parse(response);
            if (responseObject.code === 812 || responseObject.code === 814) {
                if (responseObject.code === 814) {
                    alert("你已经登录");
                }
                window.location.href = "index.html";
            }
        }
    })
}