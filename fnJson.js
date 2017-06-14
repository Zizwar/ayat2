var _hlMeta = {
        "hafs": {
            height: 30,
            mgwidth: 40,
            twidth: 416,
            ofwidth: 10,
            ofheight: 15,
            fasel_sura: 110,
            page_top: 37,
            page_sura_top: 80,
            mem_height: 45,
            mem_ofheight: 24,
            fp_height: 20,
            fp_mgwidth: 80,
            fp_twidth: 376,
            fp_ofwidth: 5,
            fp_ofheight: 10
        },
        "warsh": {
            height: 40,
            mgwidth: 25,
            twidth: 427,
            ofwidth: 17,
            ofheight: 20,
            fasel_sura: 140,
            page_top: 30,
            page_sura_top: 130,
            mem_height: 48,
            mem_ofheight: 22,
            fp_height: 20,
            fp_mgwidth: 80,
            fp_twidth: 376,
            fp_ofwidth: 5,
            fp_ofheight: 10
        },
        "tajweed": {
            height: 40,
            mgwidth: 25,
            twidth: 427,
            ofwidth: 17,
            ofheight: 20,
            fasel_sura: 140,
            page_top: 30,
            page_sura_top: 80,
            mem_height: 48,
            mem_ofheight: 22,
            fp_height: 30,
            fp_mgwidth: 100,
            fp_twidth: 350,
            fp_ofwidth: 10,
            fp_ofheight: 15
        }
    }
//
var APlayer = function () {

        this.p = {};
        this.status = 'Init';
        this.bypassCB = 0;
        this.st_cds = ["None", "Starting", "Running", "Paused", "Stopped"];
        this.stop_t = 0;
        this.apply_t = 0;
        this.applyCB = 0;
        this.p = false;
        this.duration = 0;
        this.startTime = 0;
        var _this = this;

        this.play = function (file) {
            err(file);
            if (!file) {
                if (!_this.p)
                    return;
                try {
                    _this.p.play();
                }
                catch (e) { }
                return;
            }
            this.stop();
            // this.onPlay();
            _this.p = new Media(file, function () {
                if (_this.applyCB) {
                    if (_this.duration && _this.startTime && ((Date.now() + 950 - _this.startTime) < (_this.duration * 1000))) {
                        stopPlayer();
                        if (!durationStopped) {
                            //
                        }
                        durationStopped = true;
                    }
                    else {
                        durationStopped = false;
                        _this.applyCB = 0;
                        _this.onComplete();
                    }
                }
            }, function (err) {
                _this.applyCB = 0
            }, function (st) {
                if (st == 2) {
                    _this.applyCB = 1;
                }
                _this.status = _this.st_cds[st] || 'Unknown';
            });

            try {
                _this.p.play();
                _this.startTime = Date.now();
            }
            catch (e) { }

            _this.applyCB = 0;

            if (_this.apply_t)
                clearTimeout(_this.apply_t);

            _this.apply_t = setTimeout(function () {
                _this.apply_t = 0;
                _this.applyCB = 1;
            }, 1000);

            //if (repeat_started) {
            var dur_counter = 0;
            var dur_timerId = setInterval(function () {

                try {
                    _this.duration = Number(_this.p.getDuration());
                }
                catch (e) { }
                if (_this.duration > 0 || dur_counter > 2000) {
                    clearInterval(dur_timerId);
                }
                else {
                    dur_counter += 200;
                }

            }, 200);
            //}

        }
        this.pause = function () {
            if (!this.p)
                return;
            if (_this.status != 'Starting' && _this.status != 'Running') {
                return;
            }
            try {
                this.p.pause();
            }
            catch (e) { }
        }
        this.stop = function () {
            if (!this.p)
                return;
            try {
                this.onComplete = function () { };
                this.applyCB = 0;
                this.duration = 0;
                this.startTime = 0;

                this.p.stop();
                this.p.release();
                this.p = null;
                if (_this.apply_t)
                    clearTimeout(_this.apply_t);
                _this.apply_t = 0;
            }
            catch (e) { }
        }
        this.onComplete = function () { };
        this.load = function () {

        }
        this.getState = function () {
            return this.status;
        }

        this.onError = function () { }
    }
	var tarajemArr = [
		{"id":1,"name":"نصوص الآيات - إملائي","filter":"All","value":"ayat"},
		{"id":2,"name":"عربى - التفسير الميسر","filter":"All","value":"ar_muyassar"},
//		{"id":3,"name":"عربى - معاني الكلمات","filter":"All","value":"ar_ma3any"},
		{"id":4,"name":"English - Sahih International","filter":"Europe","value":"en_sahih"},
		{"id":5,"name":"Français - Hamidullah","filter":"Europe","value":"fr_hamidullah"},
		{"id":6,"name":"Spanish - Melara Navio","filter":"Europe","value":"es_navio"},
		{"id":7,"name":"Português - El Hayek","filter":"Europe","value":"pt_elhayek"},
		{"id":8,"name":"Deutsch - Bubenheim & Elyas","filter":"Europe","value":"de_bubenheim"},
		{"id":9,"name":"Turkish - Diyanet Isleri","filter":"Europe","value":"tr_diyanet"},
		{"id":10,"name":"Bosnian - Korkut","filter":"Europe","value":"bs_korkut"},
		{"id":11,"name":"Shqiptar - Efendi Nahi","filter":"Europe","value":"sq_nahi"},
		{"id":12,"name":"Italian - Piccardo","filter":"Europe","value":"it_piccardo"},
		{"id":13,"name":"Dutch - Sofian Siregar","filter":"Europe","value":"nl_siregar"},
		{"id":14,"name":"أردو - جالندربرى","filter":"Asia","value":"ur_jalandhry"},
		{"id":15,"name":"كردى - برهان محمد أمين","filter":"Asia","value":"ku_asan"},
		{"id":16,"name":"فارسى - حسين تاجى كله دارى","filter":"Asia","value":"pr_tagi"},
		{"id":17,"name":"Indonesian - Bahasa Indonesia","filter":"Asia","value":"id_indonesian"},
		{"id":18,"name":"Malay - Basmeih","filter":"Asia","value":"ms_basmeih"},
		{"id":19,"name":"Thai - ภาษาไทย","filter":"Asia","value":"th_thai"},
		{"id":20,"name":"Bengali - Muhiuddin Khan","filter":"Asia","value":"bn_bengali"},
		{"id":21,"name":"Malayalam - Abdul Hameed and Kunhi","filter":"Asia","value":"ml_abdulhameed"},
		//{"id":22,"name":"Tamil - Jan Turst Foundation","filter":"Asia","value":"ta_tamil"},
		{"id":23,"name":"Россию - Кулиев","filter":"Asia","value":"ru_kuliev"},
		{"id":24,"name":"Uzbek - Мухаммад Содик","filter":"Asia","value":"uz_sodik"},
		{"id":25,"name":"Chinese - Ma Jian","filter":"Asia","value":"zh_jian"},
		{"id":26,"name":"Somali - Abduh","filter":"Africa","value":"so_abduh"},
		{"id":27,"name":"Hausa - Gumi","filter":"Africa","value":"ha_gumi"},
		{"id":28,"name":"Swahili - Al-Barwani","filter":"Africa","value":"sw_barwani"}]
module.exports = {
	tarajem:tarajemArr,
_hlMeta:_hlMeta,
	APlayer:APlayer
}