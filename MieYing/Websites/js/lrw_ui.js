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

function pickele() {
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
        const box = document.getElementById("scr").querySelector(".inp-box");
        if (box) {
            box.value = sele;
        } else {
            warn("没有正在等待输入的截图窗口，请先点击截图按钮并等待输入弹窗。");
        }
        stop_pick();
    };
    document.addEventListener("mousemove", move_handler);
    document.addEventListener("click", click_handler, { capture: true });
    window.picklisteners = { move: move_handler, click: click_handler };
}

function stop_pick() {
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
            fail(`出现了错误：“${err.message}”。`);
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

    lw.appendChild(lf1);

    const scs = document.createElement("btn");
    scs.className = "scs";
    scs.innerHTML = "截图元素";
    scs.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "如何查看元素的 id？",
            "如何打开开发者工具？",
            "querySelector 怎么写？",
            "截图失败怎么办？",
            "什么是 CSS 选择器？"
        ];
        const lsxz1 = await xz("请选择你需要了解的问题：", 1, qs, "截图帮助");
        if (!lsxz1) return;
        let lsans1 = "";
        switch (lsxz1[0]) {
            case "如何查看元素的 id？":
                lsans1 = "1. 按 F12 打开开发者工具。<br />2. 点击左上角的“选择元素”图标（箭头）。<br />3. 点击页面上的目标区域。<br />4. 在 Elements 面板中看该元素有没有 id=“xxx” 属性。<br />5. 或者右键元素 → 检查 → 直接查看高亮行的 id 属性。";
                break;
            case "如何打开开发者工具？":
                lsans1 = "按 F12 键（部分笔记本需按 Fn+F12）。<br />或者右键页面空白处 → 检查。<br />或者浏览器菜单 → 更多工具 → 开发者工具。";
                break;
            case "querySelector 怎么写？":
                lsans1 = "输入 CSS 选择器字符串。<br />例如：.score-container  或   #main  或   div.header<br />支持.class、#id、标签名、属性选择器等。";
                break;
            case "截图失败怎么办？":
                lsans1 = "1. 尝试刷新页面后重试。<br />2. 检查是否包含跨域图片（可先将图片替换或隐藏）。<br />3. 改用浏览器自带截图（Ctrl+Shift+S 或 Windows 截图工具）。<br />4. 如果持续失败，可尝试复制页面链接到其他浏览器。";
                break;
            case "什么是 CSS 选择器？":
                lsans1 = "CSS 选择器是一种用特定语法定位页面元素的模式。<br />• .class 选择类名<br />• #id 选择 id<br />• div 选择所有 div 标签<br />• .container .item 选择后代元素<br />更多用法可搜索“CSS 选择器参考”。";
                break;
            default:
                return;
        }
        mb(lsans1, selected);
    };
    scs.onclick = () => {
        screenshot();
        pickele();
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
            cg("已将本页面网址复制到剪贴板！");
        }).catch(() => {
            fail("复制失败，请手动复制地址栏。");
        });
    };
    const reload = document.createElement("reload");
    reload.className = "reload";
    reload.innerHTML = "刷新页面";
    reload.onclick = async () => {
        await rz("页面将在该窗口消失后刷新。");
        window.location.reload();
    };

    la1doms.push(scs);
    la1doms.push(pr);
    la1doms.push(share);
    la1doms.push(reload);

    lw.appendChild(larea1);
    larea1.appendChild(tl1);
    la1doms.forEach(dom => {
        larea1.appendChild(dom);
    });

    const lf2 = document.createElement("div");
    lf2.className = "lf2";

    lw.appendChild(lf2);

    const larea2 = document.createElement("div");
    larea2.className = "larea2";
    const tl2 = document.createElement("div");
    tl2.className = "tlarea";
    tl2.innerHTML = "控制";
    tl2.id = "tl2";

    const fscrt = document.createElement("div");
    fscrt.className = "la2t";
    fscrt.innerHTML = "全屏模式";
    const ifscr = document.createElement("btn");
    ifscr.className = "ifscr";
    ifscr.innerHTML = "开启";
    ifscr.onclick = async () => {
        await noti("点击“知晓”进入全屏模式。");
        document.documentElement.requestFullscreen();
    };
    const ofscr = document.createElement("btn");
    ofscr.className = "ofscr";
    ofscr.innerHTML = "退出";
    ofscr.onclick = async () => {
        await noti("点击“知晓”退出全屏模式。");
        document.exitFullscreen();
    };

    lw.appendChild(larea2);
    larea2.appendChild(tl2);
    la2doms.push(fscrt);
    la2doms.push(ifscr);
    la2doms.push(ofscr);
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
    const larea1 = document.querySelector(".larea1");
    const tl1 = document.getElementById("tl1");
    const lf2 = document.querySelector(".lf2");
    const larea2 = document.querySelector(".larea2");
    const tl2 = document.getElementById("tl2");

    if (x <= 50 && y <= 50 && !lw_moved) {
        larea1.style.transition = `all 0.6s ${easing}`;
        larea2.style.transition = `all 0.6s ${easing}`;
        lw.style.animation = `jr_lw 0.6s forwards ${easing}`;
        setTimeout(() => {
            lf1.style.animation = `jr_lf 0.6s forwards ${easing}`;
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
                    lf2.style.animation = `jr_lf 0.6s forwards ${easing}`;
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
        lw.style.animation = `cc_lw 0.6s forwards ${fasing}`;
        larea1.style.transition = "all 0.6s cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            lf1.style.animation = `cc_lf 0.6s forwards ${easing}`;
            lf2.style.animation = `cc_lf 0.6s forwards ${easing}`;
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
        rw.style.animation = `jr_rw 0.6s forwards ${easing}`;
        rw.addEventListener("animationend", function () {
            rw_moved = true;
        }, { once: true });
    }
    else if (x < (window.innerWidth - Number(getComputedStyle(rw).width.replace("px", ""))) && rw_moved) {
        rw.style.animation = `cc_rw 0.6s forwards ${fasing}`;
        rw.addEventListener("animationend", function () {
            rw_moved = false;
        }, { once: true });
    }
});