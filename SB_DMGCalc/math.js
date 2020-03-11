var result = document.getElementsByName("Result");
var HP_Guild;
var ATK_Guild;
var Item_UP;
var Enemy_Armour;
var Enemy_Armour_UP;
var Enemy_Guard;
var Enemy_Guard_Reflect;
var Enemy_Guard_Special;
var Enemy_Combo;
// ギルド補正と敵の情報は変わらないためnameではなくidで管理
// 代入値を読み込むだけの関数
function setGuild() {
  HP_Guild = parseInt(document.getElementById("Party_HP").value);
  ATK_Guild = parseInt(document.getElementById("Party_ATK").value);
  Item_UP = document.getElementById("Item_UP").value;
  Enemy_Armour = parseInt(document.getElementById("Enemy_Armour").value);
  Enemy_Armour_UP = parseInt(document.getElementById("Enemy_Armour_UP").value);
  Enemy_Guard = parseInt(document.getElementById("Enemy_Guard").value);
  Enemy_Guard_Reflect = parseInt(
    document.getElementById("Enemy_Guard_Reflect").value
  );
  Enemy_Guard_Special = document.getElementById("Enemy_Guard_Special").value;
}

function batchInput() {
  let LS = document.getElementById("Batch_Party_Ratio").value;
  let Sword = document.getElementById("Batch_Sword").value;
  for (let i = 0, l = document.getElementsByName("Party_Ratio").length; i < l; i++) {
    document.getElementsByName("Party_Ratio")[i].value = LS;
    document.getElementsByName("Sword")[i].value = Sword;
    // console.log(i + "looped");
  }
}


function mathSkillDamage() {
  // ギルド補正、敵情報の読み込み
  setGuild();
  // 代入値の読み込み
  let LS = document.getElementsByName("Party_Ratio")[0].value;
  let DMG_Type = document.getElementsByName("Type")[0].value;
  let DMG_Type_Opt = document.getElementsByName("Type_Opt")[0].value;
  let ATK =
    parseInt(document.getElementsByName("ATK")[0].value) +
    parseInt(document.getElementsByName("ATK_Soul")[0].value) +
    ATK_Guild;
  let ATK_UP = document.getElementsByName("ATK_UP")[0].value;
  let Sword = document.getElementsByName("Sword")[0].value * Item_UP;
  let DMG_Ratio = document.getElementsByName("DMG_Ratio")[0].value;
  let DMG_Soul = document.getElementsByName("DMG_Soul")[0].value;
  let Elem = document.getElementsByName("Elem")[0].value;
  let Elem_Sub = document.getElementsByName("Elem_Sub")[0].value;
  // 計算
  // 防御力
  let Armor =
    (Enemy_Armour + Enemy_Armour_UP * (DMG_Type_Opt != "kil")) *
    (DMG_Type != "poi");
  // 軽減
  let Guard =
    (1 - ((DMG_Type_Opt == "nom") * Enemy_Guard) / 100) *
    (1 - ((DMG_Type_Opt != "kil") * Enemy_Guard_Reflect) / 100) *
    Enemy_Guard_Special;
  // ダメージ
  let Damage = ATK * ATK_UP * Sword * LS * DMG_Ratio * Elem * Elem_Sub * Guard - Armor;
  // ソウル分の追加ダメージ
  let Damage_Soul =
    (DMG_Type == "dms") *
    ((Damage * DMG_Soul) / 100) *
    (1 - ((DMG_Type_Opt != "kil") * Enemy_Guard_Reflect) / 100);
  // チェック用アラート
  // alert();
  // リザルト
  result[0].value = Math.floor(
    (function (r) {
      return r <= 0 ? 1 : r;
    })(Damage) +
    (function (r) {
      return DMG_Soul != 0 && DMG_Type == "dms" && r <= 0 ? 1 : r;
    })(Damage_Soul)
  );
}