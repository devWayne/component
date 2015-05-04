var $ = require('./zepto');


var lazyAttr = 'lazy-src';
function attr(el, name) {
    return el.getAttribute(name);

}
function filter(elems) {
    return elems.filter(function (el) {
        return !!attr(el, lazyAttr);
    }); //==> array
}

var LazyLoad = function (elems,offetTop) {
    if(!elems)
    	throw("elems 参数为空");

    var els = filter($(elems).get());
    var action = function () {
        els.forEach(function (el, i) {
            var elTop = el.getBoundingClientRect().top;//相对于窗口的高度，隐藏元素是0
            var lazySrc = attr(el, lazyAttr);
            if (lazySrc && elTop && elTop < window.innerHeight+(offetTop||0)) {
                el.setAttribute('src', lazySrc);
                el.removeAttribute(lazyAttr);
            }
        });
        els = filter(els);
        if (els.length <= 0) {
             $(window).off("scroll",action);
             $(document.body).off("touchmove",action);
        }
    };
    $(window).on("scroll",action).on("load",action);
    $(document.body).on("touchmove",action);
    action();
};

module.exports = LazyLoad;
