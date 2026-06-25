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
            let classes = cur.className.trim().split(/\s+/);
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
            console.warn(`发生了错误：${err}。`);
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
}

function screenshot() {
    if (typeof html2canvas === "undefined") { // 加载 html2canvas。
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.onload = () => {
            cac();
        };
        script.onerror = () => {
            fail("html2canvas 加载失败，请检查网络后重试。");
        };
        document.head.appendChild(script);
    } else {
        cac();
    }

    async function cac() {
        if (ofscrt) pickele("scr");
        let ls2 = await inp("输入元素的 CSS 选择器字符串。", "输入", "scr");
        let sc = document.querySelector(ls2);

        if (!sc) {
            fail("未找到元素。");
            return;
        }

        try {
            const canvas = await html2canvas(sc, {
                scale: 2,
                logging: false,
                useCORS: true,
                windowWidth: sc.scrollWidth,
                windowHeight: sc.scrollHeight
            });
            const blob = await new Promise(resolve => canvas.toBlob(resolve));
            try {
                await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
                cg("截图已复制到剪贴板！");
            } catch (err) {
                console.warn(`刚才，尝试截图时发生了错误，以下是详细信息：“${err}”。`);
                canvas.toDataURL();
                cg("截图已复制。");
            }
        } catch (err) {
            if (err.message && err.message.includes("Failed to execute 'toBlob' on 'HTMLCanvasElement'")) {
                fail("Canvas 导出失败：可能由于 Canvas 被污染（包含跨域内容）或浏览器限制。建议使用本地 HTTP 服务器打开页面（如 http://localhost）以避免 file:// 协议的限制。");
            }
            else if (err.message && err.message.includes("html2canvas") && err.message.includes("not a function")) {
                fail("html2canvas 库未正确加载，请刷新页面后重试。");
                let rq = await conf("是否刷新页面？");
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && err.message.includes("Element is not attached to DOM")) {
                fail("目标元素已从 DOM 中移除，请刷新页面后重试。");
                let rq = await conf("是否刷新页面？");
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && (err.message.includes("Maximum") || err.message.includes("size"))) {
                fail("截图区域过大（超过浏览器能处理的最大尺寸），请尝试缩小截图范围或降低 scale 参数。");
            }
            else if (err.message && err.message.includes("timeout")) {
                fail("截图超时，可能是页面过于复杂或网络问题，请简化页面后重试。");
            }
            else {
                fail(`截图时发生错误：${err.message || err}。`);
            }
            console.error(`发生错误：${err}。`);
        }
    }
}

function init_ui() {
    // 左侧窗口。
    let lw = document.querySelector(".lw");
    if (!lw) {
        lw = document.createElement("div");
        lw.className = "lw";
        document.body.appendChild(lw);
    }
    const lt = document.createElement("div");
    lt.className = "t";
    lt.innerHTML = "选项";
    const li = document.createElement("img");
    li.className = "i";
    li.src = "images/Options.png";
    li.alt = "";

    lw.appendChild(lt);
    lt.appendChild(li);

    const lf1 = document.createElement("div");
    lf1.className = "lf1";
    const lf1i = document.createElement("div");
    lf1i.className = "lf1i";

    lw.appendChild(lf1);
    lf1.appendChild(lf1i);

    const scs = document.createElement("btn");
    scs.className = "scs";
    scs.innerHTML = "截图元素";
    scs.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "如何查看元素的 id？",
            "如何打开开发者工具？",
            "如何输入？",
            "截图失败怎么办？",
            "CSS 选择器是什么？"
        ];
        const lsxz1 = await xz("请选择你需要了解的问题。", 1, qs, "帮助");
        if (!lsxz1) return;
        let lsans1 = "";
        switch (lsxz1[0]) {
            case "如何查看元素的 id？":
                lsans1 = "1. 按 F12 打开开发者工具。<br />2. 点击左上角的“选择元素”图标（箭头）。<br />3. 点击页面上的目标区域。<br />4. 在 Elements 面板中看该元素有没有 id=“xxx” 属性。<br />5. 或者右键元素 → 检查 → 直接查看高亮行的 id 属性。";
                break;
            case "如何打开开发者工具？":
                lsans1 = "按 F12 键（部分笔记本需按 Fn+F12）。<br />或者右键页面空白处 → 检查。<br />或者浏览器菜单 → 更多工具 → 开发者工具。";
                break;
            case "如何输入？":
                lsans1 = "输入 CSS 选择器字符串。<br />例如：.score-container  或   #main  或   div.header<br />支持.class、#id、标签名、属性选择器等。";
                break;
            case "截图失败怎么办？":
                lsans1 = "1. 尝试刷新页面后重试。<br />2. 检查是否包含跨域图片（可先将图片替换或隐藏）。<br />3. 改用浏览器自带截图（Ctrl+Shift+S 或 Windows 截图工具）。<br />4. 如果持续失败，可尝试复制页面链接到其他浏览器。";
                break;
            case "CSS 选择器是什么？":
                lsans1 = "CSS 选择器是一种用特定语法定位页面元素的模式。<br />• .class 选择类名<br />• #id 选择 id<br />• div 选择所有 div 标签<br />• .container .item 选择后代元素<br />更多用法可搜索“CSS 选择器参考”。";
                break;
            default:
                return;
        }
        mb(lsans1, "解答");
    };
    scs.onclick = () => {
        screenshot();
    };
    const larea1 = document.createElement("div");
    larea1.className = "larea1";
    const tl1 = document.createElement("div");
    tl1.className = "tlarea";
    tl1.innerHTML = "功能";
    tl1.id = "tl1";
    const pr = document.createElement("btn");
    pr.className = "pr";
    pr.innerHTML = "打印本页";
    pr.onclick = async () => {
        await noti("请在接下来的窗口中完成操作。");
        setTimeout(() => {
            window.print();
        }, 1);
    };
    const share = document.createElement("btn");
    share.className = "share";
    share.innerHTML = "复制当前网址";
    share.onclick = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            suc("已将本页面网址复制到剪贴板！");
        }).catch(() => {
            err("复制失败，请手动复制地址栏。");
        });
    };
    const reportying = document.createElement("btn");
    reportying.className = "reportying";
    reportying.innerHTML = "举报“蝇”信息";
    reportying.onclick = async () => {
        pickele("rying");
        let ls_1 = await inp("在此输入对应“蝇”信息的 CSS 选择器。", "输入", "rying");
        try {
            let ying = document.querySelector(ls_1);
            let con = await conf(`
            该元素内容已显示在分隔线下方。请确认。
            <div style="background-color: #0437c6; width: 100%; height: 3px; margin-top: 10px; margin-bottom: 10px;"></div>
            ${ying.textContent}`);

            if (con) {
                await console.log(ying.textContent);
                cg("你的举报已反馈到“Chanf 灭蝇组织”，感谢你的配合。");
            }
        } catch (e) {
            fail(`报错：${e}`);
        }
    };
    reportying.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "“蝇”是什么？",
            "为什么要灭“蝇”？",
            "举报结果将向谁发送？",
        ];
        const lsxz1 = await xz("请选择你需要了解的问题。", 1, qs, "帮助");
        if (!lsxz1) noti("无论您是否参与，请您记住，灭“蝇”就是守护生命！");
        let lsans1 = "";
        switch (lsxz1[0]) {
            case "“蝇”是什么？":
                lsans1 = "“蝇”是指在网络上传播的人身攻击、开盒、KY、低龄言论等不良信息。它们像苍蝇一样令人反感，故称“蝇”。";
                break;
            case "为什么要灭“蝇”？":
                lsans1 = "灭“蝇”是为了净化 HF Net。请您记住，灭“蝇”就是守护生命！";
                break;
            case "举报结果将向谁发送？":
                lsans1 = "您的举报将直接提交至“Chanf 灭蝇组织”后台，由管理员核实后将进行惩罚措施，包括但不限于删除原信息、封禁放蝇者（发送“蝇”信息的用户）若干时长等处罚。";
                break;
            default:
                return;
        }
        mb(lsans1, "解答");
    };
    const ter = document.createElement("btn");
    ter.className = "ter";
    ter.innerHTML = "打开终端";
    ter.onclick = () => {
        zd("请在此输入 JavaScript 代码。");
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
    lf2.className = "lf2";
    const lf2i = document.createElement("div");
    lf2i.className = "lf2i";

    lw.appendChild(lf2);
    lf2.appendChild(lf2i);

    const larea2 = document.createElement("div");
    larea2.className = "larea2";
    const tl2 = document.createElement("div");
    tl2.className = "tlarea";
    tl2.innerHTML = "控制";
    tl2.id = "tl2";

    const tscrs = document.createElement("div");
    tscrs.className = "la2t";
    tscrs.id = "tscrs";
    tscrs.innerHTML = "元素捕获工具";
    const escrs = document.createElement("btn");
    escrs.className = "on";
    escrs.innerHTML = "启用";
    escrs.onclick = () => {
        inf("已启用元素捕获工具！");
        ofscrt = true;
    };
    const dscrs = document.createElement("btn");
    dscrs.className = "off";
    dscrs.innerHTML = "禁用";
    dscrs.onclick = () => {
        inf("已禁用元素捕获工具！");
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
        rw.className = "rw";
        document.body.appendChild(rw);
    }
    const rt = document.createElement("div");
    rt.className = "t";
    rt.innerHTML = "未读信息";
    const ri = document.createElement("img");
    ri.className = "i";
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