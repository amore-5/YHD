let baseUrl="http://localhost/project/yhd.com/";
define(['jquery','cookie'],function($,cookie){
return {
    render:function(callback){
        let sid=location.search.split("=")[1];
       
        $.ajax({
            type: "get",
            url: `${baseUrl}interface/details.php`,
            data: {
                sid:sid
            },
            dataType: "json",
            success: function (res) {
               let pic=JSON.parse(res.pic);
            let smallImg=res.img.split(',');
            let message=res.message.split(',');
        
               let temp=`
               <div class="wrap">
               <div class="mainbox clearfix">
                   <div class="dleft">
                       <div class="dtop">
                           <div class="imgbox">
                               <img src="${baseUrl}src/${pic[1].src}" alt="" class="sImg">
                               <div class="sf"></div>
                           </div>
                           <div class="bf">
                               <img src="${baseUrl}src/${pic[1].src}" alt="" class="bImg bigpic">
                           </div>
                       </div>
                       <div class="dbottom">
                           <span class="diconl idetail iconDetail"></span>
                           <div class="img_wrap">
                               <ul>
                    
                               
                               </ul>
                           </div>
                           <span class="diconr idetail iconDetail"></span>
                       </div>
                       <div class="num">
                           <p class="pro_id">商品编号47759296595</p>
                           <p class="collect">
                               <i class="iconfont"></i>
                               <span>关注</span>
                           </p>
                       </div>
                   </div>
                   <div class="dright">
                       <h1>${res.title}</h1>
                       <div class="clearfix price_wrap">
                           <p>价格</p>
                           <span class="price">￥<em>${res.price}</em></span>
                       </div>
                       <div class="msgsales">
                           <span>
                               <span class="iconDetail pink"></span>好评率
                               <strong class="rate pink"> 100%</strong>
                           </span>
                           <a href="#">[评论<span class="pink">0</span>条]</a>
                       </div>
                       <div class="coupon detail_bor">
                           <dl class="suit">
                               <dt>优惠券</dt>
                               <dd class="reduction">
                                   <div class="_item">满600减60</div>
                                   <div class="_item">满299减20</div>
                                   <div class="_item">满99减5</div>
                               </dd>
                               <div class="get_cou">领取优惠券
                                   <i class="iconDetail"></i>
                               </div>
                           </dl>
                           <!-- 未知功能 -->
                           <div class="detail_prom"></div>
                       </div>
                       <!-- 选择颜色尺码 -->
                       <div class="sel clearfix detail_bor">
                           <div class="sel_color  ">
                              
                           </div>
                           <div class="sel_size ">
                              
                           </div>
                       </div>
                       <!-- 区域选择 -->
                       <div class="area">
                           <dl class="clearfix">
                               <dt>送货至</dt>
                               <dd>
                                   <div class="region clearfix">
                                       <div class="input_btn clearfix">
                                           <span>上海静安区城区</span>
                                           <i class="iconDetail"></i>
                                       </div>
                                       <span class="info">
                                           <p><strong>有货</strong>&nbsp;&nbsp;免运费 </p>
                                       </span>
   
                                   </div>
                                   <p class="deliver_info">由 超媛男装旗舰店 负责发货, 并提供售后服务.</p>
                               </dd>
                           </dl>
                       </div>
                       <!-- 数量选择 -->
                       <div class="sel_num clearfix detail_bor">
                           <div class="num_bor">
                               <div class="numbox"><input type="text" value="1" class="goodsnum"></div>
                               <div class="num_btn">
                                   <input type="button" class="add">
                                   <input type="button" class="reduce">
                               </div>
                           </div>
                           <div class="join_cart ">
                               <a href="http://localhost/project/yhd.com/src/html/cartlist.html">
                                   <div class="btn"></div>
                               </a>
                               <span>降价通知</span>
                           </div>
   
                       </div>
                       <!-- 保障 -->
                       <a class='bz_wrap clearfix'>
                           <span class="bz">保障</span>
                           <span class="cancel"><i class="iconDetail"></i>支持7天无理由退货</span>
                       </a>
                   </div>
   
               </div>
           </div>`
             ;
             $('#details').append(temp);  
               let img='';
            smallImg.forEach(elm=>{
                img+=`
                <li><img src="${baseUrl}src/${elm}"></li>
                `;
                
            });
            $('.img_wrap ul').html(img);
           let info=' <dt class="dt">选择颜色：</dt>';
        if(message){
                 message.forEach(elm=>{
                    info+=` <dd class="item clearfix">${elm}</dd>`;
                 });
                 $('.sel_color').html(info);
                 $('.sel_color dd:first').addClass('first_info');
                 $('.sel_color dd').hover(function(){
                     $(this).addClass('first');               
                 },function(){
                     $(this).removeClass('first');
                 });
                $('.sel_size dd').on('click',function(){
                  $(this).addClass('first_info').sibling().removeClass('first_info');
                });
          }
          let num=$('.goodsnum').val();
          $('.goodsnum').on('change',function(){
              if($('goodsnum').val()>res.numbe){
                  $('.goodsnum').val(res.numbe)
                
              } else if($('.goodsnum').val()<1){
                  $('.goodsnum').val(1);
              }
          });
          $('.add').on('click',function(){
            //   console.log(res.numbe)
              if(num<res.numbe){
                  num++;
                  $('.goodsnum').val(num);
              }
          });
          $('.reduce').on('click',function(){
              if(num>1){
                  num--;
                  $('.goodsnum').val(num);
              }
          });

          function fdj(){
            let imgBox=$('.imgbox'),//左边盒子
            boximg=$('.imgbox img'),//左边图片
            bigpic = $('.bigpic'),//右边图片
            sf=$('.sf'),//左边透明镜
            bf=$('.bf'),//右边显示框
            bfimg=$('.bf img');//右边图片
          
         // 1. 绑定事件
         imgBox.on('mouseover', function() {

        // 让元素显示
        sf.addClass('show');
        bf.addClass('show');

        // sf的大小计算
        
        sf.css({
            width: (imgBox.width() * bf.width()) / bigpic.width() + 'px',
            height: (imgBox.height() * bf.height()) / bigpic.height() + 'px',
        })


        // 2.让sf跟随鼠标移动
        imgBox.on('mousemove', function(ev) {
            let top = ev.pageY - imgBox.offset().top - sf.height() / 2;
            let left = ev.pageX - imgBox.offset().left - sf.width() / 2;

            // 3.比例计算
            
            let ratio = bigpic.width() / imgBox.width(); // 小数 大于1的数
            // 边界管理
            if (top <= 0) {
                top = 0;
            } else if (top >= imgBox.height() - sf.height()) {
                top = imgBox.height() - sf.height() - 2;
            }

            if (left <= 0) {
                left = 0;
            } else if (left >= imgBox.width() - sf.width()) {
                left = imgBox.width() - sf.width() - 2;
            }
            
            sf.css({
                top: top + 'px',
                left: left + 'px'
            });

            bigpic.css({
                top: -top * ratio + 'px',
                left: -left * ratio + 'px'
            });
        });
        });

        imgBox.on('mouseout', function() {
            sf.removeClass('show');
            bf.removeClass('show');
        });

        let imgs=$('.img_wrap ul li');
        
        imgs.on({'mouseover':function(){
            
            let imgsss=$(this).children().attr('src');
            boximg.attr({src:`${imgsss}`});
            bfimg.attr({src:`${imgsss}`});
        },
        'mouseout': function() {
                imgs.removeClass('active');
            }
        });
       
        $('.dbottom span').eq(0).on('click',function(){
            let ulleft=$('.img_wrap ul').offset().left;
            if(ulleft<-740){
                ulleft=-370;
            }
            $('.img_wrap ul').css({
                left:`${ulleft-370}px`
            })
        })

        
        }
        fdj();

           
            callback && callback(res.sid,res.price);

            }
            
       
        });

        
        
        
    },
    addItem:function (sid,price,numbe) {
        let shop = cookie.get('shop');
      let product={
          sid:sid,
          price:price,
          numbe:numbe
      } 
     
      if(shop){
          shop=JSON.parse(shop);
          if(shop.some(elm=>elm.sid==sid)){
            shop.forEach(elm => {
                elm.sid == sid ? elm.numbe = numbe : null;
            });
          } else {
            shop.push(product);
        }
      }else {
        shop = []; // 不存在新建数组
        shop.push(product); // 放入商品
    }

    cookie.set('shop', JSON.stringify(shop), 1);
      
    }
    
}
});