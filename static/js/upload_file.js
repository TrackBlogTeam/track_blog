function uploadFile(formElement)
{
    //代码来自: https://blog.csdn.net/hellow_world_/article/details/78230150
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://www.track-blog.com/back/api/upload_portrait.php');

    xhr.onload = function ()
    {
        console.log(xhr.response);
    }

    let form = new FormData();
    form.append('portrait', formElement.firstElementChild.files[0]);
    xhr.send(form);

    // xhr.upload.onprogress = function (event)
    // {
    //     //  console.log(event);
    //     var percent = event.loaded / event.total * 100 + '%';
    //     console.log(percent);
    //     // 设置 进度条内部step的 宽度
    //     document.querySelector('.step').style.width = percent;
    // }
}