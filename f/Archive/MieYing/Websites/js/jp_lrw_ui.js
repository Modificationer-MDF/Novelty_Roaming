// 日语版本由 DeepSeek-R1 翻译。
// Japanese version translated by DeepSeek-R1。
let la1doms = [];
let la2doms = [];
let activep = false;
let phl = null; // 创建高亮层（半透明覆盖）。
let nowp = null; // 当前高亮元素。
let prevp = null; // 上一个元素。
let pickover = false;

function selector(el) {
    if (el.id) return "#" + el.id;
    let path = [];
    let cur = el;
    while (cur && cur !== document.body) {
        let sel = cur.tagName.toLowerCase();
        if (cur.className && typeof cur.className === "string") {
            let classes = cur.className.trim().split(/\s+/).filter(cls => cls !== 'phl');
            if (classes.length) sel += "." + classes.join(".");
        }
        let parent = cur.parentElement;
        if (parent) {
            let siblings = Array.from(parent.children).filter(c => c.tagName === cur.tagName);
            if (siblings.length > 1) {
                let idx = siblings.indexOf(cur) + 1;
                sel += `:nth-child(${idx})`;
            }
        }
        path.unshift(sel);
        cur = parent;
        if (cur === document.body) break;
    }
    return path.join(" > ");
}

function pickele(v) {
    if (activep) return;
    activep = true;
    phl = document.createElement("div");
    phl.style.position = "absolute";
    phl.style.pointerEvents = "none";
    phl.style.zIndex = "100";
    phl.style.backgroundColor = "#55b15549";
    phl.style.border = "2px solid #7db155b9";
    phl.style.borderRadius = "4px";
    phl.style.transition = "all 0.1s ease-in-out";
    document.body.appendChild(phl);

    const move_handler = (e) => {
        if (!activep) return;
        const el = e.target;
        if (el === phl) return;
        nowp = el;
        const rect = el.getBoundingClientRect();
        phl.style.left = rect.left + window.scrollX + "px";
        phl.style.top = rect.top + window.scrollY + "px";
        phl.style.width = rect.width + "px";
        phl.style.height = rect.height + "px";
        // 移除旧高亮类，添加新高亮类。
        if (prevp) prevp.classList.remove("phl");
        el.classList.add("phl");
        prevp = el;
    };
    const click_handler = async (e) => {
        if (!activep) return;
        e.preventDefault();
        e.stopPropagation();
        let el = e.target;
        if (el === phl) return;
        let sele = selector(el);
        try {
            setTimeout(() => {
                const box = document.getElementById(v).querySelector(".inp-box");
                box.value = sele;
                box.focus();
                box.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") finishpick();
                });
            }, 1);
        } catch (err) {
            console.warn(`エラーが発生しました：${err}。`);
        }
    };
    document.addEventListener("mousemove", move_handler);
    document.addEventListener("click", click_handler, { capture: true });
    window.picklisteners = { move: move_handler, click: click_handler };
}

function finishpick() {
    if (!activep) return;
    activep = false;
    if (phl) {
        phl.remove();
        phl = null;
    }
    if (window.picklisteners) {
        document.removeEventListener("mousemove", window.picklisteners.move);
        document.removeEventListener("click", window.picklisteners.click, { capture: true });
        window.picklisteners = null;
    }

    if (prevp) {
        prevp.classList.remove("phl");
        prevp = null;
    }
}

function screenshot() {
    if (typeof html2canvas === "undefined") { // 加载 html2canvas。
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.onload = () => {
            cac();
        };
        script.onerror = () => {
            fail("html2canvas の読み込みに失敗しました。ネットワークを確認して再試行してください。");
        };
        document.head.appendChild(script);
    } else {
        cac();
    }

    async function cac() {
        if (ofscrt) pickele("scr");
        let ls2 = await inp("要素のCSSセレクターを入力してください。", "入力", "scr");
        let sc = document.querySelector(ls2);

        if (!sc) {
            fail("要素が見つかりません。");
            return;
        }

        try {
            const oofx = sc.style.overflowX; // 原始 Overflow-X。
            const oofy = sc.style.overflowY; // 原始 Overflow-Y。
            const oof = sc.style.overflow; // 原始 Overflow。

            if (sc.scrollWidth > sc.clientWidth) sc.style.overflowX = "visible";
            if (sc.scrollHeight > sc.clientHeight) sc.style.overflowY = "visible";
            if (sc.scrollWidth > sc.clientWidth || sc.scrollHeight > sc.clientHeight) {
                sc.style.overflow = "visible";
            }

            const dpr = window.devicePixelRatio || 1;
            const canvas = await html2canvas(sc, {
                scale: dpr * 2.5,
                useCORS: true,
                backgroundColor: null,
                logging: false,
            });

            sc.style.overflowX = oofx;
            sc.style.overflowY = oofy;
            sc.style.overflow = oof;

            const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
            try {
                await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
                cg("スクリーンショットをクリップボードにコピーしました！");
            } catch (err) {
                console.warn(`スクリーンショットのコピー中にエラーが発生しました：${err}。`);
                canvas.toDataURL();
                cg("スクリーンショットをコピーしました。");
            }
        } catch (err) {
            if (err.message && err.message.includes("Failed to execute 'toBlob' on 'HTMLCanvasElement'")) {
                fail("Canvas のエクスポートに失敗しました：Canvas が汚染されている（クロスオリジンコンテンツを含む）か、ブラウザの制限による可能性があります。ローカル HTTP サーバー（例：http://localhost）でページを開くことを推奨します。");
            }
            else if (err.message && err.message.includes("html2canvas") && err.message.includes("not a function")) {
                fail("html2canvas ライブラリが正しく読み込まれていません。ページを更新して再試行してください。");
                let rq = await conf("ページを更新しますか？");
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && err.message.includes("Element is not attached to DOM")) {
                fail("対象要素が DOM から削除されました。ページを更新して再試行してください。");
                let rq = await conf("ページを更新しますか？");
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && (err.message.includes("Maximum") || err.message.includes("size"))) {
                fail("スクリーンショット範囲が大きすぎます（ブラウザが処理できる最大サイズを超えています）。範囲を狭めるか、scale パラメータを下げてください。");
            }
            else if (err.message && err.message.includes("timeout")) {
                fail("スクリーンショットがタイムアウトしました。ページが複雑すぎるか、ネットワークの問題です。ページを簡素化して再試行してください。");
            }
            else {
                fail(`スクリーンショット中にエラーが発生しました：${err.message || err}。`);
            }
            console.error(`エラーが発生しました：${err}。`);
        }
    }
}

function init_ui() {
    // 左侧窗口。
    let lw = document.querySelector(".lw");
    if (!lw) {
        lw = document.createElement("div");
        lw.classList.add("lw");
        document.body.appendChild(lw);
    }
    const lt = document.createElement("div");
    lt.classList.add("t");
    lt.innerHTML = "オプション";
    const li = document.createElement("img");
    li.classList.add("i");
    li.src = "images/Options.png";
    li.alt = "";

    lw.appendChild(lt);
    lt.appendChild(li);

    const lf1 = document.createElement("div");
    lf1.classList.add("lf1");
    const lf1i = document.createElement("div");
    lf1i.classList.add("lf1i");

    lw.appendChild(lf1);
    lf1.appendChild(lf1i);

    const scs = document.createElement("btn");
    scs.classList.add("scs");
    scs.innerHTML = "要素をスクリーンショット";
    scs.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "要素の id を確認するには？",
            "開発者ツールを開くには？",
            "入力方法は？",
            "スクリーンショットが失敗したら？",
            "CSS セレクターとは？"
        ];
        const lsxz1 = await xz("知りたい問題を選択してください。", 1, qs, "ヘルプ");
        if (!lsxz1) return;
        let lsans1 = "";
        switch (lsxz1[0]) {
            case "要素の id を確認するには？":
                lsans1 = "1. F12 キーを押して開発者ツールを開きます。<br />2. 左上の「要素を選択」アイコン（矢印）をクリックします。<br />3. ページ上の対象領域をクリックします。<br />4. Elements パネルで要素に id=“xxx” 属性があるか確認します。<br />5. または要素を右クリック → 検証 → ハイライト行の id 属性を直接確認します。";
                break;
            case "開発者ツールを開くには？":
                lsans1 = "F12 キーを押します（一部のノートパソコンでは Fn+F12）。<br />またはページの空白部分を右クリック → 検証。<br />またはブラウザメニュー → その他のツール → 開発者ツール。";
                break;
            case "入力方法は？":
                lsans1 = "CSS セレクター文字列を入力します。<br />例：.score-container  または   #main  または   div.header<br />.class、#id、タグ名、属性セレクターなどがサポートされています。";
                break;
            case "スクリーンショットが失敗したら？":
                lsans1 = "1. ページを更新して再試行してください。<br />2. クロスオリジン画像が含まれていないか確認します（画像を置き換えるか非表示にします）。<br />3. ブラウザ標準のスクリーンショット（Ctrl+Shift+S または Windows のスニッピングツール）を使用します。<br />4. 引き続き失敗する場合は、ページのリンクを他のブラウザにコピーして開いてみてください。";
                break;
            case "CSS セレクターとは？":
                lsans1 = "CSS セレクターは、特定の構文を使ってページ要素を指定するパターンです。<br />• .class はクラス名を選択<br />• #id は id を選択<br />• div はすべての div タグを選択<br />• .container .item は子孫要素を選択<br />詳細は「CSS セレクター リファレンス」を検索してください。";
                break;
            default:
                return;
        }
        mb(lsans1, "回答");
    };
    scs.onclick = () => {
        screenshot();
    };
    const larea1 = document.createElement("div");
    larea1.classList.add("larea1");
    const tl1 = document.createElement("div");
    tl1.classList.add("tlarea");
    tl1.innerHTML = "機能";
    tl1.id = "tl1";
    const pr = document.createElement("btn");
    pr.classList.add("pr");
    pr.innerHTML = "このページを印刷";
    pr.onclick = async () => {
        await noti("次のウィンドウで操作を完了してください。");
        setTimeout(() => {
            window.print();
        }, 1);
    };
    const share = document.createElement("btn");
    share.classList.add("share");
    share.innerHTML = "現在のURLをコピー";
    share.onclick = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            suc("このページのURLをクリップボードにコピーしました！");
        }).catch(() => {
            err("コピーに失敗しました。アドレスバーを手動でコピーしてください。");
        });
    };
    const reportying = document.createElement("btn");
    reportying.classList.add("reportying");
    reportying.innerHTML = "「蝇」情報を報告";
    reportying.onclick = async () => {
        pickele("rying");
        let ls_1 = await inp("「蝇」情報に対応するCSSセレクターを入力してください。", "入力", "rying");
        try {
            let ying = document.querySelector(ls_1);
            let con = await conf(`
            対象要素の内容は以下の区切り線の下に表示されています。確認してください。
            <div style="background-color: #0437c6; width: 100%; height: 3px; margin-top: 10px; margin-bottom: 10px;"></div>
            ${ying.textContent}`);

            if (con) {
                await console.log(ying.textContent);
                cg("あなたの報告は「Chanf 灭蝇组织」に送信されました。ご協力ありがとうございます。");
            }
        } catch (e) {
            fail(`エラー：${e}`);
        }
    };
    reportying.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "「蝇」とは？",
            "なぜ「蝇」を退治するのか？",
            "報告結果はどこに送信されますか？",
        ];
        const lsxz1 = await xz("知りたい問題を選択してください。", 1, qs, "ヘルプ");
        if (!lsxz1) noti("参加するかどうかに関わらず、「蝇」を退治することは命を守ることだということを忘れないでください。");
        let lsans1 = "";
        switch (lsxz1[0]) {
            case "「蝇」とは？":
                lsans1 = "「蝇」とは、ネット上で拡散される人身攻撃、開示、KY、低年齢層の発言など、不快で有害な情報を指します。これらはハエのように煩わしいため、「蝇」と呼ばれます。";
                break;
            case "なぜ「蝇」を退治するのか？":
                lsans1 = "「蝇」を退治することで HF Net を浄化します。忘れないでください、「蝇」を退治することは命を守ることです。";
                break;
            case "報告結果はどこに送信されますか？":
                lsans1 = "あなたの報告は直接「Chanf 灭蝇组织」のバックエンドに送信され、管理者が確認後、削除や放蝇者（「蝇」情報を送信したユーザー）のアカウント停止などの処分が行われます。";
                break;
            default:
                return;
        }
        mb(lsans1, "回答");
    };
    const ter = document.createElement("btn");
    ter.classList.add("ter");
    ter.innerHTML = "ターミナルを開く";
    ter.onclick = () => {
        zd("JavaScript コードを入力してください。");
    };

    la1doms.push(scs);
    la1doms.push(pr);
    la1doms.push(share);
    la1doms.push(reportying);
    la1doms.push(ter);

    lw.appendChild(larea1);
    larea1.appendChild(tl1);
    la1doms.forEach(dom => {
        larea1.appendChild(dom);
    });

    const lf2 = document.createElement("div");
    lf2.classList.add("lf2");
    const lf2i = document.createElement("div");
    lf2i.classList.add("lf2i");

    lw.appendChild(lf2);
    lf2.appendChild(lf2i);

    const larea2 = document.createElement("div");
    larea2.classList.add("larea2");
    const tl2 = document.createElement("div");
    tl2.classList.add("tlarea");
    tl2.innerHTML = "コントロール";
    tl2.id = "tl2";

    const tscrs = document.createElement("div");
    tscrs.classList.add("la2t");
    tscrs.id = "tscrs";
    tscrs.innerHTML = "要素キャプチャツール";
    const escrs = document.createElement("btn");
    escrs.classList.add("on");
    escrs.innerHTML = "有効にする";
    escrs.onclick = () => {
        inf("要素キャプチャツールを有効にしました！");
        ofscrt = true;
    };
    const dscrs = document.createElement("btn");
    dscrs.classList.add("off");
    dscrs.innerHTML = "無効にする";
    dscrs.onclick = () => {
        inf("要素キャプチャツールを無効にしました！");
        ofscrt = false;
    };

    lw.appendChild(larea2);
    larea2.appendChild(tl2);
    la2doms.push(tscrs, escrs, dscrs);
    la2doms.forEach(dom => {
        larea2.appendChild(dom);
    });

    // 右侧窗口。
    let rw = document.querySelector(".rw");
    if (!rw) {
        rw = document.createElement("div");
        rw.classList.add("rw");
        document.body.appendChild(rw);
    }
    const rt = document.createElement("div");
    rt.classList.add("t");
    rt.innerHTML = "未読メッセージ";
    const ri = document.createElement("img");
    ri.classList.add("i");
    ri.src = "images/Unread Messages.png";
    ri.alt = "";

    rw.appendChild(rt);
    rt.appendChild(ri);
}

let lw_moved = false;
let rw_moved = false;

init_ui();

document.addEventListener("mousemove", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const lw = document.querySelector(".lw");
    const rw = document.querySelector(".rw");
    const lf1 = document.querySelector(".lf1");
    const lf1i = document.querySelector(".lf1i");
    const larea1 = document.querySelector(".larea1");
    const tl1 = document.getElementById("tl1");
    const lf2 = document.querySelector(".lf2");
    const lf2i = document.querySelector(".lf2i");
    const larea2 = document.querySelector(".larea2");
    const tl2 = document.getElementById("tl2");

    if (x <= 50 && y <= 50 && !lw_moved) {
        larea1.style.transition = `all 0.6s ${easing}`;
        larea2.style.transition = `all 0.6s ${easing}`;
        lw.style.animation = `in_lw 0.6s forwards ${easing}`;
        setTimeout(() => {
            lf1.style.animation = `in_lf 0.6s forwards ${easing}`;
            lf1i.style.left = "424px";
            setTimeout(() => {
                let la1 = tl1.getBoundingClientRect().height + Number(getComputedStyle(larea1).top.replace("px", "")) + 10;
                la1doms.forEach(dom => {
                    la1 += Number(dom.getBoundingClientRect().height) + Number(getComputedStyle(larea1).gap.replace("px", ""));
                });
                larea1.style.height = `${la1}px`;

                la1doms.forEach((dom, idx) => {
                    setTimeout(() => {
                        dom.style.opacity = 1;
                        dom.style.left = "0px";
                    }, idx * 70);
                });

                setTimeout(() => {
                    lf2.style.animation = `in_lf 0.6s forwards ${easing}`;
                    lf2i.style.left = "424px";
                    setTimeout(() => {
                        let la2 = tl2.getBoundingClientRect().height + Number(getComputedStyle(larea2).top.replace("px", "")) + 10;
                        la2doms.forEach(dom => {
                            la2 += Number(dom.getBoundingClientRect().height) + Number(getComputedStyle(larea2).gap.replace("px", ""));
                        });
                        larea2.style.height = `${la2}px`;

                        la2doms.forEach((dom, idx) => {
                            setTimeout(() => {
                                dom.style.opacity = 1;
                                dom.style.left = "0px";
                            }, idx * 70);
                        });
                    }, 100);
                }, 100);
            }, 100);
        }, 100);

        lw.addEventListener("animationend", function () {
            lw_moved = true;
        }, { once: true });
    } else if (x > Number(getComputedStyle(lw).width.replace("px", "")) && lw_moved) {
        lw.style.animation = `out_lw 0.6s forwards ${fasing}`;
        larea1.style.transition = "all 0.6s cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            lf1.style.animation = `out_lf 0.6s forwards ${easing}`;
            lf1i.style.left = "-20px";
            lf2.style.animation = `out_lf 0.6s forwards ${easing}`;
            lf2i.style.left = "-20px";
            setTimeout(() => {
                la1doms.forEach(dom => {
                    dom.style.opacity = 0;
                    dom.style.left = "-100%";
                });
                larea1.style.height = 0;

                la2doms.forEach(dom => {
                    dom.style.opacity = 0;
                    dom.style.left = "-100%";
                });
                larea2.style.height = 0;
            }, 100);
        }, 100);
        lw.addEventListener("animationend", function () {
            lw_moved = false;
        }, { once: true });
    }

    if (x >= window.innerWidth - 50 && y <= 50 && !rw_moved) {
        rw.style.animation = `in_rw 0.6s forwards ${easing}`;
        rw.addEventListener("animationend", function () {
            rw_moved = true;
        }, { once: true });
    }
    else if (x < (window.innerWidth - Number(getComputedStyle(rw).width.replace("px", ""))) && rw_moved) {
        rw.style.animation = `out_rw 0.6s forwards ${fasing}`;
        rw.addEventListener("animationend", function () {
            rw_moved = false;
        }, { once: true });
    }
});