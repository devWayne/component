var $ = require("zepto-wepp");
var Class = require("class");
var _Stack = [];

var DEFAULT = {
	"position":"fixed",
    "z-index":9999
}
var NORMAL = {
	position:"static"
}



$(window).on("touchmove scroll",function(e){
    var scrollTop = $(window).scrollTop()
    $.each(_Stack,function(index,obj){
        obj.emit("scroll",scrollTop);
    });
});


// var ua = navigator.userAgent;
// var isAndroid = ua.match(/android/i);

// if(!isAndroid){
$(window).on("touchend",function(e){
    var scrollTop;
    var _timer = setInterval(function(){
        if(scrollTop == $(window).scrollTop()){
            clearInterval(_timer);
            return ;
        }
        scrollTop = $(window).scrollTop();
        $.each(_Stack,function(index,obj){
            obj.emit("scroll",scrollTop);
        });
    },20);
});
// }

// 原型
var FloatBar = Class({
	Implements:"events attrs",
    initialize:function(node,opt){
    	var self = this, node;
    	self.node = node = $(node);
        self.cloneEl = ($(node).find("[data-id='el']").length?$(node).find("[data-id='el']"):$(node)).clone(true).hide();
        self.cloneEl.appendTo(document.body);    
    	if(node.length != 1){
    		throw("没有获取元素或仅限单例调用！");
    		return ;
    	}

    	self.set("opt",opt);
    	self._bindEvent();
    	// 队列处理
    	_Stack.push(this);
    },
    _bindEvent:function(){
    	var self = this;
    	var node = self.node;
    	var cloneEl = self.cloneEl;
    	
    	self.on("scroll",function(val){
    		var index = node.offset().top;
    		// debugger;
    		if(val >= index && !cloneEl.attr("data-scroll")){
    			cloneEl.css(self.get("opt"));
                cloneEl.show();
                // node.children("[data-id='el']").hide();
               
    			cloneEl.attr("data-scroll",true);
    			self.emit("start");
    		}else if(val <= index && cloneEl.attr("data-scroll")){
    			cloneEl.css(NORMAL)
                // 还原
                cloneEl.hide();
                // node.children("[data-id='el']").show();
    			cloneEl.attr("data-scroll","");
    			self.emit("end");
    		}
    	})
    }
},{
	opt:{
		value:"",
		setter:function(val){
			return $.extend(val || {top:0,left:0},DEFAULT);
		}
	}
})

// 自定义css初始化
$.each($(".J_auto_floatbar"),function(index,item){
    	new FloatBar(item,$(item).attr("data-opt") && JSON.parse($(item).attr("data-opt")));
});


module.exports = FloatBar;
