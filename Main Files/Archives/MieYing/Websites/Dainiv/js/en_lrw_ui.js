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
                prompts.push(`"${prev.textContent.trim()}"` || `Input box ${idx}`);
            } else {
                prompts.push(`Input box ${idx}`);
            }
        });

        const result = await xz({
            str: "Please select the input box you want to input.",
            n: 1,
            names: prompts,
            tit: "Picking target",
            id: "pick_target",
            form: "brief",
        });

        if (!result || !result[0]) return;

        for (const selected of result) {
            if (!selected) continue;
            const match = selected.match(/(\d+)/);
            if (!match) continue;
            const idx = parseInt(match[1], 10) - 1;
            if (idx >= 0 && idx < boxes.length) {
                boxes[idx].value = sele;
                boxes[idx].focus();
            }
        }

        // 聚焦到最后一个被填充的框或第一个。
        let last_idx = 0;
        if (result && result.length > 0) {
            const last_item = result[result.length - 1];
            if (last_item) {
                const match = String(last_item).match(/(\d+)/);
                if (match) {
                    last_idx = parseInt(match[1], 10) - 1;
                }
            }
        }

        if (last_idx >= 0 && last_idx < boxes.length) {
            boxes[last_idx].focus();
            boxes[last_idx].value = sele;
        }
    };

    const esc_handler = (e) => {
        if (e.key === "Escape") {
            if (phl) phl.remove();
            activep = false;
            inf({ str: "You've quit ECT." });
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

async function screenshot() {
    if (typeof html2canvas === "undefined") { // 加载 html2canvas。
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.onload = () => {
            cac();
        };
        script.onerror = () => {
            fail({ str: "Failed to load html2canvas, check your internet connection then try again." });
        };
        document.head.appendChild(script);
    } else {
        cac();
    }

    async function cac() {
        if (ofscrt) pickele("scr");
        let ls2 = await inp({ str: "Input the CSS selector of the element.", tit: "Input", id: "scr" });

        try {
            if (ls2 === null) {
                throw new Error("Failed to found the element.");
            }
            let sc = document.querySelector(ls2);

            if (!sc) {
                fail({ str: "Failed to found the element." });
                finishpick();
                return;
            }

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
                cg({ str: "The screenshot has just been copied to the clipboard." });
            } catch (err) {
                caut({ str: `An error occured while processing screenshotting: <code style="err">"${err}"</code>.` });
                canvas.toDataURL();
            } finally {
                finishpick();
            }
        } catch (err) {
            if (err.message && err.message.includes("Failed to execute 'toBlob' on 'HTMLCanvasElement'")) {
                fail({ str: "Fail to access Canvas export: It may be caused by Canvas pollution (including cross-origin contents) or browser restrictions. It is recommended to open the page using a local HTTP server (e.g., http://localhost) to avoid the limitations of the file:// protocol." });
            }
            else if (err.message && err.message.includes("html2canvas") && err.message.includes("not a function")) {
                fail({ str: "Failed to load html2canvas, refresh the page and try again." });
                let rq = await conf({ str: "Reload the page?" });
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && err.message.includes("Element is not attached to DOM")) {
                fail({ str: "The target element has been removed from DOM, please refresh the page and try again." });
                let rq = await conf({ str: "Reload the page?" });
                if (rq) {
                    window.location.reload();
                }
            }
            else if (err.message && (err.message.includes("Maximum") || err.message.includes("size"))) {
                fail({ str: "Screenshot area is too large (exceeds the maximum size the browser can handle), please try to reduce the screenshot area or lower the scale parameter." });
            }
            else if (err.message && err.message.includes("timeout")) {
                fail({ str: "Screenshot timed out, the page may be too complex or there may be network issues, please simplify the page and try again." });
            }
            else {
                fail({ str: `An error occurred while taking the screenshot: <code class="err">${err.message || err}</code>.` });
            }
            console.error(`An error occurred: ${err}.`);
        } finally {
            finishpick();
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
    lt.innerHTML = "Options";
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
    scs.innerHTML = "Screenshot";
    scs.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "How to view the element's id?",
            "How to open developer tools?",
            "How to input?",
            "What to do if the screenshot fails?",
            "What is a CSS selector?"
        ];
        const lsxz = await xz({ str: "Please select the problem you want to know.", n: 1, names: qs, tit: "Help Center", form: "brief" });
        if (!lsxz) return;
        let lsans = "";
        switch (lsxz[0]) {
            case "How to view the element's id?":
                lsans = "1. Press F12 to open Developer Tools.<br />2. Click the 'Select Element' icon (arrow) in the top left corner.<br />3. Click the target area on the page.<br />4. In the Elements panel, check if the element has an id=\"xxx\" attribute.<br />5. Or right-click the element → Inspect → directly view the id attribute of the highlighted line.";
                break;
            case "How to open developer tools?":
                lsans = "Press F12 (some laptops require pressing Fn+F12).<br />Or right-click on the blank area of the page → Inspect.<br />Or browser menu → More Tools → Developer Tools.";
                break;
            case "How to input?":
                lsans = "Enter the CSS selector string.<br />For example: .score-container  or   #main  or   div.header<br />Supports .class, #id, tag name, attribute selectors, etc.";
                break;
            case "What to do if the screenshot fails?":
                lsans = "1. Try refreshing the page and retry.<br />2. Check if there are any cross-origin images (you can replace or hide the images first).<br />3. Use the browser's built-in screenshot tool (Ctrl+Shift+S or Windows Snipping Tool).<br />4. If it continues to fail, try copying the page link to another browser.";
                break;
            case "What is a CSS selector?":
                lsans = "A CSS selector is a pattern used to select elements on a web page based on specific syntax.<br />• .class selects elements with the specified class<br />• #id selects the element with the specified id<br />• div selects all div elements<br />• .container .item selects descendant elements<br />For more usage, you can search for 'CSS Selector Reference'.";
                break;
            default:
                return;
        }
        mb({ str: lsans, tit: "Answer", form: "brief" });
    };
    scs.onclick = () => {
        screenshot();
    };
    const larea1 = document.createElement("div");
    larea1.classList.add("larea1");
    const tl1 = document.createElement("div");
    tl1.classList.add("tlarea");
    tl1.innerHTML = "Functions";
    tl1.id = "tl1";
    const pr = document.createElement("btn");
    pr.classList.add("pr");
    pr.innerHTML = "Print this page";
    pr.onclick = async () => {
        await noti({ str: "Please process in the following window." });
        setTimeout(() => {
            window.print();
        }, 39);
    };
    const share = document.createElement("btn");
    share.classList.add("share");
    share.innerHTML = "Copy Current URL";
    share.onclick = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            suc({ str: "The URL of this page has been copied to the clipboard！" });
        } catch {
            err({ str: "Failed to copy. Try to copy manually." });
        }
    };
    const reportying = document.createElement("btn");
    reportying.classList.add("reportying");
    reportying.innerHTML = 'Report "Ying" information';
    reportying.onclick = async () => {
        if (ofscrt) pickele("rying");
        let ls_1 = await inp({ str: 'Enter the CSS selector of "Ying" information here.', id: "rying" });
        try {
            finishpick();
            let ying = document.querySelector(ls_1);
            let con = await conf({
                str: `
            The content of this element has been shown under the separator line. Please confirm.
            <div class="line1"></div>
            ${ying.textContent}`
            });

            if (con) {
                await console.log(ying.textContent);
                cg({ str: 'Your report has been feedbacked to Chanf "MieYing" Organization. Thank you for your cooperation.' });
            }
        } catch (e) {
            fail({ str: `An error occured: <code class="err">${e}</code>` });
        } finally {
            finishpick();
        }
    };
    reportying.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            'What is "Ying"?',
            'Why should we "MieYing"?',
            "Who will receive the report?",
        ];
        const lsxz = await xz({ str: "Please select the question you want to know.", n: 1, names: qs, tit: "Help", form: "brief" });
        if (!lsxz) noti({ str: "Whether you participate or not, please remember that MieYing is to protect life.", form: "brief" });
        let lsans = "";
        switch (lsxz[0]) {
            case 'What is "Ying"?':
                lsans = '"Ying" refers to harmful information such as personal attacks, doxxing, KY, and juvenile remarks spread on the Internet. They are as annoying as flies, hence the name "Ying".';
                break;
            case 'Why should we "MieYing"?':
                lsans = '"MieYing" is to purify HF Net. Please remember that MieYing is to protect life.';
                break;
            case "Who will receive the report?":
                lsans = 'Your report will be directly submitted to the backend of the "Chanf MieYing Organization". After the administrators verify it, they will take punitive measures, including but not limited to deleting the original information and banning the users who posted the "Ying" information for a certain period of time.';
                break;
            default:
                return;
        }
        mb({ str: lsans, tit: "Answer", form: "brief" });
    };

    const fingerprint = document.createElement("btn");
    fingerprint.classList.add("fingerprint");
    fingerprint.innerHTML = "View Information Fingerprint";
    fingerprint.onclick = async () => {
        const content = document.body.textContent;
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        const fpstr = hash.toString(16).padStart(8, "0").toUpperCase();
        noti({ str: `<code style="font-size: 25px">${fpstr}</code>`, tit: "Fingerprint" });
    };

    const trace = document.createElement("btn");
    trace.classList.add("trace");
    trace.innerHTML = "Trace Source";
    trace.onclick = async () => {
        const url = window.location.href;
        const referrer = document.referrer || "None (Direct Access)";
        const ua = navigator.userAgent.slice(0, 60) + "……";

        mb({
            str: `
        <table>
            <tr><td class="label">URL</td><td class="value"><code>${url}</code></td></tr>
            <tr><td class="label">Local Time</td><td class="value">${xzsj()}</td></tr>
            <tr><td class="label">Source</td><td class="value"><code>${referrer}</code></td></tr>
            <tr><td class="label">User Agent</td><td class="value">${ua}</td></tr>
        </table>
    `,
            tit: "Source Trace"
        });
    };

    const snapshot = document.createElement("btn");
    snapshot.classList.add("snapshot");
    snapshot.innerHTML = "Snapshot";
    snapshot.onclick = async () => {
        const confirmed = await conf({ str: "Save this page to HF Net public saving node?" });
        if (!confirmed) return;
        const snapshotId = Date.now().toString(36).toUpperCase();
        cg({ str: `The page has been archived, archive ID: <code>cd-${snapshotId}</code>` });
    };

    async function blocking(cont) {
        if (activep) finishpick();
        clean_status();

        if (ofscrt) pickele("block");

        let sel = await inp({ str: cont, id: "block" });
        finishpick();
        if (!sel) return;
        if (typeof sel !== "object") sel = [sel];
        let all_flag = false;

        for (let s of sel) {
            if (s.trim().includes("*")) {
                all_flag = true;
            }
        }

        if (all_flag) {
            let ls_c = await xz({ str: "Are you sure to block all elements?", tit: "Confirmation", n: 1, names: ["Yes.", "No."] });
            if (ls_c[0] !== "Yes.") {
                sel = sel.filter(s => !s.trim().includes("*"));
                if (sel.length !== 0) inf({ str: "Blocked elements that are not * only." });
                else {
                    inf({ str: "No elements were blocked this time." });
                    return;
                }
            }
        }

        try {
            const newelem = document.querySelectorAll(sel);
            if (!newelem || newelem.length === 0) {
                err({ str: "Element not found." });
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
            suc({ str: `Blocked ${hideelem.length} element${hideelem.length > 1 ? "s" : ""}.` });

        } catch (err) {
            fail({ str: `An error occured: <code class="err">${err}<code>.` });
        }
    }

    const block = document.createElement("btn");
    block.classList.add("block");
    block.innerHTML = "Block";
    block.onclick = async () => {
        let ls_amount = await inp({ str: "Please input the amount of elements waiting to be blocked.", form: "brief" });
        ls_amount = Number(ls_amount)
        if (isNaN(ls_amount)) {
            await fail({ str: "Invalid input. Please input a valid number.", form: "brief" });
            return;
        }
        else if (ls_amount <= 0) {
            await fail({ str: "The number inputted should be greater than 0.", form: "brief" });
            return;
        } else if (ls_amount % 1 != 0) {
            await fail({ str: "The number inputted should be an integer.", form: "brief" });
            return;
        } else if (ls_amount > 1425) {
            await warn({ str: "The number inputted should not be greater than 1425.", form: "brief" });
            return;
        } else {
            stringlist = []
            for (let i = 1; i <= ls_amount; i++) {
                stringlist.push(`Please input the CSS selector for element ${i}.`);
            }
            await blocking(stringlist);
        }
    };
    block.oncontextmenu = async (e) => {
        e.preventDefault();
        const qs = [
            "The effect after blocking?",
            "Where can I recover them after blocking?",
        ];
        const lsxz = await xz({ str: "Please select the question you want to know.", n: 1, names: qs, tit: "Help", form: "brief" });
        if (!lsxz) return;
        let lsans = "";
        switch (lsxz[0]) {
            case "The effect after blocking?":
                lsans = 'After the element is blocked, it will be "disappeared" from DOM. However, it does not mean that it was removed. It is just hidden';
                break;
            case "Where can I recover them after blocking?":
                lsans = `Please move your mouse to the upper-right corner to access "Blocking Management". You can recover elements that you've blocked.`;
                break;
            default:
                return;
        }
        mb({ str: lsans, tit: "Answer", form: "brief" });
    }

    const ter = document.createElement("btn");
    ter.classList.add("ter");
    ter.innerHTML = "Terminal";
    ter.onclick = () => {
        zd({ str: "Type JavaScript code here." });
    };
    ter.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        noti({ str: "Press Enter to insert a newline, press Shift+Enter to execute the code.", form: "brief" });
    });

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
    tl2.innerHTML = "Control";
    tl2.id = "tl2";

    const tscrs = document.createElement("div");
    tscrs.classList.add("la2t");
    tscrs.id = "tscrs";
    tscrs.innerHTML = "Element Capture Tool";
    const escrs = document.createElement("btn");
    escrs.classList.add("on");
    escrs.innerHTML = "Enable";
    escrs.onclick = async () => {
        inf({ str: `Element Capture Tool has been <strong style="color: #00bf00; brightness(1.25)">enabled</strong>!` });
        await set_and_do({
            varia: "ofscrt", val: true, func: `
        const tscrs = document.getElementById("tscrs");
        tscrs.style.borderTop = (ofscrt ? "10px solid #008e0099" : "10px solid #8e000099");
        tscrs.style.borderBottom = (ofscrt ? "10px solid #008e0099" : "10px solid #8e000099");` });
    };
    const dscrs = document.createElement("btn");
    dscrs.classList.add("off");
    dscrs.innerHTML = "Disable";
    dscrs.onclick = async () => {
        inf({ str: `Element Capture Tool has been <strong style="color: #bf0000; brightness(1.25)">disabled</strong>!` });
        await set_and_do({
            varia: "ofscrt", val: false, func: `
        const tscrs = document.getElementById("tscrs");
        tscrs.style.borderTop = (ofscrt ? "10px solid #008e0099" : "10px solid #8e000099");
        tscrs.style.borderBottom = (ofscrt ? "10px solid #008e0099" : "10px solid #8e000099");` });
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
    rt.innerHTML = "Blocking Management";
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
            emsg.textContent = "No blocked content.";
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
                <button class="rw-unblocker" data-index="${index}">Recover</button>
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
                }, idx * 25);
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
            fail({ str: `We haven't found the element that you'd like to recover, whose selector is "<code>${selector}</code>".` });
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
        larea1.style.transition = `all 0.8s ${easing}`;
        larea2.style.transition = `all 0.8s ${easing}`;
        lw.style.animation = `in_lw 0.8s forwards ${easing}`;
        setTimeout(() => {
            lf1.style.animation = `in_lf 0.8s forwards ${easing}`;
            lf1i.style.left = `503px`;
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
                    }, idx * 25);
                });

                setTimeout(() => {
                    lf2.style.animation = `in_lf 0.8s forwards ${easing}`;
                    lf2i.style.left = `503px`;
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
                            }, idx * 25);
                        });
                    }, 50);
                }, 50);
            }, 50);
        }, 50);

        lw.addEventListener("animationend", function () {
            lw_moved = true;
        }, { once: true });
    } else if (stat === "out") {
        lw.style.animation = `out_lw 0.8s forwards ${fasing}`;
        larea1.style.transition = "all 0.8s cubic-bezier(0.33, 1, 0.68, 1)";
        setTimeout(() => {
            lf1.style.animation = `out_lf 0.8s forwards ${easing}`;
            lf1i.style.left = "-20px";
            lf2.style.animation = `out_lf 0.8s forwards ${easing}`;
            lf2i.style.left = "-20px";

            la1doms.forEach((dom, idx) => {
                setTimeout(() => {
                    dom.style.opacity = 0;
                    dom.style.left = "-100%";
                }, 25 * idx);
            });
            larea1.style.height = 0;

            la2doms.forEach((dom, idx) => {
                setTimeout(() => {
                    dom.style.opacity = 0;
                    dom.style.left = "-100%";
                }, 25 * idx);
            });
            larea2.style.height = 0;
        }, 50);

        lw.addEventListener("animationend", function () {
            lw_moved = false;
        }, { once: true });
    }
}

function rw_anim(stat) {
    const rw = document.querySelector(".rw");
    const rf1 = document.querySelector(".rf1");

    if (stat === "in") {
        rw.style.animation = `in_rw 0.8s forwards ${easing}`;

        setTimeout(() => {
            rf1.style.animation = `in_rf 0.8s forwards ${easing}`;
            setTimeout(() => {
                if (ra1doms.length > 0) {
                    ra1doms.forEach((dom, idx) => {
                        dom.style.transition = `all 0.2s ${easing}`;
                        setTimeout(() => {
                            dom.style.opacity = 1;
                            dom.style.transform = "translateY(20px)";
                        }, idx * 25);
                    });
                }
            }, 50);
        }, 50);

        rw.addEventListener("animationend", () => {
            rw_moved = true;
        }, { once: true });
    } else if (stat === "out") {
        rw.style.animation = `out_rw 0.8s forwards ${fasing}`;

        setTimeout(() => {
            rf1.style.animation = `out_rf 0.8s forwards ${easing}`;
            ra1doms.forEach((dom, idx) => {
                setTimeout(() => {
                    dom.style.opacity = 0;
                    dom.style.right = "-100%";
                    dom.style.transform = "translateY(0)";
                }, idx * 25);
            });
        }, 50);

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