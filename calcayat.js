
function calcKhitma(playJuz,day){
var playJuz = 1
var day = 30;
//
var  rob3Total = 240-((playJuz-1)*8);
var rob3Day = (rob3Total/day);
var juz_ =( rob3Day/8)
var getJuz = parseInt(juz_);
var rob3 = 0;
if(juz_ - getJuz !== 0){
rob3 = parseInt((juz_ - getJuz)*8)
}
return {
	juz:getJuz,rob3:rob3,rob3Day:rob3Day
}
console.log("juz="+getJuz,"rob3="+rob3)

}


