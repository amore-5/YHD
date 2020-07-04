let baseUrl="http://localhost/project/yhd.com/";
define(['jquery'], function($) {
    // banner图

    class Banner {
        constructor() {
            this.pic = $('.ban_pic li');
            this.tab = $('.ban_tab li');
            this.index = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            this.tab.eq(0).addClass('active').siblings('li').removeClass('active');
            this.pic.eq(0).css({
                'opacity': 1,
                'z-index': 1
            }).siblings('li').css({
                'opacity': 0,
                'z-index': 0
            })
            this.tab.on('mouseover', function () {
                _this.index = $(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $('.ban_pic li').eq($(this).index()).css({
                    'opacity': 1,
                    'z-index': 1
                }).siblings('li').css({
                    'opacity': 0,
                    'z-index': 0
                })
                clearInterval(_this.timer);
            })
            this.tab.on('mouseout', function () {
                _this.autoplay($(this).index());
            })
            this.pic.on('mouseover',function(){
                clearInterval(_this.timer);
            })
            this.pic.on('mouseout',function(){
                _this.autoplay($(this).index());
            })
            this.autoplay($(this).index());
        }
        autoplay(index) {
            this.timer = setInterval(() => {
                index++;
                if (index > 1) {
                    index = 0;
                }
                $('.ban_tab li').eq(index).addClass('active').siblings('li').removeClass('active');
                $('.ban_pic li').eq(index).css({
                    'opacity': 1,
                    'z-index': 1
                }).siblings('li').css({
                    'opacity': 0,
                    'z-index': 0
                })
            }, 3000);
        }
    }
   return{
      banner:new Banner(),

    //   数据渲染
       render:function(){
           $.ajax({
            type:"get",
            url:`${baseUrl}interface/index.php`,
            dataType:"json",
            success:function(res){
                let temp='';
                res.forEach(element => {
                 let pic=JSON.parse(element.pic); 
                 temp+=`<li class="goods">
                 <div class="wrap">
                 <a href="${baseUrl}src/html/details.html?sid=${element.sid}">
                     <img src="${baseUrl}src/${pic[0].src}" alt="">
                 </a>
                     <div class="box clearfix">
                         <div class="title">${element.title}</div>
                         <div class="price">¥
                             <span>${element.price}</span>
                         </div>
                     </div>
                     <div class="hover">
                         <div class="hover_btn hover_left">
                             <a href="${baseUrl}src/html/details.html?sid=${element.sid}">
                                 <i class="icon"></i>
                             </a>
                         </div>
                         <div class="hover_btn hover_right">
                             <a href="${baseUrl}src/html/details.html?sid=${element.sid}">找相似</a>
                         </div>
                     </div>
             </div>
         </li>`
                });
                $('.render_ul').html(temp);
            }
           });
       },

    //    超级单品倒计时
       countDown:function(){
           var time=parseInt(10800);
           function timer(time){
               window.setInterval(function(){
                   var day=0,
                   hour=0,
                   minute=0,
                   second=0;
                   if(time>0){
                       day=Math.floor(time/(60*60*24));
                       hour=Math.floor(time/(60*60));
                       minute = Math.floor(time / 60) - (day * 24 * 60) - (hour * 60);
                       second = Math.floor(time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                   }
                  
                        if(hour<=9) {hour='0'+hour;}
                        if(minute<=9){minute='0'+minute;}
                        if(second<=9){second='0'+second;}
                        $('.time_hours').html(hour);
                        $('.time_minit').html(minute);
                        $('.time_second').html(second);
                        time--;
                },500)
           }
           $(function(){
               timer(time);
           });
       }
   }
});