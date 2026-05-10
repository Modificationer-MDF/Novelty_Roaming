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
let wzwin = []; // wz() 数组。
let midwins = ["noti-mele", "cg-mele", "fail-mele", "warn-mele", "inp-mele", "xz-mele", "lj-mele", "synchr-mele", "zd-mele", "timer-mele", "mb-mele"];

document.addEventListener("DOMContentLoaded", function () {
    var start = performance.now();
    var font1 = new FontFace("hf", 'url("fonts/Harfash.woff2")');
    var font2 = new FontFace("lan", 'url("fonts/Lanubu Light.woff2")');
    font1.load().then(function (f) {
        var end = performance.now();
        document.fonts.add(f);
        console.log(`成功加载字体：Harfash。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
    }).catch(function (error) {
        var by_font1 = new FontFace("mhmts", 'url("fonts/Harfash.otf")');
        by_font1.load().then(function (f) {
            var end = performance.now();
            document.fonts.add(f);
            console.log(`成功加载字体：Harfash。用时 ${((end - start) / 1000).toFixed(2)} 秒。`);
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