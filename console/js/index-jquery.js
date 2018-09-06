$(document).ready(function ()
{
    $('[data-toggle="checkbox"]').radiocheck();

    $(':checkbox').on('change.radiocheck', function (event)
    {
        console.log(event.currentTarget.getAttribute("id"));
        console.log($(this).is(':checked'));
    });
})
