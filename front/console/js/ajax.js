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