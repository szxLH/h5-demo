// var g = {};
// g.baseUrl = "./images/"

// g.resourceLoadCount = 0;

// g.resourceArr=[];

// g.resourceLoad = function(){
//     for(var i=0;i<g.resourceArr.length;i++){
//         var img = new Image();
//         img.src = g.baseUrl + g.resourceArr[i];
//         img.onload = function(){
//             g.resourceLoadCount++;
//             g.rate = parseInt((g.resourceLoadCount/g.resourceArr.length).toFixed(2) * 100);
//             if(g.rate == 100){
//                 $(".loading").addClass("hide");
//                 $(".main").removeClass("hide");
//             }
//         }
//     }
// }

// g.resourceLoad();

// g.remToPx = function(rem){
//     var win = $(window).width();
//     return 100/320*win*rem;
// }

// g.selectIndex = 0;

// g.checkSelect = function(){
//     var bSelected = false;
//     $(".index-select input").each(function(i,item){
//         if(item.checked){
//             bSelected = true;
//             g.selectIndex = i + 1; 
//         }
//     })
//     return bSelected;
// }

// g.showToast = function(errMsg,mode) {
//     $(".toast .toast-msg").text(errMsg);
//     $(".toast").removeClass('hide');
//     if(mode == 1){
//         setTimeout(function(){
//             $(".toast").animate({"opacity":0},300,function(){
//                 $(this).css("opacity",1).addClass("hide");
//             })
//         },1000);
//     }else if(mode == 2){
//         $(".toast-sure").removeClass('hide');
//     }
// }



// 调用提交预测结果接口
// g.ajaxSubmitResult = function(callback){
//     // var phone = $("#index-tel").val();
//     // $.ajax({
//     //     url:"",
//     //     type:"POST",
//     //     data:{
//     //         result:g.selectIndex,
//     //         phone:phone
//     //     },
//     //     success:function(res){
//     //         callback(res);
//     //     },
//     //     error:function(){
//     //         g.showToast("网络错误");
//     //     }
//     // })

//     setTimeout(function(){
//         var res = {
//             code:1,
//             msg:'操作成功',
//             data:[]
//         }
//         callback(res);
//     },1000)
// }   

window.onload = function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    // $("#index-submit").click(function(){
    //     var bSelected = g.checkSelect();
    //     if(!bSelected){
    //         g.showToast("请先预测比赛结果",1);
    //         return;
    //     }

    //     var tel = $('#index-tel').val();

    //     if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
    //         g.showToast('请输入正确的手机号',1);     
    //         return;
    //     }

    //     var callback = function(res){
    //         if(res.code == '1'){
    //             location.href = './invite.html';
    //         }
    //     }
    //     g.ajaxSubmitResult(callback)
    // })

    // $("#invite-btn").click(function(){
    //     g.showToast('点击右上角分享给好友或朋友圈',2);     
    // })

    // $("#help-btn").click(function(){
    //     if($(this).hasClass("disable")) return;
    //     location.href='../demoPage/demoPage.html'
    // })

    // $(".toast-sure").click(function(){
    //     $(".toast").animate({"opacity":0},300,function(){
    //         $(this).css("opacity",1).addClass("hide");
    //     })
    // })
}
