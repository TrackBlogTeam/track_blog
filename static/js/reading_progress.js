// code from https://codepen.io/explosion/pen/LRzbpA
const progress = document.querySelector('.readingProgress');
const body = document.body;
const html = document.documentElement;

const updateSizes = () => ({
    height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
    vh: Math.max(html.clientHeight, window.innerHeight || 0)
});

let scrollY = 0;
let sizes = updateSizes();

const update = () =>
{
    const width = 100 - (sizes.height - scrollY - sizes.vh) / sizes.height * 100;
    progress.style.width = width + '%';
}

const onScroll = () =>
{
    scrollY = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    requestAnimationFrame(update);
}

const onResize = () =>
{
    sizes = updateSizes();
    requestAnimationFrame(update);
}

if (progress) {
    update();
    window.addEventListener('scroll', onScroll, false);
    window.addEventListener('resize', onResize, false);
}