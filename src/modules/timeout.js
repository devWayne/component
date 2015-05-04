var $ = require("zepto-wepp");
var Tpl = require("tpl");


//单位数前加0
function _fix(n){
    return n<10?("0"+n):n;
}


module.exports =  function(ele,opt,callback){
	var self = this;
	var _timer;

	ele = $(ele);

	var o = {
		hour : ele.attr("data-hour") || 00,

		minute : ele.attr("data-minute") || 00,
		
		second : ele.attr("data-second") || 00,	    		
		
		day : ele.attr("data-day") || 00,

		template : opt.template || "",

		time:opt.time || 1,

		toFixed:opt.toFixed || 0
	};


	function _recover(type){
		switch(type){
			case "day":
				o.hour = 23;
			case "hour":
				o.minute = 59;
			case "minute":
				o.second = 59;
		}
		return true;
	}



	function _autodecrement (type){
		if(type !="second"){
			o[type] = _fix(parseInt(o[type]) - 1);
		}else{
			o[type] = parseFloat(o[type]- o.time).toFixed(parseInt(o.toFixed));
		}
	}	    	

	function _bulid(){
		
		o.second > 0 ?  _autodecrement("second") :

			o.minute > 0 ? _recover("minute") && _autodecrement("minute") : 

				o.hour > 0 ?_recover("hour")&& _autodecrement("hour") :  

					o.day > 0 ? _recover("day")&& _autodecrement("day") : false;


		var _html = Tpl.compile(o.template)(o);
		ele && $(ele).html(_html);

		if(parseFloat(o.second) == 0 && o.minute == 0 && o.hour == 0 && o.day == 0){
			callback && callback.call();
			clearInterval(_timer);
		}
		
	}

	_timer = setInterval(_bulid,o.time*1000);

	return {
		pause : function(){
			clearInterval(_timer);
		},
		restart :function(){
			_timer = setInterval(_bulid,o.time*1000);
		}  		
	}

}
