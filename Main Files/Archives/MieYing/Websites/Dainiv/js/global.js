let easing = "cubic-bezier(0.16, 1, 0.3, 1)";
let fasing = "cubic-bezier(0.7, 0, 0.84, 0)";
let deftime = "Smart";
let defwid = 1024;
let defhei = 768;
let timer_speed = 1;
let alphabets = `AÀÁÂÃÄÅÆĀĂĄǍǞǠǺȀȂȦȺḀẠẢẤẦẨẪẬẮẰẲẴẶB
CÇĆĈĊČḈḊḌḎḐḒDÐĎĐḌḎḐḒEÈÉÊËĒĔĖĘĚȄȆȨȨḔḖḘḚḜẸẺẼẾỀỂỄỆF
ḞGĜĞĠĢǦǤǴḠḠHĤĦḢḤḦḨḪIÌÍÎÏĨĪĬĮİȈȊḬḮỈỊJĴĴKĶǨḰḲḴLĹĻĽḶḸḺḼMḾṀṂN
ÑŃŅŇǸȠṆṈṊOÒÓÔÕÖØŌŎŐƠǑǪǬȌȎȪȬȮȰṌṎṐṒỌỎỐỒỔỖỘỚ
ỜỞỠỢPṔṖQȊRŔŖŘȐȒṘṚṜṞSŚŜŞŠȘṠṢṤṦṨTŢŤȚȚṪṬṮṰUÙÚÛÜŨŪŬŮŰ
ŲȔȖɄṲṴṶṸṺỤỦỨỪỬỮỰVṼṾWŴẀẂẄẆẈXẊẌYÝŶŸȲẎẎỲỴỶỸZŹŻŽȤẐ
ẒẔaàáâãäåæāăąǎǟǡǻȁȃȧḁạảấầẩẫậắằẳẵặbḃḅḇcçćĉċčḉdðďđḍḏḑḓeè
éêëēĕėęěȅȇȩḕḗḙḛḝẹẻẽếềểễệfḟgĝğġģǧǵḡḡhĥħḣḥḧḩḫẖiìíîïĩīĭįȉȋḭḯỉịjĵǰk
ķĸǩḱḳḵlĺļľḷḹḻḽmḿṁṃnñńņňǹȵṅṇṉṋoòóôõöøōŏőơǒǫǭȍȏȫȭȯȱṍṏṑṓọ
ỏốồổỗộớờởỡợpṕṗqȓrŕŗřȑȓṙṛṝṟsśŝşšșṡṣṥṧṩẜẝtţťțẗṫṭṯṱẗuùúûüũūŭůűųȕȗ
ưṳṵṷṹṻụủứừửữựvṽṿẘwŵẁẃẅẇẉẘxẋẍẋyýÿŷȳẏẏỳỵỷỹzźżžȥẑẓẕßẞÐÞð
þĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĴĵĶķĸĹ
ĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰ
űŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭ
ƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜ
ǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑ
ȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇ
ɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽ
ɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵ
ʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻
˼˽˾˿ΐάέήίΰαβγδεζηθικλμνξοπρστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠ
ϡϢϣϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵϷϸϹϺϻϼϽϾϿЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕ
ЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхц
чшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾ
ѿҀҁҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾ
ҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶ
ӷӸӹӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓԔԕԖԗԘԙԚԛԜԝԞԟԠԡԢԣԤԥԦԧԨԩԪԫԬԭԮ
ԯԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖաբգդեզէըթժիլխ
ծկհձղճմյնշոչպջռսվտրցւփքօֆև`;
let marks = `\n\t\r\\b\\f\\v\\0!@#$%^&*()_+-=[]{}|;:'"\\,./<>?±€£¥¢¤©®™•
†‡¬¦~¯´¨ˆ˜ªº¡¿×÷≈≠≤≥≡√∞∫∂∆∏∑‰‱Ω℮⇧⇨←↑→↓↔↕↖↗↘↙♠♣♥♦★
☆♀♂♩♪♫♭♯✓✔✕✖✗✘☠☢☣☤☥☦☧☨☩☪☫☬☭①②③④⑤⑥⑦⑧⑨⑩⑪⑫
⑬⑭⑮⑯⑰⑱⑲⑳ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ１２
３４５６７８９０。＂＃＄％＆＇（）＊＋，－／：；＜＝＞＠［＼］＾＿｀｛
｜｝～“”‘’«»‹›《》「」『』【】〘〙〚〛〝〞〟–—…‧¤¦§¨©ª«¬­®¯°²³´µ¶¸¹º»¼½¾¿
￥￦￡₳₲₪₮₰₱₲₵₹₺₽₿！？“”《》、；‘’【】·~，、：；“”‘’《》（）…￥—1234567890` + "`";
let isdimmed = false;
let left_win = []; // 左函数数组。
let mid_win= []; // 中函数数组。
let right_win = []; // 右函数数组。
let midwins = ["noti-mele", "cg-mele", "fail-mele", "warn-mele", "inp-mele", "xz-mele", "lj-mele", "synchr-mele", "zd-mele", "timer-mele", "mb-mele"];
let ofscrt = true; // 是否启用截图工具。

document.addEventListener("DOMContentLoaded", function () {
    var st = performance.now();
    var font1 = new FontFace("hf", 'url("Dainiv/fonts/ReHarfash Light.woff2")');
    var font2 = new FontFace("lan", 'url("Dainiv/fonts/Lanubu Light.woff2")');
    var font3 = new FontFace("jbml", 'url("Dainiv/fonts/JetBrains Mono Light.woff2")');

    async function loadfont(font, by_font, by_src, name) {
        try {
            var f = await font.load();
            var et = performance.now();
            document.fonts.add(f);
            console.log(`成功加载字体：${name}。用时 ${((et - st) / 1000).toFixed(2)} 秒。`);
        } catch (err) {
            if (by_font && by_src) {
                var fallbackFont = new FontFace(by_font, by_src);
                try {
                    var f = await fallbackFont.load();
                    var et = performance.now();
                    document.fonts.add(f);
                    console.log(`成功加载字体：${name}。用时 ${((et - st) / 1000).toFixed(2)} 秒。`);
                } catch (error) {
                    fonterror_handler(error);
                }
            } else {
                fonterror_handler(err);
            }
        }
    }

    function fonterror_handler(e) {
        switch (e.name) {
            case "NetworkError":
                console.error("网络或系统错误。");
                break;
            case "FontLoadError":
                console.error("字体加载失败。");
                break;
            default:
                console.error(`未知错误。（${e}）`);
                break;
        }
    }
    
    loadfont(font1, "mhmts", 'url("Dainiv/fonts/ReHarfash Light.otf")', "ReHarfash");
    loadfont(font2, "lan", null, "Lanubu Light");
    loadfont(font3, "jbml", 'url("Dainiv/fonts/JetBrains Mono Light.ttf")', "JetBrains Mono Light");

    const tscrs = document.getElementById("tscrs");
    setInterval(() => {
        pos(0);
        pos(1);
        pos(2);
        tscrs.style.borderTop = (ofscrt ? "10px solid #008e0099" : "10px solid #8e000099");
        tscrs.style.borderBottom = (ofscrt ? "10px solid #008e0099" : "10px solid #8e000099");
    }, 400);
});