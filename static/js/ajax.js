function ajax(dataObject)
{
    dataObject["asynchronous"] = true;

    var xhr = new XMLHttpRequest();

    if (dataObject.asynchronous) {
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && xhr.status == 200) {
                dataObject.success(xhr.responseText);
            }
        }
    }

    if (dataObject.method == "GET") {
        xhr.open("GET", dataObject.url, dataObject.asynchronous)
    } else {
        xhr.open("POST", dataObject.url, dataObject.asynchronous)
        xhr.setRequestHeader("Content-Type", "application/json")
    }
    xhr.send(JSON.stringify(dataObject.data))
}