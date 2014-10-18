$(function(){
    setTimeout(function() {
        $("#logo").hide();
        start()
    }, 1200);
    var milkcocoa = new MilkCocoa("https://io-li1eaqdxg.mlkcca.com");
    var hash = escapeHTML(location.hash.substr(1));
    var dataStore = milkcocoa.dataStore("kobito").child(hash);
    var flameDataStore = dataStore.child("flame");
	    function escapeHTML(val) {
	        return $('<div>').text(val).html();
	    };
    function start() {
        $("#kobito-content").offset({
            left : 0,
            top : 0
        })
        $("#content").offset({
            left : 0,
            top : 0
        })
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
    var id = new Date().getTime().toString(36)
    $("#content").append('<div id="c'+id+'"></div>');
    $("#c" + id).html(get_aiueo(text));
    $("#c" + id).offset({left : x, top :y});
}

function set_element(x, y, text) {
    var tx = Number(x)-60;
    var ty = Number(y)-60;
    var id = new Date().getTime().toString(36)
    $("#kobito-content").append('<div id="kobito'+id+'" class="kobito"><img width="120" src="images/kobito.gif"></img></div>');
    $("#kobito"+id).offset({left : -100, top :0});
    $("#kobito"+id).animate({
        left : tx,
        top : ty
    }, 1000, function() {
        var ae = new AiueoElement(tx, ty, text);
        $("#kobito"+id).animate({
            left : -95,
            top : 0
        }, 1000, function(){
            $("#kobito"+id).remove();
        });
    });
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

$("#content").mousedown(function(e){
    var text = window.prompt("なにをかきますか？");
    if(text) {
        dataStore.push({
            x : e.pageX,
            y : e.pageY,
            text : text
        });
    } 
});

dataStore.query({}).done(function(elems) {
    elems.map(function(e) {
        set_element(e.x, e.y, e.text);
    });
});

dataStore.on("push", function(e){
    set_element(e.value.x, e.value.y, e.value.text);
});


	}

	function FlameElement(_x, _y) {
	    var x = _x;
	    var y = _y;
	    var id = new Date().getTime().toString(36);
	    $("#content").append('<div id="f'+id+'" class="flame"><img width="120" src="images/aiueo_fram.png"></img><button>動画</button></div>');
	    $("#f" + id + " button").click(function() {
	    	var youtube = window.prompt("動画のIDを書いてください。");
            if(youtube) flameDataStore.set("set", {youtube : youtube});
	    });
	    var pos = {x:0, y:0};
    	$("#f"+id).offset({
    		top : y,
    		left : x,
    	});
        flameDataStore.on("set", function(e) {
        	if(e.id == "set") {
			    $("#f" + id).html('<iframe width="560" height="315" src="//www.youtube.com/embed/'+e.value.youtube+'" frameborder="0" allowfullscreen></iframe>');
        	}else if(e.id == "move") {
	        	$("#f"+id).offset({
	        		top : e.value.x,
	        		left : e.value.y,
	        	});
        	}

        });
	}
	new FlameElement(document.body.clientWidth / 2-50, document.body.clientHeight / 2-50);
});
