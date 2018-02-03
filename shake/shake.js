/**
 * Created by 列浩辉 on 2018/2/3.
 */
$(function() {
    var SHAKE_SPEED = 300;
    var lastTime = 0;//上次变化的时间
    var x = y = z = lastX = lastY = lastZ = 0;//位置变量初始化
    var $pop = $('.pop');
    var $popOpen = $('.pop-open');
    var $over = $('.over');
    //摇一摇功能
    function  motionHandler(event) {
        var acceleration = event.accelerationIncludingGravity;
        var curTime = Date.now();//取得当前时间
        if ((curTime - lastTime) > 120) {
            var diffTime = curTime - lastTime;
            lastTime = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            //计算摇动速度
            var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000;
            if (speed > SHAKE_SPEED) {
                window.removeEventListener('devicemotion', motionHandler);
                $.ajax({
                    url: url,
                    type: 'post',
                    data: {
                        open_id: open_id
                    },
                    success: function(data) {
                        if(data.state > 0) {
                            $pop.show();
                            $popOpen.find('.money').text(data.state + '元');
                        }
                        else if(data.state<0) {
                                alert('数量不够喔，赶快去答题吧');
                                window.location = index_page;
                        }
                        else {
                            $over.show();
                        }
                    }
                })
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }
    }
    if(window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', motionHandler, false);
    } else {
        alert("你的设备不支持位置感应");
    }
    //再来一次
    $('.more').on('click', function() {
        $pop.hide();
        $popOpen.hide();
        $over.hide();
        window.addEventListener('devicemotion', motionHandler, false);
    });
    $('.open').on('click', function() {
        $pop.hide();
        $popOpen.show();
    })
});