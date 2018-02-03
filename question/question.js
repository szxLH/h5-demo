/**
 * Created by 列浩辉 on 2018/2/3.
 */
$(function() {
    var $pop = $('.pop');
    var $coinAll = $('.coin.all');
    var $coinAdd = $('.coin.s');
    //init timer
    var mytimer = new timer();
    sendAndGet(id, 0);
    //计时canvas控件
    function timer() {
        var that = this;
        var padcolor = '#ffffff';
        var innercolor = '#f75552';
        var fontcolor = '#ffffff';
        that.time = 10;
        var speed = 50;
        var timer;
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var c_width = canvas.width;
        var c_height = canvas.height;
        draw();
        function draw() {
            ctx.clearRect(0, 0, c_width, c_height);
            ctx.beginPath();
            ctx.lineWidth = '40';
            ctx.arc(c_width/2, c_height/2, 120, 0, Math.PI*2);
            ctx.strokeStyle = padcolor;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.lineWidth = '20';
            ctx.arc(c_width/2, c_height/2, 122, -0.5*Math.PI, Math.PI*(3.5 - 2*(that.time)/10), true);
            ctx.strokeStyle = innercolor;
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = fontcolor;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.font = 'bold 90px 微软雅黑';
            ctx.fillText(Math.ceil(that.time), c_width/2, c_height/2);
            ctx.closePath();
        }
        that.start = function(func, correct) {
            that.time = 10;
            timer = setInterval(function() {
                if(Math.ceil(that.time) == 0) {
                    clearInterval(timer);
                    that.time = 0;
                    draw();
                    $('.btn').off('click').eq(correct).addClass('yes');
                    func();
                }
                draw();
                that.time -= 1/speed;
            }, 1000/speed);
        };
        that.stop = function() {
            clearInterval(timer);
        }
    }
    //这个递归
    function functap(score) {
        console.log('本题得分' + score);
        sendAndGet(id, score);
    }
    function functime() {
        console.log('时间到');
        sendAndGet(id, 0);
    }
    //setQuestion方法，第一个参数：题目，第二个参数：选项数组，第三个参数正确答案的序号（0，1，2，3）
    //第四个参数：答题后的回调方法，score为本题得分
    //第五个参数：时间到后的回调方法
    //这个方法可以在用户点击回答或者时间到了之后再次调用来更新页面内容、计数器以及交互
    //但是不要在用户没有操作或者时间到之前多次调用
    // setQuestion(
    //     '请问！的空嫂i就覅撒萨芬撒飞洒发撒阿萨的萨芬啊我发哇发',
    //     ['VS大哥','的方式','广泛的','添加剂'],
    //     1,
    //     functap,
    //     functime
    // );
    //刷新题目以及选项
    //参数1：题目，参数2：答案数组，参数3：正确答案的序号（0，1，2，3）
    function setQuestion(question, answer, correct, functap, funcTimeOut) {
        var $btns = $('.btn');
        $btns.removeClass('yes no');
        mytimer.start(funcTimeOut, correct);
        $('.question').text(question);
        for(var i in answer) {
            $btns.eq(i).find('span').text(answer[i]);
        }
        $btns.on('click', function() {
            mytimer.stop();
            $btns.off('click');
            if($(this).index() == correct) {
                $(this).addClass('yes');
                functap(Math.ceil(mytimer.time)*20);
            }
            else {
                $(this).addClass('no');
                $btns.eq(correct).addClass('yes');
                functap(0);
            }
        })
    }
    //修改弹窗数据
    function initpop(name, num) {
        $pop.show();
        $pop.find('.num').text('x' + num);
        $pop.find('.congra span').text(name);
    }
    //数据交互
    function sendAndGet(id, score) {
        if(score) {
            money += score;
            console.log(1);
            $coinAll.find('.num').text(money);
            $coinAdd.show().find('.num').text('+' + score);
        }
        setTimeout(function() {
            $.ajax({
                type: 'post',
                url: url,
                data: {
                    open_id: id,
                    score: score
                },
                success: function(data) {
                    $coinAdd.hide();
                    if(data.is_upgrade) {
                        initpop(data.rank_name, data.love_num);
                        //关闭弹窗
                        $('.btn2').off('click').on('click',function() {
                            $pop.hide();
                            setQuestion(
                                data.question,
                                [data.option0,data.option1,data.option2,data.option3],
                                data.answer,
                                functap,
                                functime
                            );
                        });
                    }
                    else {
                        setQuestion(
                            data.question,
                            [data.option0,data.option1,data.option2,data.option3],
                            data.answer,
                            functap,
                            functime
                        );
                    }
                }
            });
        }, 1000)
    }
});