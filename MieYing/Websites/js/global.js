let mode = "Preset";
let titleset = "Default";
let rightset = "跟随该网站的设置";
let easing = "cubic-bezier(0.17, 0.9, 0.4, 0.99)";
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
let wzwin = []; // wz() 数组。
let midwins = ["noti-window", "cg-window", "fail-window", "warn-window", "inp-window", "xz-window", "lj-window", "synchr-window", "zd-window", "timer-window", "mb-window"];

document.addEventListener("DOMContentLoaded", function () {
    var start = performance.now();
    var font1 = new FontFace("mhmts", 'url("fonts/Moharmiteksai.woff2")');
    var font2 = new FontFace("lan", 'url("fonts/Lanubu Light.woff2")');
    font1.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        console.log(`成功加载字体：Moharmiteksai。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
    }).catch(function (error) {
        var by_font1 = new FontFace("mhmts", 'url("fonts/Moharmiteksai.otf")');
        by_font1.load().then(function (f) {
            var end = performance.now();
            document.fonts.add(f);
            console.log(`成功加载字体：Moharmiteksai。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
        }).catch(function (error) {
            switch (error.name) {
                case "NetworkError":
                    console.error("网络或系统错误。");
                    break;
                case "FontLoadError":
                    console.error("字体加载失败。");
                    break;
                default:
                    console.error(`未知错误。（${error}）`);
                    break;
            }
        });
    });
    font2.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        console.log(`成功加载字体：Lanubu Light。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
    }).catch(function (error) {
        var by_font2 = new FontFace("lan", 'url("fonts/Lanubu Light.ttf")');
        by_font2.load().then(function (f) {
            var end = performance.now();
            document.fonts.add(f);
            console.log(`成功加载字体：Lanubu Light。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
        }).catch(function (error) {
            switch (error.name) {
                case "NetworkError":
                    console.error("网络或系统错误。");
                    break;
                case "FontLoadError":
                    console.error("字体加载失败。");
                    break;
                default:
                    console.error(`未知错误。（${error}）`);
                    break;
            }
        });
    });

    setInterval(() => {
        pos(0);
        pos(1);
        pos(2);
    }, 500);
});