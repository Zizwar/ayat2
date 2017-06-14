
module.exports.pageAyat = {
    //#e6eaed
    "#textTashkil": {
        layoutData: {
            top: 5,
            bottom: 0,
        },
        alignment: "center",
        textColor: "#000033"
    },
    "#markerLeft": {

        left: -1, opacity: 0.7,
        top: 0,
        image: {
            src: "../images/icons/marker.png",
            //left: 20,
        },
        visible: false
    },
    "#markerRight": {

        right: -1,
        opacity: 0.7,
        top: 0,
        image: {
            src: "../images/icons/marker.png",
            //left: 20,
        },
        visible: true
    },
    "#pfontSize": {
        font: "16px",
        layoutData: {
            right: "#tfontSize",
            // left: "30%",
            // baseline: "#tfontSize"
        },
        alignment: "right"
    }, "#tfontSize": {

        layoutData: {
            right: 10,
            top: 18,
            width: 120
        },

        font: "16px",
        alignment: "right"
    },
    "#btnIcoCompo": {
        background: "#e6eaed",
        opacity: 0.0,
        //width: "60%",
        top: "20%",
        // height: 240,
        // bottom: 10,
        // right: 10,
        left: "7%",
        right: "7%",
        visible: false
    },
			   "#addRequestBtn":{ opacity: 0.85,
   
            layoutData: {
                left: "prev() 5",
                width: 44,
                height: 44,
                bottom: 5
            }
	   },
		   "#addRequestPlay":{ opacity: 0.85,
        image: { src: "./images/icons/Play-52.png" },
        layoutData: {
            left: 5,
            width: 44,
            height: 44,
            bottom: 5
        }
	   }
}


//
module.exports.pageSearchAllscrollJuz = {
    '#juzLabel': { font: "bold 18px", left: 10, top: '#passphraseLabel 18', width: 120 },
    '#juzPicker': { left: '#juzLabel 10', right: 10, baseline: '#juzLabel', },

    '#seatLabel': { left: 10, top: '#hizbLabel 18', width: 120 },
    '#windowSeat': { left: '#seatLabel 10', right: 10, baseline: '#seatLabel' },
    '#aisleSeat': { left: '#seatLabel 10', right: 10, top: '#seatLabel 10' },
    '#hizbLabel': { font: "bold 18px", left: 10, top: '#juzLabel 18', width: 120 },
    '#hizbPicker': { left: '#hizbLabel 10', right: 10, baseline: '#hizbLabel' },
}
//
module.exports.pageSearchAllscrollSura = {
    '#suraLabel': { font: "bold 18px", left: 10, top: '#passphraseLabel 18', width: 120 },
    '#suraPicker': { left: '#suraLabel 10', right: 10, baseline: '#suraLabel', },

    '#seatLabel': { left: 10, top: '#ayaLabel 18', width: 120 },
    '#windowSeat': { left: '#seatLabel 10', right: 10, baseline: '#seatLabel' },
    '#aisleSeat': { left: '#seatLabel 10', right: 10, top: '#seatLabel 10' },
    '#ayaLabel': { font: "bold 18px", left: 10, top: '#suraLabel 18', width: 120 },
    '#ayaPicker': { left: '#ayaLabel 10', right: 10, baseline: '#ayaLabel' },
    '#tafserPicker': { left: '#tafserLabel 10', right: 10, baseline: '#ayaLabel' },
    '#tafserLabel': { font: "bold 18px", left: 10, top: 10, width: 120 },
    ///
    "#imgDraw": {
        left: 32, centerY: 0, width: 32, height: 32,
        tintColor: "#317d46"
    },
    "#txtDraw": {
        centerY: 0, left: "#imgDraw 16", font: "bold 15px",
        alignment: "left"
    }
}
module.exports.drawer = {
    "#imgDraw": {
        left: 32, centerY: 0, width: 32, height: 32,
        tintColor: "#317d46"
    },
    "#txtDraw": {
        centerY: 0, left: "#imgDraw 16", font: "bold 15px",
        alignment: "left"
    }

}
//

module.exports.pageOptions = {

    "#choose_lang": {
        font: "bold 18px", left: 10, top: 10, width: 120
    },

    "#langPicker": {
        left: '#choose_lang 10', right: 10, baseline: '#choose_lang',

    },
    //
    "#mosshaf_type": {
        font: "bold 18px", top: "#langPicker 15", left: 10, width: 120
    },

    "#mosshafPicker": {
        left: '#mosshaf_type 10', right: 10, baseline: '#mosshaf_type'

    },
    //
    "#vision_type": {
        font: "bold 18px", top: "#mosshafPicker 15", left: 10, width: 120
    },

    "#visionPicker": {
        left: '#vision_type 10', right: 10, baseline: '#vision_type'

    },



    //
}
//
