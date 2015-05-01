var PI = Math.PI;
var RAD = 6371000; //地球半径,米

module.exports = function(from,to){
    /*
     * 根据经纬度计算距离 
     * @param from{Object}
     * @param to{Object}
     *
     * {
     *      lat:{Number},
     *      lng:{Number}
     * }
     * */

    var lat1 = from.lat / 180.0 * PI;
    var lon1 = from.lng / 180.0 * PI;
    var lat2 = to.lat / 180.0 * PI;
    var lon2 = to.lng / 180.0 * PI;
    var dlat = lat2 - lat1;
    var dlon = lon2 - lon1;

    var a = Math.sin(dlat / 2.0) * Math.sin(dlat / 2.0) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2.0) * Math.sin(dlon / 2.0);
    var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));

    var distance = RAD * c;
    var distanceText;

    /*
    *  小于100米的显示 <100m
    *  小于1000m的显示 xxx m 取整
    *  大于1000m的显示 x.x km 精确到1位
    *  大于100km的显示 >100km
    * */

   //test code
    // var test = [0,50,100,782,825,1000,1200,100000,1002000];
    // var distance = test[Math.floor(Math.random()*test.length)];

   if(distance<100){
       distanceText = '<100m';
   }else if(distance>=100 && distance<1000){
       distanceText = Math.round(distance/10)*10+"m";
   }else if(distance>=1000 && distance < 100000){
       var km =  (distance/1000).toFixed(1);
       distanceText = (km.charAt(km.length-1) ==="0" ? parseInt(km):km) +"km";
   }else {
       distanceText = ">100km";
   }

    return {
        distance : distance,
        distanceText:distanceText
    };
};
