



/***preloading */
//loading
if(screen.orientation)screen.orientation.lock('portrait');
	tabris.ui.set("background", "#fff");
  tabris.ui.set("displayMode", "fullscreen");
  tabris.ui.set("toolbarVisible", false);
var loading_ = new tabris.Page({id:"pagino",
    topLevel: true,
  //  class: "swish_background"
}).open();
//

  //
var imgLoad = new tabris.ImageView({
    image: {
        src: "./images/ayat_logo.png",
        scaleMode: "auto",
			width:180
    },
    centerX: 0,
    centerY: 0
}).appendTo(loading_)
//var startAyat = require('./app.js');
//
setTimeout(function() {
	require('./app.js')(loading_)
    
    //tabris.ui.set("displayMode", "normal");
    //tabris.ui.set("toolbarVisible", true);
   // tabrisBg();
//console.log("disposed loading")
    //if(isNetworkConnected())console.error("conected yes"); else console.error("no connect")
    //err(tabris.device.get("connectionType"))

}, 1000);
