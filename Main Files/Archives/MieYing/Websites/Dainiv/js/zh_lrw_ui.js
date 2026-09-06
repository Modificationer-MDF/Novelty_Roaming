let la1doms = []; // “功能” 元素。
let la2doms = []; // “控制” 元素。
let ra1doms = []; // “屏蔽管理” 元素。
let activep = false;
let phl = null; // 创建高亮层（半透明覆盖）。
let nowp = null; // 当前高亮元素。
let prevp = null; // 上一个元素。
let pickover = false;
let ble = []; // 屏蔽列表

function clean_status() {
    if (activep) {
        if (phl) phl.remove();
        if (window.picklisteners) {
            document.removeEventListener("mousemove", window.picklisteners.move);
            document.removeEventListener("click", window.picklisteners.click);
            window.picklisteners = null;
        }
        if (prevp) {
            prevp.classList.remove("phl");
            prevp = null;
        }
        activep = false;
        nowp = null;
    }
}

function selector(el) {
    if (el.id) return "#" + el.id;
    let path = [];
    let cur = el;
    while (cur && cur !== document.body) {
        let sel = cur.tagName.toLowerCase();
        if (cur.className && typeof cur.className === "string") {
            let classes = cur.className.trim().split(/\s+/).filter(cls => cls !== "phl");
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
    clean_status();

    activep = true;
    phl = document.createElement("div");
    phl.classList.add("phl-highlight");
    phl.style.left = "0px";
    phl.style.top = "0px";
    phl.style.width = "0px";
    phl.style.height = "0px";
    document.body.appendChild(phl);

    const move_handler = (e) => {
        if (!activep) return;
        const el = e.target;
        if (el === phl) return;
        const rect = el.getBoundingClientRect();
        phl.style.left = rect.left + window.scrollX + "px";
        phl.style.top = rect.top + window.scrollY + "px";
        phl.style.width = rect.width + "px";
        phl.style.height = rect.height + "px";
        if (prevp) prevp.classList.remove("phl");
        el.classList.add("phl");
        prevp = el;
    };

    const click_handler = async (e) => {
        if (!activep) return;
        const el = e.target;
        if (el === phl) return;
        e.preventDefault();
        e.stopPropagation();

        const container = document.getElementById(v);
        if (!container) {
            if (phl) phl.remove();
            activep = false;
            return;
        }

        const boxes = container.querySelectorAll(".inp-box");
        if (!boxes.length) {
            if (phl) phl.remove();
            activep = false;
            return;
        }

        const sele = selector(el);
        if (!sele || sele.trim() === "") return;

        // 收集提示文字。
        const prompts = [];
        boxes.forEach((box) => {
            const prev = box.previousElementSibling;
            const idx = parseInt(box.dataset.index, 10) + 1;
            if (prev && prev.classList.contains("inp-prompt")) {
                prompts.push(prev.textContent.trim() || `输入框 ${idx}`);
            } else {
                prompts.push(`输入框 ${idx}`);
            }
        });

        const result = await xz({
            str: "请选择要填入的输入框。",
            n: prompts.length,
            names: prompts,
            tit: "选择目标",
            id: "pick_target"
        });

        if (!result || !result.length) return;

        result.forEach((selected) => {
            // 从文本中提取数字：匹配 "输入框 X" 中的 X。
            const match = selected.match(/(\d+)/);
            if (!match) return;
            const idx = parseInt(match[1], 10) - 1;
            if (idx >= 0 && idx < boxes.length) {
                boxes[idx].value = sele;
            }
        });

        // 聚焦到最后一个被填充的框或第一个。
        const lastIdx = result.length > 0 ? parseInt(result[result.length - 1].match(/(\d+)/)[1], 10) - 1 : 0;
        if (lastIdx >= 0 && lastIdx < boxes.length) {
            boxes[lastIdx].focus();
        }
    };

    const esc_handler = (e) => {
        if (e.key === "Escape") {
            if (phl) phl.remove();
            activep = false;
            inf({ str: "已退出元素捕获模式。" });
        }
    };

    document.addEventListener("keydown", esc_handler, { once: true });
    document.addEventListener("mousemove", move_handler);
    document.addEventListener("contextmenu", click_handler);

    window.picklisteners = {
        move: move_handler,
        click: click_handler
    };
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
        document.removeEventListener("click", window.picklisteners.click);
        window.picklisteners = null;
    }
    if (prevp) {
        prevp.classList.remove("phl");
        prevp = null;
    }
    nowp = null;
}

function screenshot() {
    if (typeof html2canvas === "undefined") { // 加载 html2canvas。
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.onload = () => {
            cac();
        };
        script.onerror = () => {
            fail({ str: "html2canvas 加载失败，请检查网络后重试。" });
        };
        document.head.appendChild(script);
    } else {
        cac();
    }

    async function cac() {
        if (ofscrt) pickele("scr");
        let ls2 = await inp({ str: "输入该元素的 CSS 选择器字符串。", tit: "输入", id: "scr" });
        let sc = document.querySelector(ls2);

        if (!sc) {
            fail({ str: "未找到元素。" });
            finishpick();
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
                cg({ str: "截图已复制到剪贴板！" });
            } catch (err) {
                caut({ str: `刚才，尝试截图时发生了错误，以下是详细信息：<code style="err">“${err}”</code>。` });
                canvas.toDataURL();
            }
        } catch (err) {
            if (err.message && err.message.includes("Failed to execute 'toBlob' on 'HTMLCanvasElement'")) {
                fail({ str: "Canvas 导出失败：可能由于 Canvas 被污染（包含跨域内容）或浏览器限制。建议使用本地 HTTP 服务器打开页面（如 http://localhost）以避免 file:// 协议的限制。" });
            }
            else if (err.message && err.message.includes("html2canvas") && err.message.includes("not a function")) {
                fail({ str: "html2canvas 库未正确加载，请刷新页面后重试。" });
                let rq = await conf({ str: "是否刷新页面？" });
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && err.message.includes("Element is not attached to DOM")) {
                fail({ str: "目标元素已从 DOM 中移除，请刷新页面后重试。" });
                let rq = await conf({ str: "是否刷新页面？" });
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && (err.message.includes("Maximum") || err.message.includes("size"))) {
                fail({ str: "截图区域过大（超过浏览器能处理的最大尺寸），请尝试缩小截图范围或降低 scale 参数。" });
            }
            else if (err.message && err.message.includes("timeout")) {
                fail({ str: "截图超时，可能是页面过于复杂或网络问题，请简化页面后重试。" });
            }
            else {
                fail({ str: `截图时发生错误：<code style="err">${err.message || err}</code>` });
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
        lw.classList.add("lw");
        document.body.appendChild(lw);
    }
    const lt = document.createElement("div");
    lt.classList.add("t");
    lt.innerHTML = "选项";
    const li = document.createElement("img");
    li.classList.add("i");
    li.src = "Dainiv/images/Options.png";
    li.alt = "";

    lw.appendChild(lt);
    lt.appendChild(li);

    // 欢迎来到 la1doms！

    const lf1 = document.createElement("div");
    lf1.classList.add("lf1");
    const lf1i = document.createElement("div");
    lf1i.classList.add("lf1i");

    lw.appendChild(lf1);
    lf1.appendChild(lf1i);

    const scs = document.createElement("btn");
    scs.classList.add("scs");
    scs.innerHTML = "截图";
    scs.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "如何查看元素的 id？",
            "如何打开开发者工具？",
            "如何输入？",
            "截图失败怎么办？",
            "CSS 选择器是什么？"
        ];
        const lsxz = await xz({ str: "请选择你需要了解的问题。", n: 1, names: qs, tit: "帮助" });
        if (!lsxz) return;
        let lsans = "";
        switch (lsxz[0]) {
            case "如何查看元素的 id？":
                lsans = "1. 按 F12 打开开发者工具。<br />2. 点击左上角的“选择元素”图标（箭头）。<br />3. 点击页面上的目标区域。<br />4. 在 Elements 面板中看该元素有没有 id=“xxx” 属性。<br />5. 或者右键元素 → 检查 → 直接查看高亮行的 id 属性。";
                break;
            case "如何打开开发者工具？":
                lsans = "按 F12 键（部分笔记本需按 Fn+F12）。<br />或者右键页面空白处 → 检查。<br />或者浏览器菜单 → 更多工具 → 开发者工具。";
                break;
            case "如何输入？":
                lsans = "输入 CSS 选择器字符串。<br />例如：.score-container  或   #main  或   div.header<br />支持.class、#id、标签名、属性选择器等。";
                break;
            case "截图失败怎么办？":
                lsans = "1. 尝试刷新页面后重试。<br />2. 检查是否包含跨域图片（可先将图片替换或隐藏）。<br />3. 改用浏览器自带截图（Ctrl+Shift+S 或 Windows 截图工具）。<br />4. 如果持续失败，可尝试复制页面链接到其他浏览器。";
                break;
            case "CSS 选择器是什么？":
                lsans = "CSS 选择器是一种用特定语法定位页面元素的模式。<br />• .class 选择类名<br />• #id 选择 id<br />• div 选择所有 div 标签<br />• .container .item 选择后代元素<br />更多用法可搜索“CSS 选择器参考”。";
                break;
            default:
                return;
        }
        mb({ str: lsans, tit: "解答" });
    };
    scs.onclick = () => {
        screenshot();
    };
    const larea1 = document.createElement("div");
    larea1.classList.add("larea1");
    const tl1 = document.createElement("div");
    tl1.classList.add("tlarea");
    tl1.innerHTML = "功能";
    tl1.id = "tl1";
    const pr = document.createElement("btn");
    pr.classList.add("pr");
    pr.innerHTML = "打印本页";
    pr.onclick = async () => {
        await noti({ str: "请在接下来的窗口中完成操作。" });
        setTimeout(() => {
            window.print();
        }, 1);
    };
    const share = document.createElement("btn");
    share.classList.add("share");
    share.innerHTML = "复制当前网址";
    share.onclick = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            suc({ str: "已将本页面网址复制到剪贴板！" });
        } catch {
            err({ str: "复制失败，请手动复制地址栏。" });
        }
    };
    const reportying = document.createElement("btn");
    reportying.classList.add("reportying");
    reportying.innerHTML = "举报“蝇”信息";
    reportying.onclick = async () => {
        if (ofscrt) pickele("rying");
        let ls_1 = await inp({ str: "在此输入对应“蝇”信息的 CSS 选择器。", tit: "输入", id: "rying" });
        try {
            let ying = document.querySelector(ls_1);
            let con = await conf({
                string: `
            该元素内容已显示在分隔线下方。请确认。
            <div class="line1"></div>
            ${ying.textContent}`
            });

            if (con) {
                await console.log(ying.textContent);
                cg({ str: "你的举报已反馈到“Chanf 灭蝇组织”，感谢你的配合。" });
            }
        } catch (e) {
            fail({ str: `报错：<code class="err">${e}</code>` });
        }
    };
    reportying.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "“蝇”是什么？",
            "为什么要灭“蝇”？",
            "举报结果将向谁发送？",
        ];
        const lsxz = await xz({ str: "请选择你需要了解的问题。", n: 1, names: qs, tit: "帮助" });
        if (!lsxz) noti({ str: "无论您是否参与，请您记住，灭“蝇”就是守护生命。" });
        let lsans = "";
        switch (lsxz[0]) {
            case "“蝇”是什么？":
                lsans = "“蝇”是指在网络上传播的人身攻击、开盒、KY、低龄言论等不良信息。它们像苍蝇一样令人反感，故称“蝇”。";
                break;
            case "为什么要灭“蝇”？":
                lsans = "灭“蝇”是为了净化 HF Net。请您记住，灭“蝇”就是守护生命。";
                break;
            case "举报结果将向谁发送？":
                lsans = "您的举报将直接提交至“Chanf 灭蝇组织”后台，由管理员核实后将进行惩罚措施，包括但不限于删除原信息、封禁放蝇者（发送“蝇”信息的用户）若干时长等处罚。";
                break;
            default:
                return;
        }
        mb({ str: lsans, tit: "解答" });
    };

    const fingerprint = document.createElement("btn");
    fingerprint.classList.add("fingerprint");
    fingerprint.innerHTML = "查看信息指纹";
    fingerprint.onclick = async () => {
        const content = document.body.textContent;
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        const fpstr = hash.toString(16).padStart(8, "0").toUpperCase();
        noti({ str: `<code style="font-size: 25px">${fpstr}</code>`, tit: "信息指纹" });
    };

    const trace = document.createElement("btn");
    trace.classList.add("trace");
    trace.innerHTML = "追溯来源";
    trace.onclick = async () => {
        const url = window.location.href;
        const referrer = document.referrer || "无（直接访问）";
        const ua = navigator.userAgent.slice(0, 60) + "……";

        mb({
            str: `
        <table>
            <tr><td class="label">URL</td><td class="value"><code>${url}</code></td></tr>
            <tr><td class="label">本地时间</td><td class="value">${xzsj()}</td></tr>
            <tr><td class="label">来源</td><td class="value"><code>${referrer}</code></td></tr>
            <tr><td class="label">用户代理</td><td class="value">${ua}</td></tr>
        </table>
    `,
            tit: "来源追溯"
        });
    };

    const snapshot = document.createElement("btn");
    snapshot.classList.add("snapshot");
    snapshot.innerHTML = "快照存档";
    snapshot.onclick = async () => {
        const confirmed = await conf({ str: "将当前页面内容保存到 HF Net 公共存档节点？" });
        if (!confirmed) return;
        const snapshotId = Date.now().toString(36).toUpperCase();
        cg({ str: `页面已存档，存档编号：<code>cd-${snapshotId}</code>` });
    };

    async function blocking(cont) {
        if (activep) finishpick();
        clean_status();

        if (ofscrt) pickele("block");

        const sel = await inp({ str: cont, tit: "输入", id: "block" });
        if (!sel) return;

        try {
            const newelem = document.querySelectorAll(sel);
            if (!newelem || newelem.length === 0) {
                err({ str: "未找到元素。" });
                finishpick();
                return;
            }

            const blockedelem = new Set();
            ble.forEach((existingSel) => {
                document.querySelectorAll(existingSel).forEach(el => {
                    blockedelem.add(el);
                });
            });

            const hideelem = [];
            newelem.forEach(el => {
                if (!blockedelem.has(el)) {
                    hideelem.push(el);
                }
            });

            if (hideelem.length === 0) {
                finishpick();
                return;
            }

            hideelem.forEach(e => {
                e.style.transition = `all 0.2s ${easing}`;
                e.style.opacity = 0;
                e.addEventListener("transitionend", () => {
                    e.style.display = "none";
                }, { once: true });
            });

            ble.push(sel);
            render_bl();
            suc({ str: `已屏蔽 ${hideelem.length} 个元素。` });

        } catch (err) {
            fail({ str: `发生了错误：<code class="err">“${err}”<code>` });
        }

        finishpick();
    }

    const block = document.createElement("btn");
    block.classList.add("block");
    block.innerHTML = "屏蔽";
    block.onclick = async () => {
        blocking("请输入要屏蔽元素的 CSS 选择器。");
    };
    block.oncontextmenu = async (e) => {
        e.preventDefault();
        let ls_multi = false;
        const qs = [
            "如何屏蔽？",
            "屏蔽后的效果？",
            "屏蔽后可以在哪里恢复？",
            "我想批量屏蔽。",
        ];
        const lsxz = await xz({ str: "请选择你需要了解的问题。", n: 1, names: qs, tit: "帮助" });
        if (!lsxz) return;
        let lsans = "";
        switch (lsxz[0]) {
            case "如何屏蔽？":
                lsans = "请点击屏蔽按钮，随后选择或手动输入所要屏蔽元素的 CSS 选择器。";
                break;
            case "屏蔽后的效果？":
                lsans = "元素被屏蔽后，将从 DOM 中“消失”。但这不代表它被移除，它只是隐藏了。";
                break;
            case "屏蔽后可以在哪里恢复？":
                lsans = "请将鼠标滑动到网页的右上角以访问“屏蔽管理”。在那里可以恢复被屏蔽的元素。";
                break;
            case "我想批量屏蔽。":
                ls_multi = true;
                break;
            default:
                return;
        }
        if (ls_multi) {
            let ls_amount = await inp({ str: "请输入要屏蔽元素的数量。" });
            ls_amount = Number(ls_amount)
            if (isNaN(ls_amount)) {
                fail({ str: "无效输入。请输入纯数字。" });
                return;
            }
            else if (ls_amount <= 0) {
                fail({ str: "所输入的数字需要大于 0。" });
                return;

            } else if (ls_amount % 1 != 0) {
                fail({ str: "所输入的数字需要为整数。" });
                return;
            } else {
                stringlist = []
                for (let i = 1; i <= ls_amount; i++) {
                    stringlist.push(`请输入第 ${i} 个元素的 CSS 选择器。`);
                }
                await blocking(stringlist);
            }
        } else {
            mb({ str: lsans, tit: "解答" });
        }
    }

    const ter = document.createElement("btn");
    ter.classList.add("ter");
    ter.innerHTML = "打开终端";
    ter.onclick = () => {
        zd({ str: "请在此输入 JavaScript 代码。" });
    };

    la1doms.push(scs);
    la1doms.push(pr);
    la1doms.push(share);
    la1doms.push(reportying);
    la1doms.push(fingerprint);
    la1doms.push(trace);
    la1doms.push(snapshot);
    la1doms.push(block);
    la1doms.push(ter);

    lw.appendChild(larea1);
    larea1.appendChild(tl1);
    la1doms.forEach(dom => {
        larea1.appendChild(dom);
    });

    // 欢迎来到 la2doms！

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
    tl2.innerHTML = "控制";
    tl2.id = "tl2";

    const tscrs = document.createElement("div");
    tscrs.classList.add("la2t");
    tscrs.id = "tscrs";
    tscrs.innerHTML = "元素捕获工具";
    const escrs = document.createElement("btn");
    escrs.classList.add("on");
    escrs.innerHTML = "启用";
    escrs.onclick = () => {
        inf({ str: "已启用元素捕获工具！" });
        ofscrt = true;
    };
    const dscrs = document.createElement("btn");
    dscrs.classList.add("off");
    dscrs.innerHTML = "禁用";
    dscrs.onclick = () => {
        inf({ str: "已禁用元素捕获工具！" });
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
    rt.innerHTML = "屏蔽管理";
    const ri = document.createElement("img");
    ri.classList.add("i");
    ri.src = "Dainiv/images/Blocking Management.png";
    ri.alt = "";

    rw.appendChild(rt);
    rt.appendChild(ri);

    const rf1 = document.createElement("div");
    rf1.classList.add("rf1");
    const rf1i = document.createElement("div");
    rf1i.classList.add("rf1i");

    rw.appendChild(rf1);
    rf1.appendChild(rf1i);

    const blocked = document.createElement("div");
    blocked.className = "rw-blocked";

    rw.appendChild(blocked);

    function render_bl(immediate) {
        const items = ble || [];
        blocked.innerHTML = "";

        if (items.length === 0) {
            const emsg = document.createElement("div");
            emsg.className = "rw-empty";
            emsg.textContent = "暂无屏蔽内容。";
            emsg.style.opacity = 0;
            emsg.style.transition = `opacity 0.2s ${easing}`;
            blocked.appendChild(emsg);
            requestAnimationFrame(() => {
                emsg.style.opacity = 1;
            });
            ra1doms = [];
            return;
        }

        items.forEach((selector, index) => {
            blocked.innerHTML += `
            <div class="rw-blockitem" data-index="${index}">
                <code class="selector">${selector}</code>
                <button class="rw-unblocker" data-index="${index}">恢复</button>
            </div>
        `;
        });

        ra1doms = Array.from(blocked.querySelectorAll(".rw-blockitem"));

        if (immediate) {
            ra1doms.forEach(dom => {
                dom.style.opacity = 1;
                dom.style.transform = "translateY(25px)";
            });
        } else if (rw_moved) {
            ra1doms.forEach((dom, idx) => {
                dom.style.opacity = 0;
                dom.style.transform = "translateY(-20px)";
                dom.style.transition = `all 0.2s ${easing}`;
                setTimeout(() => {
                    dom.style.opacity = 1;
                    dom.style.transform = "translateY(25px)";
                }, idx * 70);
            });
        } else {
            ra1doms.forEach(dom => {
                dom.style.opacity = 0;
                dom.style.transform = "translateY(-20px)";
                dom.style.transition = `all 0.2s ${easing}`;
            });
        }

        blocked.querySelectorAll(".rw-unblocker").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.index);
                unblock(idx);
            });
        });
    }

    function unblock(index) {
        const items = ble || [];
        if (index < 0 || index >= items.length) return;

        const selector = items[index];

        const el = document.querySelector(selector);
        if (!el) {
            fail({ str: `未找到要恢复的元素，选择器：“<code>${selector}</code>”。` });
            items.splice(index, 1);
            render_bl(true);
            return;
        }

        el.style.display = "";
        el.style.opacity = "";
        el.style.transition = "";

        const tel = ra1doms[index]; // 目标元素。
        if (tel) {
            tel.style.transition = `all 0.2s ${easing}`;
            tel.style.opacity = 0;
            tel.style.transform = "translateY(-30px)";
            tel.style.height = 0;
            tel.style.padding = "0 12px";
            tel.style.marginBottom = 0;
            tel.style.overflow = "hidden";
            setTimeout(() => {
                items.splice(index, 1);
                render_bl(true);
            }, 200);
        } else {
            items.splice(index, 1);
            render_bl(true);
        }
    }
    render_bl(true);
}

let lw_moved = false;
let rw_moved = false;

init_ui();

function lw_anim(stat) {
    const lw = document.querySelector(".lw");
    const lf1 = document.querySelector(".lf1");
    const lf1i = document.querySelector(".lf1i");
    const larea1 = document.querySelector(".larea1");
    const tl1 = document.getElementById("tl1");
    const lf2 = document.querySelector(".lf2");
    const lf2i = document.querySelector(".lf2i");
    const larea2 = document.querySelector(".larea2");
    const tl2 = document.getElementById("tl2");

    if (stat === "in") {
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
    } else if (stat === "out") {
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
}

function rw_anim(stat) {
    const rw = document.querySelector(".rw");
    const rf1 = document.querySelector(".rf1");

    if (stat === "in") {
        rw.style.animation = `in_rw 0.6s forwards ${easing}`;

        setTimeout(() => {
            rf1.style.animation = `in_rf 0.6s forwards ${easing}`;
            setTimeout(() => {
                if (ra1doms.length > 0) {
                    ra1doms.forEach((dom, idx) => {
                        dom.style.transition = `all 0.2s ${easing}`;
                        setTimeout(() => {
                            dom.style.opacity = 1;
                            dom.style.transform = "translateY(20px)";
                        }, idx * 70);
                    });
                }
            }, 100);
        }, 100);

        rw.addEventListener("animationend", () => {
            rw_moved = true;
        }, { once: true });
    } else if (stat === "out") {
        rw.style.animation = `out_rw 0.6s forwards ${fasing}`;

        setTimeout(() => {
            rf1.style.animation = `out_rf 0.6s forwards ${easing}`;
            setTimeout(() => {
                ra1doms.forEach(dom => {
                    dom.style.opacity = 0;
                    dom.style.right = "-100%";
                    dom.style.transform = "translateY(0)";
                });
            }, 100);
        }, 100);

        rw.addEventListener("animationend", function () {
            rw_moved = false;
        }, { once: true });
    }
}

document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const lw = document.querySelector(".lw");
    const rw = document.querySelector(".rw");

    if (x <= 50 && y <= 50 && !lw_moved) { // 移动到左上角。
        lw_anim("in");
    } else if (x > Number(getComputedStyle(lw).width.replace("px", "")) && lw_moved) {
        lw_anim("out");
    }

    if (x >= window.innerWidth - 50 && y <= 50 && !rw_moved) {
        rw_anim("in");
    }
    else if (x < (window.innerWidth - Number(getComputedStyle(rw).width.replace("px", ""))) && rw_moved) {
        rw_anim("out");
    }
});