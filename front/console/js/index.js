function toggleExpand(e)
{
    var targetElement = e.nextElementSibling
    if (targetElement.getAttribute("data-expand") === "false") {
        targetElement.setAttribute("data-expand", "true")
    } else {
        targetElement.setAttribute("data-expand", "false")
    }
}