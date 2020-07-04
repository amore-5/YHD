require.config({
    paths:{
        jquery:'./jquery.min',
        details:'./lib/details',
        cookie:'./cookie'
    },
    shim:{}
});
require(['jquery','details'],function($,details){
    details.render(function(sid,price,numbe){
       
       $('.btn').on('click',function(id,price){
          
         details.addItem(sid,price,$('.goodsnum').val());
       }) ;
      
    });
   
    
    
});