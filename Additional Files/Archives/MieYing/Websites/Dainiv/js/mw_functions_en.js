// 全局存储当前显示的窗口信息。
let winmaps = {};

async function noti(str, tit, id) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In Noti() function, argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In Noti() function, argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Notification";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Notification"; }
        if (id == null || id == undefined) id = "";

        let key = `noti|${tit}|${str}`;
        if (winmaps[key]) { // 确认该窗口第一次出现。若不是，则运行下列代码。
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");
        const count = document.createElement("div");

        mele.className = "noti-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;
        square.className = "noti-square";
        icon.src = "Dainiv/images/Notification.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "noti-okey";
        okey.innerHTML = "I understood";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;
        count.className = "noti-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            count.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            okey.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
        };

        okey.onmouseover = () => { ld(okey, "75%"); };
        okey.onmouseleave = () => { ld(okey, "100%"); };
        okey.onclick = () => {
            close_win();
            for (let r of win_obj.waitlist) r();
        };
    });
}

async function cg(str, tit, id) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Cg(), argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Cg(), argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Completed";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Completed"; }
        if (id == null || id == undefined) id = "";

        let key = `cg|${tit}|${str}`;
        if (winmaps[key]) { // 确认该窗口第一次出现。若不是，则运行下列代码。
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");
        const count = document.createElement("div");

        mele.className = "cg-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "cg-square";
        icon.src = "Dainiv/images/Suc.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "cg-okey";
        okey.innerHTML = "I understood";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;
        count.className = "cg-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            okey.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
        };

        okey.onmouseover = () => { ld(okey, "75%"); };
        okey.onmouseleave = () => { ld(okey, "100%"); };
        okey.onclick = () => {
            close_win();
            for (let r of win_obj.waitlist) r();
        };
    });
}

async function warn(str, tit, id) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Warn(), argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Warn(), argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Warning";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Warning"; }
        if (id == null || id == undefined) id = "";

        let key = `warn|${tit}|${str}`;
        if (winmaps[key]) { // 确认该窗口第一次出现。若不是，则运行下列代码。
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");
        const count = document.createElement("div");

        mele.className = "warn-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "warn-square";
        icon.src = "Dainiv/images/Exc.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "warn-zx";
        okey.innerHTML = "I understood";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;
        count.className = "warn-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            okey.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
        };

        okey.onmouseover = () => { ld(okey, "75%"); };
        okey.onmouseleave = () => { ld(okey, "100%"); };
        okey.onclick = () => {
            close_win();
            for (let r of win_obj.waitlist) r();
        };
    });
}

async function fail(str, tit, id) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Fail(), argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Fail(), argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Failed";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Failed"; }
        if (id == null || id == undefined) id = "";

        let key = `fail|${tit}|${str}`;
        if (winmaps[key]) { // 确认该窗口第一次出现。若不是，则运行下列代码。
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");
        const count = document.createElement("div");

        mele.className = "fail-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "fail-square";
        icon.src = "Dainiv/images/Err.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "fail-lj";
        okey.innerHTML = "I understood";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;
        count.className = "fail-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            okey.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
        };

        okey.onmouseover = () => { ld(okey, "75%"); };
        okey.onmouseleave = () => { ld(okey, "100%"); };
        okey.onclick = () => {
            close_win();
            for (let r of win_obj.waitlist) r();
        };
    });
}

async function inp(str, tit, id) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Inp(), argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Inp(), argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Input";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Input"; }
        if (id == null || id == undefined) id = "";

        let key = `inp|${tit}|${str}`;
        if (winmaps[key]) { // 确认该窗口第一次出现。若不是，则运行下列代码。
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const box = document.createElement("textarea");
        const count = document.createElement("div");

        mele.className = "inp-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "inp-square";
        icon.src = "Dainiv/images/Inp.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        box.name = "inputbox";
        box.type = "text";
        box.className = "inp-box";
        box.style.opacity = 0;
        box.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        count.className = "inp-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(box);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            box.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + box.getBoundingClientRect().height}px + ${window.getComputedStyle(box).marginBottom})`;
        });

        box.addEventListener("transitionend", () => { box.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = (value) => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            box.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r(value);
        };

        box.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const value = box.value;
                close_win(value);
            }
        });
    });
}

async function xz(str, n, names, tit, id) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Xz(), argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Xz(), argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Choose";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Choose"; }
        if (id == null || id == undefined) id = "";
        if (n > names.length) { fail("The terms given are not enough."); return; }

        let key = `xz|${tit}|${str}`;
        if (winmaps[key]) { // 确认该窗口第一次出现。若不是，则运行下列代码。
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const submit = document.createElement("button");
        const giveup = document.createElement("button");
        const count = document.createElement("div");

        mele.className = "xz-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "xz-square";
        icon.src = "Dainiv/images/Sel.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        submit.className = "xz-submit";
        submit.innerHTML = "Submit";
        submit.style.opacity = 0;
        submit.style.transition = `all 0.2s ${easing}`;
        giveup.className = "xz-giveup";
        giveup.innerHTML = "Give up choosing.";
        giveup.style.opacity = 0;
        giveup.style.transition = `all 0.2s ${easing}`;
        count.className = "xz-count";
        count.innerText = "1";
        count.style.opacity = 0;
        
        const array = Array.from(names);
        const xz_items = [];
        const btns = [];

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(submit);
        mele.appendChild(giveup);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        for (let i = 0; i < array.length; i++) {
            const container = document.createElement("div");
            container.style.position = "relative";
            container.style.display = "flex";
            container.style.marginBottom = "10px";
            container.style.left = "0px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "xz-checkbox";
            checkbox.id = `checkbox${i}`;

            const btn = document.createElement("button");
            array[i] = String(array[i]);
            btn.id = `btn${i}`;
            btn.className = "xz-btn";
            btn.style.marginBottom = "10px";
            btn.innerHTML = array[i];
            btn.style.opacity = 0;

            const tohex = (r, g, b) => {
                const tohex_ = (value) => {
                    const hex = value.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                };
                return `#${tohex_(r)}${tohex_(g)}${tohex_(b)}`;
            };
            const color = () => {
                const r = Math.floor(Math.random() * 128);
                const g = Math.floor(Math.random() * 64);
                const b = Math.floor(Math.random() * 255);
                return tohex(r, g, b);
            };
            btn.style.backgroundColor = `${color()}b0`;

            container.appendChild(checkbox);
            container.appendChild(btn);
            inf.appendChild(container);
            btns.push(btn);

            checkbox.onchange = () => {
                if (checkbox.checked) {
                    if (xz_items.length >= n) {
                        fail(`The amount of the terms that you've chosen is up to maximum. You can shoose ${n} terms at most.`);
                        mele.style.animation = `mfn_shake2 0.3s ${easing}`;
                        submit.style.backgroundColor = "#ff0000b0";
                        mele.addEventListener("animationend", () => {
                            mele.style.animation = "";
                            submit.style.backgroundColor = "#a700ffb0";
                        }, { once: true });
                        checkbox.checked = false;
                        return;
                    }
                    xz_items.push(array[i]);
                } else {
                    const index = xz_items.indexOf(array[i]);
                    if (index > -1) xz_items.splice(index, 1);
                }
            };

            btn.onmouseover = () => { ld(btn, "75%"); };
            btn.onmouseleave = () => { ld(btn, "100%"); };
            btn.onclick = () => {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event("change"));
            };
        }

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            submit.style.opacity = 1;
            giveup.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + submit.getBoundingClientRect().height + giveup.getBoundingClientRect().height}px + ${window.getComputedStyle(submit).marginBottom} + ${window.getComputedStyle(giveup).marginBottom})`;
            for (let btn of btns) btn.style.opacity = 1;
        });

        submit.addEventListener("transitionend", () => { submit.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = (result) => {
            submit.style.opacity = 0;
            giveup.style.opacity = 0;
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r(result);
        };

        submit.onmouseover = () => { ld(submit, "75%"); };
        submit.onmouseleave = () => { ld(submit, "100%"); };
        submit.onclick = () => {
            if (xz_items.length === 0) {
                warn("你还没有勾选！");
                mele.style.animation = `mfn_shake1 0.3s ${easing}`;
                submit.style.backgroundColor = "#ffff00b0";
                mele.addEventListener("animationend", () => {
                    mele.style.animation = "";
                    submit.style.backgroundColor = "#a700ffb0";
                }, { once: true });
                return;
            } else {
                close_win(xz_items);
            }
        };

        giveup.onmouseover = () => { ld(giveup, "75%"); };
        giveup.onmouseleave = () => { ld(giveup, "100%"); };
        giveup.onclick = () => { close_win(null); };
    });
}

async function synchr(str, tit, id) {
    if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Synchr(), argument str can not be null or undefined."; }
    str = String(str);
    let s_replaced = str.replace(/\s+/g, "");
    if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Synchr(), argument str can not be empty string."; }
    if (tit == null || tit == undefined) tit = "Synchronization";
    else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Synchronization"; }
    if (id == null || id == undefined) id = "";

    let key = `synchr|${tit}|${str}`;

    if (winmaps[key]) {
        let win = winmaps[key];
        let ele = win.cnt_ele;

        win.cnt++;
        if (win.cnt_ele) win.cnt_ele.innerText = win.cnt;
        // 重置计时器。
        if (win.timeout_id) clearTimeout(win.timeout_id);
        let dur = smarttime(str);

        if (win.anim_timer) {
            clearTimeout(win.anim_timer);
            win.anim_timer = null;
        }

        ele.style.transition = "opacity 0.1s ease";
        ele.style.opacity = "0";

        ele.addEventListener(("transitionend"), () => {
            ele.innerText = win.cnt;
            ele.style.opacity = "1";
            win.anim_timer = null;
        }, { once: true });

        win.timeout_id = setTimeout(() => {
            // 关闭窗口。
            let mele = win.dom;
            let inf = mele.querySelector(".mfn-inf");
            let icon = mele.querySelector("img");
            let txt = mele.querySelector(".mfn-title");
            let count = win.cnt_ele;
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
        }, dur);
        return;
    }

    const mele = document.createElement("div");
    const square = document.createElement("div");
    const icon = document.createElement("img");
    const txt = document.createElement("div");
    const inf = document.createElement("div");
    const bar = document.createElement("div");
    const desc = document.createElement("div");
    const count = document.createElement("div");

    mele.className = "synchr-mele";
    mele.id = id;
    mele.style.height = "0px";
    mele.style.transition = `height 0.2s ${easing}`;
    square.className = "synchr-square";
    icon.src = "Dainiv/images/Synchronization.png";
    icon.alt = "";
    icon.style.opacity = 0;
    icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    txt.className = "mfn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    inf.className = "mfn-inf";
    inf.style.opacity = 0;
    inf.style.textAlign = "center";
    inf.style.minWidth = "30ch";
    inf.style.transition = `all 0.2s ${easing}`;
    bar.className = "synchr-bar";
    desc.className = "mfn-timerdesc";
    desc.innerHTML = "No tasks on progress";
    count.className = "synchr-count";
    count.innerText = "1";
    count.style.opacity = 0;

    mcreate(mele);
    document.body.appendChild(mele);
    mele.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    mele.appendChild(inf);
    mele.appendChild(bar);
    mele.appendChild(desc);
    square.appendChild(count);

    mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
    inf.innerHTML = str;
    txt.innerHTML = tit;

    let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [] };
    winmaps[key] = win_obj;

    mele.addEventListener("animationend", () => {
        inf.style.transform = "translateY(0)";
        inf.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        count.style.opacity = 1;
        mele.style.width = "30ch";
        mele.style.left = "calc(50% - 15ch)";
        mele.style.right = "calc(50% + 15ch)";
        mele.style.height = `${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + bar.getBoundingClientRect().height + desc.getBoundingClientRect().height}px`;
    });

    let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
    square.style.height = square_height;
    inf.style.marginTop = square_height;

    let dur = smarttime(str);
    let tid = setTimeout(() => {
        inf.style.opacity = 0;
        inf.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        count.style.opacity = 0;
        mele.style.height = "0px";
        inf.addEventListener("transitionend", () => {
            square.style.height = "35px";
            mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
            mclose(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
                delete winmaps[key];
            }, { once: true });
        }, { once: true });
    }, dur);
    win_obj.timeout_id = tid;
}

async function lj(str, url, tit, id) {
    if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Lj(), argument str can not be null or undefined."; }
    if (url == null || url == undefined) { warn("Can not jump to null or undefined。"); return "In function, argument url can not be null or undefined。"; }
    str = String(str);
    url = String(url);
    let s_replaced = str.replace(/\s+/g, "");
    if (s_replaced === "") { warn("Illegal input: empty string."); return "In function Lj(), argument str can not be empty string."; }
    let u_replaced = url.replace(/\s+/g, "");
    if (u_replaced === "") { warn("Can not jump to blank address."); return "In function Lj(), argument url can not be empty string."; }
    if (tit == null || tit == undefined) tit = (url.startsWith("mailto:") ? "Mail" : "Link");
    else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Link"; }
    if (id == null || id == undefined) id = "";

    function urlcheck(u) {
        if (typeof u !== "str") return false;
        const decoded = decodeURIComponent(u);
        const lower = decoded.toLowerCase();
        const kps = [
            /\\device\\/i, /\\condrv\\/i, /globalroot/i, /^\\.\\.*\\/, /^\\\\\.\\/,
            /kernelconnect/i, /physicaldrive\d*/i, /\\physicaldrive\d*/i, /^\\\\\?\\/,
            /harddiskvolume\d*/i,
        ];
        if (kps.some(p => p.test(lower))) return false;
        return true;
    }
    if (!urlcheck(url)) {
        warn("The jump of the link window has been held back due to Safety Policy.");
        console.warn(`[Safety Policy] Blocked link window: ${url}.`);
        return;
    }

    let key = `lj|${tit}|${str}|${url}`;
    if (winmaps[key]) {
        let win = winmaps[key];
        let ele = win.cnt_ele;

        win.cnt++;
        if (win.cnt_ele) win.cnt_ele.innerText = win.cnt;

        if (win.anim_timer) {
            clearTimeout(win.anim_timer);
            win.anim_timer = null;
        }

        ele.style.transition = "opacity 0.1s ease";
        ele.style.opacity = "0";

        ele.addEventListener(("transitionend"), () => {
            ele.innerText = win.cnt;
            ele.style.opacity = "1";
            win.anim_timer = null;
        }, { once: true });
        return;
    }

    const mele = document.createElement("div");
    const square = document.createElement("div");
    const icon = document.createElement("img");
    const txt = document.createElement("div");
    const inf = document.createElement("div");
    const link = document.createElement("button");
    const ignore = document.createElement("button");
    const count = document.createElement("div");

    mele.className = "lj-mele";
    mele.id = id;
    mele.style.height = "0px";
    mele.style.transition = `height 0.2s ${easing}`;
    square.className = "lj-square";
    icon.src = "Dainiv/images/Link.png";
    icon.alt = "";
    icon.style.opacity = 0;
    icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    txt.className = "mfn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    inf.className = "mfn-inf";
    inf.style.opacity = 0;
    inf.style.textAlign = "center";
    inf.style.minWidth = "30ch";
    inf.style.transition = `all 0.2s ${easing}`;
    link.className = "lj-link";
    link.innerHTML = url;
    link.style.opacity = 0;
    link.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    ignore.className = "lj-ignore";
    ignore.innerHTML = "Ignore that";
    ignore.style.opacity = 0;
    ignore.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    count.className = "lj-count";
    count.innerText = "1";
    count.style.opacity = 0;

    mcreate(mele);
    document.body.appendChild(mele);
    mele.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    mele.appendChild(inf);
    mele.appendChild(link);
    mele.appendChild(ignore);
    square.appendChild(count);

    mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
    inf.innerHTML = str;
    txt.innerHTML = tit;

    let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [] };
    winmaps[key] = win_obj;

    mele.addEventListener("animationend", () => {
        inf.style.transform = "translateY(0)";
        inf.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        count.style.opacity = 1;
        link.style.opacity = 1;
        ignore.style.opacity = 1;
        mele.style.width = "30ch";
        mele.style.left = "calc(50% - 15ch)";
        mele.style.right = "calc(50% + 15ch)";
        mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + link.getBoundingClientRect().height + ignore.getBoundingClientRect().height}px + ${window.getComputedStyle(link).marginBottom} + ${window.getComputedStyle(ignore).marginBottom})`;
    });

    link.addEventListener("transitionend", () => { ignore.focus(); }, { once: true });

    let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
    square.style.height = square_height;
    inf.style.marginTop = square_height;

    const close_win = () => {
        link.style.opacity = 0;
        ignore.style.opacity = 0;
        inf.style.opacity = 0;
        inf.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        count.style.opacity = 0;
        mele.style.height = "0px";
        inf.addEventListener("transitionend", () => {
            square.style.height = "35px";
            mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
            mclose(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
                delete winmaps[key];
            }, { once: true });
        }, { once: true });
    };

    link.onmouseover = () => { ld(link, "75%"); };
    link.onmouseleave = () => { ld(link, "100%"); };
    link.onclick = () => {
        if (!open(url, "_blank", `width=${defwid}, height=${defhei}`)) warn("The window that should have jumped was blocked.");
        close_win();
    };

    ignore.onmouseover = () => { ld(ignore, "75%"); };
    ignore.onmouseleave = () => { ld(ignore, "100%"); };
    ignore.onclick = () => {
        rz("The link has been ignored.");
        close_win();
    };
}

// 主函数
async function zd(str, tit, id) {
    function errorres(error, input) {
        const msg = error.message;
        const name = error.name;
    
        // ReferenceError.
        if (name === 'ReferenceError') {
            if (msg.includes(' is not defined')) {
                let varName = msg.split(' is not defined')[0].trim();
                return `Referenced an undefined variable or function “${varName}”.`;
            }
            if (msg.includes('Cannot access')) {
                let varName = msg.split("'")[1] || 'variable';
                return `Cannot access “${varName}” before initialization.`;
            }
            return `Reference error: “${msg}”.`;
        }
    
        // SyntaxError.
        if (name === 'SyntaxError') {
            if (msg.includes('Missing initializer in const declaration')) {
                return "Missing initializer in const declaration.";
            }
            if (msg.includes(' has already been declared')) {
                let varName = msg.split("Identifier '")[1]?.split("'")[0] || 'unknown';
                return `Identifier “${varName}” has already been declared.`;
            }
            if (msg.includes('Unexpected token')) {
                let token = msg.split("Unexpected token '")[1]?.split("'")[0] || msg.split("Unexpected token")[1]?.trim() || 'illegal symbol';
                if (token === 'end of input') return 'Unexpected end of input.';
                return `Unexpected symbol “${token}”.`;
            }
            if (msg.includes('Unexpected identifier')) {
                let token = msg.split("Unexpected identifier '")[1]?.split("'")[0] || '';
                return `“${token}” is not a valid identifier.`;
            }
            if (msg.includes('Unexpected end of input')) {
                return "Missing required syntax.";
            }
            if (msg.includes('Invalid or unexpected token')) {
                if (input.includes('\\')) return "Invalid escape character “\\”.";
                if (input.includes('`')) return "Possibly missing closing backtick in template string.";
                return "Invalid identifier or unexpected symbol.";
            }
            if (msg.includes('Invalid left-hand side in assignment')) {
                return "Invalid left-hand side in assignment.<br />Cannot assign to constants, literals, or read-only properties.";
            }
            if (msg.includes('Cannot use import statement outside a module')) {
                return "Cannot use import statement outside a module.";
            }
            if (msg.includes('Illegal return statement')) {
                return "Return statement outside function is illegal.";
            }
            if (msg.includes('Missing ) after argument list')) {
                return "Missing closing parenthesis “)” in argument list.";
            }
            if (msg.includes('Missing } after function body')) {
                return "Missing closing curly brace “}” in function body.";
            }
            if (msg.includes('Missing formal parameter')) {
                return "Missing formal parameter in arrow function or function declaration.";
            }
            if (msg.includes('Unterminated string literal')) {
                return "Unterminated string literal.";
            }
            else {
                return `Syntax error: “${msg}”.`;
            }
        }
    
        // TypeError.
        if (name === 'TypeError') {
            if (msg.includes('Assignment to constant variable')) {
                return "Cannot reassign a const variable.";
            }
            if (msg.includes('Cannot assign to read only property')) {
                return "Cannot assign to read-only property.";
            }
            if (msg.includes('is not a function')) {
                let varName = msg.split(' is not a function')[0].trim();
                return `“${varName}” is not a function.`;
            }
            if (msg.includes('is not iterable')) {
                let varName = msg.split(' is not iterable')[0].trim();
                return `“${varName}” is not iterable.`;
            }
            if (msg.includes('Cannot read properties of')) {
                let parts = msg.split("Cannot read properties of ")[1];
                let val = parts.includes('null') ? 'null' : 'undefined';
                let prop = parts.split("(reading '")[1]?.split("')")[0] || 'unknown property';
                return `Cannot read property “${prop}” of ${val}.`;
            }
            if (msg.includes('Cannot set properties of')) {
                let parts = msg.split("Cannot set properties of ")[1];
                let val = parts.includes('null') ? 'null' : 'undefined';
                return `Cannot set property of ${val}.`;
            }
            if (msg.includes('cannot be used as a constructor')) {
                let varName = msg.split(' is not a constructor')[0].trim();
                return `“${varName}” cannot be used as a constructor.`;
            }
            if (msg.includes('Cannot destructure property')) {
                let prop = msg.split("Cannot destructure property '")[1]?.split("'")[0] || '';
                return `Cannot destructure property “${prop}” from undefined or null.`;
            }
            if (msg.includes('Invalid array length')) {
                return "Invalid array length.";
            }
            if (msg.includes('Cyclic object value')) {
                return "Cyclic object value cannot be serialized.";
            }
            return `Type error: “${msg}”.`;
        }
    
        // RangeError.
        if (name === 'RangeError') {
            if (msg.includes('Maximum call stack size exceeded')) {
                return "Maximum call stack size exceeded (possibly infinite loop or recursion).";
            }
            if (msg.includes('Invalid date')) {
                return "Invalid date format.";
            }
            if (msg.includes('Precision is out of range')) {
                return "Number precision is out of range.";
            }
            return `Range error: “${msg}”.`;
        }
    
        // URIError.
        if (name === 'URIError') {
            return `URI error: “${msg}”.`;
        }
    
        // EvalError.
        if (name === 'EvalError') {
            return `Eval security error: “${msg}”.`;
        }
    
        // Fallback for any other errors.
        return `Unexpected ${error.name} error: “${error.message}”.`;
    }

    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Zd(), argument str can not be null or undefined."; }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") { warn("Illegal input: empty string."); return "In functiom Zd(), argument str can not be empty string."; }
        if (tit == null || tit == undefined) tit = "Terminal";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Terminal"; }
        if (id == null || id == undefined) id = "";

        let key = `zd|${tit}|${str}`;
        if (winmaps[key]) {
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.cnt_ele) win.cnt_ele.innerText = win.cnt;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const box = document.createElement("textarea");
        const count = document.createElement("div");

        mele.className = "zd-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "zd-square";
        icon.src = "Dainiv/images/Com.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        box.name = "terminalbox";
        box.className = "zd-box";
        box.style.opacity = 0;
        box.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        count.className = "zd-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(box);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            box.style.opacity = 1;
            count.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + box.getBoundingClientRect().height}px + ${window.getComputedStyle(box).marginBottom})`;
        });

        box.addEventListener("transitionend", () => { box.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = (val) => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            box.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r(val);
        };

        box.addEventListener("keypress", async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                const value = box.value.trim();
                if (value === "") {
                    warn("Illegal input: empty string.");
                    mele.style.animation = `mfn_shake1 0.3s ${easing}`;
                    box.style.backgroundColor = "#ffff0099";
                    mele.addEventListener("animationend", () => {
                        mele.style.animation = "";
                        box.style.backgroundColor = "#22222299";
                    }, { once: true });
                    return;
                }
                try {
                    // 支持执行异步代码 (使用 await eval)
                    let k = await eval(value);
                    if (k !== undefined && k !== null) {
                        rz(k);
                        close_win(k);
                    } else if (k === undefined) {
                        rz("Returned undefined.");
                        close_win();
                    } else if (k === null) {
                        rz("Returned null.");
                        close_win();
                    }
                } catch (error) {
                    mele.style.animation = `mfn_shake2 0.3s ${easing}`;
                    box.style.backgroundColor = "#ff000099";

                    let error_msg = errorres(error, value);
                    fail(error_msg);
                    close_win();
                }
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                box.value += "\n";
            }
        });
    });
}

async function timer(str, time, tit, id) {
    return new Promise((resolve) => {
        let passed_time = 0;
        let ls_finish = false;
        if (str == null || str == undefined) { fail("Illegal input: null or undefined"); return "In function Timer(), argument str can not be null or undefined."; }
        if (time == null || time == undefined) { fail("Invalid number: null or undefined."); return "In function Timer(), argument time can not be null or undefined."; }
        str = String(str);
        time = Number(time);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") str = "";
        if (tit == null || tit == undefined) tit = "Timing";
        else { tit = String(tit); let t_replaced = tit.replace(/\s+/g, ""); if (t_replaced === "") tit = "Timing"; }
        if (id == null || id == undefined) id = "";
        if (isNaN(time)) { fail("Argument time must be a recognizable number or number-only string."); return "In function Timer(), argument time must be a recognizable number or number-only string."; }
        else if (time < 1250) { warn("The value of time is too small to enable timer."); return "In function Timer(), the value of time must be greater than or equal to 1250."; }
        else if (time > 3.15576e10 * 1.1568) { warn("The value of time is too big to enable timer."); return "In function Timer(), the value of time must be less than or equal to 6.048e10."; }

        let key = `timer|${tit}|${str}`;
        if (winmaps[key]) {
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.cnt_ele) win.cnt_ele.innerText = win.cnt;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const earlyend = document.createElement("button");
        const bar = document.createElement("div");
        const timerdesc = document.createElement("div");
        const count = document.createElement("div");

        mele.className = "timer-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "timer-square";
        icon.src = "Dainiv/images/Timer.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "mfn-title";
        txt.style.color = "black";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "mfn-inf";
        inf.innerHTML = str;
        inf.style.color = "black";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        earlyend.className = "timer-earlyend";
        earlyend.style.color = "black";
        earlyend.style.opacity = 0;
        earlyend.innerHTML = "Stop timing in advance";
        earlyend.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.style.transition = `all 0.2s ${easing}`;
        bar.className = "timer-bar";
        timerdesc.className = "mfn-timerdesc";
        timerdesc.color = "#000000";
        timerdesc.style.transition = `all 0.2s ${easing}`;
        count.className = "timer-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(earlyend);
        mele.appendChild(bar);
        mele.appendChild(timerdesc);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        txt.innerHTML = tit;

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        let interval_speed;
        let interval_progress;
        let interval_check;

        const finish = () => {
            if (ls_finish) return;
            ls_finish = true;
            if (interval_speed) clearInterval(interval_speed);
            if (interval_progress) clearInterval(interval_progress);
            if (interval_check) clearInterval(interval_check);
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            earlyend.style.opacity = 0;
            timerdesc.style.opacity = 0;
            timerdesc.style.transform = "translateX(25px)";
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r(true);
        };

        interval_speed = setInterval(() => {
            passed_time += timer_speed * 10;
            if (timer_speed > 1) inf.style.color = "#ff0000";
            else if (timer_speed < 1 && timer_speed > 0) inf.style.color = "#0000ff";
            else if (timer_speed === 0) inf.style.color = "#d00000";
            else if (timer_speed > -1 && timer_speed < 0) inf.style.color = "#d0d000";
            else if (timer_speed < -1) inf.style.color = "#d0d0d0";
            else inf.style.color = "#000000";
        }, 10);

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            earlyend.style.opacity = 1;
            timerdesc.style.opacity = 1;
            timerdesc.style.transform = "translateX(0)";
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + bar.getBoundingClientRect().height + earlyend.getBoundingClientRect().height + timerdesc.getBoundingClientRect().height}px + ${getComputedStyle(timerdesc).marginBottom})`;
        });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        earlyend.onclick = () => { finish(); };

        let pro = 0;
        interval_progress = setInterval(() => {
            let timer_backwards = timer_speed < 0;
            pro += timer_speed * 10 / (time / 100);
            bar.style.width = `${pro}%`;
            timerdesc.innerHTML = `${timer_speed === 0 ? "停滞" : String(timer_speed) + " 倍速"} | ${passed_time > 0 ? fhsj(passed_time) : fhsj(0)} / ${fhsj(time)} | ${pro > 0 ? pro.toFixed(2) : 0}%`;
            if (timer_speed > 1) {
                bar.style.backgroundColor = "#ff000099";
                timerdesc.style.color = "#ff0000";
            } else if (timer_speed < 1 && timer_speed > 0) {
                bar.style.backgroundColor = "#0000ff99";
                timerdesc.style.color = "#0000ff";
            } else if (timer_speed === 0) {
                bar.style.backgroundColor = "#d0000099";
                timerdesc.style.color = "#d00000";
            } else if (timer_speed > -1 && timer_speed < 0) {
                bar.style.backgroundColor = "#d0d00099";
                timerdesc.style.color = "#d0d000";
            } else if (timer_speed < -1) {
                bar.style.backgroundColor = "#d0d0d099";
                timerdesc.style.color = "#d0d0d0";
            } else {
                bar.style.backgroundColor = "#00000099";
                timerdesc.style.color = "#000000";
            }
            if (pro >= 100) {
                clearInterval(interval_progress);
                finish();
            } else if (timer_backwards && passed_time <= 0) {
                clearInterval(interval_progress);
                finish();
            }
        }, 10);

        interval_check = setInterval(() => {
            if (ls_finish) {
                clearInterval(interval_check);
            }
        }, 25);
    });
}

async function mb(str, tit, id) {
    return new Promise((resolve) => {
        str = String(str);
        if (str.length === 0 || str.includes(null) || str.includes(undefined)) {
            fail("Illegal input: null or undefined");
            resolve(39);
            return;
        }
        if (tit == null || tit == undefined || String(tit).replace(/\s+/g, "") === "") tit = "Panel";
        else tit = String(tit);
        if (id == null || id == undefined) id = "";

        let key = `mb|${tit}|${str}`;
        if (winmaps[key]) {
            let win = winmaps[key];
            win.cnt++;
            let ele = win.cnt_ele;

            if (win.cnt_ele) win.cnt_ele.innerText = win.cnt;

            if (win.anim_timer) {
                clearTimeout(win.anim_timer);
                win.anim_timer = null;
            }

            ele.style.transition = "opacity 0.1s ease";
            ele.style.opacity = "0";

            ele.addEventListener(("transitionend"), () => {
                ele.innerText = win.cnt;
                ele.style.opacity = "1";
                win.anim_timer = null;
            }, { once: true });

            win.waitlist.push(resolve);
            return;
        }

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const gb = document.createElement("button");
        const count = document.createElement("div");

        mele.className = "mb-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "mb-square";
        icon.src = "Dainiv/images/Pad.png";
        icon.alt = "";
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        icon.style.opacity = 0;
        txt.className = "mfn-title";
        txt.innerHTML = tit;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.style.opacity = 0;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        gb.type = "button";
        gb.className = "mb-gb";
        gb.innerHTML = "Close";
        gb.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        gb.style.opacity = 0;
        count.className = "mb-count";
        count.innerText = "1";
        count.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(gb);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;

        if (str.startsWith("[tag] ")) {
            str = str.slice(5);
            if (str.toLowerCase().startsWith("li: ")) {
                const li = document.createElement("li");
                li.innerHTML = str.slice(4);
                inf.appendChild(li);
            } else if (str.toLowerCase().startsWith("h1: ")) {
                const h1 = document.createElement("h1");
                h1.innerHTML = str.slice(4);
                inf.appendChild(h1);
            } else if (str.toLowerCase().startsWith("h2: ")) {
                const h2 = document.createElement("h2");
                h2.innerHTML = str.slice(4);
                inf.appendChild(h2);
            } else if (str.toLowerCase().startsWith("h3: ")) {
                const h3 = document.createElement("h3");
                h3.innerHTML = str.slice(4);
                inf.appendChild(h3);
            } else if (str.toLowerCase().startsWith("h4: ")) {
                const h4 = document.createElement("h4");
                h4.innerHTML = str.slice(4);
                inf.appendChild(h4);
            } else if (str.toLowerCase().startsWith("h5: ")) {
                const h5 = document.createElement("h5");
                h5.innerHTML = str.slice(4);
                inf.appendChild(h5);
            } else if (str.toLowerCase().startsWith("code: ")) {
                const code = document.createElement("code");
                code.innerHTML = str.slice(6);
                inf.appendChild(code);
            } else if (str.toLowerCase().startsWith("img: ")) {
                const img = document.createElement("img");
                img.src = str.slice(5);
                img.alt = "";
                inf.appendChild(img);
            } else if (str.toLowerCase().startsWith("a: ")) {
                const a = document.createElement("a");
                a.href = str.slice(3);
                a.innerHTML = str.slice(3);
                inf.appendChild(a);
            } else if (str.toLowerCase().startsWith("div: ")) {
                const div = document.createElement("div");
                div.innerHTML = str.slice(5);
                inf.appendChild(div);
            }
        } else {
            const p = document.createElement("p");
            p.innerHTML = str;
            inf.appendChild(p);
        }

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        winmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            count.style.opacity = 1;
            gb.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + gb.getBoundingClientRect().height}px + ${window.getComputedStyle(gb).marginBottom})`;
        });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            gb.style.opacity = 0;
            count.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete winmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r("Confirmed.");
        };

        gb.onmouseover = () => { ld(gb, "75%"); };
        gb.onmouseleave = () => { ld(gb, "100%"); };
        gb.onclick = close_win;
    });
}

async function rz(str, time) {
    return new Promise((resolve) => {
        if (str == null) {
            warn("Value: null.");
            return;
        } else if (str == undefined) {
            warn("Value: undefined.");
            return;
        }
        if (time == null || time == undefined) time = smarttime(str);

        const mele = document.createElement("div");
        mele.className = "rz-mele";
        mele.style.opacity = 0;
        const inf = document.createElement("div");
        inf.className = "rz-inf";
        inf.style.transition = `all 0.2s ${easing}`;
        inf.innerHTML = str;
        inf.style.opacity = 0;
        const bar = document.createElement("div");
        bar.className = "rz-bar";
        let timeup = false;
        let pro = 0;

        lcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `in_rz 0.5s forwards ${easing}`;

        mele.addEventListener("animationend", () => {
            inf.style.opacity = 1;
        }, { once: true });

        mele.oncontextmenu = async () => {
            inf.style.opacity = 0;
            inf.addEventListener("transitionend", () => {
                mele.style.animation = `out_rz 0.5s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    mclose(mele);
                    resolve();
                }, { once: true });
            }, { once: true });
        };

        inf.addEventListener("transitionend", () => {
            let i1 = setInterval(() => {
                pro += 10 / (time / 100);
                bar.style.width = `${pro}%`;
                if (pro >= 100) {
                    timeup = true;
                    clearInterval(i1);
                }
            }, 10);
        }, { once: true });

        setInterval(() => {
            if (timeup) {
                inf.style.opacity = 0;
                inf.addEventListener("transitionend", () => {
                    mele.style.animation = `out_rz 0.5s forwards ${easing}`;
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                        lclose(mele);
                        resolve();
                    }, { once: true });
                }, { once: true });
            }
        }, 25);
    });
}