let baseUrl="http://localhost/project/yhd.com/";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get('shop'); //   获取cookie数据
            
            if (shop) {
                shop = JSON.parse(shop);
                
                
                let idlist = shop.map(elm => elm.sid).join();
                
                $.ajax({
                    type: "get",
                    url: `${baseUrl}interface/cartlist.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        console.log(res)
                        let tempstr = '';
                        res.forEach(elm => {
                            
                            let pic = JSON.parse(elm.pic);
                            console.log(elm)
                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.sid == elm.sid);
                            console.log(arr)
                            tempstr += `
                            <li class="item">
                                <div class="c-box">
                                    <input type="checkbox" id="p1">
                                </div>
                                <div class="p-pic">
                                    <img src="${baseUrl}src/${pic[0].src}" alt="">
                                </div>
                                <div class="p-title">
                                    ${elm.title}

                                </div>
                                <div class="p-price">
                                   ${elm.price}
                                </div>
                                <div class="num_act clearfix"> 
                                <a href="javascript:;" class="minus unable"  >−</a> <input type="text" class="input" value="${arr[0].numbe}" > <a href="javascript:;" class="add">+</a> 
                                </div>
                                <div class="p-price-sum">
                                    ${(arr[0].numbe*elm.price).toFixed(2)}
                                </div>
                                <div class="p-del">
                                    <a href="javascript:;">删除</a>
                                </div>
                            </li>`;

                        });
                        $('.xr').append(tempstr);
                        function cart(){
                            let n=0;
            
                            for(let i=0;i<$('.p-price-sum').length;i++){
                                let numadd=$($('.p-price')[i]).text()*$($('.input')[i]).val();
                                if($($(':checkbox')[i]).prop('checked')){
                                    $($('.p-price-sum')[i]).text(numadd.toFixed(2));
                                    n+=parseInt($($('.p-price-sum')[i]).text());
                                }
                            }
                            $('.money b').html(n);
                        }
                        cart();
                        $('.minus').on('click',function(){
                            
                            let num=$(this ).next().val();
                            if(num>1){
                                num--;
                            }else{
                                num=1;
                            }
                            $(this ).next().val(num);
                            cart();
                            
                        })
                        $('.add').on('click',function(){
                            let num=$(this ).prev().val();
                            if(num<66){
                                num++;
                            }else{
                                num=66;
                            }
                            $(this ).prev().val(num);
                            cart();
                        });
                        
                        $('.allselector').on('click',function(){
                            let chcked=$(this).prop('checked');
                            if(chcked){
                                for (let i = 0; i < $(':checkbox').length-1; i++) {
                                    $($(':checkbox')[i]).prop('checked',true);
                                }
                            }else{
                                for (let i = 0; i < $(':checkbox').length-1; i++) {
                                    $($(':checkbox')[i]).prop('checked',false);
                                }
                            }
                        })
                        if($('.allselector').prop('checked')){
                            for (let i = 0; i < $(':checkbox').length-1; i++) {
                                $($(':checkbox')[i]).prop('checked',true);
                            }
                            cart();
                        }
                        $(':checkbox').on('click',function(){
                            let num=0;
                            for (let i = 0; i < $(':checkbox').length-1; i++) {
                                $($(':checkbox')[i]).prop('checked');
                                num+= $($(':checkbox')[i]).prop('checked');
                            }
                            if(num==$(':checkbox').length-1){
                                $('.allselector').prop('checked',true);
                            }else{
                                $('.allselector').prop('checked',false);
                            }
                            cart();
                        }) 
                    }
                });
            }
        }
    }
});