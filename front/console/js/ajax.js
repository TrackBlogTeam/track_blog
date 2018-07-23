function ajax(dataObject)
{
    // AJAX全称为Asynchronous JavaScript and XML
    // ajax是一种方法而已，异步的javascript和xml，简单点说，通过ajax可以向服务器发起请求，在服务器返回数据之前浏览器可以执行其他的任务
    // 不必要等到服务器返回数据之后再执行下一步操作（这样就是同步而不是异步了）
    // 下面是原生的JavaScript的ajax的实现方法，通过XMLHttpRequest()
    // 注意：IE早期版本需要使用ActiveXObject，这里不使用，不主动兼容IE

    // 暂且把所有请求定为异步请求
    dataObject["asynchronous"] = true

    var xhr = new XMLHttpRequest()

    if (dataObject.asynchronous) {
        xhr.onreadystatechange = function ()              // 回调函数，在readyState发生变化的时候会触发该函数。注意，该函数的执行顺序与其位置无必然联系
        {
            if (xhr.readyState == 4 && xhr.status == 200) {    // 满足连接成功条件
                dataObject.success(xhr.responseText)             // 执行dataObject里面的success函数，把xhr返回的数据当做参数传递给success函数
            }
        }
    }

    if (dataObject.method == "GET") {                // 如果dataObject指定的方法为GET
        xhr.open("GET", dataObject.url, dataObject.asynchronous)          // 与dataObject里面的的url建立连接
    } else {                                                         // 如果dataObject指定的方法为POST
        xhr.open("POST", dataObject.url, dataObject.asynchronous)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")   // 设置头部文件
    }
    xhr.send("message=" + encodeURIComponent(JSON.stringify(dataObject.data)))          // 在建立好的连接里面发送数据包，就是发送给服务器的东西
    // 如无意外，服务器在接收到数据之后，会返回数据，使readyState发生变化，然后触发刚才在xhr.onreadystatechange定义的函数
}