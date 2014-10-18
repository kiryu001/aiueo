(function(){
    setTimeout(function() {
        $("#logo").hide();
        start()
    }, 1200);
    function start() {
    var milkcocoa = new MilkCocoa("https://io-li1eaqdxg.mlkcca.com");
    var hash = escapeHTML(location.hash.substr(1));
    var dataStore = milkcocoa.dataStore("kobito").child(hash);
    $("#kobito").offset({left : 0, top :0});
    var url = "images/aiueo_";
    var aiueo_map = {
        "あ" : 1,
        "い" : 2,
        "う" : 3,
        "え" : 4,
        "お" : 5,
        "か" : 6,
        "き" : 7,
        "く" : 8,
        "け" : 9,
        "こ" : 10,
        "さ" : 11,
        "し" : 12,
        "す" : 13,
        "せ" : 14,
        "そ" : 15,
        "た" : 16,
        "ち" : 17,
        "つ" : 18,
        "て" : 19,
        "と" : 20,
        "な" : 21,
        "に" : 22,
        "ぬ" : 23,
        "ね" : 24,
        "の" : 25,
        "は" : 26,
        "ひ" : 27,
        "ふ" : 28,
        "へ" : 29,
        "ほ" : 30,
        "ま" : 31,
        "み" : 32,
        "む" : 33,
        "め" : 34,
        "も" : 35,
        "や" : 36,
        "ゆ" : 37,
        "よ" : 38,
        "ら" : 39,
        "り" : 40,
        "る" : 41,
        "れ" : 42,
        "ろ" : 43,
        "わ" : 44,
        "を" : 45,
        "ん" : 46
    };

function AiueoElement(_x, _y, _text) {
    var x = _x;
    var y = _y;
    var text = _text;
    var id = new Date().getTime(36);
    $("#content").append('<div id="c'+id+'"></div>');
    $("#c" + id).html(get_aiueo(text));
    $("#c" + id).offset({left : x, top :y});
}

function set_element(x, y, text) {
    var tx = Number(x)-60;
    var ty = Number(y)-60;
    $("#kobito").offset({
        left : -100,
        top : 0
    });
    $("#kobito").animate({
        left : tx,
        top : ty
    }, 1000);
    setTimeout(function() {
        var ae = new AiueoElement(tx, ty, text);
        $("#kobito").animate({
            left : -95,
            top : 0
        }, 1000);
    }, 1000);
}

function get_aiueo(text) {
    return text.split("").map(function(c){
        if(aiueo_map[c]) return aiueo_map[c];
        return 0;
    }).map(function(character){
        return url + character + ".png";
    }).map(function(e){
        return '<img width="120" src="'+e+'"></img>'
    }).join("");
}

$(window).mousedown(function(e){
    var text = window.prompt("なにをかきますか？")
    dataStore.push({
        x : e.pageX,
        y : e.pageY,
        text : text
    });
});

dataStore.query({}).done(function(elems) {
    elems.map(function(e) {
        set_element(e.x, e.y, e.text);
    });
});

dataStore.on("push", function(e){
    set_element(e.value.x, e.value.y, e.value.text);
});

    function escapeHTML(val) {
        return $('<div>').text(val).html();
    };    }

}())
