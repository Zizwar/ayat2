module.exports = function (loading_) {
    var db = null;
    var langD = tabris.device.get("language");

    var version_ = 2.0;
    var analytics_ = require("./GoogleAnalytics.js");
    sendAnalytics("user", "play app Ayat2");

    //
    var fnJson = require("./fnJson.js");
    var QuranData = require("./quran-data.js").QuranData;
    var currAya;
    //var wino.page_key = "Page";//Page_warsh
    var log = err_ = err = logz = errz = lastLog = function () { } ////errz;
    //var //errz = //errz;
    var ayatStor = getStorJ("ayatStor");
    var min_ = 8;
    var wino = ayatStor ? ayatStor : {
        aya: 1,
        sura: 1,
        page: 1,
        oldSlc: null,
        oldTfs: null,
        classTfs: "tfs_1_1_1",
        class: "slc_1_1_1",
        firstp: 1,
        start: 1,
        end: min_,
        moqri: 1,
        status: null,
        currMosshaf: "hafs",
        lang: langD.indexOf("ar") != -1 ? "ar" : "en",//langD === "ar" ? "ar" : "en",
        page_key: "Page",
        // update:[]
    };
    sendAnalytics("stats", JSON.stringify(wino))
    wino.currMosshaf = "hafs";
    wino.tmp = [];
    wino.tmp.page = wino.page ? wino.page : false;
    wino.tab = [];
    //wino.status = [];
    wino.tafssir = [];
    wino.stor = [];
    wino.tmpStr = {
        tarajem: getStor("tarajem"),
        moqri: getStor("moqri"),
        tafssir: getStor("tafssir"),
        tafssirId: getStor("tafssirId"),
        displayMode: getStor("displayMode"),
        moqriId: getStor("moqriId"),
        alarm: getStorJ("alarm"),
        update: getStorJ("update"),
    }
    wino.stor.tarajem = wino.tmpStr.tarajem ? wino.tmpStr.tarajem : "ar_ma3any";
    wino.stor.moqri = wino.tmpStr.moqri ? wino.tmpStr.moqri : "Hudhaify_64kbps";
    wino.stor.moqriId = wino.tmpStr.moqriId ? wino.tmpStr.moqriId : 1;
    wino.stor.tafssir = wino.tmpStr.tafssir ? wino.tmpStr.tafssir : "tabary";
    wino.stor.tafssirId = wino.tmpStr.tafssirId ? wino.tmpStr.tafssirId : 1;
    wino.stor.displayMode = wino.tmpStr.displayMode === "non" ? false : true;
    wino.stor.alarm = wino.tmpStr.alarm ? wino.tmpStr.alarm : [];
    wino.stor.update = wino.tmpStr.update ? wino.tmpStr.update : [];
    sendAnalytics("lang", "open page search");
    //
    var getJFav = getStorJ("itemsFavs");
    wino.stor.itemsFavs = getJFav ? getJFav : [];
    //wino.lang = langD.indexOf("ar")!=-1?"ar":"en";
    wino.direction = wino.lang === "ar" ? "ltr" : "rtl";
    //
    //var tafssirRows = require("./wino/tafssirRows.js")
    //var style_ = require("./layout/en.js");
    var amakenArr = require("./amaken_" + wino.currMosshaf + ".js").amaken;
    //var amakenArr = require("./amaken_hafs.js").amaken;
    var reqTafssir;
    var tafssirArr = tarajem(wino.stor.tarajem)
    var ayatJson = require("./ayatJson.json")
    var langs = require("./langs.js")//.tafssir;
    //
    var style_ = require("./layout/" + wino.direction + ".js");
    // reqTafssir = require("./baghawy.json")//baghawy.json");
    var lngS = (wino.lang == "ar") ? 4 : 5;
    //quraa lang data
    wino.tbf = { bottom: 0, top: 0 };
    wino.br = function (top, widget, bottom) {
        return new tabris.Composite({
            // highlightOnTouch: true,
            background: "#bbb",
            layoutData: bottom ? { left: 10, bottom: bottom, right: 10, height: 1 } : { left: 10, top: [top, 5], right: 10, height: 1 },
        }).appendTo(widget);
    }
    wino.brD = function (widget) {
        return new tabris.Composite({
            // highlightOnTouch: true,
            background: "#bbb",
            layoutData: { left: 10, bottom: 0, right: 10, height: 1 },
        }).appendTo(widget);
    }
    //
    //
    _lang = _langs[wino.lang];
    var quraa = {
        "hq": { // high audio quality
            "Hudhaify_64kbps": _lang['recite_hudhaify'],
            "Husary_64kbps": _lang['recite_husary'],
            "husary_qasr_64kbps": _lang['recite_husary'] + ' 2',
            "Abdullah_Basfar_64kbps": _lang['recite_basfar'],
            "Muhammad_Ayyoub_64kbps": _lang['recite_ayyoub'],
            "Minshawy_Murattal_128kbps": _lang['recite_minshawy'],
            "Abdul_Basit_Murattal_64kbps": _lang['recite_abdul_basit'],
            "Banna_32kbps": _lang['recite_banna'],
            "Mohammad_al_Tablaway_64kbps": _lang['recite_tablawy'],
            "Ali_Jaber_64kbps": _lang['recite_jaber'],
            "Alafasy_64kbps": _lang['recite_afasy'],
            "Abu_Bakr_Ash-Shaatree_64kbps": _lang['recite_shaatree'],
            "Nasser_Alqatami_128kbps": _lang['recite_qatami'],
            "tunaiji_64kbps": _lang['recite_khaleefa'],
            "Yaser_Salamah_128kbps": _lang['recite_salamah'],
            "Muhammad_Jibreel_64kbps": _lang['recite_jibreel'],
            "Ghamadi_40kbps": _lang['recite_ghamadi'],
            "Abdurrahmaan_As-Sudais_64kbps": _lang['recite_sudais'],
            "Saood_ash-Shuraym_64kbps": _lang['recite_shuraym'],
            "Maher_AlMuaiqly_64kbps": _lang['recite_maher'],
            "Ahmed_ibn_Ali_al-Ajamy_64kbps": _lang['recite_ajamy'],
            "Abdullaah_3awwaad_Al-Juhaynee_128kbps": _lang['recite_juhanee'],
            "Muhsin_Al_Qasim_192kbps": _lang['recite_muhsin'],
            "Fares_Abbad_64kbps": _lang['recite_abbad'],
            "Yasser_Ad-Dussary_128kbps": _lang['recite_yaser'],
            "Hani_Rifai_192kbps": _lang['recite_rifai'],
            "Ayman_Sowaid_64kbps": _lang['recite_ayman'] + ' - ' + _lang['recite_moalim'],
            "Hussary.teacher_64kbps": _lang['recite_husary'] + ' - ' + _lang['recite_moalim'],
            "Minshawy_Teacher_128kbps": _lang['recite_minshawy'] + ' - ' + _lang['recite_moalim'],
            "khaleefa_96kbps": _lang['recite_khaleefa'] + ' - ' + _lang['recite_moalim'],
            "Husary_Mujawwad_64kbps": _lang['recite_husary'] + ' - ' + _lang['recite_mujawwad'],
            "AbdulSamad_64kbps": _lang['recite_abdul_basit'] + ' - ' + _lang['recite_mujawwad'],
            "Minshawy_Mujawwad_64kbps": _lang['recite_minshawy'] + ' - ' + _lang['recite_mujawwad'],
            "warsh_dossary_128kbps": _lang['recite_ibrahim_dosary'] + ' - ' + _lang['recite_warsh'],
            "warsh_husary_64kbps": _lang['recite_husary'] + ' - ' + _lang['recite_warsh'],
            "warsh_yassin_64kbps": _lang['recite_yassin'] + ' - ' + _lang['recite_warsh']

        },
        "mq": { // medium audio quality
            "Husary_40kbps": _lang['recite_husary'] + ' - ' + _lang['recite_mq'],
            "Abdul_Basit_Murattal_40kbps": _lang['recite_abdul_basit'] + ' - ' + _lang['recite_mq'],
            "Minshawy_Murattal_48kbps": _lang['recite_minshawy'] + ' - ' + _lang['recite_mq'],
            "Hudhaify_32kbps": _lang['recite_hudhaify'] + ' - ' + _lang['recite_mq'],
            "Abdullah_Basfar_32kbps": _lang['recite_basfar'] + ' - ' + _lang['recite_mq'],
            "Muhammad_Ayyoub_32kbps": _lang['recite_ayyoub'] + ' - ' + _lang['recite_mq'],
            "Ibrahim_Akhdar_32kbps": _lang['recite_akhdar'] + ' - ' + _lang['recite_mq'],
            "warsh_dossary_32kbps": _lang['recite_ibrahim_dosary'] + ' - ' + _lang['recite_warsh'] + ' - ' + _lang['recite_mq']
        },
        "trans": { // voice translation
            "English_Walk": "English - Sahih International",
            "ur.khan_46kbs": "اردو - جالندربرى",
            "Bosnian_Korkut_128kbps": "Bosnian - Korkut"
        }
    };
    //
    var itemListTafssir = [
         { id: "katheer", name: _lang['tafsir_katheer'] },
		{ id: "sa3dy", name: _lang['tafsir_sa3dy'] },
        { id: "waseet", name: _lang['tafsir_waseet'] },
        { id: "baghawy", name: _lang['tafsir_ba3awy'] },
       
        { id: "qortoby", name: _lang['tafsir_kortoby'] },
        { id: "tabary", name: _lang['tafsir_tabary'] },
        //{ id: "tanweer", name: _lang['tafsir_tanweer'] },
        { id: "e3rab", name: _lang['tafsir_e3rab'] },
        { id: "tafheem", name: _lang['tafsir_tafheem'] },
        { id: "indonesian", name: _lang['tafsir_indonesian'] },
        { id: "russian", name: _lang['tafsir_russian'] }
    ]
    // setStorJ("itemsFavs", wino.stor.itemsFavs);
    var qurano = [];
    var ii = 0;
    for (var i in quraa['hq']) {
        ii++;
        qurano.push({
            ids: ii,
            id: i,
            name: quraa['hq'][i]
        });
    }
    //end qura lang data
    ///cordova Media
    //var path = "http://quran.ksu.edu.sa/ayat/mp3/Hudhaify_64kbps/001001.mp3";
    wino.next = wino.next ? wino.next : {
        page: 1,
        aya: 2,
        sura: 1,
    };

    var page_ = 3;
    //
    //
    wino.style = {
        style: "bold", //"light", "thin", "normal","regular","medium", "bold" and "black" replace to "initial"
        size: 20,
        titleSize: 20,
        bodySize: 16,
        backgroundUI: ["#e6eaed", "#000"],
        family: "serif", //"serif", "sans-serif", "condensed" and "monospace"
        colorText: ["#000", "#ccc"],
        bg: ["#fff", "#000"],
        bgclr: "#3a813a",
        //colorTitle: rgba(0, 141, 195, 1),
        //compositeTitle: [rgba(255, 255, 255, 0.85), rgba(6, 6, 6, 0.85)],
        activeNormal: !localStorage.getItem("activeNormal") ? true : false
    };
    var pageAyat = new tabris.Page({
        topLevel: true,
        background: wino.style.bgclr
    })
    //
    //pageAyat.open();
    wino.scrW_mosshaf = screen.width;// + 40;
    wino.stor.lyrPage = {
        left: 0,//-20,
        right: 0,//-20,
        top: 0,
        bottom: 0
    }
    wino.stor.lyrTab = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
    var pageLyrAyat = new tabris.Composite({
        layoutData: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        background: wino.style.bgclr
    }).appendTo(pageAyat)
    var trayContent = new tabris.Composite({
        layoutData: {
            left: 2,
            right: 2,
            top: ["#strap", 0],
            bottom: 0
        },
        background: "#fff"
    })
    //
    var tabFolderDown = new tabris.TabFolder({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
    }).appendTo(trayContent);
    var tabDown = function (title, image, seletedImage) {
        return new tabris.Tab({
            title: title, // converted to upper-case on Android
            image: {
                src: image,
                scale: 2
            },
            selectedImage: {
                src: seletedImage,
                scale: 2
            }
        }).appendTo(tabFolderDown);
    };
    //
    var textTashkil = new tabris.TextView({
/*
        id: "textTashkil", centerY: 0,

        , alignment: "center", 
        //left: 5, right: 5,
         top: 5,
         */
          id: "textKhitma", left: 10, right: 10,  
           font: wino.style.size + "px", alignment: "center",
          //  text: wino.stor.khitma.textFull,
            //markupEnabled: true,
            top: 18,
            markupEnabled: true,
     
    })
    //creat drawer
    var drawer = new tabris.Drawer({
        class: "swish_background", background: wino.style.bgclr,
    }).set("visible", false);
    //
    //creat marker
    /*
    var markerRight = new tabris.ImageView({
        id: "markerRight"
    }).appendTo(pageAyat)
    //
    var markerLeft = new tabris.ImageView({
        id: "markerLeft"
    }).appendTo(pageAyat)
    function swishMarker(stm) {
        //errz(stm)
        markerLeft.set("visible", !stm);
        markerRight.set("visible", stm);
    }
    */
    //function playMedia(path, morsso, cbNextPlay) {
    //  return new Media(path, cbNextPlay, function() {
    //    //err("err Media")
    //});
    //}

    //
    //creat txt ico link drewar
    var labelsDraw = [
        {
            text: _lang["bu_browse"],
            img: "search-3-32.png",
            ontap: function (target) {
                openPageSaerchAll("bu_browse");
                trayThis(1000);
            }
        },
        {
            text: _lang["favs"],
            img: "favs.png",
            ontap: function (target) {
                trayThis(1000);
                openPageFavs()
            }
        },
        {
            text: _lang["bu_tafaser"],
            img: "tafssir.png",
            ontap: function (target) {
                trayThis(1000);
                openPageSaerchAll("tafaser");
            }
        },
        {
            text: _lang["bu_telawa"],
            img: "palyez.png",
            ontap: function (target) {
                closeAllPage();
                //  drawer.close()
                // trayThis(-1000);
                // tabFolderDown.set("selection", tabMediaz);
                //openPageMedia()
                openPageTekrar()
            }
        },

        {
            text: _lang["alert_defTitle"],
            img: "alarm.png",
            ontap: function (target) {
                trayThis(1000);
                openPageAlarm()
            }
        },
        {
            text: _lang["khitma"],
            img: "khitma.png",
            ontap: function (target) {
                trayThis(1000);
                openPageKhitma()
            }
        }, {
            text: _lang["options"],
            img: "options.png",
            ontap: function (target) {
                trayThis(1000);
                openPageOptions()
            }
        },
        /*
         {
            text: _lang["cloud"],
            img: "cloud.png",
            ontap: function (target) {
                alertDown("يلزم مساحة، متاحة في localhost");
               // errz()
               // trayThis(1000);
               // openPageOptions()
            }
        },
        
        {
            type: "switch",
            text: _lang["setting_showstatus"],
            img: "display.png",
            ontap: function (cheked, drawer) {
                if (!cheked) {
                    //tabris.ui.set("displayMode", "normal");
                    tabris.ui.set("toolbarVisible", true);
                    tabris.ui.set("displayMode", "normal");
                    //wino.stor.displayMode = "si";
                    setStor("displayMode", "si");
                } else {
                    tabris.ui.set("toolbarVisible", false);
                    tabris.ui.set("displayMode", "fullscreen");
                    //wino.stor.displayMode = "non";
                    setStor("displayMode", "non");
                }
                setTimeout(function () {
                    pageLyrAyat.set("bottom", 0);
                    trayThis(1000)
                }, 50)
                //openPageMedia()
            }
        }*/
    ]
    //creat link drwaer
    function creatLinkDraw(labelsDraw, el) {
        return new tabris.CollectionView({
            layoutData: { left: 0, top: [el, 5], right: 0, bottom: 50 },
            // class: "swish_background", background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
            items: labelsDraw,
            background: "#f5f7f8",
            itemHeight: 50,
            initializeCell: function (cell) {
                //
                var imageView = new tabris.ImageView({
                    id: "imgDraw",
                    class: "icon",
                    layoutData: wino.direction == "ltr" ?
                        { right: 32, centerY: 0, width: 32, height: 32 } :
                        { left: 32, centerY: 0, width: 32, height: 32 },
                    tintColor:/*wino.style.activeNormal?wino.style.colorText[0]:*///wino.style.colorText[1]
                    wino.style.bgclr
                }).appendTo(cell);
                //
                var nameTextView = new tabris.TextView({
                    id: "txtDraw",
                    class: "swish_text alignmt",
                    layoutData: wino.direction == "ltr" ?
                        { centerY: 0, right: ["#imgDraw", 16] } :
                        { centerY: 0, left: ["#imgDraw", 16] },
                    font: "bold 15px",
                    alignment: "right",
                    textColor: wino.style.activeNormal ? wino.style.colorText[0] : wino.style.colorText[1]
                }).appendTo(cell);
                //
                cell.on("change:item", function (widget, value) {
                    imageView.set("image", { src: "./images/icons/" + value.img });
                    nameTextView.set("text", value.text);
                    if (value.type == "switch")
                        new tabris.Switch({
                            id: 'barSwitch',
                            selection: !wino.stor.displayMode, color: wino.style.bgclr, checked: true,
                            layoutData: wino.direction == "ltr" ? { left: 10, centerY: 0 } : { right: 10, centerY: 0 },
                        }).on('change:selection', function (widget, checked) {
                            // //lastLog("cheked")
                            value.ontap(checked, drawer)
                        }).appendTo(widget);
                });
            }
        });
    }
    //
    var imgdrawer = new tabris.ImageView({
        image: "./images/ayat_logo.png",
        top: 0,
        left: 0,
        right: 0,
        scaleMode: "fil",
        height: 120,
        //background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        class: "swish_background",
    }).appendTo(drawer);
    var getLink = creatLinkDraw(labelsDraw, imgdrawer);
    getLink.on("select", function (target, value) {
        if (value.type == "switch") {
            var switcher = drawer.find('#barSwitch')[0];
            switcher.set("selection", !switcher.get("selection"));
            return;
        }
        value.ontap(target)
        drawer.close();
        //sendAnalytics("label", value.title);
        //
    }).appendTo(drawer);
    //
    function cadrDrawer(drawer) {
        var cardrPlayer = new tabris.Composite({

            layoutData: {
                // top: [pickerTrj, 20],
                // width: "70%",
                height: 50,
                bottom: 0,
                centerX: 0,

            }
        }).appendTo(drawer);
        //
        var prevPlay = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/prev.png" },
            tintColor: "#fff",
            layoutData: {
                top: 5,
                // width: 44,
                // height: 44,
                //  bottom:5,
                left: 15,
                // centerX: 0
            }
        }).on("tap", function () {
            var res = setNextAya("prev", { aya: wino.aya, sura: wino.sura });
            //console.info(res)
            //	wino.aya = res.aya; wino.sura = res.sura;
            selectDeselect(res)
            if (wino.tmp.stop)
                getAudio();
        }).appendTo(cardrPlayer);
        //
        var stop_ = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/Stop-52.png" },
            tintColor: "#fff",
            layoutData: {
                top: 5,
                //  width: 44,
                //height: 44,
                //  bottom:5,
                left: "prev() 15",
                // centerX: 0
            }
        }).on("tap", function () {
            wino.tmp.stop = true;
            actionPlay.set({
                play: false,
                title: "play",
                image: {
                    src: "./images/icons/Play-52.png",
                    scale: 1
                }
            })
            stopPlayer();
        }).appendTo(cardrPlayer);
        //
        //
        var play_ = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/playthis.png" },
            tintColor: "#fff",
            layoutData: {
                top: 5,
                //  width: 44,
                //height: 44,
                //  bottom:5,
                left: "prev() 15",
                // centerX: 0
            }
        }).on("tap", function () {
            wino.tmp.stop = false;
            getAudio();
        }).appendTo(cardrPlayer);
        //
        var nextPlay = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/next.png" },
            tintColor: "#fff",
            layoutData: {
                top: 5,
                width: 44,
                height: 44,
                //  bottom:5,
                left: [play_, 5],
                // centerX: 0
            }
        }).on("tap", function () {
            var res = setNextAya(null, { aya: wino.aya, sura: wino.sura });
            //console.info(res)
            //	wino.aya = res.aya; wino.sura = res.sura;
            selectDeselect(res)
            if (wino.tmp.stop)
                getAudio();
        }).appendTo(cardrPlayer);
    }
    cadrDrawer(drawer)
    // drawer.apply(style_.drawer);
    //end add to drawer
    //________________end drawer
    //function aplayr
    var durationStopped = false;
    function stopPlayer() {

        globalPlay = 0;
        p_paused = 0;
        wino.media.onComplete = function () { };
        wino.media.stop();
    }

    wino.media = new fnJson.APlayer(); // _ap1 is the instance object of the audio player class
    wino.media.onComplete = function () { }
    ///end aplay
    //var _ = require('lodash');
    var _hlMeta = fnJson._hlMeta;
    ////
    //
    function tabFolder_() {
        var tabFolder_ = new tabris.TabFolder({
            background: "#fff",
            left: 0,// wino.stor.lyrPage.left,
            top: 0,//wino.stor.lyrPage.top,
            bottom: 2,
            right: 0,//wino.stor.lyrPage.right,
            // centerX: 0,
            // centerY: 0,
            //height: screen.height-60,
            //   centerY: 0,
            textColor: "#234",
            // markupEnabled: true,
            paging: true,
            tabBarLocation: "hidden"
        }).on("change:selection", function (widget, tab_) {
            if ((parseInt(tab_.get("page"))) === 602) {
                errz("Stop" + parseInt(tab_.get("page")));
                return;
            }
            if (wino.lyr.dis)
                setTimeout(function () {
                    //   //lastLog("onchange select=", wino.lyr.dis)
                    onChangeSelectTab(widget, tab_);
                }, 500)
        }).on("tap", function () {
            //errz("tabz")
        })
            .appendTo(pageLyrAyat);
        return tabFolder_;
    }
    var tabFolder = new tabFolder_()
    //Ayat 604
    //link http://quran.ksu.edu.sa/png_big/604.png to 1.png
    //
    wino.layser = [];
    wino.lyr = {
        // status: wino.status,
        stats: wino.status,
        firstp: wino.firstp,
        dis: false,
        min: min_,
        btw: 3,
        start: wino.page - 3,
        end: (wino.page + min_) - 2,
        loop: function () {
            if (this.start < 1) {
                this.start = 1;
                this.end = min_;
            }
            if (this.end > 604) {
                this.end = 604;
                this.start = (604 - min_);
            }
            //indicatorPageAyat.set("visible", true);
            wino.lyr.dis = false;
            //err(this.start, 'end ', this.end);
            // indicatorPageAyat.set("visible", true);
            for (var i = this.end; i >= this.start; i--) {
                //console.info(this, i)
                //if(i==604)break;
                createTab(i);
            }
        }
    }
    //wino.lyr.start = wino.lyr.end //- wino.lyr.btw
    //wino.lyr.end = wino.lyr.start + wino.lyr.min
    wino.status = null;
    wino.lyr.loop();
    //pageAyat.open();
    var fistTab;
    function createTab(i) {
        // pageAyat.set({
        //   "title": " الصفحة رقم " + i
        //});
        //wino.tab = [];
        var tab = new tabris.Tab({
            id: "pageId_" + i,
            class: "pageDesp",
            page: i
        }).appendTo(tabFolder);
        if (i == wino.lyr.end) fistTab = tab;
        //wino.tab.push({page:i,tab:tab});
        wino.tab[i] = tab
        //scrollview

        var scrollView = new tabris.ScrollView({
            page: i, //background:"#f4c",
            id: "scrlPage" + i,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            class: "swish_background"
        }).appendTo(tab);
        //
        //image shdows
        new tabris.ImageView({
            id: "img_" + i,
            // left: 0,
            width: screen.width,
            height: screen.height,
            //top: 0,
            //bottom: 0,
            //right: 0,
            //  centerX: 0, centerY: 0,
           // image: "./images/" + wino.currMosshaf + "/" + i + ".png",
		   image: "http://quran.ksu.edu.sa/png_big/" + i + ".png",
            //http://quran.ksu.edu.sa/png_big/
            scaleMode: "fill",
        }).appendTo(scrollView);
        var shdowPage = { src: (i % 2) ? "./images/icons/slideShowR.png" : "./images/icons/slideShowL_.png" }
		
        new tabris.ImageView({
            //id: "img_" + i,
            right: 3, left: 3,
            top: 7,
            //layoutData:(i % 2) ? {right: 0,bottom: 0}:{left: 0,bottom: 0},
            //  centerX: 0, centerY: 0,
            image:(i==1 || i==2)?"":shdowPage,
            //http://quran.ksu.edu.sa/png_big/
             scaleMode: "fill",
        })//.appendTo(scrollView);
		

        cbAmakenPage(tab, scrollView)
        if (wino.lyr.start === i)
            setTimeout(function () {
                //her final loops
                //  if(wino.cbloops)wino.cbloops()
                // indicatorPageAyat.set("visible", false);
                // wino.page = i
                selectDeselect();
                wino.autonext = false;
                ////lastLog("page=" + wino.page, "i==" + i)
                //  swishMarker(((parseInt(wino.page) + 1) % 2) ? true : false);
                wino.lyr.dis = true;
                clearIndic();
                if (!wino.loading_) {
                    wino.loading_ = true;
                    ////lastLog("disploading")
                    if (!wino.firstp) {
                        //      openPageFirst();
                        wino.firstp = 0;
                        // trayThis(-1000);
                        // setTimeout(function(){ selectDeselect();},1000)
                    }
                    //  else {
                    pageAyat.open();
                    tabris.ui.set("background", wino.style.bgclr);//background page color
                    loading_.dispose();
                    setTimeout(function () {
                        if (wino.stor.displayMode) {
                            tabris.ui.set("displayMode", "normal");
                            tabris.ui.set("toolbarVisible", true);
                        }
                    }, 100);
                    drawer.set("visible", true);
                    // }
                }
                setTimeout(function () {
                    //  //lastLog("tme out scroll page =", wino.page)
                    scrolling(wino.tafssir[wino.page]);
                    clearIndic();
                    if (wino.tmp.tarajem) {
                        tabFolderDown.set("selection", tafssir_);
                        wino.tmp.tarajem = false
                    }
                }, 100);

            }, 100);
        ////errz(wino.lyr.start, "===", i)
        //		
        if (wino.lyr.stats == "prev") {
            // //lastLog("this 0")
            if (i == wino.lyr.end - wino.lyr.btw) {
                tabFolder.set("selection", tab);
                wino.lyr.dis = true;
                //	swishMarker(!(wino.page % 2) ? true : false);
                //wino.Page = i+wino.lyr.btw;
            }
        }
        if (wino.lyr.stats == "next") {
            // //lastLog("this 1")
            if (i == (wino.lyr.start + wino.lyr.btw)) {
                tabFolder.set("selection", tab);
                //	swishMarker(!(wino.page % 2) ? true : false);
            }
            if (wino.tmp.page == i) {
                // wino.tmp.page
                tabFolder.set("selection", tab);
                wino.tmp.page = false
            }
        }
        if (wino.lyr.stats == "this") {
            // //lastLog("this 2")
            if (wino.page == i) {
                tabFolder.set("selection", tab);
                wino.lyr.stats = "";
            }
        }
        if (wino.lyr.firstp == i) {
            //lastLog("this 3")
            // indicatorPageAyat.set("visible", false);
            wino.lyr.dis = true;;
            tabFolder.set("selection", tab);
            wino.lyr.firstp = 0;
        }
        //if(wino.lyr.page === i)tabFolder.set("selection", tab);

    }
    //D
    function creatMultiTab(obj) {
        //indicatorPageAyat.set("visible", true);
        var indic = new indicator(pageAyat).set("visible", false);
        wino.lyr.stats = obj;
        if (obj == "next" && !(wino.lyr.end >= 604)) {
            indic.set("visible", true);
            errz("7bsat hna")
            wino.lyr.dis = false;
            //return
            wino.lyr.start = wino.lyr.end - wino.lyr.btw
            wino.lyr.end = wino.lyr.start + wino.lyr.min - wino.lyr.btw;
            tabFolder.dispose();
            //err("all tab dispose")
            tabFolder = new tabFolder_();
            wino.lyr.loop();
        }

        if (obj == "prev") {
            indic.set("visible", true);
            wino.lyr.end = wino.lyr.start + wino.lyr.btw
            wino.lyr.start = wino.lyr.start - wino.lyr.min;
            wino.lyr.dis = false;
            tabFolder.dispose();
            //err("all tab dispose")
            tabFolder = new tabFolder_();
            wino.lyr.loop();
        }
        //pageAyat.find(".pageDesp").forEach(function(widget){
        /*
        return ;///
        //
        tabFolder.set("visible", false);
        indicator.set("visible", true);
        tabFolder.set("selection", fistTab);
        setTimeout(function() {
        indicator.set("visible", false);
        
        tabFolder.set("visible", true);
        }, 500)
        */
    }
    /*
    var tab_ = new tabris.Tab().appendTo(tabFolder);
    var plaket = new tabris.Composite({
    // id: "btnIcoScroll", opacity: 0.85,
    background: "#000",
    layoutData: {
    top: 1,
    left: 1,
    bottom: 1,
    right: 1
    }
    }).on("tap", function() {
    //errz("tabz")
    }).appendTo(tab_)
    */
    //
    //var lastjson = amakenArr;
    /*
    getJSON(amakenLink + page).then(function(json) {
    lastjson = json;
    cbAmakenPage(json);
    //logz("json result 2", json)
    });
    */
    //cba amaken
    //var winotafssir = [];
    var tafssir;
    function cbAmakenPage(tab_, scrollView) {
        var page = tab_.get("page");
        ////err("page =" + page)
        // var amaken = amaken_[page]
        var plaket = scrollView;
        var amaken = amakenArr[page]; //[page];
        //wino.tafssir[page]
        tafssir = tafssirArr[page];
        ////logz("tafssir =======>",wino.tafssir[page])
        //  //err("amaken=" + amaken)
        //  var plaket = "";
        hilite_id = "_winoId_"
        //logz("FN drawHilites")
        if (wino.currMosshaf == 'tajweed') { }
        //  var amaken = json;//hilites[wino.currMosshaf][page];
        // //logz("amaken", amaken)
        var sura, aya, top, left, prev_top, prev_left, mgwidth, mgheight, twidth, ofwidth, ofheight, fasel_sura, page_top, page_sura_top, width, height, diff, hl_id, hilite_id, b_top = 0,
            b_left = 0;
        height = _hlMeta[wino.currMosshaf]['height'];
        mgwidth = _hlMeta[wino.currMosshaf]['mgwidth'];
        twidth = _hlMeta[wino.currMosshaf]['twidth'];
        ofwidth = _hlMeta[wino.currMosshaf]['ofwidth'];
        ofheight = _hlMeta[wino.currMosshaf]['ofheight'];
        fasel_sura = _hlMeta[wino.currMosshaf]['fasel_sura'];
        page_top = _hlMeta[wino.currMosshaf]['page_top'];
        page_sura_top = _hlMeta[wino.currMosshaf]['page_sura_top'];
        //  //logz("page_sura_top", page_sura_top);
        if (page == 1 || page == 2) {
            height = _hlMeta[wino.currMosshaf]['fp_height'];
            mgwidth = _hlMeta[wino.currMosshaf]['fp_mgwidth'];
            twidth = _hlMeta[wino.currMosshaf]['fp_twidth'];
            ofwidth = _hlMeta[wino.currMosshaf]['fp_ofwidth'];
            ofheight = _hlMeta[wino.currMosshaf]['fp_ofheight'];
        }
        prev_top = null;
        prev_left = null;
        var count = 1;
        var winotafssir = [];
        for (var i in amaken) {
            // //logz("play forEach")
            //    _.forEach(amaken, function(value,i) {
            //  //logz("forEach" + i)
            //
            sura = i.split('_')[0];
            aya = i.split('_')[1];
            top = amaken[sura + "_" + aya][1] - ofheight;
            left = amaken[sura + "_" + aya][0] - ofwidth;
            var wino_ = {
                aya: aya,
                sura: sura,
                page: page
            }

            //  //logz('coneten = ',wino.tafssir[page][sura + "_" + aya],sura + "_" + aya)
            //if (itm[1] === sura && itm[2] === aya){
            winotafssir.push({
                sura: sura, //[sura + "_" + aya][1],
                aya: aya, //[sura + "_" + aya][2],
                content: tafssir[sura + "_" + aya],
                class: "tfs_" + aya + "_" + sura + "_" + page,
                classTab: "slc_" + aya + "_" + sura + "_" + page,
            })
            //   //logz('foreach tafsir, _____',winotafssir,"")
            //  //logz("left =",left,"___",
            //  "top =",top,"___|||||")
            if (wino.currMosshaf == "hafs" && (page == 1 || page == 2)) { }
            width = 0;
            hl_id = sura + '_' + aya + '__' + hilite_id;
            if (count == 1) {
                prev_left = twidth;
                if (page == 1 || page == 2) {
                    prev_top = 270;
                }
                else {
                    if (aya == 1) {
                        prev_top = page_sura_top;
                    }
                    else {
                        prev_top = page_top;
                    }
                }
            }
            else {
                if (aya == 1) {
                    prev_top += fasel_sura;
                    prev_left = twidth;
                }
            }
            diff = (top - prev_top);
            if (diff > (height * 1.6)) {
                hl_draw(hl_id + '_1', prev_top, mgwidth, prev_left - mgwidth, height, b_top, b_left, plaket, wino_);
                hl_draw(hl_id + '_2', top, left, (twidth - left), height, b_top, b_left, plaket, wino_);
                hl_draw(hl_id + '_3', (prev_top + height), mgwidth, (twidth - mgwidth), (diff - height), b_top, b_left, plaket, wino_);
            }
            else if (diff > (height * 0.6)) {
                hl_draw(hl_id + '_1', prev_top, mgwidth, (prev_left - mgwidth), height, b_top, b_left, plaket, wino_);
                hl_draw(hl_id + '_2', top, left, (twidth - left), height, b_top, b_left, plaket, wino_);
            }
            else {
                width = prev_left - left;
                hl_draw(hl_id + '_1', top, left, width, height, b_top, b_left, plaket, wino_);
            }
            count++;
            prev_top = top;
            prev_left = left;
        }
        wino.tafssir[page] = winotafssir
        //    );//forlodash
    }
    //

    function hl_draw(id, top, left, width, height, b_top, b_left, plaket, wino_) {
        //  "agr b_top =",b_top,"_______________________");
        var b_top = 0;
        var b_left = 0;
        var top = b_top + top;
        var left = b_left + left;
        var width = ((wino.scrW_mosshaf / 456) * width);
        var height = ((wino.scrW_mosshaf / 456) * height);
        var left = ((wino.scrW_mosshaf / 456) * left);
        var top = ((wino.scrW_mosshaf / 456) * top);
        // //logz("width =", width, "___",
        //   "left =", left, "___",
        // "top =", top, "___");
        ///creeat composite
        new tabris.Composite({
            wino_: wino_,
            class: "slc_" + wino_.aya + "_" + wino_.sura + "_" + wino_.page,
            id: id,
            classTafssir: "tfs_" + wino_.aya + "_" + wino_.sura + "_" + wino_.page,
           // background: "#4caf50",
            opacity: 0.1,
            background: "#fff",
            visible:true,
            layoutData: {
                top: top,
                left: left,
                height: height,
                width: width
            }
        }).on("tap", function (widget) {
           // onTapAyat(wino_)

                wino.autostart = true;
                setTimeout(function () { wino.autostart = false }, 1000);
                onLongpressAyat(widget);

        }).on("longpress", function (widget, gesture) {
           if (gesture.state === "start") {
                //errz("longpress")
                wino.autostart = true;
                setTimeout(function () { wino.autostart = false }, 1000);
                onLongpressAyat(widget);
                // onTafssir(widget)
          }
        }).appendTo(plaket);
    }
    //
    ///***wino tabris
    //
    function onChangeSelectTab(widget, tab_) {
        //if(wino.lyr.end >= 604)return;
        // console.log("change select")
        //if (parseInt(tab_.get("page")) >= 604) return
        //   cbAmakenPage(tab_)
        if (wino.iPage) {
            // swishMarker((wino.iPage % 2) ? true : false);
            wino.iPage = false;
        } else {
            // swishMarker((wino.page % 2) ? true : false);
        }
        wino.page = parseInt(tab_.get("page"));
        // var imgBook = (wino.page % 2) ? "./images/icons/book_right" : "./images/icons/book_left.png"
        pageAyat.set(
            "title", QuranData.Sura[wino.sura][lngS] + ": " + wino.aya// + " | صفحة " + tab_.get("page")
        )
        ////errz(imgBook)
        //actionBook.set("./images", {src: imgBook});
        //lastLog("page", wino.page, "__end =", wino.lyr.end, "start=" + wino.lyr.start)
        //
        if (wino.page == wino.lyr.end && !wino.autonext) {
            // widget.set("selection", fistTab)
            if (wino.page != 1) {
                //
                setTimeout(function () {
                    creatMultiTab("next")
                }, 200)
            }
        }
        if (wino.page == wino.lyr.start) {
            // widget.set("selection", fistTab)
            //   var indic = new indicator(pageAyat);
            if (wino.page != 1) {
                // indic.set("visible", true);
                setTimeout(function () {
                    // new indicator(pageAyat).set("visible", true);
                    creatMultiTab("prev")
                }, 200)
            }
        }
        pageAyat.set(
            "title", QuranData.Sura[wino.sura][lngS] + ": " + wino.aya
            //"title", "سورة " + QuranData.Sura[wino.sura][lngS] + " | الأية " + wino.aya + " | صفحة " + tab_.get("page")
        )
        setTimeout(function () {
            //lastLog("tme out scroll page =", wino.page)
            scrolling(wino.tafssir[wino.page]);
        }, 20);
    }
    //function onlongpress ayat//function onlongpress ayat
    function onTafssir(widget) {
        //clear setTimeou tap ayat
        vibrate_(10);
        var wino_ = widget.get("wino_");
        //     currAya = wino_.sura + "_" + wino_.aya; //this.currAya || def_aya;
        //   //logz("currAya", currAya)
        //

        getTafsir({ auther: "katheer", aya: wino_.aya, sura: wino_.sura }, callback_)
        /////// openTafssir({ aya: wino_.aya, sura: wino_.sura });
        ////logz(reqTafssir.rows[(tafsi[0][ids] - 1)]);
    }
    //##extention getTassirAya
    var ids = 0,
        suras = 1,
        ayas = 2,
        texts = 3;
    ///
    function getTafssirByPageAya(p) {
        //logz(p)
        return ayatJson.filter(function (itm) {
            return (d.sura === itm[1] && d.aya === itm[2]) ? true : false;
        })[0];
        //
    }
    ///
    function getTassirAya(d) {
        // if (!reqTafssir) reqTafssir = require("./tabary.json");
        // return reqTafssir.rows.filter(function (itm) {
        //   return (d.sura === itm[suras] && d.aya === itm[ayas]) ? true : false;
        // })
    }
    // ontapayat fuN
    function searchTafsir(d) {
        // return reqTafssir.rows.filter(function (itm) {
        //   return (itm[texts].toLowerCase().indexOf(d.quary.toLowerCase()) > -1) ? true : false;
        // })[0]
    }
    //
    //function ontap aya or tafsir
    function onTapAyat(wino_) {
        //animateOutReq(btnIcoScroll);
        vibrate_(2);
        timeoutTapAya();
        // var wino_ = widget.get("wino_");
        wino.tmp.classAya = "slc_" + wino_.aya + "_" + wino_.sura + "_" + wino_.page;
        wino.tmp.classTfs = "tfs_" + wino_.aya + "_" + wino_.sura + "_" + wino_.page;
        var noRep = true;
        if (wino.tmp.classAya) { //deslect old class select
            pageAyat.find("." + wino.tmp.classAya).forEach(function (widget) {
                if (noRep) {
                    noRep = false;
                    var scrollPage = pageAyat.find("#scrlPage" + wino_.page)[0];
                    ////logz("top contr=" + topz);
                    scrollPage.set("scrollY", widget.get("bounds").top);
                }
                widget.set({
                    "winoTmp": {
                        background: widget.get("background"),
                        opacity: widget.get("opacity")
                    }
                })
                widget.set({
                    opacity: 0.3,
                    background: "#ff9900",
                    elevation: 8,
                    cornerRadius: 10
                });
            });

        }
        //oldtfs class rm
        if (wino.tmp.classTfs) { //deslect old class select
            // pageAyat.find("." + wino.oldTfs).forEach(function(widget) {
            var widgetFn = function () {
                var widget__ = pageAyat.find("." + wino.tmp.classTfs)[0];
                if (widget__) {
                    widget__.set({ "winoTmp": { background: widget__.get("background") } })
                    widget__.set({
                        background: "#ffa0a0"//widget__.get("actif") ? bgclr[0] : bgclr[1],
                    });
                    var topz = widget__.get("bounds").top
                    ////logz("top contr=" + topz);
                    slide.set("scrollY", topz);
                    // wino.classTfs = wino_.classTab;
                } else {
                    //lastLog("reload")
                    setTimeout(function () { widgetFn() }, 1000)
                }
            }
            widgetFn()

        }
        wino.tmp.timeOutTap = setTimeout(function () {
            ///
            timeoutTapAya();
        }, 1000)
        function timeoutTapAya() {
            //scroll.set("scrollY", 0);
            if (wino.tmp.classAya) { //deslect old class select
                var noRep_ = true;
                pageAyat.find("." + wino.tmp.classAya).forEach(function (widget) {
                    if (noRep_ && widget) {
                        //		noRep_ = false;
                        var wid = widget.get("winoTmp");
                        widget.set({
                            opacity: wid.opacity,
                            background: wid.background,
                        });
                    }
                });
                wino.tmp.classAya = null
            }
            //oldtfs class rm
            if (wino.tmp.classTfs) { //deslect old class select
                // pageAyat.find("." + wino.oldTfs).forEach(function(widget) {
                var widget__ = pageAyat.find("." + wino.tmp.classTfs)[0];
                if (widget__) {
                    var wid_ = widget__.get("winoTmp");
                    widget__.set({
                        background: wid_.background
                    });
                    wino.tmp.classTfs = null;
                }
                // wino.classTfs = wino_.classTab;
            }
        }
    }
    //
    //
    function onLongpressAyat(widget) {
        //end tray
        var wino_ = widget.get("wino_");
        currAya = wino_.sura + "_" + wino_.aya; //this.currAya || def_aya;

        wino.sura = wino_.sura;
        wino.aya = wino_.aya;
        wino.oldSlc = wino.class ? wino.class : null; // widget.get("class");
        wino.page = wino_.page;
        wino.juz = suraJuz(wino.sura, wino.aya);
        wino.hizb = suraHizb(wino.sura, wino.aya) % 8 || 8;
        //
        wino.oldTfs = wino.classTfs ? wino.classTfs : null;
        wino.class = "slc_" + wino.aya + "_" + wino.sura + "_" + wino.page;
        wino.classTfs = "tfs_" + wino.aya + "_" + wino.sura + "_" + wino.page;
        var opt_ = {
            oldSlc: wino.oldSlc,
            class: "slc_" + wino.aya + "_" + wino.sura + "_" + wino.page,
            page: wino.page
        }
        saveStorJ();
        selectDeselect();
        //
        setTextTashkel();
        animateInReq(btnIcoCompo);
        wino.back = function () {
            animateOutReq(btnIcoCompo);
        }
        //
        //getAudio();
        // //err("setNextAya", setNextAya(true))
        ////errz(wino_.aya, wino_.sura, wino_.page)
        //  //errz("id =",widget.get("id"),"___",
        //  "left =",left,"___",
        //  "top =",top,"___");

    }
    ///end wino tabris
    function setNextAya(ret, obj) {
        if (ret == "prev") {
            var sura = parseInt(obj.sura); //parseInt(currAya.split('_')[0]);
            var aya = parseInt(obj.aya); //parseInt(currAya.split('_')[1]);
            var sura_ayat = QuranData.Sura[sura][1];
            //   console.log("sura ayat QuranData.Sura[sura][1];= " + sura_ayat);
            if (--aya > sura_ayat) {
                sura = sura - 1;
                aya = 1;
            }
            if (sura > 114) {
                sura = 1;
                aya = 1;
            }
            if (sura < 1) {
                sura = 1;
                aya = 1;
            }
            if (aya == 0) {
                sura = sura - 1;
                aya = QuranData.Sura[sura][1]
            }
            if (sura == 0) {
                sura = 1;
                aya = 1;//QuranData.Sura[sura][1]
            }
            return {
                sura: sura,
                aya: aya,
                class: "slc_" + aya + "_" + sura + "_" + suraSafha(sura, aya),
                classTfs: "tfs_" + aya + "_" + sura + "_" + suraSafha(sura, aya),
                page: suraSafha(sura, aya),
                //  next: wino.next,
                oldSlc: wino.class,
                oldTfs: wino.classTfs,
            }
        }
        if (obj) {
            var sura = parseInt(obj.sura); //parseInt(currAya.split('_')[0]);
            var aya = parseInt(obj.aya); //parseInt(currAya.split('_')[1]);
            var sura_ayat = QuranData.Sura[sura][1];
            //  console.log("sura ayat QuranData.Sura[sura][1];= " + sura_ayat);
            if (++aya > sura_ayat) {
                sura = sura + 1;
                aya = 1;
            }
            if (sura > 114) {
                sura = 1;
                aya = 1;
            }
            return {
                sura: sura,
                aya: aya,
                class: "slc_" + aya + "_" + sura + "_" + suraSafha(sura, aya),
                classTfs: "tfs_" + aya + "_" + sura + "_" + suraSafha(sura, aya),
                page: suraSafha(sura, aya),
                //  next: wino.next,
                oldSlc: wino.class,
                oldTfs: wino.classTfs,
            }
        }
        var sura = parseInt(wino.sura); //parseInt(currAya.split('_')[0]);
        var aya = parseInt(wino.aya); //parseInt(currAya.split('_')[1]);
        var sura_ayat = QuranData.Sura[sura][1];
        //errz("sura ayat QuranData.Sura[sura][1];= " + sura_ayat);
        if (++aya > QuranData.Sura[sura][1]) {
            sura = sura + 1;
            aya = 1;
        }
        if (sura > 114) {
            sura = 1;
            aya = 1;
        }

        wino.oldSlc = wino.class;
        wino.oldTfs = wino.classTfs;
        wino.class = "slc_" + aya + "_" + sura + "_" + suraSafha(sura, aya)
        wino.classTfs = "tfs_" + aya + "_" + sura + "_" + suraSafha(sura, aya)
        wino.next = {
            page: suraSafha(sura, aya),
            aya: aya,
            sura: sura,
            oldSlc: wino.oldSlc,
            class: wino.class,
            classTfs: wino.classTfs,
            oldTfs: wino.oldTfs,
        };
        //  log("next wino", wino.next)
        if (ret != 'undefined') return {
            sura: sura,
            aya: aya,
            class: wino.class,
            page: wino.page,
            next: wino.next,
            oldSlc: wino.oldSlc,
            classTfs: wino.classTfs,
            oldTfs: wino.oldTfs,
        }
        // setCurrAya(sura, aya);
        // if (cb) cb();
    }
    //select deselect
    function selectDeselect(wino_) {
        //clrar wino.tmp.timoutoutTap ayat
        if (wino_) {
            wino.oldSlc = wino_.oldSlc;
            wino.class = wino_.class;
            wino.page = wino_.page;
            wino.classTfs = wino_.classTfs;
            wino.oldTfs = wino_.oldTfs;
            wino.aya = wino_.aya;
            wino.sura = wino_.sura;
            // wino.next.page = Math.floor(parseInt(wino_.page) + 1)
            wino.juz = suraJuz(wino_.sura, wino_.aya);
            wino.hizb = suraHizb(wino_.sura, wino_.aya) % 8 || 8;
        }
        //

        //
        pageAyat.set(
            //"title", _lang["sura"] + " " + QuranData.Sura[wino.sura][lngS] + " " + _lang["aya"] + " " + wino.aya + " " + _lang["page"] + " " + wino.page
            "title", QuranData.Sura[wino.sura][lngS] + ": " + wino.aya
        )
        //
        // //errz("selectdeselect page = " + wino.page);
        //    //errz("selectdeselect aya = " + wino.aya);
        //  //errz("selectdeselect class = " + wino.class);
        //   //errz("selectdeselect oldSlc = " + wino.oldSlc);
        //
        //log(wino.oldSlc, wino.class, wino.page)
        if (wino.oldSlc) { //deslect old class select
            pageAyat.find("." + wino.oldSlc).forEach(function (widget) {
                widget.set({
                    opacity: 0.1,
                    background: "#fff",
                });
            });
        }
        //oldtfs class rm
        if (wino.oldTfs) { //deslect old class select
            // pageAyat.find("." + wino.oldTfs).forEach(function(widget) {
            var widget__ = pageAyat.find("." + wino.oldTfs)[0];
            if (widget__) {
                widget__.set({
                    background: widget__.get("actif") ? bgclr[0] : bgclr[1],
                    //       cornerRadius: 10,
                    //     elevation: 8,
                });
            }
            // wino.classTfs = wino_.classTab;
        }
        var noRep = true;
        //errz("_##___" + wino.class)
        pageAyat.find("." + wino.class).forEach(function (widget) {
            //select all class tap select
            //var nextp = setNextAya(null,{aya:widget.get("wino_").aya,sura:widget.get("wino_").sura})
            if (/* wino.page != widget.get("wino_").page&&*/ noRep) { // if !page auto change
                //errz('next page== ' + wino.page, "page this tab =" + widget.get("wino_").page)
                noRep = false
                // //err("here select this tab=" +pageAyat.find(".pageDesp" + widget.get("wino_").page)[0])
                if (wino.tmp.page) {
                    //     console.log('thisssss tab=' + wino.tmp.page)
                    tabFolder.set("selection", wino.tab[wino.tmp.page]);
                    wino.tmp.page = false;
                };
                if (widget.get("wino_").page != wino.page &&
                    !(wino.page < wino.lyr.end && wino.page > wino.lyr.start) /*&& wino.lyr.stats == "prev"*/) {
                    // console.log('her secte ______ tab');
                    tabFolder.set("selection", wino.tab[widget.get("wino_").page]);
                }
                //console.log(wino.page, widget.get("wino_").page)
                if (!wino.autostart) {
                    tabFolder.set("selection", wino.tab[wino.page]);
                    // console.log("hna");
                }
                // //err_(" here __selection", wino.tab[widget.get("wino_").page]);
                ////err(wino.tab["page"][widget.get("wino_").page])
                //);
                wino.oldPage = widget.get("wino_").page;
                //  //err("___page wino.page = " + wino.page);
                //errz("wino.page = " + wino.page, "wino_tab.pag =" + widget.get("wino_").page);
                var scrollPage = pageAyat.find("#scrlPage" + widget.get("wino_").page)[0];
                ////logz("top contr=" + topz);
                scrollPage.set("scrollY", widget.get("bounds").top);
                wino.page = widget.get("wino_").page;
            }
            widget.set({
                background: "#4caf50",
                opacity: 0.3,
                cornerRadius: 10,
                elevation: 8,
            });
        });
        //  select tafssir scrool;
        //pageAyat.find("." + wino.classTfs).forEach(function(widget) {
        var widget_ = pageAyat.find("." + wino.classTfs)[0]
        if (widget_) {
            widget_.set({
                background: "#4caf50"
            });
            var topz = widget_.get("bounds").top
            ////logz("top contr=" + topz);
            slide.set("scrollY", topz);
            wino.oldTfs = widget_.get("class");
            ////errz("wino.OldTfs = " + wino.oldTfs)
            ////errz("wino.classTfs = " + wino.classTfs)
            //getAudio()
        }
        else {
            //logz("no pageAyat.find(wino.classTfs)[0]")
        }
        setTextTashkel();

        if (wino.autonext) {
            //logz("yes auti")
            wino.autonex = false
            getAudio(wino.next);
        }
    }
    //___
    function suraSafha(sura, aya) {
        var n = QuranData[wino.page_key].length;
        if (typeof aya == 'undefined') {
            var aya = 1;
        }
        else {
            var aya = aya;
        }
        for (var i = 1; i < n; i++) {
            if (QuranData[wino.page_key][i][0] > sura || (QuranData[wino.page_key][i][0] == sura && QuranData[wino.page_key][i][1] >= aya)) {
                if (QuranData[wino.page_key][i][0] == sura && QuranData[wino.page_key][i][1] == aya) {
                    return i;
                }
                return i - 1;
            }
        }
    }
    //
    ///Helpers
    function setTextTashkel(){

        wino.tmp.txtTash = getAyatBySuraAya({ aya: parseInt(wino.aya), sura: parseInt(wino.sura) })[3];
        var txtTash = "<b>" + wino.tmp.txtTash
            + "</b><br/>...<br/><i>" + _lang["sura_s"] + ": " + QuranData.Sura[wino.sura][lngS] + ", " +
            _lang["aya"] + " " + wino.aya + ", " + _lang["page"] + ": " + wino.page + "<br/>" +
            _lang["hizb"] + ": " + wino.hizb + ", " + _lang["juz"] + ": " + wino.juz + "</i>"
        //
        textTashkil.set("text", txtTash)

    }
    function sendAnalytics(category, action) {
        if (navigator.analytics) analytics_.sendEvent(category, action);
    }
    //
    function range(start, end) {
        var foo = [];
        for (var i = start; i <= end; i++) {
            foo.push(i);
        }
        return foo;
    }
    //
    function suraArr(a) {
        var i = a ? 3 : 1;
        var min = a ? a : 114;
        var surLoop = [];
        for (i; i <= min; i++) {
            //	if(!a)
            surLoop.push({ id: i, name: QuranData.Sura[i][lngS] });
            //	else surLoop.push({ id: i});
        }
        //	//console.info(surLoop[1])
        return surLoop;
    }
    //
    function alertDown(text) {
        if (window.plugins.toast)
            window.plugins.toast.showLongBottom(text)
    }
    function copy(text) {
        cordova.plugins.clipboard.copy(text);
        alertDown(_lang["copy_done"])
    }
    function getJSON(url) {
        return fetch(url).then(function (response) {
            return response.json();
        });
    }
    //save all stor 
    function saveStorJ(cb) {
        setStorJ("ayatStor", {
            aya: wino.aya,
            sura: wino.sura,
            page: wino.page,
            oldSlc: wino.oldSlc,
            oldTfs: wino.oldTfs,
            classTfs: wino.classTfs,
            class: wino.class,
            firstp: cb ? true : false,
            start: wino.lyr.start,
            end: wino.lyr.end,
            status: wino.lyr.stats,
            currMosshaf: wino.currMosshaf,
            lang: wino.lang,
            page_key: wino.page_key,
            //  update:wino.update,
        });
        // console.log("ok save Stor");
    }
    // function reload this aya 
    function reloadThisAya() {

        wino.lyr.start = wino.page - wino.lyr.btw;
        wino.lyr.end = (wino.page + min_) - wino.lyr.btw;
        wino.tmp.page = wino.page;
        wino.lyr.stats = "next"
        wino.lyr.loop();
    }
    //play reapaet
    wino.rep = [];
    fnRep = function () {
        if (!wino.rep.actif) return false;
        //
        if (((wino.sura >= wino.rep.endSura) && (wino.aya > wino.rep.endAya))
            || ((wino.sura <= wino.rep.playSura) && (wino.aya < wino.rep.playAya))
        ) {
            //   console.log("you out read Reapet Aya");

            alertDown(_lang["deactivateRepeat"]);
            wino.rep.actif = false;
            return false
        }
        //
        if (!wino.fnRep) {
            wino.fnRep = wino.rep.fnRep;
            return false;
        }
        if (wino.fnRep)
            return wino.fnRep--;
    }
    wino.rep.fnRep = 2
    wino.fnRep = wino.rep.fnRep;
    wino.rep.playSura = 1;
    wino.rep.PlayAya = 1;
    //
    wino.rep.endSura = 2;
    wino.rep.endAya = 3;
    wino.rep.actif = false;
    /////////////end repeat
    //clear Indicator pageAyat
    function clearIndic() {
        pageAyat.find("ActivityIndicator").forEach(function (widget) {
            widget.dispose();
        });
    }
    //
    //helper oldAyat
    //var base_mp3url =
    //wino.media = [];
    //wino.media = playMedia("http://quran.ksu.edu.sa/ayat/mp3/Hudhaify_64kbps/001001.mp",001001)
    //wino.media.play();
    /*wino.media = {
    release: function() {
    //err("relese first no repeat")
    },
    stop: function() {
    //err("relese first no repeat")
    }
    }
    */
    //=======================tafssir play
    //open page
    var pageTafssir = new tabris.Page();
    wino.idTafs = 1;
    var title_tfs = new tabris.TextView();
    function openTafssir(data) {
        //   //errz("id= " + tafsi[0][ids], "tafss= " + tafsi[0][texts].substr(0, 100))
        // //logz('###############')

        wino.idTafs = parseInt(data.id) //- 1;
        pageTafssir.dispose();
        pageTafssir = new tabris.Page({
            background: "#fff",
            id: "pagino",
            // title: _lang["page"] + "(" + suraSafha(data.sura, data.aya) + ")[" + _lang["sura"] + " " + QuranData.Sura[data.sura][lngS] + " - " + _lang["aya"] + " " + data.aya + "] ",
            topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).on("appear", function () {
            actionSearch.set("visible", false);
            actionMin.set("visible", true);
            actionPlus.set("visible", true);
        }).on("disappear", function () {
            actionSearch.set("visible", true);
            actionMin.set("visible", false);
            actionPlus.set("visible", false);
        }).open();
        pageTafssir.set("title", QuranData.Sura[data.sura][lngS] + ": " + data.aya);
        //
        //
        //
        var scrollView = new tabris.ScrollView({
            class: "swish_background",
            left: 0,
            top: 0,
            right: 0,
            bottom: 55,
            class: "swish_background",
            //background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).appendTo(pageTafssir);
        title_tfs = new tabris.TextView({
            // textColor: wino.style.activeNormal ? wino.style.colorText[0] : wino.style.colorText[1],
            class: "swish_text",
            id: "textTfs",
            text: _lang["sura_s"] + " " + QuranData.Sura[data.sura][lngS] +
            " : " + _lang["aya"] + " " + data.aya + "\n" + data.text,
            font: wino.style.titleSize + "px",
            alignment: "center",
            markupEnabled: true,
            layoutData: {
                right: 10,
                left: 10,
                top: 10
            }
        }).on("swipe:left", function (widget, event) {
            wino.idTafs--;
            scrollView.set("scrollY", 0);
            swipeTafssir(widget)
        }).on("swipe:right", function (widget, event) {
            scrollView.set("scrollY", 0);
            wino.idTafs++
            swipeTafssir(widget)
        }).appendTo(scrollView);
        //
        var cardrPlayer = new tabris.Composite({

            // top: [pickerTrj, 20],
            width: (screen.width * 70) / 100,
            //  top: "prev()",
            bottom: 0,
            centerX: 0,
            height: 90
            //left:0,
            //right:0
            //background:"#f44",

        }).appendTo(pageTafssir);
        //
        var prevPlay = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/prevT.png" },
            tintColor: "#000",
            // top: 2,
            // width: 44,
            // height: 44,
            bottom: 2,
            left: 10,
            // centerX: 0dra
        }).on("tap", function () {
            scrollView.set("scrollY", 0);
            wino.idTafs++
            swipeTafssir(title_tfs);
        }).appendTo(pageTafssir);
        //
        var picTafsir = new tabris.Picker({
            bottom: 0, centerX: 0,
            id: 'tafserPickera',
            items: itemListTafssir,
            itemText: function (itm) {
                return "      " + itm.name;
            },
            selectionIndex: wino.stor.tafssirId
        }).on('change:selection', function (picker, item, res) {
            //  console.info(res.index)
            wino.stor.tafssirId = res.index;
            wino.stor.tafssir = item.id;
            getTafsir({ id: wino.idTafs }, function (rs) {
                var data = {
                    text: formatTafsir(rs.rows.item(0).text),
                    id: rs.rows.item(0).id,
                    aya: rs.rows.item(0).aya,
                    sura: rs.rows.item(0).sura
                }
                //console.info(data)
                title_tfs.set("text", _lang["sura_s"] + " " + QuranData.Sura[data.sura][lngS] +
                    " : " + _lang["aya"] + " " + data.aya + "\n" + data.text)
                pageTafssir.set("title",
                    itemListTafssir[wino.stor.tafssirId].name ? itemListTafssir[wino.stor.tafssirId].name : wino.stor.tafssir
                );
            });
            //    pickaya.set("items", ayaArr(aya))
        }).appendTo(cardrPlayer);
        //
        var nextPlay = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/nextT.png" },
            tintColor: "#000",
            // layoutData: {
            //  top: 2,
            //  width: 44,
            //height: 44,
            bottom: 2,
            right: 10,
            // centerX: 0
            // }
        }).on("tap", function () {
            scrollView.set("scrollY", 0);
            wino.idTafs--
            swipeTafssir(title_tfs)
        }).appendTo(pageTafssir);
        //
    }
    function swipeTafssir(widget) {
        if (wino.idTafs < 0) wino.idTafs = 0
        // //errz("id= " + tafsi[ids], "tafss= " + tafsi[texts].substr(0, 100))
        // //logz('###############')
        getTafsir({ id: wino.idTafs }, function (rs) {
            var data = {
                text: formatTafsir(rs.rows.item(0).text),
                id: rs.rows.item(0).id,
                aya: rs.rows.item(0).aya,
                sura: rs.rows.item(0).sura
            }
            //   //console.info(data)
            title_tfs.set("text", _lang["sura_s"] + " " + QuranData.Sura[data.sura][lngS] +
                " : " + _lang["aya"] + " " + data.aya + "\n" + data.text)
            pageTafssir.set("title",
                itemListTafssir[wino.stor.tafssirId].name ? itemListTafssir[wino.stor.tafssirId].name : wino.stor.tafssir
            );
        });
        ////
    }
    function formatTafsir(text) {
        text = text.replace(/([^=])("[^"<]+")/g, "$1<b>$2</b>", text);
        text = text.replace(/(\[[^\]<]+\])/g, "<i>$1</i>", text);
        text = text.replace(/(\([^)<]+\))/g, "<b><i>$1</i></b>", text);
        text = text.replace(/(\{[^}<]+\})/g, "<i><b>$1</b></i>", text);
        return text;
    }
    //end page tafssir
    var tafssir_ = tabDown(_lang["trans"], './images/icons/tafssir.png', './images/icons/tafssir.png')
    //play tab scrolling tafssir
    var slide = new tabris.ScrollView({
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
       // height:300,
        direction: "vertical",
        //background: "#369"
    }).appendTo(tafssir_)

    //scroling
    var actif = false;
    var bgclr = ["#ccc", "#f5f7f8"]; //color tafssir
    function scrolling(items) {
        //  console.log("scrolling")
        //
        slide.dispose();
        slide = new tabris.ScrollView({
          right: 0,
        top: 0,
        bottom: 0,
        left: 0,
       // height:300,
        direction: "vertical",
        //background: "#369"
        }).appendTo(tafssir_)
        //
        items.forEach(function (item, index) {
            //  console.error(item.aya)
            actif = !actif;
            var container = new tabris.Composite({
                background: actif ? bgclr[0] : bgclr[1],
                wino: {
                    aya: item.aya,
                    sura: item.sura,
                    page: wino.page,
                    classTab: item.classTab
                },
                actif: actif,
                id: "scrolling",
                class: item.class,
                classTab: item.classTab,
                top: "prev()",
                left: 0,
                right: 0
            }).on("tap", function (widget, event) {
                //onTapAyat(widget);
                 onLongpressTafssir(widget, event);
                
            }).appendTo(slide);
            //
            new tabris.TextView({
                //class: '',
                font: "bold 16px",
                textColor: "#222",
                scrolling: item.class,
                centerX: 0,
                layoutData: {
                    top: 0,
                    left: 5,
                    right: 5
                },
						alignment: "right",
                text: item.aya + ") " + item.content
            }).on("tap", function (w, e) {
              var WContainer = pageAyat.find("." + w.get("scrolling"))[0];
                    onLongpressTafssir(WContainer, event);
                    
            }).appendTo(container);
            //

        })
        setTimeout(function () {
            if (wino.tmp.tafssirTrans) { //deslect old class select
                // pageAyat.find("." + wino.oldTfs).forEach(function(widget) {
                var widget__ = pageAyat.find("." + wino.tmp.tafssirTrans)[0];
                if (widget__) {
                    widget__.set({ "winoTmp": { background: widget__.get("background") } })
                    widget__.set({
                        background: "#4caf50"//widget__.get("actif") ? bgclr[0] : bgclr[1],
                    });

                    var topz = widget__.get("bounds").top
                    ////logz("top contr=" + topz);
                    slide.set("scrollY", topz);
                    // wino.classTfs = wino_.classTab;
                    wino.tmp.tafssirTrans = false;
                }
            } //else scroll.set("scrollY", 0);
            var widget__ = pageAyat.find("#scrolling")[0];
            // widget__.set("background", "#d7edd8")
            //  //logz("tabz ==" + tabz)
            // tabFolder.set("bottom", "50%")
        }, 10)
    }
    //func ontaptafssir repkace to longpress
    function onLongpressTafssir(widget, event) {
        pageAyat.find("#scrolling").forEach(function (widget__) {
            widget__.set({
                background: widget__.get("actif") ? bgclr[0] : bgclr[1],
                //       cornerRadius: 10,
                //     elevation: 8,
            });
        });
        widget.set("background", "#d7edd8")
        var topz = widget.get("bounds").top
        ////logz("top contr=" + topz);
        slide.set("scrollY", topz);
        var wino_ = widget.get("wino");
        //
        wino.sura = wino_.sura;
        wino.aya = wino_.aya;
        wino.oldSlc = wino.class ? wino.class : null; // widget.get("class");
        wino.page = wino_.page;
        wino.class = wino_.classTab;
        wino.oldTfs = wino.oldTfs ? wino.oldTfs : null;
        wino.classTfs = wino_.classTfs;
        selectDeselect();
        // if (wino.status.pause === false)
        //  getAudio()

        ////logz("class=", widget.get("class"));
    }
    ////////////
    ////////function
    ////
    //======================end tafssir
    function getAudio(wino_) {
        if (wino.tmp.stop) return;
        actionPlay.set({
            play: true,
            title: "stop",
            image: {
                src: "./images/icons/Stop-52.png",
                scale: 1
            }
        })
        if (wino_) {
            wino.aya = wino_.aya;
            wino.sura = wino_.sura;
        }
        var mo9ri2 = wino.stor.moqri
        ///if(wino.stor.moqri)mo9ri2=wino.stor.moqri
        var morsso = paddingAya(wino.sura) + paddingAya(wino.aya)
        var path = ("http://quran.ksu.edu.sa/ayat/mp3/" + mo9ri2 + "/" + morsso + '.mp3');
        //errz(path);
        //olplayMedia()
        //wino.media.stop();
        //wino.media.release();
        /*
        wino.media = playMedia(path, morsso, function() {
        // if(!morsso)return
        //err("Audio file loaded successfully: " + morsso);
        //nextAya();
        //setNextAya();
        //setNextAya(function() {
        var dataNext = setNextAya(true);
        selectDeselect(dataNext.next);
        getAudio(dataNext);
        //});
        
        }).play()
        //wino.media.play();
        */
        wino.media.play(path);
        wino.media.onComplete = function () {
            // log('this media is comlet');
            //
            if (fnRep()) {
                getAudio();
                return
            }
            saveStorJ();
            // //console.info(QuranData.Sajda[wino.sura][wino.aya]);
            //  setNextAya();
            var dataNext = setNextAya(true);
            if (dataNext.next.page > wino.lyr.end - 3 || dataNext.next.page < wino.lyr.start) {
                //logz("ok next.page=" + dataNext.next.page)
                //logz("ok end=" + wino.lyr.end)
                if (wino.lyr.end < (604 - min_) && false) {
                    selectDeselect();
                    return;
                }
                //errz("hahowa7ssal")
                wino.autonext = true;
                //return
                //indicatorPageAyat.set("visible", true);
                wino.lyr.dis = false;;
                //  setTimeout(function () {
                if (dataNext.next.page < wino.lyr.btw) {
                    wino.lyr.start = 1;
                    wino.lyr.end = min_
                    //logz('dataNext.next.page < wino.lyr.btw start', dataNext.next.page - wino.lyr.btw)
                    //logz("end", (dataNext.next.page + min_) - wino.lyr.btw)
                }
                else {
                    //logz('else start', dataNext.next.page - wino.lyr.btw)
                    //logz("end", (dataNext.next.page + min_) - wino.lyr.btw)
                    wino.lyr.start = dataNext.next.page - wino.lyr.btw
                    wino.lyr.end = (dataNext.next.page + min_) - wino.lyr.btw;
                }
                wino.lyr.stats = "page";
                wino.cbloops = function () {
                    //lastLog("ok bien dit")
                    selectDeselect();
                    getAudio(dataNext);
                    wino.cbloops = false;
                    wino.isnext = false;
                }
                wino.lyr.loop()
                //     }, 10)
            }
            else {
                selectDeselect(dataNext.next);
                getAudio(dataNext);
            }
        }

    }
    function suraJuz(sura, aya) {
        var n = QuranData.Juz.length;
        var aya = aya || 1;
        for (var i = 1; i < n; i++) {
            if (QuranData.Juz[i][0] > sura || (QuranData.Juz[i][0] == sura && QuranData.Juz[i][1] >= aya)) {
                if (QuranData.Juz[i][0] == sura && QuranData.Juz[i][1] == aya) {
                    return i;
                }
                return i - 1;
            }
        }
    }
    function suraHizb(sura, aya) {
        var n = QuranData.HizbQaurter.length;
        var aya = parseInt(aya) || 1;
        var sura = parseInt(sura)
        for (var i = 1; i < n; i++) {
            if (QuranData.HizbQaurter[i][0] > sura || (QuranData.HizbQaurter[i][0] == sura && QuranData.HizbQaurter[i][1] >= aya)) {
                if (QuranData.HizbQaurter[i][0] == sura && QuranData.HizbQaurter[i][1] == aya) {
                    return i;
                }
                return i - 1;
            }
        }
    }
    function paddingAya(aya) {
        var aya = aya + '';
        if (aya.length < 2) {
            return '00' + aya;
        }
        else if (aya.length < 3) {
            return '0' + aya;
        }
        return aya;
    }
    // include help
    //insert tray
    //######
    ///tray
    var trayHeight;
    var trayState = "down";
    var dragOffset;
    var shade = new tabris.Composite({
        layoutData: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        background: "black",
        opacity: 0
    }).appendTo(pageAyat);
    var tray = new tabris.Composite({
        layoutData: {
            left: 0,
            right: 0,
            top: "40%",
            bottom: 0
        }
    }).appendTo(pageAyat);
    var strap = new tabris.Composite({
        layoutData: {
            right: 2,
            // right: "40%",
            top: 0,
            height: 36,
            left: 2
        },
        id: "strap",
        // background: "#c5c5c5"
    }).appendTo(tray);
    var strapIcon = new tabris.ImageView({
        id: "trayImg", opacity: 0.95,
        image: { src: "./images/icons/traythis.png" },
        layoutData: {
            // top: "prev()",
            width: 32,
            height: 24,
            bottom: -3,
            left: 10
            //  centerX: 0,
            // centerY: 0
        },
        tintColor: "#000"
    }).appendTo(strap);
    trayContent.appendTo(tray);

    trayContent.on("resize", function () {
        pageLyrAyat.set("bottom", 0);
        //if(wino.tmp.disTray)return
        //return
        var bounds = trayContent.get("bounds");
        trayHeight = bounds.height;
        if (trayState === "dragging") {
            errz("bottom hereresiize = ")
            trayThis(2000);
        }
        else {
            tray.set("transform", {
                translationY: trayHeight
            });
        }
    });
    strap.on("pan:vertical", function (widget, event) {
        // return;
        if (event.state === "start" && (trayState === "up" || trayState === "down")) {
            trayState = "dragging";
            dragOffset = tray.get("transform").translationY - event.translation.y;
        }
        if (trayState === "dragging") {
            var offsetY = Math.min(Math.max(event.translation.y + dragOffset, 0), trayHeight);
            tray.set("transform", {
                translationY: offsetY
            });
            pageLyrAyat.set("bottom", trayHeight - offsetY)//
            //shade.set("opacity", getShadeOpacity(offsetY));
            strapIcon.set("transform", getStrapIconTransform(offsetY));
        }
        if (event.state === "end" && trayState === "dragging") {
            trayThis(event.velocity.y);
        }
    });
    wino.trayMove = true;
    strap.on("tap", function () {
        //if (trayState === "up" || trayState === "down") {
        trayThis(trayState === "down" ? -1000 : 1000);
        //    }
    });

    function trayThis(velocity) {
        //if (wino.trayMove)
        if (velocity > 0) {
            pageLyrAyat.set("bottom", 0);
            wino.tray = "down"
            /*
            tabris.ui.set("toolbarVisible", false);
            tabris.ui.set("displayMode", "fullscreen");
            */
        }
        else {
            wino.tray = "up"
            /*
            //tabris.ui.set("displayMode", "normal");
            tabris.ui.set("toolbarVisible", true);
            tabris.ui.set("displayMode", "normal");
            */
            setTimeout(function () { selectDeselect(); }, 1000)
        }


        //else tabFolder.set("bottom", 0);
        wino.trayMove = !wino.trayMove
        trayState = "animating";
        var translationY = velocity > 0 ? trayHeight : 0;
        var options = {
            duration: Math.min(Math.abs(trayHeight / velocity * 1000), 800),
            easing: Math.abs(velocity) >= 1000 ? "ease-out" : "ease-in-out"
        };
        //shade.animate({opacity: getShadeOpacity(translationY)}, options);
        strapIcon.animate({
            transform: getStrapIconTransform(translationY)
        }, options);

        tray.once("animationend", function (target) {
            //if(wino.tmp.disTray)return
            //	return;
            //lastLog("animmmmm finam")
            trayState = velocity > 0 ? "down" : "up";
            wino.trayMove = trayState;
            wino.tray = trayState;
            if (velocity > 0)
                pageLyrAyat.set("bottom", 0);
            else pageLyrAyat.set("bottom", trayHeight);
            //if()
            /*
                if(!wino.tmp.disTray){
                     pageLyrAyat.animate({
                    transform: {
                    translationY: translationY-trayHeight
                }
            }, options);
    
                }else {
                 pageLyrAyat.animate({
                    transform: {
                    translationY: translationY+trayHeight
                }
            }, options);
            //pageLyrAyat.set("top",0);
            }
    */

            //		if(wino.tmp.disTray){
            //			wino.tmp.disTray=false;
            //pageLyrAyat.set("top",0);
            //	}else{
            //	wino.tmp.disTray=false;
            //if(trayState=="down")
            //pageLyrAyat.set("top",0);
            //pageLyrAyat.once("animationend",function(target){
            //	if(trayState=="up")
            //target.set("top",trayHeight);
            //});
            //		}
            //wino.tbf.top = tabFolder.get("bounds").top;
            //trayContent.get("bounds");
            ////lastLog("top",wino.tbf.top,"bottom",wino.tbf.bottom)
        }).animate({
            transform: {
                translationY: translationY
            }
        }, options);

    }
    function getShadeOpacity(translationY) {
        var traveled = translationY / trayHeight;
        return Math.max(0, 0.75 - traveled);
    }
    function getStrapIconTransform(translationY) {
        var traveled = translationY / trayHeight;
        return {
            rotation: traveled * Math.PI - Math.PI
        };
    }
    //end tray
    //tabfoldrDown scroll
    // play tabmedia tab down
    //end tabMedia
    var tabMediaz = tabDown(_lang["telawat"], './images/icons/palyez.png', './images/icons/palyez.png')
    ////######tabdown Option
    function tabMediaz_() {
        //
        var cadrPlay = new tabris.Composite({
            top: 0, left: 0, right: 0, bottom: 0
        }).appendTo(tabMediaz)
        var cardrPlayer = new tabris.Composite({
            layoutData: {
                top: 0,
                // width: "70%",
                height: 60,
                //  bottom:5,
                centerX: 0
            }
        }).appendTo(cadrPlay);
        //
        var prevPlay = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/prev.png" },
            tintColor: wino.style.bgclr,
            layoutData: {
                top: 5,
                width: 44,
                height: 44,
                //  bottom:5,
                left: 15,
                // centerX: 0
            }
        }).on("tap", function () {
            var res = setNextAya("prev", { aya: wino.aya, sura: wino.sura });
            //console.info(res)
            //wino.aya = res.aya; wino.sura = res.sura;
            selectDeselect(res)
            if (wino.tmp.stop)
                getAudio();
        }).appendTo(cardrPlayer);
        //
        var stop_ = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/Stop-52.png" },
            tintColor: wino.style.bgclr,
            layoutData: {
                top: 5,
                width: 44,
                height: 44,
                //  bottom:5,
                left: "prev() 15",
                // centerX: 0
            }
        }).on("tap", function () {
            wino.tmp.stop = true;
            actionPlay.set({
                play: false,
                title: "play",
                image: {
                    src: "./images/icons/Play-52.png",
                    scale: 1
                }
            })
            stopPlayer();
        }).appendTo(cardrPlayer);
        //
        var play_ = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/playthis.png" },
            tintColor: wino.style.bgclr,
            layoutData: {
                top: 5,
                width: 44,
                height: 44,
                //  bottom:5,
                left: "prev() 15",
                // centerX: 0
            }
        }).on("tap", function () {
            wino.tmp.stop = false;
            getAudio();
        }).appendTo(cardrPlayer);
        //
        var nextPlay = new tabris.ImageView({
            id: "", opacity: 0.85,
            image: { src: "./images/icons/next.png" },
            tintColor: wino.style.bgclr,
            layoutData: {
                top: 5,
                width: 44,
                height: 44,
                //  bottom:5,
                left: [play_, 5],
                // centerX: 0
            }
        }).on("tap", function () {
            //   wino.tmp.stop = false;
            var res = setNextAya(null, { aya: wino.aya, sura: wino.sura });
            //console.info(res)
            //	wino.aya = res.aya; wino.sura = res.sura;
            selectDeselect(res)
            if (wino.tmp.stop)
                getAudio();
        }).appendTo(cardrPlayer);
        //     wino.brD(cardrPlayer);
        var setMoqri = new tabris.CollectionView({
            layoutData: { left: 0, top: 60, right: 0, bottom: 0 },
            // class: "swish_background", background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
            items: qurano,
            itemHeight: 60,
            initializeCell: function (cell) {
                //
                //
                var nameTextView = new tabris.TextView({
                    //id: "txtDraw",
                    class: "swish_text ",
                    centerY: 0, centerX: 0,
                    font: "bold 15px",
                }).appendTo(cell);
                wino.br(nameTextView, cell, 0)
                //
                cell.on("change:item", function (widget, value) {
                    nameTextView.set("text", value.name);
                    if (wino.stor.moqri === value.id) {
                        // widget.set("background", "#b2b2b2");
                        //  return;
                    }
                });
            }
        }).on('select', function (widget, item) {
            if (wino.stor.moqri == item.id) {
                // tabFolderDown.set("selection", tafssir_);
                return;
            }
            // console.log('Selected ids= ' + item.ids);
            // console.log('Selected name= ' + item.name);
            //trayThis(1000)
            wino.stor.moqriId = item.ids + 1;
            wino.stor.moqri = item.id;
            setStor("moqriId", item.ids);
            setStor("moqri", item.id);
            setTimeout(function () {
                stopPlayer();
                getAudio();
            }, 500)
        }).appendTo(cadrPlay)
        ////////
    }
    tabMediaz_();
    ////######tabdown Option
    function tabOption() {
        var setTarjem;
        //
        ////lastLog(fnJson.tarajem[1].name)
        var setTarjem = new tabris.CollectionView({
            layoutData: { left: 0, top: 10, right: 0, bottom: 0 },
            // class: "swish_background", background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
            items: fnJson.tarajem,
            itemHeight: 60,
            initializeCell: function (cell) {
                //
                //
                var nameTextView = new tabris.TextView({
                    //id: "txtDraw",
                    class: "swish_text ",
                    centerY: 0, centerX: 0,
                    font: "bold 15px",
                }).appendTo(cell);
                wino.br(nameTextView, cell, 0)
                //
                cell.on("change:item", function (widget, value) {
                    nameTextView.set("text", value.name);
                    if (wino.stor.tarajem === value.value) {
                        //  widget.set("background", "#b2b2b2");
                        return;
                    }
                    //lastLog(value.name)
                });
            }
        }).on('select', function (widget, item) {
            if (wino.stor.tarajem === item.value) {
                tabFolderDown.set("selection", tafssir_);
                return;
            }
            new indicator(pageAyat).set("visible", true);
            setTimeout(function () {
                wino.tmp.tarajem = true;
                wino.stor.tarajem = item.value;
                setStor("tarajem", item.value);
                tafssirArr = tarajem(item.value);
                wino.lyr.start = wino.page - wino.lyr.btw
                wino.lyr.end = (wino.page + min_) - wino.lyr.btw;
                wino.lyr.stats = "next"
                wino.tmp.page = wino.page;
                wino.tmp.tafssirTrans = "tfs_" + wino.aya + "_" + wino.sura + "_" + wino.page;
                wino.lyr.loop();
            }, 10)
        }).appendTo(tabDown(_lang["options"], './images/icons/options.png', './images/icons/options.png'))
        ////////
    }
    tabOption();
    ////#######end tabdown option
    //creat page search
    var pageSearch_ = new tabris.Page();
    function openSearch(items, query) {
        var num = items.length;
        //  wino.idTafs = parseInt(data.id) - 1;
        // var res = data.results;
        pageSearch_.dispose();
        pageSearch_ = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: query + "(" + num + ")",
            topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open();
        //
        var pageSearch = new tabris.Composite({ left: 0, right: 0, top: 0, bottom: 0 }).appendTo(pageSearch_);
        var indicatorSearch = new indicator(pageSearch_);
        indicatorSearch.set("visible", true);
        setTimeout(function () {
            //
            if (num < 1) {
                new tabris.Composite({
                    left: 10, right: 10, centerY: 0, height: 200, background: "#ccc"
                }).append(new tabris.TextView({
                    alingment: "center", font: "24px bold", text: _lang["search_nores"]
                })).appendTo(pageSearch);
                indicatorSearch.set("visible", false);
                return;
            }
            /*
                var items = [];
                for (var i in res) {
                    // //logz(res[i]['text'])
                    if (i > 30) break; //wino rem after
                    items.push({
                        sura: res[i]['sura'],
                        aya: res[i]['aya'],
                        text: res[i]['text'],
                        page: suraSafha(res[i]['sura'], res[i]['aya'])
                    })
                }
                //
            */
            //"###########

            var collectionSearch = new tabris.CollectionView({
                left: 0, top: 2, right: 0, bottom: 0,
                items: items,
                itemHeight: 150,
                initializeCell: function (cell) {
                    var slidez = new tabris.Composite({
                        //  background: "#347",
                        //bottom: 0,
                        //left: 0,
                        //right: 0,
                        //top: 0
                        centerY: 0,
                        centerX: 0
                    }).appendTo(cell)

                    var AyaTextView = new tabris.TextView({
                        class: "",
                        font: "20px bold",
                        // textColor: "#fff",
                        //scrolling: "#scrollSearch" + index,
                        // centerX: 0,
                        alignment: "center",
                        markupEnabled: true,
                        layoutData: {
                            top: 5,
                            left: 5,
                            right: 5,
                        }
                    }).appendTo(slidez);
                    var goAya = new tabris.TextView({
                        class: "",
                        font: "20px",
                        // textColor: "#fff",
                        //scrolling: "#scrollSearch" + index,
                        centerX: 0,
                        alignment: "center",
                        // markupEnabled: true,
                        layoutData: {
                            // bottom:0 ,
                            top: "prev()",
                            left: 5,
                            right: 5
                        }
                    }).appendTo(slidez);
                    wino.brD(cell)
                    //

                    //
                    cell.on('change:item', function (widget, value) {
                        //  imageView.set("image", "./images/icons/Play-52.png");
                        //nameTextView.set("text", value.sura);
                        var t = value.text;
                        if (t.length > 200) t = t.substring(0, 200) + "..";
                        AyaTextView.set("text", t);
                        goAya.set("text",
                            "... \n " + _lang["sura_s"] + ": " + QuranData.Sura[value.sura][lngS] + ", " + _lang["aya"] + ": " + value.aya + ", " +
                            _lang["page"] + ": " + value.page)
                        //widget.set('height',function(){
                        //  //errz( AyaTextView.get("bounds").height,"___")
                        //return AyaTextView.get("bounds").height + 100
                        //})
                    });
                }
            }).on('select', function (widget, item) {
                //logz('selected', item.aya);
                indicatorSearch.set("visible", true);
                setTimeout(function () {
                    onTapSearch(widget, item);
                }, 100)

            }).appendTo(pageSearch);
            //##########
            //
            setTimeout(function () { indicatorSearch.set("visible", false) }, 200)
        }, 300)
    }
    function onTapSearch(widget, event) {
        playThisAya(event);
        closeAllPage();
        // pageSearch_.dispose();
        //
    }

    function playThisAya(wino_) {
        wino.sura = wino_.sura;
        wino.aya = wino_.aya;
        wino.oldSlc = wino.class ? wino.class : null; // widget.get("class");
        wino.page = suraSafha(wino.sura, wino.aya);
        wino.lyr.stats = "next"
        wino.tmp.page = wino.page;
        wino.oldTfs = wino.oldTfs ? wino.oldTfs : null;
        wino.class = "slc_" + wino.aya + "_" + wino.sura + "_" + wino.page;
        wino.classTfs = "tfs_" + wino.aya + "_" + wino.sura + "_" + wino.page
        //logz("__", wino.class)
        if (wino.page > wino.lyr.end - 3 || wino.page < wino.lyr.start) {
            //lastLog("ok page=" + wino.page)
            //logz("ok end=" + wino.lyr.end)
            if (wino.lyr.end < (604 - min_) && false) {
                selectDeselect()
                return;
            }
            //errz("hahowa7ssal")
            //wino.autonext = true;
            //return
            //indicatorPageAyat.set("visible", true);
            wino.lyr.dis = false;;
            //  setTimeout(function () {
            //      if (wino.page < wino.lyr.btw) {
            //  wino.lyr.start = 1;
            //     wino.lyr.end = min_
            //logz('wino.page < wino.lyr.btw start', wino.page - wino.lyr.btw)
            //logz("end", (wino.page + min_) - wino.lyr.btw)
            //        }

            //       else {
            errz('else start', wino.page - wino.lyr.btw)
            errz("end", (wino.page + min_) - wino.lyr.btw)
            wino.lyr.start = wino.page - wino.lyr.btw
            wino.lyr.end = (wino.page + min_) - 2;
            //    }
            wino.cbloops = function () {
                //logz("ok __")
                selectDeselect();
                //      getAudio();
                //    wino.cbloops = false;
                // wino.isnext = false;
            }
            wino.lyr.loop()
        }
        else {
            selectDeselect();
            //getAudio();
        }
        saveStorJ();
        //lastLog("save search AyatStor")
    }
    //end search
    //creat all Action
    //creat stop & play media action
    var paramActionPlay = {
        title: ".",
        src: "./images/icons/Play-52.png",
        object: pageAyat,
        visible: true,
        placement: "high",
        id: "idPlay_",
        callback: function (target) {
            stopPlayer();
            setTimeout(function () {
                if (!target.get("play")) {
                    wino.tmp.stop = false;
                    getAudio();
                    target.set({
                        play: true,
                        title: "",
                        image: {
                            src: "./images/icons/Stop-52.png",
                            scale: 1
                        }
                    })
                } else {
                    wino.tmp.stop = true;
                    stopPlayer();
                    target.set({
                        play: false,
                        title: "",
                        image: {
                            src: "./images/icons/Play-52.png",
                            scale: 1
                        }
                    })
                }
                // target.get("play") = !target.set("play")
            }, 10)
        }
    }
    //nul remove
    var paramActionStop = {
        title: "",
        src: "./images/icons/Stop-52.png",
        object: pageAyat,
        visible: true,
        placement: "high",
        id: "idPlay",
        callback: function (target) {
            wino.tmp.stop = true;
            stopPlayer();
            setTimeout(function () { stopPlayer() })
        }
    }
    // var actionStop = Action(paramActionStop);
    var actionPlay = Action(paramActionPlay);
    //
    //creat direction book

    //var actionBook =  Action(paramActionBook)
    // creat setting
    var paramAction2 = {
        title: _lang["about_title"],
        //src: (wino.page % 2 === 0) ? "./images/icons/book_left.png" : "./images/icons/book_right.png",
        object: pageAyat,
        visible: true,
        placement: "low",
        id: "aboutme",
        callback: function (target) {
            pageHelp = new tabris.Page({
                background: "#e6eaed",
                id: "pagino",
                title: _lang["about_title"], topLevel: false,
                class: "swish_background",
                //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
            }).open();
            new tabris.WebView({
                left: 0, top: 0, right: 0, bottom: 0, url: "http://quran.ksu.edu.sa/?help=ayat2&?l=" + wino.lang,
            }).appendTo(pageHelp);
        }
    }
    var actionSetting = Action(paramAction2);
    //
    var paramActionAbout = {
        title: _lang["help_about_mi"],
        src: "",
        object: pageAyat,
        visible: true,
        placement: "low",
        id: "about",
        callback: function (target) {

            openAbout();
        }
    }
    var actionAbout = Action(paramActionAbout);


    var PROPOSALS = [];
    var actionSearch = new tabris.SearchAction({
        title: _lang["search"],
        placementPriority: "high",
        image: {
            src: tabris.device.platform === 'iOS' ? './images/icons/search-3-32.png' : './images/icons/search-3-32.png',
            scale: 2
        }
    }).on('select', function () {
        //wino.trayMove = false;
        pageLyrAyat.set("bottom", 0);
        trayThis(1000)
        //tray.set("visible", true)
        //  wino.tmp.disTray = true
        //  this.text = '';
        // }).on('input', function (widget, query) {
        //   updateProposals(query);
    }).on('accept', function (widget, query) {
        // textView.text = 'اختيار "' + query + '"';
        //errz(query);
        if (query.length < 3) {
            alertDown(_lang["search_err_length"]);
            return;
        }
        openSearch(searchFiltre(query), query);
    }).appendTo(pageAyat);
    //action.open();
    // updateProposals('');
    /*
    var ids = 0,
        suras = 1,
        ayas = 2,
        texts = 3; //tashkil
        texts_ = 4 //no tashkil
        safha = 5
    */
    function searchFiltre(d) {
        return ayatJson.filter(function (itm) {
            return (itm[4].indexOf(d) > -1) ? true : false;
        }).map(function (el) {
            return { id: el[0], sura: el[1], aya: el[2], text: el[3], textNoT: el[4], page: el[5], }
        });
    }
    //
    function getAyatBySuraAya(d) {
        //logz(d.aya, d.sura)
        return ayatJson.filter(function (itm) {
            return (d.sura === itm[1] && d.aya === itm[2]) ? true : false;
        })[0];
        //
    }
    //action size Text
    //end page search
    //
    var paramActionPlus = {
        title: "تكبير الخط",
        src: "./images/icons/plus.png",
        object: pageAyat,
        visible: false,
        placement: "high",
        id: "idplus",
        callback: function (target) {
            //
            wino.style.titleSize++;
            pageTafssir.find("#textTfs")[0].set("font", wino.style.titleSize + "px");
            //save locale storege
        }
    }
    var actionPlus = Action(paramActionPlus);
    //creat action min
    var paramActionMin = {
        title: "تصغير الخط",
        src: "./images/icons/min.png",
        object: pageAyat,
        visible: false,
        placement: "high",
        id: "min",
        callback: function (target) {
            //
            wino.style.bodySize--;
            wino.style.titleSize--;
            pageTafssir.find("#textTfs")[0].set("font", wino.style.titleSize + "px");
            //save locale storege
        }
    }
    var actionMin = Action(paramActionMin);
    //end creat
    //*** function action paly
    function Action(params) {
        //add action + params array: title, src, callback,id, object - widget page(mi9bad), remove, replace
        //remove = this object action
        //replace opject
        if (params.replace) {
            if (params.src) params.replace.set("images", {
                src: params.src,
                scale: 2
            });
            //
            if (params.title) params.replace.set("title", params.title);
            //
            if (params.id) params.replace.set("id", params.title);
            //
            if (params.callback) params.replace.on("select", function (target) {
                //errz("callback change")
                params.callback(target);
            });
            //errz("bien replace action ")
            return params.replace;
        }
        // object.find('action').remove();
        var ID_Acttion = params.id ? params.id : "ayatAction"; //if not id
        return new tabris.Action({
            id: ID_Acttion,
            title: params.title,
            placementPriority: params.placement,
            visible: params.visible,
            image: {
                src: params.src,
                scale: 1
            }
        }).on("select", function (target) {
            params.callback(target)
            //search_(lang).open();
        }).appendTo(params.object);
    }
    //end action
    ///add icon 
    //anime par yahya
    function animateInReq(widget) {
        widget.set({
            //opacity: 0.0,
            transform: { translationY: 70 },
            visible: true
        });
        widget.animate({
            opacity: 1.0,
            transform: { translationY: 0 }
        }, {
                delay: 350,
                duration: 250,
                easing: "ease-in-out"
            });
    }
    function animateOutReq(widget) {
        widget.animate({
            opacity: 0.0,
            transform: { translationY: 100 }
        }, {
                delay: 200,
                duration: 300,
                easing: "ease-in-out"
            });
        setTimeout(function () {
            widget.set("visible", false)
        }, 350)
    }
    var btnIcoCompo = new tabris.Composite({
        id: "btnIcoCompo", left: 5,
        right: 5,
       // height:250

    }).appendTo(pageAyat);
    var scrollViewAya = new tabris.ScrollView({
        id:"scrollViewAya",
       // page: wino.page,
        direction: "vertical",
        //background:"#f4c",
        //centerX: 0,
        // centerY:0,
        //id: "scrlPage" + i,
        left: 5,
        right: 5,
         top: 5,
         height: 150,
        //  class: "swish_background"
        //height: 
       // bottom:0,//"#btnIcoScroll 5"
    }).appendTo(btnIcoCompo);
    wino.br(scrollViewAya, btnIcoCompo)
    textTashkil.appendTo(scrollViewAya);
    var btnIcoScroll = new tabris.Composite({
        //page: wino.page, 
        id:"btnIcoScroll",
        direction: "horizontal",
        left: 5,
        right: 5,
        centerX:0,
        // top: 0,
       // bottom:3,
       // height: 32,
        top: "#scrollViewAya 10"
        //  class: "swish_background"
    }).appendTo(btnIcoCompo);
    //

    //
    var favIndex = [_lang["fav_memo"], _lang["fav_read"], _lang["note"]];
    var btnArr = [

        {
            img: "Play-52.png",
            ontap: function (target, wino_) {
                //
                vibrate_(5)
                wino.tmp.stop = false;
                getAudio();

            }
        },
        {
            img: "tafssir.png",
            ontap: function (target, wino_) {
                //

                animateOutReq(btnIcoCompo);
                getTafsir({ auther: "katheer", aya: wino_.aya, sura: wino_.sura }, callback_)
                // openTafssir(data)
            }
        },
        {
            img: "0.png", //actionsheet favs
            ontap: function (target) {
                trayThis(1000)
                //  target.set("tintColor", "#fc0");
                var options = {
                    androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
                    title: _lang['fav_alert'],
                    buttonLabels: [_lang["fav_read"], _lang["note"]],
                    androidEnableCancelButton: true,
                    winphoneEnableCancelButton: true,
                    addCancelButtonWithLabel: _lang["cancel"],
                    addDestructiveButtonWithLabel: _lang["fav_memo"]
                };
                window.plugins.actionsheet.show(options, function (index) {
                    if (index === 4) return;
                    setTimeout(function () {
                        var text = null;
                        // if(true){
                        // //lastLog('button index clicked: ' + index);
                        if (index === 3) {
                            navigator.notification.prompt(
                                _lang["note"],
                                function (res) {
                                    //lastLog(res.input1)
                                    wino.stor.itemsFavs.push({
                                        title: wino.tmp.txtTash.length>200? wino.tmp.txtTash.substring(0,200)+"...":wino.tmp.txtTash,
                                        page: wino.page,
                                        aya: wino.aya,
                                        sura: wino.sura,//wino rm
                                        time: Math.floor(Date.now() / 1000),
                                        perso: index,
                                        text: res.input1
                                    });
                                    setStorJ("itemsFavs", wino.stor.itemsFavs);
                                    alertDown(_lang["fav_added"]);
                                },
                                _lang["fav_alert"],
                                [_lang["alert_ok"], _lang["close"]],
                                ""// _lang["optional"]               
                            );
                        } else {
                            // alertDown(_lang["fav_added"]);
                            wino.stor.itemsFavs.push({
                                title: wino.tmp.txtTash,
                                page: wino.page,
                                aya: wino.aya,
                                sura: wino.sura,
                                time: Math.floor(Date.now() / 1000),
                                perso: index,
                                text: null
                            });
                            setStorJ("itemsFavs", wino.stor.itemsFavs);
                            alertDown(_lang["fav_added"]);
                        }
                        //wino cont
                        //}
                    });
                });
            }
        }
        , {
            img: "shar.png",
            ontap: function () {
                animateOutReq(btnIcoCompo);
                var text = textTashkil.get("text");
                sahreThis(text);
            }
        },
        {
            img: "min.png",
            ontap: function () {
                wino.style.size--
                textTashkil.set("font", "bold " + wino.style.size + "px");
            }
        }, {
            img: "plus.png",
            ontap: function () {
                wino.style.size++
                textTashkil.set("font", "bold " + wino.style.size + "px");
            }
        }
        /*
        , {
            img: "copy.png",
            ontap: function () {

                var text = textTashkil.get("text");
                //console.log(text);
                cordova.plugins.clipboard.copy(text);
                alertDown(_lang["copy_done"]);
                animateOutReq(btnIcoCompo);
            }
        }
        */
    ]
    //
  
    //
    new tabris.ImageView({
        id: "addRequestRem", //opacity: 0.85,
        tintColor: "#ff9900",
        image: { src: "./images/icons/del.png", width: 32,
            height: 32, },
       // layoutData: {
            left: 0,
           
            top: 0,
       // }
    }).on("tap", function () {
        animateOutReq(btnIcoCompo);
    }).appendTo(btnIcoCompo);
    //
    if (wino.direction == "ltr") btnArr = btnArr.reverse();
    btnArr.forEach(function (itm,index) {
        new tabris.ImageView({
            id: "addRequestBtn", opacity: 0.85,
            tintColor: "#4c4c4c",
            image: { src: "./images/icons/" + itm.img ,
          //  scaleMode: "auto"
        },
          //   layoutData: {
                left: index==0?3:"prev() 3",
                width: 20,
                height: 20,
                bottom: 5
          // }
        }).on("tap", function (target) {
            vibrate_(5)
            var wino_ = { aya: wino.aya, sura: wino.sura, page: wino.page }
            itm.ontap(target, wino_)
        }).appendTo(btnIcoScroll);
    })
    ////animateInReq(btnIcoScroll)
    //animateOutReq(btnIcoScroll)
    ///end 
    //action search function
    //function searchBar(){
    ////errz("creat serch")
    function updateProposals(query) {
        //  action.proposals = PROPOSALS.filter(function(proposal) {
        //    return proposal.indexOf(query) !== -1;
        //});
    }
    //
    function setStor(k, v) {
        localStorage.setItem(k, v);
    }
    function getStor(k) {
        return localStorage.getItem(k);
    }
    function setStorJ(k, v) {
        localStorage.setItem(k, JSON.stringify(v));
    }
    function getStorJ(k) {
        return JSON.parse(localStorage.getItem(k));
    }
    //
    function formatD(stamp) { //format fav date
        var d = new Date(stamp * 1000);
        return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    }
    //
    function vibrate_(num) {
        if (!wino.stor.vibrate)
            if (navigator.vibrate) navigator.vibrate(10)
    }
    function sahreThis(text) {
        var msg = _lang["shareApp_msg"];
        var url = "https://quran.ksu.edu.sa"
        if (text) {
            msg = text + "\n...\n" + _lang["sura_s"] + ": " + QuranData.Sura[wino.sura][lngS] + ", " +
                _lang["aya"] + " " + wino.aya + ", " + _lang["page"] + ": " + wino.page;
            url = "http://quran.ksu.edu.sa/index.php#aya=" + wino.sura + "_" + wino.aya + "&m=" + wino.currMosshaf + "&qaree=" + wino.stor.moqri;
        }
        window.plugins.socialsharing.share(
            msg,
            "مصحف ايات ",
            "./images/" + wino.currMosshaf + "/" + wino.page + ".png", url,
            function (success) {
                if (success) {
                    // window.plugins.toast.showShortCenter("شكرا على المشاركة");
                    //logz("Success sharing: " + success);
                } else {
                    //   window.plugins.toast.showShortCenter("هل تريد الغاء المشاركة");
                    //logz("Cancelled sharing. Response: " + success);
                }
            }, function (errormsg) {
                // window.plugins.toast.showShortCenter("حدث خطأ"+ errormsg);
                ////logz("Error sharing: " + errormsg);
            });
    }
    function indicator(widget) {
        return new tabris.ActivityIndicator({
            centerX: 0,
            centerY: 0
        }).appendTo(widget);
    }
    //
    function closeAllPage() {
        tabris.ui.find("#pagino").forEach(function (widget) {
            widget.dispose();
        });
    }
    //
    //=======page search All//
    var pageSaerchAll = new tabris.Page();
    function openPageSaerchAll(obj) {
        // wino.idTafs = parseInt(data.id) - 1;
        pageSaerchAll.dispose();
        pageSaerchAll = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: _lang[obj], topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open()
        var tafssirView = new tabris.Composite({
            // highlightOnTouch: true,
            background: "#ddd",
            layoutData: { left: 0, top: 0, right: 0 },
        }).appendTo(pageSaerchAll);

        wino.br(tafssirView, pageSaerchAll) //id,append
        //
        //
        if (obj == "tafaser") {
            new tabris.TextView({
                id: 'tafserLabela', top: 5, centerX: 0,
                font: "bold 18px",
                text: _lang["chooseTafsir"] + ':'
            }).appendTo(tafssirView);
            //
            var picTafsir = new tabris.Picker({
                top: ["#tafserLabela", 5], centerX: 0,
                id: 'tafserPickera',
                items: itemListTafssir,
                itemText: function (itm) {
                    return "       " + itm.name;
                },
                selectionIndex: wino.stor.tafssirId
            }).on('change:selection', function (picker, item, res) {
                // console.info(res.index)
                wino.stor.tafssirId = res.index;
                wino.stor.tafssir = item.id
                //    pickaya.set("items", ayaArr(aya))
            }).appendTo(tafssirView);
        }
        //
        var tabFolderSearch = new tabris.TabFolder({
            left: 0,
            top: tafssirView,//obj=="tafaser"?["#tafserPickera",10]:0,
            right: 0,
            bottom: 0,
            paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
        }).appendTo(pageSaerchAll);
        var indicatorSearch = new indicator(pageSaerchAll);
        indicatorSearch.set("visible", false);
        //tabsearch
        var tabSearch = function (title, image, seletedImage) {
            return new tabris.Tab({
                title: title,
                image: {
                    src: image,
                    scale: 2
                },
                selectedImage: {
                    src: seletedImage,
                    scale: 2
                }
            }).appendTo(tabFolderSearch);
        };
        //build
        var scrollPage = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(tabSearch(_lang["page"],
            "./images/" + _lang["page"] + ".png",
            "./images/" + _lang["page"] + ".png"
        ));
        //
        new tabris.TextView({
            id: 'pageNumberLabel', font: "bold 18px",
            layoutData: { centerX: 0, top: 18 },
            text: _lang["enterPageNum"] + ':'
        }).appendTo(scrollPage);
        var pageNumber = new tabris.TextInput({
            id: 'pageNumberInput',
            layoutData: { centerX: 0, top: ['#pageNumberLabel', 5] },
            keyboard: 'number',
            text: wino.page,
        }).on('input', function (widget, query) {
            if (query.length > 3) {
                query = query.substring(0, 3)
                widget.set("text", query);
                return
            }
            if (query > 604) widget.set("text", 604);
            if (query === 0) widget.set("text", 1);
        }).appendTo(scrollPage);
        new tabris.Button({
            layoutData: { centerX: 0, top: ['#pageNumberInput', 5] },
            id: 'reservationButton',
            text: _lang["go"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            //updateMessage();
            var page = parseInt(pageNumber.get("text"))
            page = page === 0 ? 1 : page;
            //lastLog(page);
            var sa = QuranData[wino.page_key][page]
            var sura = sa[0];
            var aya = sa[1];
            indicatorSearch.set("visible", true);
            var item = { aya: aya, sura: sura, page: page }
            if (obj == "bu_browse") playThisAya(item); else getTafsir({ auther: "katheer", aya: aya, sura: sura }, callback_)//openTafssir(item);
            setTimeout(function () {
                indicatorSearch.set("visible", false);
                if (obj == "bu_browse") closeAllPage();
            }, 500)
        }).appendTo(scrollPage);
        //////
        var scrollJuz = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(tabSearch(_lang["juz"] + "-" + _lang["hizb"],
            "./images/" + _lang["juz"] + ".png",
            "./images/" + _lang["juz"] + ".png"
        ));
        //
        new tabris.TextView({
            id: 'juzLabel',
            text: _lang["chooseJuz"] + ':'
        }).appendTo(scrollJuz);
        var pickJuz = new tabris.Picker({
            id: 'juzPicker',
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                , 13, 14, 15, 16, 17, 18, 19, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30],
            itemText: function (itm) {
                return "      " + itm;
            }
        }).appendTo(scrollJuz);
        new tabris.TextView({
            id: 'hizbLabel',
            text: _lang["chooseHizb"] + ':'
        }).appendTo(scrollJuz);
        var hizbArr = function () {
            var arrHizb = ["",
                _lang['first_hizb'] + " - " + _lang['first_quarter'], _lang['first_hizb'] + " - " + _lang['second_quarter'],
                _lang['first_hizb'] + " - " + _lang['third_quarter'], _lang['first_hizb'] + " - " + _lang['fourth_quarter'],
                //_lang['second_hizb']
                _lang['second_hizb'] + " - " + _lang['first_quarter'], _lang['second_hizb'] + " - " + _lang['second_quarter'],
                _lang['second_hizb'] + " - " + _lang['third_quarter'], _lang['second_hizb'] + " - " + _lang['fourth_quarter'],
            ]
            hizbLoop = [];
            for (var i = 1; i <= 8; i++) {
                hizbLoop.push({ name: arrHizb[i], id: i })
            }
            return hizbLoop;
        }
        var pickHizb = new tabris.Picker({
            id: 'hizbPicker',
            //items: [1,2,3,4,5,6,7,8],
            items: hizbArr(),
            itemText: function (hizb) {
                return "       " + hizb.name;
            }
        }).appendTo(scrollJuz);

        new tabris.Button({
            layoutData: { centerX: 0, top: ['#hizbLabel', 10] },
            id: 'reservationButton',
            text: _lang["go"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            //updateMessage();
            var hizb = pickHizb.get("selection").id;
            var juz = pickJuz.get("selection");
            var j = juz
            var h = hizb
            var jh = (j * 8) - 8 + (h * 1);
            var sura = QuranData.HizbQaurter[jh][0]
            var aya = QuranData.HizbQaurter[jh][1];
            var page = suraSafha(sura, aya);
            var item = { aya: aya, sura: sura, page: page }
            if (obj == "bu_browse") playThisAya(item); else getTafsir({ auther: "katheer", aya: aya, sura: sura }, callback_)//openTafssir(item);

            indicatorSearch.set("visible", true);
            //var item = {aya:aya,sura:sura,page:page}
            //lastLog("select hizb " + hizb)
            //	playThisAya(item);
            setTimeout(function () {
                indicatorSearch.set("visible", false);
                if (obj == "bu_browse") closeAllPage();
            }, 1000)
        }).appendTo(scrollJuz);

        scrollJuz.apply(style_.pageSearchAllscrollJuz)
        ///////
        var scrollSura = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(tabSearch(_lang["sura"],
            "./images/" + _lang["sura"] + ".png",
            "./images/" + _lang["sura"] + ".png"
        ));
        //

        var pickaya = new tabris.Picker({
            id: 'ayaPicker',
            items: [1, 2, 3, 4, 5, 6, 7, 8],
            itemText: function (aya) {
                return "       " + aya;
            }
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'suraLabel',
            text: _lang["sura"] + ':'
        }).appendTo(scrollSura);
        ///
        ///
        var ayaArr = function (end) {
            var i = 1;
            var ayaLoop = [];
            for (i; i <= end; i++) {
                ayaLoop.push(i)
            }
            return ayaLoop;
        }
        //
        var picksura = new tabris.Picker({
            id: 'suraPicker',
            items: suraArr(),
            itemText: function (sura) {
                return "       " + sura.id + "." + sura.name;
            }
        }).on('change:selection', function (picker, item) {
            var aya = QuranData.Sura[item.id][1];
            pickaya.set("items", ayaArr(aya))
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'ayaLabel',
            text: _lang["aya"] + ':'
        }).appendTo(scrollSura);
        new tabris.Button({
            layoutData: { centerX: 0, top: ['#ayaLabel', 10] },
            id: 'reservationButton',
            text: _lang["go"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            //updateMessage();
            var aya = parseInt(pickaya.get("selection"));
            var sura = parseInt(picksura.get("selection").id);
            var page = suraSafha(sura, aya);
            var item = { aya: aya, sura: sura, page: page }
            //   if(obj=="browse")playThisAya(item); else openTafssir(item);
            indicatorSearch.set("visible", true);
            //var item = {aya:aya,sura:sura,page:page}
            //lastLog("select aya " + aya)
            //lastLog("select sura " + sura)
            //	playThisAya(item);
            setTimeout(function () {
                if (obj == "bu_browse") playThisAya(item); else getTafsir({ auther: "katheer", aya: aya, sura: sura }, callback_)// openTafssir(item);
                indicatorSearch.set("visible", false);
                if (obj == "bu_browse") closeAllPage();
            }, 500)
        }).appendTo(scrollSura);

        scrollSura.apply(style_.pageSearchAllscrollSura)
        /////
        var scrollTafsir = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        })//.appendTo(tabSearch(_lang["tafsir"], './images/cart.png', './images/cart-filled.png'));
        //
        //pageSaerchAll.apply(style_.pageSaerchAll)
    }
    //=======end page search All//
    //
    //=======page Favs //
    var pageFavs = new tabris.Page();
    function openPageFavs() {
        // wino.idTafs = parseInt(data.id) - 1;
        pageFavs.dispose();
        pageFavs = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: _lang["favs"], topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open()
        var scrollFavs = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(pageFavs);
        ////
        var itmfavs_ = getStorJ("itemsFavs");
        if (!itmfavs_) {
            itmfavs_ = [];
            alertDown(_lang["noFavs"]);
            return;
        }

        var collectionView = new tabris.CollectionView({
             left: 0, right: 0, top: 35, bottom: 0,
            itemHeight: 150,
            items: itmfavs_,//.reverse(),
            initializeCell: function (cell) {
                cell.set("background", "#d0d0d0");
                var imageView = new tabris.ImageView({
                    class: "icon",
                    layoutData: { right: 10, centerY: 0, width: 44, height: 44 },
                    //tintColor:"#c5c5c5",
                    image: { src: "./images/icons/del2.png" },
                }).appendTo(cell);
                var imageView = new tabris.ImageView({
                    class: "icon",
                    layoutData: { left: 10, centerY: 0, width: 44, height: 44 },
                    // tintColor: "#FFC",
                    image: { src: "./images/icons/del2.png" },
                }).appendTo(cell);
                /*
                     var compdell = new tabris.Composite({
                      background: "#369",
                      layoutData: {left: 0, top: 0, bottom: 0, right: 0}
                       }).appendTo(cell);
                       var imageView = new tabris.ImageView({
                    	
                                    class: "icon",
                                    layoutData: { right: 32, centerY: 0, width: 44, height: 44 },
                                    //tintColor:"#c5c5c5",
                                        image: { src: "./images/icons/del.png" },
                                }).appendTo(compdell);
                                          var imageView = new tabris.ImageView({
                    	
                                    class: "icon",
                                    layoutData: { left: 32, centerY: 0, width: 44, height: 44 },
                                    tintColor:"red",
                                        image: { src: "./images/icons/del.png" },
                                }).appendTo(compdell);
                */
                var indicatorFavs;
                //indicatorFavs.set("visible", true);
                var container = new tabris.Composite({
                    highlightOnTouch: true,
                    background: "white",
                   left: 0, top: 0, bottom: 0, right: 0 
                }).on("pan:horizontal", function (widget, event) {
                    handlePan(event, container);
                }).on('tap', function (widget) {
                    indicatorFavs = new indicator(pageFavs);
                    indicatorFavs.set("visible", true);
                    var item = widget.get("item");
                    //lastLog("select favs " + item.aya)
                    playThisAya(item);
                    setTimeout(function () {
                        // indicatorFavs.set("visible", false);
                        closeAllPage();
                    }, 500)
                    // pageSearch_.dispose();
                }).appendTo(cell);
                var pageViewClose = new tabris.ImageView({
                    layoutData: { top: 3, left: 3, width: 20, height: 20 }, tintColor: "#f90", opacity: 0.8
                    , image: "./images/icons/del2.png"
                }).on("tap", function (event) {
                    // event.preventDefault = true;
                    navigator.notification.confirm(
                        _lang["remFav"],
                        function (index) {
                            if (index === 1) {
                                wino.stor.itemsFavs.splice(container.parent().get("itemIndex"), 1)
                                collectionView.set("items", wino.stor.itemsFavs);
                                setStorJ("itemsFavs", wino.stor.itemsFavs)
                            }
                        }, _lang["yes"], [_lang["yes"], _lang["cancel"]]);
                })
                    .appendTo(container);
                var pageView = new tabris.TextView({
                    layoutData: { top: 9, right: 16 }
                }).appendTo(container);
                //
                var titleView = new tabris.TextView({
                    font: "bold 16px",
                    top: [pageView, 5], right: 15, left:15,alignment:"center"
                }).appendTo(container);
                //
                var persoView = new tabris.TextView({
                    layoutData: { top: [titleView, 5], right: 16 }
                }).appendTo(container);
                var textView = new tabris.TextView({
                     right: 16, top: [persoView, 5],left: 16, 
            font: "bold 18px", alignment: "center",
                }).appendTo(container);
                //
                var timeView = new tabris.TextView({
                    textColor: "#b8b8b8",
                    layoutData: { bottom: 5, left: 16 }
                }).appendTo(container);
                //
                new tabris.Composite({
                    background: "#b8b8b8",
                    layoutData: { left: 0, bottom: 0, right: 0, height: 1 }
                }).appendTo(cell);
                //////
                var clrArr = ["#92ccff", "#ffbf92", "#b0deb2"]
                cell.on("change:item", function (widget, itmFavs) {
                    //  return; //wino
                    container.set({ transform: {}, item: itmFavs });
                    pageView.set("text", _lang["sura_s"] + ": " + QuranData.Sura[itmFavs.sura][lngS] + " ," +
                        _lang["aya"] + " " + itmFavs.aya + " - " + _lang["page"] + " " + itmFavs.page);
                    titleView.set("text", itmFavs.title);
                    timeView.set("text", formatD(itmFavs.time));
                    persoView.set("text", favIndex[itmFavs.perso - 1]);
                    // if (t.length > 200) t = substring(0, 200) + ".."
                    if (itmFavs.text) textView.set("text", itmFavs.text);
                    persoView.set("background", clrArr[itmFavs.perso - 1])
                    //wino.stor.itemsFavs.push( itmFavs);
                })
            }
        }).appendTo(pageFavs);
        function handlePan(event, container) {
            container.set("transform", { translationX: event.translation.x });
            if (event.state === "end") {
                handlePanFinished(event, container);
            }
        }
        function handlePanFinished(event, container) {
            var beyondCenter = Math.abs(event.translation.x) > container.get("bounds").width / 2;
            var fling = Math.abs(event.velocity.x) > 200;
            var sameDirection = sign(event.velocity.x) === sign(event.translation.x);
            var dismiss = beyondCenter ? sameDirection || !fling : sameDirection && fling;
            if (dismiss) {
                animateDismiss(event, container);
            } else {
                animateCancel(event, container);
            }
        }


        setStorJ("itemsFavs", wino.stor.itemsFavs);
        function animateDismiss(event, container) {
            var bounds = container.get("bounds");
            container.once("animationend", function () {
                wino.stor.itemsFavs.splice(container.parent().get("itemIndex"), 1)
                collectionView.set("items", wino.stor.itemsFavs);
                setStorJ("itemsFavs", wino.stor.itemsFavs)
                //return
                var bounds = container.get("bounds");
            }).animate({
                transform: { translationX: sign(event.translation.x) * bounds.width }
            }, {
                    duration: 200,
                    easing: "ease-out"
                });
        }
        function animateCancel(event, container) {
            container.animate({ transform: { translationX: 0 } }, { duration: 200, easing: "ease-out" });
        }
        function sign(number) {
            return number ? number < 0 ? -1 : 1 : 0;
        }
        //
        //
    }
    //=======end page Favs//
    //#### page alarm
    var pageAlarm = new tabris.Page();
    var pageAddAlarm //= new tabris.Page();
    function openPageAlarm() {
        // wino.idTafs = parseInt(data.id) - 1;
        pageAlarm.dispose();
        pageAlarm = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: _lang["mozaker"], topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open()
        var scrollFavs = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(pageAlarm);
        ////
        var itmAlarm = wino.stor.alarm//getStorJ("itemsFavs");
        if (!itmAlarm) {
            itmAlarm = [];
            //alertDown(_lang["noFavs"]);
            // return;
        }
        var collectionView = new tabris.CollectionView({
            layoutData: { left: 0, right: 0, top: 35, bottom: 0 },
            itemHeight: 150,
            items: itmAlarm,//getStorJ("itemsFavs").reverse(),
            initializeCell: function (cell) {
                cell.set("background", "#ccc");
                var imageView = new tabris.ImageView({
                    class: "icon",
                    layoutData: { right: 5, centerY: 0, width: 44, height: 44 },
                    //tintColor:"#c5c5c5",
                    image: { src: "./images/icons/del2.png" },
                }).appendTo(cell);
                var imageView = new tabris.ImageView({
                    class: "icon",
                    layoutData: { left: 10, centerY: 0, width: 44, height: 44 },
                    //tintColor: "#FFC",
                    image: { src: "./images/icons/del2.png" },
                }).appendTo(cell);
                var indicatorAlarm;
                //indicatorAlarm.set("visible", true);
                var container = new tabris.Composite({
                    highlightOnTouch: true,
                    background: "white",
                    layoutData: { left: 0, top: 0, bottom: 0, right: 0 },
                }).on("pan:horizontal", function (widget, event) {
                    handlePan(event, container);
                }).on('loungpress', function (widget) {
                    indicatorAlarm = new indicator(pageAlarm);
                    indicatorAlarm.set("visible", true);
                    // playThisAya(item);
                    setTimeout(function () {
                        indicatorAlarm.set("visible", false);
                        //   closeAllPage();
                    }, 500)
                    // pageSearch_.dispose();
                }).appendTo(cell);
                var pageViewClose = new tabris.ImageView({
                    layoutData: { top: 3, left: 3, width: 20, height: 20 }, tintColor: "#f90", opacity: 0.8
                    , image: "./images/icons/del2.png"
                }).on("tap", function (event) {
                    // event.preventDefault = true;
                    navigator.notification.confirm(
                        _lang["remAlarm"],
                        function (index) {
                            if (index === 1) {
                                if (cordova.plugins.notification)
                                    cordova.plugins.notification.local.cancel(id, function () {
                                        errz("cansel notif id=" + id)
                                    });
                                wino.stor.alarm.splice(container.parent().get("itemIndex"), 1);
                                collectionView.set("items", wino.stor.alarm);
                                //wino.stor.alarm = wino.stor.alarm//.reverse();
                                ////lastLog(wino.stor.alarm.length)
                                setStorJ("alarm", wino.stor.alarm)
                            }
                        }, _lang["yes"], [_lang["yes"], _lang["cancel"]]);
                })
                    .appendTo(container);
                //
                var imageViewAlarm = new tabris.ImageView({
                    class: "icon",
                    layoutData: { left: 10, centerY: 0, width: 90 },
                    //tintColor: "#FFC",
                    image: { src: "./images/icons/clock.png" },
                }).appendTo(container);
                //
                //
                var titleViewTime_ = new tabris.Button({
                    layoutData: { top:10,left: [imageViewAlarm, 10], centerX: 0 }, font: "bold 24px"
                }).appendTo(container);
                var textViewActive = new tabris.TextView({
                    layoutData: { right: 10, centerY: 0 }, color: "#369"
                }).appendTo(container);
                //
                var persoView = new tabris.TextView({
                    layoutData: { bottom: 5, centerX: 0 }
                }).appendTo(container);

                new tabris.Composite({
                    background: "#b8b8b8",
                    layoutData: { left: 0, bottom: 0, right: 0, height: 1 }
                }).appendTo(cell);

                //////
                var clrArr = ["red", "#fcb", "#FCC"]
                cell.on("change:item", function (widget, itmFavs) {
                    container.set({ transform: {}, item: itmFavs });
                    // pageView.set("text", itmFavs.sura + ":" + itmFavs.aya);
                    textViewActive.set("text", _lang["mozaker_alert"] +
                        ": " + ((itmFavs.activeAudio) ? _lang["mozaker_alert_default"] : _lang["mozaker_alert_null"]));
                    titleViewTime_.set("text", itmFavs.time_)//formatD(itmFavs.time));
                    persoView.set("text", itmFavs.perso);
                    //wino.stor.itemsFavs.push( itmFavs);
                })
            }
        }).appendTo(pageAlarm);
        new tabris.ImageView({
            class: "iconz",
            layoutData: { right: 10, bottom: 10, width: 90 },
            //tintColor: "#FFC",
            image: { src: "./images/icons/add.png" },
        }).on("tap", function (widget, v) {
            addAlarm()
        }).appendTo(pageAlarm);
        ///
        function addAlarm() {
            pageAddAlarm = new tabris.Page({
                background: "#e6eaed",
                id: "pagino",
                title: _lang["buAddFav"], topLevel: false,
                class: "swish_background",
                //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
            }).open();
            var container = new tabris.Composite({
               // highlightOnTouch: true,
                background: "white",
                layoutData: { left: 0, top: 0, bottom: 0, right: 0 },
            }).appendTo(pageAddAlarm);

            var activeAudio_ = true, perso_ = _lang["mozaker_msg_default"], repeat_ = true, time_ = "09:00";
            //
            new tabris.TextView({
                id: 'juzLabel',
                text: _lang["mozaker_msg"],
            }).appendTo(container);
            var perso = new tabris.TextInput({
                id: 'juzPicker',
                text: perso_
            }).on('input', function (widget, query) {
                perso_ = query;
            }).appendTo(container);
            ///
            // wino.br("#juzLabel", container)
            //
            new tabris.TextView({
                id: 'hizbLabel',
                // layoutData: { centerX: 0, top: ["#juzPicker", 18] },
                text: _lang["mozaker_alert"] + ':'
            }).appendTo(container);
            //
            var activeAudio = new tabris.Picker({
                id: 'hizbPicker',
                // layoutData: { centerX: 0, top: ['#pageNumberLabel', 5],width:80 },
                //  items:range(3,240),//new Array(240),
                items: [{ id: true, lng: _lang["mozaker_alert_default"] }, { id: false, lng: _lang["mozaker_alert_null"] }],
                itemText: function (itm) {
                    return "      " + itm.lng;
                }
            }).on('change:selection', function (widget, query) {
                activeAudio_ = query.id;

            }).appendTo(container);
            var next_ = wino.br("#hizbLabel", container);
            next_.set("visible",false)
            var titleViewTime;
            var imageViewAlarm = new tabris.ImageView({
                class: "iconA",
                layoutData: { left: 15, top: [next_, 15], width: 90 },
                //tintColor: "#FFC",
                image: { src: "./images/icons/clock.png" },
            }).on("tap", function (widget, v) {
                
                time_ = modakker(titleViewTime);
                errz("time", time_)
            })
            .appendTo(container);
            //
             titleViewTime = new tabris.Button({
                right: 10, top: [next_, 17], font: "bold 24px", text: time_
            }).on("select", function (widget, v) {
                time_ = modakker(widget);
                errz("time", time_)
            }).appendTo(container);
          //  wino.br(imageViewAlarm, container)
            var add = new tabris.Button({
                layoutData: { top: [titleViewTime, 40], centerX: 0 }, font: "bold 24px", text: _lang["buAddFav"]
            }).on("select", function (widget, v) {
                var id = parseInt((Math.random() * 100));
                var data = {
                    id: id,
                    time: time_,
                    title: _lang["mozaker"],
                    text: perso_,
                    //icon: "./images/icons/ayatLogo.png",
                    //smallIcon: "./images/icons/ayatLogo.png",
                    callback: null,
                    // data: { sura: 1, aya: 2, page: 1 },
                }
                wino.stor.alarm.push({
                    time_: titleViewTime.get("text"), perso: perso_,
                    id: id, repeat: repeat_, audio: "http://", moqrii: "",
                    aya: 1, sura: 1, activeAudio: activeAudio_
                })
                setStorJ("alarm", wino.stor.alarm)
                collectionView.set("items", wino.stor.alarm);
                pageAddAlarm.dispose();
                notif(data);

            }).appendTo(container);
            container.apply(style_.pageSearchAllscrollJuz);

            //end fun alarm
        }
        ///
        function handlePan(event, container) {
            container.set("transform", { translationX: event.translation.x });
            if (event.state === "end") {
                handlePanFinished(event, container);
            }
        }
        function handlePanFinished(event, container) {
            var beyondCenter = Math.abs(event.translation.x) > container.get("bounds").width / 2;
            var fling = Math.abs(event.velocity.x) > 200;
            var sameDirection = sign(event.velocity.x) === sign(event.translation.x);
            var dismiss = beyondCenter ? sameDirection || !fling : sameDirection && fling;
            if (dismiss) {
                animateDismiss(event, container);
            } else {
                animateCancel(event, container);
            }
        }
        function animateDismiss(event, container) {
            var bounds = container.get("bounds");
            var id = container.get("item").id;
            container.once("animationend", function () {
                if (cordova.plugins.notification)
                    cordova.plugins.notification.local.cancel(id, function () {
                        errz("cansel notif id=" + id)
                    });
                wino.stor.alarm.splice(container.parent().get("itemIndex"), 1);
                collectionView.set("items", wino.stor.alarm);
                //wino.stor.alarm = wino.stor.alarm//.reverse();
                ////lastLog(wino.stor.alarm.length)
                setStorJ("alarm", wino.stor.alarm)
                //
            }).animate({
                transform: { translationX: sign(event.translation.x) * bounds.width }
            }, {
                    duration: 200,
                    easing: "ease-out"
                });
        }

        function animateCancel(event, container) {
            container.animate({ transform: { translationX: 0 } }, { duration: 200, easing: "ease-out" });
        }
        function sign(number) {
            return number ? number < 0 ? -1 : 1 : 0;
        }
    }
    //#### end page alarm
    //### play page optioons
    //
    var pageOptions = new tabris.Page();
    function openPageOptions(first) {
        // wino.idTafs = parseInt(data.id) - 1;
        pageOptions.dispose();
        pageOptions = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: _lang["options"], topLevel: first ? true : false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open()
        var indic = new indicator(pageOptions).set("visible", false);
        var scrollOptions = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(pageOptions);
        ////
        new tabris.TextView({
            id: 'choose_lang', font: "bold 18px",
            //layoutData: {top: 10},
            text: _lang["choose_lang"] + ':'
        }).appendTo(scrollOptions);
        var langPicker = new tabris.Picker({
            //layoutData: {  top: ['#choose_lang', 5] },
            id: 'langPicker',
            items: [{ id: "ar", lng: _lang["l_arabic"] }, { id: "en", lng: _lang["l_english"] }],
            itemText: function (itm) {
                return "       " + itm.lng;
            },
            selectionIndex: (wino.lang == "ar") ? 1 : 2
        }).on('change:selection', function (picker, item) {
            wino.lang = item.id
            saveStorJ();
            setTimeout(function () {
                tabris.app.reload();
            }, 20)
            ///soul ghid 
        }).appendTo(scrollOptions);
        //  wino.br(langPicker, scrollOptions)
        ////
        /*
        new tabris.TextView({
            id: 'mosshaf_type',// font: "bold 18px",
            //  layoutData: { centerX: 0, top: ["#langPicker",15] },
            text: _lang["mosshaf_type"] + ':'
        }).appendTo(scrollOptions);
        var mosshafPicker = new tabris.Picker({
            id: 'mosshafPicker',
            items: [{ id: "hafs", lng: _lang["mosshaf_hafs"] }, { id: "warsh", lng: _lang["mosshaf_warsh"] },
                //	{ id: "tajweed", lng: _lang["mosshaf_tajweed"] }
            ],
            // [_lang["mosshaf_hafs"], _lang["mosshaf_warsh"], _lang["mosshaf_tajweed"]],
            itemText: function (mosshaf) {
                return "       " + mosshaf.lng;
            }
        }).on('change:selection', function (picker, item) {
            indic.set("visible", true);
            //wino.currMosshaf = item.id;
            if (item.id == "warsh")
                wino.page_key = "Page_warsh";
            else wino.page_key = "Page";
            saveStorJ();
            amakenArr = require("./amaken_" + wino.currMosshaf + ".js").amaken;
            reloadThisAya();
            setTimeout(function () {
                closeAllPage();
            }, 500)
        }).appendTo(scrollOptions);
        //  wino.br(mosshafPicker, scrollOptions)
        //////
        /*
        new tabris.TextView({
            id: 'vision_type',
            //font: "bold 18px",
            //  layoutData: { centerX: 0, top: [mosshafPicker,15] },
            text: _lang["view_type"] + ':'
        }).appendTo(scrollOptions);
        var visionPicker = new tabris.Picker({
            //layoutData: { centerX: 0, top: ['#vision_type', 5] },
            id: 'visionPicker',
            items: [_lang["vision_normal"], _lang["vision_night"]],
            itemText: function (aya) {
                return "       " + aya;
            }
        }).appendTo(scrollOptions);
        wino.br(visionPicker, scrollOptions)
        */
        //
        new tabris.Button({
            layoutData: { centerX: 0, top: ["#choose_lang", 25] },
            id: 'buttonOption',
            text: _lang["go"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            if (first) {
                pageOptions.dispose();
            }
        }).appendTo(scrollOptions);
        scrollOptions.apply(style_.pageOptions)
        //
    }
    //### end page option
    //________________________
    function d() {
        return Math.floor(Date.now() / 1000)
    }
    //creat Marker
    //images/icons/marker.png
    //ende
    pageAyat.apply(style_.pageAyat)
    //tabris.ui.set("opacity", 0.5)
    //if(isNetworkConnected())//errz("conected yes"); else //errz("no connect")
    ////err(tabris.device.get("connectionType"))
    //loading_.close();

    //  }, 20);
    ///
    //#########
    function modakker(widget) {
        var tomorrow;
        var options = {
            date: new Date(),
            mode: 'time', // or 'time'
            //minDate: new Date() - 10000,
            //maxDate: new Date() + 10000,
            allowOldDates: true,
            allowFutureDates: false,
            doneButtonLabel: 'ok',
            doneButtonColor: '#F39',
            cancelButtonLabel: 'cancel',
            cancelButtonColor: '#369'
        };
        if (datePicker) {
            datePicker.show(options, function (date_) {
                //lastLog("date result " + date);
                var date = new Date(date_);
                var hh = date.getHours()
                var mm = date.getMinutes()
                if (widget) widget.set("text", hh + ":" + mm);
                // var now = new Date().getTime(),
                var today = new Date();
                tomorrow = new Date();
                tomorrow.setDate(today.getDate());
                tomorrow.setHours(hh);
                tomorrow.setMinutes(mm);
                var reqT = tomorrow.getTime();
                var now = new Date().getTime();
                if (now >= reqT) {
                    tomorrow.setTime(reqT + (86400 * 1000));
                }
            });
        }
        // if (data.callback) callback();
        return tomorrow;
    }
    function notif(data) {
        if (!cordova.plugins.notification) return;
        var sound = "http://quran.ksu.edu.sa/ayat/mp3/Hudhaify_64kbps/001001.mp3";//device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
        cordova.plugins.notification.local.schedule({
            id: data.id,
            title: data.title,
            text: data.text,
            at: data.time,
            every: "day", // "minute", "hour", "week", "month", "year",
            icon: "file://www/images/logo_ayat.png",
            smallIcon: "file://www/images/logo_ayat.png",
            data: data.data
        });
        cordova.plugins.notification.local.on('click', function (notification) {
            //console.log('onclick');
            //  //console.info('onclick', notification.data);
            playThisAya(datnotification.data);
            //showToast('clicked: ' + notification.id);
        });
    }
    //#########
    wino.out = false;
    tabris.app.on('backnavigation', function (app, event) {
        //event.preventDefault();
        if (tabris.ui.get("activePage").get("topLevel")) {
            if (wino.back) {
                wino.back();
                event.preventDefault();
                wino.back = false;
                //lastLog('noooo back.');
            } else {
                if (!wino.out) {
                    event.preventDefault();
                    alertDown(_lang["quit"]);
                    wino.out = true;
                    setTimeout(function () { wino.out = false }, 5000)
                }
            }
            /*
                        if (tabris.ui.get("activePage").get("topLevel")) {
                            event.preventDefault = true;
                            navigator.notification.confirm(
                                _lang["bu_exitApp"],
                                function (index) {
                                    //lastLog(index);
                                    if (index === 1) {
                                        //event.preventDefault()
                                        tabris.app.exit();
                                        //event.preventDefault = false;
                                    }
                                }, _lang["close_app"], [_lang["cancel"], _lang["close"]]);
            
                        }
            
                    
                    */
        }
    });
    //
    tabris.device.on("change:orientation", function (target, event) {
        new indicator(pageAyat).set("visible", true)
        setTimeout(function () {
            //   return;
            //lastLog("orientation:", event);
            if (event == "landscape-secondary") {
                //lastLog("a9lab");
                wino.scrW_mosshaf = screen.width;
                setTimeout(function () {
                    wino.stor.lyrPage = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                    reloadThisAya();
                })
            } else {
                //lastLog("normal=" + screen.width);
                wino.scrW_mosshaf = screen.width; //+ 40;
                wino.stor.lyrPage = {
                    left: 0,//-20,
                    right: 0,//-20,
                    top: 0,
                    bottom: 0
                }
                setTimeout(function () {

                    reloadThisAya();
                })
                // playThisAya({aya:wino.aya,page:wino.page,sura:wino.sura})
            }
        }, 1000)
    });
    //
    function tarajem(req) {
        return require("./tarajem/" + req + ".js").tafssir;
    }
    ///remove
 setTimeout(function () { 
	// db = window.sqlitePlugin.openDatabase({ name: "e3rab.aytn", location: "default", createFromLocation: 1 });
 },5000)
    function getTafsir(data, cb) {
        //  openTafssir();
        // return
       
        var tafs = wino.stor.tafssir?wino.stor.tafssir:"tabary"
		 tafs +=".aytn";
        db = window.sqlitePlugin.openDatabase({ name: tafs, location: "default", createFromLocation: 1 });
        var query;
        if (data.id)
            query = "SELECT * FROM " + tafs + " WHERE id=" + wino.idTafs;
        else
            query = "SELECT * FROM " + tafs + " WHERE sura=" + data.sura?data.sura:1 + " and aya=" + data.aya?data.aya:1
        db.transaction(function (tx) {
            tx.executeSql(query, [], function (tx, rs) {
                cb(rs)
            }, function (tx, error) {
                rez.set("text", error.message);
            });
        })
    }
    function callback_(rs) {
        //lastLog('ayat: ' + rs.rows.item(0).text);
        var data = {
            text: formatTafsir(rs.rows.item(0).text),
            id: rs.rows.item(0).id,
            aya: rs.rows.item(0).aya,
            sura: rs.rows.item(0).sura
        }
        openTafssir(data);
        // //console.info(data)
        // rez2.set("text","res="+rs.rows.item(0).text);
    }
    //############# pgaeKhitma
    function calc_khitma(juz, day, res_) {
        if (day) wino.tmp.resKhitma.day = parseInt(day);
        if (juz) wino.tmp.resKhitma.juzPlay = parseInt(juz);
        // console.log('juz_day', wino.tmp.resKhitma.juzPlay, wino.tmp.resKhitma.day)
        var res = calcKhitma(wino.tmp.resKhitma.juzPlay, parseInt(wino.tmp.resKhitma.day));
        if (res_) res = res_;
        wino.tmp.resKhitma = res;
        // //console.info(res);
        var ay_su = QuranData.HizbQaurter[res.playRob3];
        var aya = ay_su[1]
        var sura = ay_su[0]
        wino.tmp.resKhitma.starSura = sura;
        wino.tmp.resKhitma.starAya = aya;
        wino.tmp.alarm = ({ aya: parseInt(aya), sura: parseInt(sura), page: suraSafha(sura, aya) })
        var txtWerd = _lang["kemWerd"] + "\n" + res.text + "\n________\n";
        txtWerd += _lang["txtFromAya"] + ":\n(";
        txtWerd += getAyatBySuraAya({ aya: parseInt(aya), sura: parseInt(sura) })[3] + "\n ... \n";
        txtWerd += _lang["sura_s"] + " " + QuranData.Sura[sura][lngS] + ", " + _lang["aya"] + " " + aya + ", ";
        txtWerd += _lang["enterPageNum"] + ": " + suraSafha(sura, aya) + "\n________\n";
        txtWerd += _lang["txtToAya"] + ":\n(";
        wino.tmp.resKhitma.txtFrom = txtWerd;
        wino.tmp.txtWerd = txtWerd;
        ay_su = QuranData.HizbQaurter[res.endRob3];
        if (!ay_su) return false;
        aya = ay_su[1];
        sura = ay_su[0];
        wino.tmp.resKhitma.endSura = sura;
        wino.tmp.resKhitma.endAya = aya;
        txtWerd += getAyatBySuraAya({ aya: parseInt(aya), sura: parseInt(sura) })[3] + "\n ... \n";
        txtWerd += _lang["sura_s"] + " " + QuranData.Sura[sura][lngS] + ", " + _lang["aya"] + " " + aya + ", ";
        txtWerd += _lang["enterPageNum"] + ": " + suraSafha(sura, aya);
        wino.tmp.resKhitma.textFull = txtWerd
        return wino.tmp.resKhitma;
    }
    wino.tmp.resKhitma_ = {
        day: 3,
        juzPlay: 0,
        rob3: 0,
        rob3Day: 0,
    }
    wino.tmp.resKhitma = wino.tmp.resKhitma_;

    var pageKhitma = new tabris.Page();
    var khitmaActif = new tabris.Page();

    function openActifKhitma() {
        // wino.stor.actifKhitma = "ok";
        //  setStor("khitmaAktif", "ok");
        wino.stor.khitma = getStorJ("khitma");

        khitmaActif.dispose();
        khitmaActif = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: "الورد الحالي", topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open();
        var scrollJuz = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(khitmaActif);
        var textKhitma = new tabris.TextView({
            id: "textKhitma", left: 10, right: 10,
            font: "bold 18px", alignment: "center",
            text: wino.stor.khitma.textFull,
            //markupEnabled: true,
            top: 18
        }).appendTo(scrollJuz);

        var br = wino.br(textKhitma, scrollJuz)
        new tabris.Button({
            right: 10, top: [br, 10], width: "30%",
            id: 'reservationButton',
            text: _lang["start"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            playThisAya({ sura: wino.stor.khitma.starSura, aya: wino.stor.khitma.starAya });
            closeAllPage();
            //	
        }).appendTo(scrollJuz);
        var progressBar = new tabris.ProgressBar({
            left: 15, right: 15, top: "#btaccept 18",
            maximum: wino.stor.khitma.day,
            selection: wino.stor.khitma.selection ? wino.stor.khitma.selection : 1,
        }).appendTo(scrollJuz);
        var bt = new tabris.Button({
            left: 10, top: [br, 10], width: "30%",
            id: 'btaccept',
            text: _lang["doneread"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            //setInterval(function() {
            var selection = parseInt(progressBar.get("selection")) + 1;
            if (selection >= wino.stor.khitma.day) {
                errz("اتممت الختمة");
                wino.stor.khitma.selection = 1;
                wino.stor.actifKhitma = false;
                setStor("khitmaAktif", false);
                khitmaActif.dispose();
                pageKhitma.dispose();
                alertDown("اتممت الختمة")
                //closeAllPage();
                return
            }
            //wino.stor.khitma = wino.tmp.resKhitma;
            var playRob3 = wino.stor.khitma.playRob3
            wino.stor.khitma.playRob3 = wino.stor.khitma.endRob3;
            wino.stor.khitma.endRob3 = wino.stor.khitma.endRob3 +
                wino.stor.khitma.rob3Day;
            wino.stor.khitma.selection = selection;
            // wino.tmp.resKhitma = wino.stor.khitma
            setStorJ("khitma", wino.stor.khitma)
            var resKhitma_ = calc_khitma(false, false, wino.stor.khitma).textFull;
            if (!resKhitma_) resKhitma_ = "";
            textKhitma.set("text", resKhitma_);
            progressBar.set("selection", selection)
            //	}, 100);
        }).appendTo(scrollJuz);
        wino.br(bt, scrollJuz)

        /*
    var data = {
        id:23,
        text: wino.tmp.txtWerd,
        title: "مذكر يات ، تذكير بالورد اليومي",
        data: wino.tmp.alarm ? wino.tmp.alarm : null,
        cb:function(){
        openActifKhitma()
        }
    }
    modakker(data);
    */

    }
    // wino.idTafs = parseInt(data.id) - 1;
    function openPageKhitma() {
        if (getStor("khitmaAktif") == "ok") {
            openActifKhitma();
            return;
        }
        wino.tmp.resKhitma = wino.tmp.resKhitma_;
        pageKhitma.dispose();
        pageKhitma = new tabris.Page({
            background: "#e6eaed",
            id: "pagino",
            title: _lang["khitma"], topLevel: false,
            class: "swish_background",
            //  background: wino.style.activeNormal ? wino.style.background[0] : wino.style.background[1],
        }).open();
        var scrollJuz = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(pageKhitma);


        //
        new tabris.TextView({
            id: 'juzLabel',
            text: _lang["chooseJuz"] + ':'
        }).appendTo(scrollJuz);
        var pickJuz = new tabris.Picker({
            id: 'juzPicker',
            items: _lang["juzString"].map(function (itm, i) { return { id: i, juz: itm } }),
            itemText: function (itm) {
                return "      " + itm.juz;
            }
        }).on('change:selection', function (picker, item) {
            //var res = calcKhitma(item.id,wino.tmp.resKhitma.day);
            //wino.tmp.resKhitma = res;
            wino.tmp.resKhitma.juzPlay = item.id,
                textKhitma.set("text", calc_khitma().textFull);
            ////console.info(res);
            //textKhitma.set("text",_lang["kemWerd"]+":\n"+res.text)
            //ino.stor.khitm
        }).appendTo(scrollJuz);
        wino.br("#juzLabel", scrollJuz)
        new tabris.TextView({
            id: 'pageNumberLabel', font: "bold 18px",
            layoutData: { centerX: 0, top: ["#juzLabel", 20] },
            text: _lang["dayKhitma"] + ':'
        }).appendTo(scrollJuz);
        var dayNumber = new tabris.Picker({
            id: 'pageNumberInput',
            layoutData: { centerX: 0, top: ['#pageNumberLabel', 5], width: 80 },
            items: range(3, 240),//new Array(240),
            itemText: function (itm) {
                return "      " + itm;
            },
            selectionIndex: 27
        }).on('change:selection', function (widget, query) {
            wino.tmp.resKhitma.juzPlay = parseInt(pickJuz.get("selection").id);
            wino.tmp.resKhitma.day = query;
            textKhitma.set("text", calc_khitma().textFull);
        }).appendTo(scrollJuz);
        wino.br(dayNumber, scrollJuz)
        var textKhitma = new tabris.TextView({
            id: "textKhitma", left: 10, right: 10,
            font: "bold 18px", alignment: "center",
            //markupEnabled: true,
            top: [dayNumber, 18]
        }).appendTo(scrollJuz);
        new tabris.Button({
            layoutData: { centerX: 0, top: ['#textKhitma', 5] },
            id: 'reservationButton',
            text: _lang["alert_next"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            wino.stor.khitma = wino.tmp.resKhitma;
            setStorJ("khitma", wino.stor.khitma)
            setStor("khitmaAktif", "ok")
            openActifKhitma()

        }).appendTo(scrollJuz);
        ///
        scrollJuz.apply(style_.pageSearchAllscrollJuz);
        //
        wino.tmp.resKhitma.day = dayNumber.get("selection")
       textKhitma.set("text", calc_khitma().textFull);
    }
    //end page khotma
    function calcKhitma(playJuz, day) {
        //var playJuz = 1
        //var day = 30;
        //
        var rob3Total = 240 - ((playJuz - 1) * 8);
        var rob3Day = (rob3Total / day);
        var juz_ = (rob3Day / 8)
        var getJuz = parseInt(juz_);
        var rob3 = 0;
        if (juz_ - getJuz !== 0) {
            rob3 = parseInt((juz_ - getJuz) * 8)
        }
        if (rob3 == 0 && getJuz == 0) rob3 = 1;
        var juzText = _lang["juzKhitma"][getJuz];//?_lang["juzKhitma"][getJuz]:"";
        var rob3Text = _lang["rob3Khitma"][rob3];//?_lang["rob3Khitma"][rob3]:"";
        var and = (getJuz == 0 || rob3 == 0) ? "" : " " + _lang["and"] + " ";
        var textWerd = juzText + and + rob3Text;
        var playRob3 = (parseInt(playJuz) * 8);
        return {
            juz: getJuz,
            rob3: rob3,
            rob3Day: parseInt(rob3Day),
            text: textWerd,
            playRob3: playRob3 ? playRob3 : 1,
            endRob3: parseInt(playRob3 + rob3Day) < 240 ? parseInt(playRob3 + rob3Day) : 240,
            day: day,
            playJuz: playJuz
        }
        //console.log("juz=" + getJuz, "rob3=" + rob3)
    }
    //***** page if first open
    function openPageFirst() {
        var pageFirst = new tabris.Page({
            id: "pagino",
            topLevel: true,
            class: "swish_background",
            backgound: "#ccc"
        }).open();
        // openPageOptions(true);
        var tabFirst = new tabris.TabFolder({
            tabBarLocation: "hidden",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
        }).appendTo(pageFirst);
        [1, 2, 3, 4, 5, 6, 7, 8].forEach(function (itm) {
            new tabris.ImageView({
                image: {
                    src: "./images/first/" + itm + ".jpg",
                    scaleMode: "auto",
                    width: (screen.width * 80) / 100
                },
                centerX: 0,
                centerY: 0
            }).appendTo(new tabris.Tab().appendTo(tabFirst))
        })
        //cb()
        new tabris.ImageView({
            image: {
                src: "./images/icons/del.png",
                scaleMode: "auto",
                width: 44
            },
            top: 2,
            left: 2
        }).on("tap", function () {
            pageAyat.open();
            tabris.ui.set("background", wino.style.bgclr);//background page color
            loading_.dispose();
            setTimeout(function () {
                if (wino.stor.displayMode) {
                    tabris.ui.set("displayMode", "normal");
                    tabris.ui.set("toolbarVisible", true);
                }
            }, 100);
            drawer.set("visible", true);
        }).appendTo(pageFirst)
    }
    //function page tekrar
    var pageTekrar;
    function openPageTekrar() {
        if (pageTekrar) pageTekrar.dispose();
        var pageTekrar = new tabris.Page({
            id: "pagino",
            title: _lang["bu_telawa"],
            topLevel: false,
            class: "swish_background",
            backgound: "#ccc"
        }).open();
        ///////
        var scrollSura = new tabris.ScrollView({
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            direction: "vertical",
            //background: "#369"
        }).appendTo(pageTekrar);
        //
        new tabris.TextView({
            id: 'passphraseLabel', font: "bold 18px",
            layoutData: { centerX: 0, top: 10 },
            text: _lang["deterStart"] + ':'
        }).appendTo(scrollSura);

        var pickaya = new tabris.Picker({
            id: 'ayaPicker', top: 20,
            items: [1, 2, 3, 4, 5, 6, 7, 8],
            itemText: function (aya) {
                return "       " + aya;
            }
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'suraLabel',
            text: _lang["deterStartSura"] + ':'
        }).appendTo(scrollSura);
        ///
        ///
        var ayaArr = function (end) {
            var i = 1;
            var ayaLoop = [];
            for (i; i <= end; i++) {
                ayaLoop.push(i)
            }
            return ayaLoop;
        }
        //
        var picksura = new tabris.Picker({
            id: 'suraPicker',
            items: suraArr(),
            itemText: function (sura) {
                return "       " + sura.id + "." + sura.name;
            }
        }).on('change:selection', function (picker, item) {
            var aya = QuranData.Sura[item.id][1];
            pickaya.set("items", ayaArr(aya))
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'ayaLabel',
            text: _lang["deterStartAya"] + ':'
        }).appendTo(scrollSura);
        //wino.br("#ayaLabel 10",scrollSura)
        var scrollSura_ = scrollSura;
        scrollSura = new tabris.Composite({
            layoutData: {
                left: 0,
                right: 0,
                top: 160,
                //bottom: 0
            },
            //background: wino.style.bgclr
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'passphraseLabel', font: "bold 18px",
            layoutData: { centerX: 0, top: 16 },
            text: _lang["deterEnd"] + ':'
        }).appendTo(scrollSura);

        var pickaya_ = new tabris.Picker({
            id: 'ayaPicker', top: 20,
            items: [1, 2, 3, 4, 5, 6, 7, 8],
            itemText: function (aya) {
                return "       " + aya;
            }
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'suraLabel',
            text: _lang["deterEndSura"] + ':'
        }).appendTo(scrollSura);
        ///
        ///
        var ayaArr = function (end) {
            var i = 1;
            var ayaLoop = [];
            for (i; i <= end; i++) {
                ayaLoop.push(i)
            }
            return ayaLoop;
        }
        //
        var picksura_ = new tabris.Picker({
            id: 'suraPicker',
            items: suraArr(),
            itemText: function (sura) {
                return "       " + sura.id + "." + sura.name;
            }
        }).on('change:selection', function (picker, item) {
            var aya = QuranData.Sura[item.id][1];
            pickaya_.set("items", ayaArr(aya))
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'ayaLabel',
            text: _lang["deterEndAya"] + ':'
        }).appendTo(scrollSura);
        //
        // var line = wino.br("#ayaLabel 10",scrollSura);
        scrollSura_.apply(style_.pageSearchAllscrollSura)
        scrollSura.apply(style_.pageSearchAllscrollSura)
        //     var scrollSura_ = scrollSura;
        scrollSura = new tabris.Composite({
            layoutData: {
                left: 0,
                right: 0,
                top: 160,
                //bottom: 0
            },
            //background: wino.style.bgclr
        }).appendTo(scrollSura);
        new tabris.TextView({
            id: 'passphraseLabel', font: "bold 18px",
            layoutData: { centerX: 0, top: 16 },
            text: _lang["repeat"] + ':'
        }).appendTo(scrollSura);

        new tabris.TextView({
            id: 'suraLabel',// top:100,
            text: _lang["repeat_forAya"] + ':'
        }).appendTo(scrollSura);
        var repeat = new tabris.Picker({
            id: 'suraPicker',// top: 20,
            items: [_lang["repeat_forAya_null"], 2, 3, 4, 5, 6, 7],
            itemText: function (aya) {
                return "       " + aya;
            }
        }).appendTo(scrollSura);
        new tabris.Button({
            layoutData: { centerX: 0, top: ['#suraLabel', 10] },
            id: 'reservationButton',
            text: _lang["go"],
            background: '#369',
            textColor: 'white'
        }).on('select', function () {
            //updateMessage();
            var aya = parseInt(pickaya.get("selection"));
            var sura = parseInt(picksura.get("selection").id);
            //var page = suraSafha(sura, aya);
            var item = { aya: aya, sura: sura }
            // console.info("playTekrar",item)
            // wino.rep.fnRep = 2
            var aya_ = parseInt(pickaya_.get("selection"));
            var sura_ = parseInt(picksura_.get("selection").id);
            if ((sura > sura_) || (sura > sura_) && aya > aya) {
                alertDown("سورة الإنتهاء اصغر من سورة البدأ ")
                return;
            }
            var rep = parseInt(repeat.get("selection"));
            wino.rep.endSura = sura_;
            wino.rep.endAya = aya_;
            //var page = suraSafha(sura, aya);
            wino.rep.playSura = sura;
            wino.rep.PlayAya = aya;
            if (rep == _lang["repeat_forAya_null"])
                wino.rep.actif = false;
            else {
                wino.rep.fnRep = rep - 1;
                wino.rep.actif = true;
                playThisAya({ aya: aya, sura: sura });

                closeAllPage();
                trayThis(-1000);
                tabFolderDown.set("selection", tabMediaz);
                wino.tmp.stop = false;
                getAudio();
                // console.info("playTekrar",rep)
            }


            //
            wino.fnRep = wino.rep.fnRep;

            //   if(obj=="browse")playThisAya(item); else openTafssir(item);
            //console.info(item)

        }).appendTo(scrollSura);
        scrollSura.apply(style_.pageSearchAllscrollSura)
        //      scrollSura_.apply(style_.pageSearchAllscrollSura)
        //   scrollSura.apply(style_.pageSearchAllscrollSura)
    }
    // page func update
    function openPageUpdate(data) {
        var pageFirst = new tabris.Page({
            id: "pagino",
            topLevel: false,
            class: "swish_background",
            backgound: "#ccc"
        }).open();
        // openPageOptions(true);
        var tabFirst = new tabris.TabFolder({
            tabBarLocation: "hidden",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
        }).appendTo(pageFirst);
        data.forEach(function (itm) {
            new tabris.ImageView({
                image: {
                    src: itm.img,
                    scaleMode: "auto",
                    width: (screen.width * 90) / 100
                },
                centerX: 0,
                centerY: 0
            }).on("tap", function () {
                new tabris.WebView({
                    left: 0, top: 0, right: 0, bottom: 0, url: itm.url,
                }).appendTo(pageFirst);
            }).appendTo(new tabris.Tab().appendTo(tabFirst))
        })
        //cb()
        new tabris.ImageView({
            image: {
                src: "./images/icons/del.png",
                scaleMode: "auto",
                width: 44
            },
            top: 2,
            left: 2
        }).on("tap", function () {
            pageFirst.dispose();
        }).appendTo(pageFirst)
    }
    ///////////
    setTimeout(function () {
        //   console.log("play settimout")
        //"http://192.168.43.64:8080/update.json?o"
        //  getJSON("").then(function(json) {
        getJSON("http://quran.ksu.edu.sa/help/ayat2/update/?lang=" + wino.lang).then(function (json) {
            // wino.stor.update = []
            // setStorJ("update",wino.stor.update);
            // cbAmakenPage(json);
            //  console.info(json)
            if (json.status == "ok") {
                //  console.log("status ok")
                if (wino.stor.update[json.id] === 1) return;
                if (json.version == version_) return;
                wino.stor.update[json.id] = 1;
                setStorJ("update", wino.stor.update);
                // console.log("next apres foreach")
                //  if()
                openPageUpdate(json.data)
            } else {
                //    console.log("no resault")
            }
            //logz("json result 2", json)
        });
    }, 1500)
    //play function about
    function openAbout() {
        var MARGIN = 12;
        var PAGE_MARGIN = 16;
        pageAbout = new tabris.Page({
            title: _lang["help_about_mi"],
            topLevel: false,
            class: "swish_background",
            //background: fontJson.activeNormal ? fontJson.background[0] : fontJson.background[1],
        }).open();
        //
        sendAnalytics("page", "about")
        //
        var scrollView = new tabris.ScrollView({
            class: "swish_background", left: 0, top: 0, right: 0, bottom: 0, class: "swish_background",
            //background: fontJson.activeNormal ? fontJson.background[0] : fontJson.background[1],
        }).appendTo(pageAbout);
        var imgAbout = new tabris.ImageView({
            id: "imgAbout",
            image: "./images/ksu2.png",
            scaleMode: "fit",
            layoutData: { left: 20, right: 20, top: 20 }
        }).appendTo(scrollView);
        //
        var linkTextView = new tabris.TextView({

            font: "bold 16px",
            text: "عمادة التعاملات الإلكترونية والاتصالات",
            alignment: "center",
            textColor: "rgba(71, 161, 238, 0.75)",
            layoutData: { right: PAGE_MARGIN, left: PAGE_MARGIN, top: "#imgAbout 15" }
        }).on("tap", function () {
            linkWeb("http://etc.ksu.edu.sa/", "عمادة التعاملات الإلكترونية والاتصالات").open();
        }).appendTo(scrollView);
        //
        var textL2 = new tabris.TextView({
            class: "swish_text",
            text: "إدارة البوابة والإعلام الجديد",
            //  textColor: fontJson.activeNormal ? fontJson.colorText[0] : fontJson.colorText[1],
            alignment: "center",
            font: "16px",
            layoutData: { right: PAGE_MARGIN, left: PAGE_MARGIN, top: linkTextView }
        }).appendTo(scrollView);

        var imgAbout = new tabris.ImageView({
            id: "logoAyat",
            image: "./images/ayat_logo.png",
            scaleMode: "fit",
            layoutData: { left: 100, right: 100, top: "prev() 20" }
        }).on("tap", function () {
            linkWeb("http://quran.ksu.edu.sa/?about=ayat2&?l=" + wino.lang, _lang["help_about_mi"]).open();
        }).appendTo(scrollView);
        return;

        //
        var compositeSocial = new tabris.Composite({ top: [textL2, 15], centerX: 0 }).appendTo(scrollView);
        //**share btn
        new tabris.ImageView({
            left: 5, top: 5,
            image: {
                src: social.ytb, width: 56, height: 56
            },
        }).on("tap", function () {
            linkWeb("http://www.youtube.com/user/pdksuchannel", "يوتوب").open();
        }).appendTo(compositeSocial);
        //
        new tabris.ImageView({
            left: (56 * 1) + 5,
            top: 5,
            image: {
                src: social.fb, width: 56, height: 56
            },
        }).on("tap", function () {
            linkWeb("https://www.facebook.com/King.Saud.University", "فايسبوك").open();
        }).appendTo(compositeSocial);
        //
        new tabris.ImageView({
            left: (56 * 2) + 5, top: 5,
            image: {

                src: social.tw, width: 56, height: 56
            },
        }).on("tap", function () {
            linkWeb("http://twitter.com/_KSU", "تويتر").open();
        }).appendTo(compositeSocial);
        //
        new tabris.ImageView({
            left: (56 * 3) + 5, top: 5,
            image: {
                src: social.ins, width: 56, height: 56
            },
        }).on("tap", function () {
            linkWeb("http://shasha.ksu.edu.sa/", "أنستغرام").open();
        }).appendTo(compositeSocial);
    }
    function linkWeb(link, title_) {
        pageLinkWeb = new tabris.Page({
            title: title_
        });
        new tabris.WebView({
            title: title_,
            url: link,
            layoutData: { left: 0, right: 0, top: 0, bottom: 0 }
        }).appendTo(pageLinkWeb);
        return pageLinkWeb;
    }
    //end func about
    ///////////////

    ///end ayat
}
