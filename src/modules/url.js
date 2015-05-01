
var PARAMS_REGEX=/[^&?]*=[^&?]*/g;


function url(link) {
    this.url = link || location.href;
}

url.prototype.createParams=function(data){
    if(Object.keys(this.readParams())==0) return false;
    return this.url+'?'+obj2arr(data).join('&');
}


url.prototype.readParams=function(type){
    var paramsArray=this.url.match(PARAMS_REGEX);
    if(!paramsArray) return {};
    type = type || 'Object';
    if(type=='Array') return paramsArray;
    return arr2obj(paramsArray);
}

url.prototype.updateParams=function(){
}
url.prototype.deleteParams=function(){
}

function obj2arr(obj){
    var _arr=[];
    Object.keys(obj).forEach(function(v,idx){
    	_arr.push(v+'='+obj[v].toString());
    })
    return _arr;
}

function arr2obj(arr){
    var _obj={};
    arr.forEach(function(v,idx){
    	_obj[v.split('=')[0]]=v.split('=')[1];
    });
    return _obj;
}

