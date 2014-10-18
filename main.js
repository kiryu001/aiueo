(function(){
    setTimeout(function() {
        $("#logo").hide();
        start()
    }, 2000);
    function start() {
    var milkcocoa = new MilkCocoa("https://io-li1eaqdxg.mlkcca.com");
    var hash = escapeHTML(location.hash.substr(1));
    var dataStore = milkcocoa.dataStore("kobito").child(hash);
    $("#kobito").offset({left : 0, top :0});
    var url = "https://dl.dropboxusercontent.com/u/6931359/shibuya1018/images/aiueo_";
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
    }, 1000);
}

function get_aiueo(text) {
    return text.split("").map(function(character){
        return url + aiueo_map[character] + ".png";
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
