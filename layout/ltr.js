
module.exports.pageAyat = {
	//#e6eaed
	"#textTashkil":{
  layoutData: {
        top: 5,
		bottom:0,	  
        },
	//	alignment: "right",
        textColor: "#000033"
		},
			"#markerLeft":{
		
        left: -1,opacity:0.7,
        top: 0,
        image: {
            src: "../images/icon/marker.png",
            //left: 20,
        },
        visible: false
    },
"#markerRight":{
		
        right: -1,
        opacity:0.7,
        top: 0,
        image: {
            src: "../images/icon/marker.png",
            //left: 20,
        },
        visible: true
    },
	"#pfontSize":{
			font: "16px",
            layoutData: {
                right: "#tfontSize",
                // left: "30%",
               // baseline: "#tfontSize"
            },
            alignment: "right"
},"#tfontSize":{
   
            layoutData: {
                right: 10,
                top: 18,
                width: 120
            },
            
            font: "16px",
            alignment: "right"
},
 "#btnIcoCompo":{
 background:"#e6eaed",
	 opacity: 0.0,
      //width: "60%",
		top:"20%",
       // height: 240,
       // bottom: 10,
        right: 10,
	   left:10,// "7%",
       //right: "7%", 
	   visible: false
    },
		   "#addRequestBtn":{ opacity: 0.85,
   
            layoutData: {
                right: "prev() 5",
                width: 44,
                height: 44,
                bottom: 5
            }
	   },
		   "#addRequestPlay":{ opacity: 0.85,
        image: { src: "./images/icons/Play-52.png" },
        layoutData: {
            right: 5,
            width: 44,
            height: 44,
            bottom: 5
        }
	   }
}


//
	module.exports.pageSearchAllscrollJuz = {
		'#juzLabel': {font: "bold 18px",right: 10, top: '#passphraseLabel 18', width: 120},
  '#juzPicker': {right: '#juzLabel 10', left: 10, baseline: '#juzLabel' , },

  '#seatLabel': {right: 10, top: '#hizbLabel 18', width: 120},
  '#windowSeat': {right: '#seatLabel 10', left: 10, baseline: '#seatLabel'},
  '#aisleSeat': {right: '#seatLabel 10', left: 10, top: '#seatLabel 10'},
  '#hizbLabel': {font: "bold 18px",  right: 10, top: '#juzLabel 18', width: 120},
  '#hizbPicker': {right: '#hizbLabel 10', left: 10, baseline: '#hizbLabel'},
}
  //
	module.exports.pageSearchAllscrollSura = {
		'#suraLabel': {font: "bold 18px",right: 10, top: '#passphraseLabel 18', width: 120},
  '#suraPicker': {right: '#suraLabel 10', left: 10, baseline: '#suraLabel' , },

  '#seatLabel': {right: 10, top: '#ayaLabel 18', width: 120},
  '#windowSeat': {right: '#seatLabel 10', right: 10, baseline: '#seatLabel'},
  '#aisleSeat': {right: '#seatLabel 10', right: 10, top: '#seatLabel 10'},
  '#ayaLabel': {font: "bold 18px",  right: 10, top: '#suraLabel 18', width: 120},
  '#ayaPicker': {right: '#ayaLabel 10', left: 10, baseline: '#ayaLabel'},
	  '#tafserPicker': {right: '#tafserLabel 10', right: 10, baseline: '#ayaLabel'},
	    '#tafserLabel': {font: "bold 18px",  right: 10, top: 10, width: 120},
}
module.exports.drawer = {
"#imgDraw":{
	 right: 32, centerY: 0, width: 32, height: 32,
    tintColor:"#317d46"
	},
"#txtDraw":{ centerY: 0, right: "#imgDraw 16" , font: "bold 15px",
    alignment: "right"
	}
	
}
//
module.exports.pageOptions = {

    "#choose_lang": {
        font: "bold 18px", right: 10, top: 10, width: 120
    },

    "#langPicker": {
        right: '#choose_lang 10', left: 10, baseline: '#choose_lang',

    },
    //
    "#mosshaf_type": {
        font: "bold 18px", top: "#langPicker 15", right: 10, width: 120
    },

    "#mosshafPicker": {
        right: '#mosshaf_type 10', left: 10, baseline: '#mosshaf_type'

    },
    //
    "#vision_type": {
        font: "bold 18px", top: "#mosshafPicker 15", right: 10, width: 120
    },

    "#visionPicker": {
        right: '#vision_type 10', left: 10, baseline: '#vision_type'

    },



    //
}