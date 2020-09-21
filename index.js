// console.log(animate);
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}
function throttle(fn, interval) {
    var lastTime = 0
    return function () {
        console.log('throttlethrottlethrottle');
        var _this = this
        var _arguments = arguments
        var newTime = new Date().getTime()

        if (newTime - lastTime > interval) {
            fn.apply(_this, _arguments)
            lastTime = newTime
        }
    }
}
function debounce(fn, delay) {
    var timer
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fn()
        }, delay);
    }
}
var scrollHeight = 0;
var clientHeight = 0;
var part1OffsetTop = 0;
var part2 = 0;
window.onload = function () {
    scrollHeight = getScrollTop();
    clientHeight = getClientHeight();
    console.log(scrollHeight, clientHeight);
    // part1
    part1OffsetTop = document.querySelector('.part1').offsetTop;
    part1OffsetHeight = document.querySelector('.part1').offsetHeight;
    // part2
    part2 = document.querySelector('.part2').offsetTop;
    console.log('part1OffsetTop', part1OffsetTop);
    console.log('part2', part2);
}
function show() {
    scrollHeight = getScrollTop();
    clientHeight = getClientHeight();
    // console.log('clientHeight:', clientHeight, 'scrollHeight:' + scrollHeight);
    console.log('scrollHeight:' + scrollHeight);
    // part1动画
    if (scrollHeight > 60) {
        // 当滚动高度大于60时，black的高度为自适应
        var black = document.querySelector('.black')
        // 滚动条减去60代表现在滚到了nav了，
        // 剩下的每次滚动都计算滚动的距离占可视高度的百分比
        var ratio1 = ((scrollHeight - 60) / clientHeight).toFixed(4) * 100;
        // 100%减去滚动的百分比
        black.style.height = 100 - ratio1 + '%'
        if (scrollHeight > (clientHeight + 60)) {
            // 当滚动到part2完全显示时(即滚动高度大于clientHeight加header高度)，black的高度为0
            var black = document.querySelector('.black')
            var ratio1 = ((scrollHeight - 60) / clientHeight).toFixed(4) * 100;
            black.style.height = '0%'
        }
    } else {
        // 当滚动高度小于60时，black的高度为100%
        var black = document.querySelector('.black')
        var ratio1 = ((scrollHeight - 60) / clientHeight).toFixed(4) * 100;
        black.style.height = '100%'
    }
    // part2动画
    // console.log(part1OffsetHeight + 60);
    if ((scrollHeight > part1OffsetHeight + 60)) {
        // if ((scrollHeight > (60 + part2 + 250 - 50)) && (scrollHeight < (60 + part2 + 250 - 50 + 100))) {
        // console.log('=======part2========');
        // console.log(scrollHeight - (part1OffsetHeight + 60));
        var part2LeftImg = document.querySelector('.part2-left-img');
        var part2RightImg = document.querySelector('.part2-right-img');
        var ratio2 = 100 - (scrollHeight - (part1OffsetHeight + 60));
        console.log('+++++++', ratio2);
        console.log('+++++++', (ratio2 * 1.15));
        part2LeftImg.style.transform = `translateY(-${ratio2}%)`;
        var leftRatio = (ratio2 * 1.15) / 20;
        if ((ratio2 * 1.15) > 20) {
            // 当(ratio2 * 1.15)> 20，即translateX大于20%
            console.log('?????');
            part2RightImg.style.transform = `translateX(${ratio2 * 1.15}%) translateY(50%) scale(1.3)`;
        }
        if ((ratio2 * 1.15) < 20) {
            console.log('=====', (ratio2 * 1.15));
            console.log(leftRatio);
            var leftRatio1 = ((ratio2 * 1.15) / 20) > 0 ? ((ratio2 * 1.15) / 20) : 0;
            console.log('leftRatio1', leftRatio1);
            var bottomRatio = 10 - (leftRatio.toFixed(4) * 10) + 50;
            // 100% ===> 0% 逐渐递减
            // 1.3变化到1，即要变化0.3，
            var scaleRatio = 1 + (leftRatio * 0.3);
            // var test1 = (((ratio2 * 1.3)/20).toFixed(4) *0.3);
            console.log('pppp', scaleRatio);
            // console.log('pppp',10 - test + 50);
            console.log(`translateX(0%) translateY(${bottomRatio}%) scale(${scaleRatio})`);
            if ((ratio2 * 1.15) > 0) {
                part2RightImg.style.transform = `translateX(${leftRatio1}%) translateY(${bottomRatio}%) scale(${scaleRatio})`;
            } else {
                part2RightImg.style.transform = `translateX(${leftRatio1}%) translateY(60%) scale(1})`;
            }
        }
    } else {
        var part2LeftImg = document.querySelector('.part2-left-img');
        part2LeftImg.style.transform = `translateY(-100%)`;
    }
}
window.onscroll = debounce(show, 10)
// window.addEventListener()