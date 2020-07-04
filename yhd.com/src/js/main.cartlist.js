require.config({
    paths: {
        jquery: './jquery.min',
        cartlist: './lib/cartlist',
        cookie:'./cookie'
    }
});

require(['cartlist'], function(cartlist) {
    cartlist.render();
})