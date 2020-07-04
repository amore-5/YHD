let baseUrl="http://localhost/project/yhd.com/";
define(['jquery'], function($) {

   return{
       render:function(){
        $.ajax({
            type: "post",
            url: `${baseUrl}interface/login.php`,
            data: `username=${$("#username").val()}&password=${$("#password").val()}`,
            dataType: "json",
            success: function (res) {
                if(res){
                    alert('登录成功');
                    location.href=`${baseUrl}src/html/index2.html`;
                }else{
                    alert('账户或密码错误');
                    location.href=`${baseUrl}src/html/login.html`;
                }
            }
        });
       }

   }
});