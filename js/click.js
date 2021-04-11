/*网页鼠标点击特效（文字）*/

var coreSocialistValues = ["❤", "从心", "创心", "走心", "思心", "❤", "佛心", "道心", "本心", "修心", "❤", "广", "告", "位"],
    index = Math.floor(Math.random() * coreSocialistValues.length);

var randomColor = function() {
    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")";
}

document.addEventListener('click', function(e) {
    //过滤a标签
    if (e.target.tagName == 'A') {
        return;
    }
    var x = e.pageX,
        y = e.pageY,
        span = document.createElement('span');

    span.textContent = coreSocialistValues[index];
    index = (index + 1) % coreSocialistValues.length;
    span.style.cssText = ['z-index: 999999; position: absolute; font-weight: bold; color: ', randomColor(), '; top: ', y - 20, 'px; left: ', x, 'px;'].join('');

    document.body.appendChild(span);

    animate(span, {"top": y - 180, "opacity": 0}, 1500, function() {
        span.parentNode.removeChild(span);
    });
});

/*
* animate 函数能够实现动画
* @dom  要运动的元素
* @json  css样式对象
* @time  时间  以毫秒值为单位
* callback 回调函数
*/
function animate(dom, json, time, callback) {
    // 定义定时器的间隔
    var interval = 5;
    var allCount = time / interval;
    var nowJSON = {};

    for(var i in json) {
        if(window.getComputedStyle) {
            nowJSON[i] = parseInt(getComputedStyle(dom)[i]);
        } else {
            nowJSON[i] = parseInt(dom.currentStyle[i]);
        }
    }

    var stepJSON = {};

    for(var i in json) {
        stepJSON[i] = (json[i] - nowJSON[i]) / allCount;
    }

    var count = 0;
    var timer = setInterval(function() {
        count++;

        for(var i in json) {
            dom.style[i] = nowJSON[i] + stepJSON[i] * count + "px";
        }

        if(count >= allCount) {

            clearInterval(timer);

            for(var i in json) {
                dom.style[i] = json[i] + "px";
            }
            // 回调函数执行
            callback && callback();
        }
    }, interval);
}