function ajax(dataObject)
{
    // For convenience temporarily.
    dataObject["asynchronous"] = true

    var xhr = new XMLHttpRequest()

    if (dataObject.asynchronous) {
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && xhr.status == 200) {
                dataObject.success(xhr.responseText)
            }
        }
    }

    if (dataObject.method == "GET") {
        xhr.open("GET", dataObject.url, dataObject.asynchronous)
    } else {
        xhr.open("POST", dataObject.url, dataObject.asynchronous)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    }
    xhr.send("message=" + JSON.stringify(dataObject.data))
}

function doSubmit(){
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

function switchToSignIn(){
	window.open("sign_in.html","_self");
}