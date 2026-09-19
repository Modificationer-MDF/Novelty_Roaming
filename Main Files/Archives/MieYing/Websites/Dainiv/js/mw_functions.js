// 全局存储当前显示的窗口信息。
let dbmaps = {}; // Dainiv Basic 样式窗口。
let bfmaps = {}; // Brief 样式窗口。

async function noti({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    // 参数检查。
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Noti()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Noti()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "通知";
    else { tit = String(tit); if (!tit.trim()) tit = "通知"; }
    if (id == null || id == undefined) id = "";

    let key = `noti|${str}|${tit}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (form === "brief") {
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");

            mele.className = "noti-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Notification.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "noti-brief-title";
            inf.className = "brief-inf";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);

            // 跟随鼠标。
            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            // 边界翻转。
            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            bfmaps[key] = { dom: mele };

            let closed = false;
            const close = () => {
                if (closed) return;
                closed = true;
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve();
                }, { once: true });
            };

            mele.onclick = () => { close(); };
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
                win.cnt++;
                let ele = win.cnt_ele;

                if (win.anim_timer) {
                    clearTimeout(win.anim_timer);
                    win.anim_timer = null;
                }

                ele.style.transition = "opacity 0.1s ease";
                ele.style.opacity = "0";

                ele.addEventListener("transitionend", () => {
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
            okey.innerHTML = "知晓";
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
            if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

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

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const okeyH = okey.getBoundingClientRect().height;
                const okeyMargin = parseFloat(window.getComputedStyle(okey).marginBottom) || 0;
                mele.style.height = `${squareH + infH + okeyH + okeyMargin}px`;
            });
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(okey);
            win_obj.resorb = resorb;

            okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = () => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
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
                        delete dbmaps[key];
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
}

async function cg({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    // 参数检查。
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Cg()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Cg()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "完成";
    else { tit = String(tit); if (!tit.trim()) tit = "完成"; }
    if (id == null || id == undefined) id = "";

    let key = `cg|${str}|${tit}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (form === "brief") {
        return new Promise((resolve) => {
            // 旧窗口先淡出，让出位置给新窗口。
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");

            mele.className = "cg-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Suc.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "cg-brief-title";
            inf.className = "brief-inf";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);

            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            let closed = false;
            const close = () => {
                if (closed) return;
                closed = true;
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve();
                }, { once: true });
            };

            mele.onclick = () => { close(); };
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
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
            okey.innerHTML = "知晓";
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
            if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

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

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const okeyH = okey.getBoundingClientRect().height;
                const okeyMargin = parseFloat(window.getComputedStyle(okey).marginBottom) || 0;
                mele.style.height = `${squareH + infH + okeyH + okeyMargin}px`;
            }); // 监测高度变化。
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(okey);
            win_obj.resorb = resorb;

            okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = () => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
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
                        delete dbmaps[key];
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
}

async function warn({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    // 参数检查。
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Warn()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Warn()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "注意";
    else { tit = String(tit); if (!tit.trim()) tit = "注意"; }
    if (id == null || id == undefined) id = "";

    let key = `warn|${str}|${tit}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (form === "brief") {
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");

            mele.className = "warn-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Exc.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "warn-brief-title";
            inf.className = "brief-inf";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);

            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            let closed = false;
            const close = () => {
                if (closed) return;
                closed = true;
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve();
                }, { once: true });
            };

            mele.onclick = () => { close(); };
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
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
            okey.innerHTML = "知晓";
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
            if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

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
            });

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const okeyH = okey.getBoundingClientRect().height;
                const okeyMargin = parseFloat(window.getComputedStyle(okey).marginBottom) || 0;
                mele.style.height = `${squareH + infH + okeyH + okeyMargin}px`;
            }); // 监测高度变化。
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(okey);
            win_obj.resorb = resorb;

            okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = () => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
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
                        delete dbmaps[key];
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
}

async function fail({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    // 参数检查。
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Fail()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Fail()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "错误";
    else { tit = String(tit); if (!tit.trim()) tit = "错误"; }
    if (id == null || id == undefined) id = "";

    let key = `fail|${str}|${tit}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (form === "brief") {
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");

            mele.className = "fail-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Err.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "fail-brief-title";
            inf.className = "brief-inf";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);

            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            let closed = false;
            const close = () => {
                if (closed) return;
                closed = true;
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve();
                }, { once: true });
            };

            mele.onclick = () => { close(); };
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
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
            okey.innerHTML = "知晓";
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
            if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

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
            });

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const okeyH = okey.getBoundingClientRect().height;
                const okeyMargin = parseFloat(window.getComputedStyle(okey).marginBottom) || 0;
                mele.style.height = `${squareH + infH + okeyH + okeyMargin}px`;
            }); // 监测高度变化。
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(okey);
            win_obj.resorb = resorb;

            okey.addEventListener("transitionend", () => { okey.focus(); }, { once: true });

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = () => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
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
                        delete dbmaps[key];
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
}

async function inp({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    if (str == null || str == undefined) {
        fail({ str: `不能输入 <code class="nu">${str}</code>！` });
        return "在 <code>Inp()</code> 函数中，<code>str</code> 不能为 null 或 undefined。";
    }
    const is_array = Array.isArray(str);
    let prompts = is_array ? str : [str];
    if (tit == null || tit == undefined) tit = "输入";
    else { tit = String(tit); if (!tit.trim()) tit = "输入"; }
    if (id == null || id == undefined) id = "";

    // 规范化字段。
    const fields = prompts.map((p) => {
        if (typeof p === "string") {
            return { content: p, type: "textarea", options: null };
        }
        return {
            content: (p && p.content != null) ? String(p.content) : "",
            type: (p && p.type) ? String(p.type) : "textarea",
            options: (p && p.options) ? p.options : null
        };
    });

    // brief 只支持单字段。
    const use_brief = (form === "brief") && fields.length === 1;

    let key = `inp|${JSON.stringify(str)}|${tit}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (use_brief) {
        const field = fields[0];
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const submit = document.createElement("button");

            mele.className = "inp-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Inp.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "inp-brief-title";
            submit.type = "button";
            submit.className = "inp-brief-submit";
            submit.textContent = "提交";

            if (realstr) { txt.textContent = tit; }
            else { txt.innerHTML = tit; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);

            // 控件。
            let box;
            if (field.type === "select") {
                box = document.createElement("select");
                box.className = "inp-brief-select";
                (field.options || []).forEach(opt => {
                    const o = document.createElement("option");
                    o.value = String(opt);
                    o.textContent = String(opt);
                    box.appendChild(o);
                });
            } else {
                box = document.createElement("input");
                box.type = "text";
                box.className = "inp-brief-box";
            }
            text.appendChild(box);
            text.appendChild(submit);

            // 跟随鼠标 / 边界翻转。
            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            let closed = false;
            const close = (result) => {
                if (closed) return;
                closed = true;
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve(result);
                }, { once: true });
            };

            setTimeout(() => box.focus(), 0);

            box.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    if (field.type === "select") {
                        close(box.value);
                    } else {
                        const v = box.value;
                        close(v.trim() === "" ? null : v);
                    }
                } else if (e.key === "Escape") {
                    e.preventDefault();
                    close(null);
                }
            });

            submit.onclick = (e) => {
                e.stopPropagation();
                if (field.type === "select") {
                    close(box.value);
                } else {
                    const v = box.value;
                    close(v.trim() === "" ? null : v);
                }
            };
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
                win.cnt++;
                let ele = win.cnt_ele;

                if (win.anim_timer) {
                    clearTimeout(win.anim_timer);
                    win.anim_timer = null;
                }

                ele.style.transition = "opacity 0.1s ease";
                ele.style.opacity = "0";

                ele.addEventListener("transitionend", () => {
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
            const count = document.createElement("div");
            const submit = document.createElement("button");

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
            count.className = "inp-count";
            count.innerText = "1";
            count.style.opacity = 0;
            submit.type = "button";
            submit.className = "inp-submit";
            submit.textContent = "提交";
            submit.style.opacity = 0;
            submit.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";

            mcreate(mele);
            document.body.appendChild(mele);
            mele.appendChild(square);
            square.appendChild(icon);
            square.appendChild(txt);
            mele.appendChild(inf);
            mele.appendChild(submit);
            square.appendChild(count);

            mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

            inf.innerHTML = "";
            const boxes = [];

            fields.forEach((field, index) => {
                // 提示文字。
                const pdiv = document.createElement("div");
                pdiv.className = "inp-prompt";
                pdiv.style.marginBottom = "10px";
                if (realstr) { pdiv.textContent = field.content; }
                else { pdiv.innerHTML = field.content; }
                inf.appendChild(pdiv);

                // 控件。
                let box;
                if (field.type === "select") {
                    box = document.createElement("select");
                    box.className = "inp-select";
                    (field.options || []).forEach(opt => {
                        const o = document.createElement("option");
                        o.value = String(opt);
                        o.textContent = String(opt);
                        box.appendChild(o);
                    });
                } else {
                    box = document.createElement("textarea");
                    box.className = "inp-box";
                }
                box.style.opacity = 0;
                box.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
                box.dataset.index = index;
                inf.appendChild(box);
                boxes.push(box);

                if (index < fields.length - 1) {
                    const line = document.createElement("div");
                    line.className = "inp-line";
                    line.style.margin = "8px 0";
                    inf.appendChild(line);
                }
            });

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

            mele.addEventListener("animationend", () => {
                inf.style.transform = "translateY(0)";
                inf.style.opacity = 1;
                icon.style.opacity = 1;
                txt.style.opacity = 1;
                count.style.opacity = 1;
                boxes.forEach(b => b.style.opacity = 1);
                submit.style.opacity = 1;
                mele.style.width = "30ch";
                mele.style.left = "calc(50% - 15ch)";
                mele.style.right = "calc(50% + 15ch)";
            });

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const submitH = submit.getBoundingClientRect().height;
                const submitMargin = parseFloat(window.getComputedStyle(submit).marginBottom) || 0;
                mele.style.height = `${squareH + infH + submitH + submitMargin}px`;
            });
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(submit);
            win_obj.resorb = resorb;

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            // 聚焦第一个 textarea。
            for (let i = 0; i < boxes.length; i++) {
                if (fields[i].type !== "select") {
                    boxes[i].focus();
                    break;
                }
            }

            // 只有 textarea 绑定 Enter 跳转。
            boxes.forEach((box, idx) => {
                if (fields[idx].type === "select") return;
                box.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        // 找下一个 textarea。
                        let next = -1;
                        for (let i = idx + 1; i < boxes.length; i++) {
                            if (fields[i].type !== "select") { next = i; break; }
                        }
                        if (next >= 0) {
                            boxes[next].focus();
                        } else {
                            submit.focus();
                        }
                    }
                });
            });

            const close_win = () => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
                let values = boxes.map((b, i) => {
                    if (fields[i].type === "select") {
                        return b.value;
                    }
                    return b.value;
                });
                if (fields.length === 1) {
                    if (fields[0].type === "select") {
                        values = values[0];
                    } else {
                        values = values[0].trim() === "" ? null : values[0];
                    }
                }

                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                boxes.forEach(b => b.style.opacity = 0);
                submit.style.opacity = 0;
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
                        delete dbmaps[key];
                    }, { once: true });
                }, { once: true });

                for (let r of win_obj.waitlist) r(values);
            };

            submit.onmouseover = () => { ld(submit, "75%"); };
            submit.onmouseleave = () => { ld(submit, "100%"); };
            submit.onclick = close_win;
        });
    }
}

async function xz({ str, tit, names, n, id, realstr = false, form = "dainiv basic" }) {
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Xz()</code> 函数中，<code>str</code> 不能为 null 或 undefined。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Xz()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "选择";
    else { tit = String(tit); if (!tit.trim()) tit = "选择"; }
    if (id == null || id == undefined) id = "";
    if (n > names.length) { fail({ str: "所给予的选项数量不足！" }); return; }
    if (typeof names === "string" || typeof names === "number" || typeof names === "boolean" || typeof names === "bigint") { names = [String(names)]; }

    // 多选时强制走 Dainiv Basic。
    const use_brief = (form === "brief") && n === 1;

    let key = `xz|${str}|${tit}|${JSON.stringify(names)}:${n}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (use_brief) {
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");
            const options = document.createElement("div");

            mele.className = "xz-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Sel.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "xz-brief-title";
            inf.className = "brief-inf";
            options.className = "xz-brief-options";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);
            text.appendChild(options);

            let closed = false;
            const close = (result) => {
                if (closed) return;
                closed = true;
                document.removeEventListener("mousedown", outside_handler);
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve(result);
                }, { once: true });
            };

            const outside_handler = (e) => {
                if (!mele.contains(e.target)) close([null]);
            };

            const array = Array.from(names);
            array.forEach((name) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "xz-brief-option";
                btn.textContent = String(name);
                btn.onclick = (e) => {
                    e.stopPropagation();
                    close([String(name)]);
                };
                options.appendChild(btn);
            });

            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            setTimeout(() => {
                document.addEventListener("mousedown", outside_handler);
            }, 0);
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
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
            submit.style.transition = `all 0.2s ${easing}`;
            submit.innerHTML = `确定（已勾选 0 个，共可勾选 ${n} 个）`;
            submit.style.opacity = 0;
            giveup.className = "xz-giveup";
            giveup.innerHTML = "放弃选择";
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
            inf.innerHTML = `${realstr ? esc_str(str) : str}<div class="xz-line"></div>`;
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

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
                            fail({ str: `勾选的选项数量已达上限。最多可勾选 ${n} 个。`, form: "brief" });
                            mele.style.animation = `mfn_shake2 0.3s ${easing}`;
                            submit.style.backgroundColor = "#ff0000b0";
                            mele.addEventListener("animationend", () => {
                                mele.style.animation = "";
                                submit.style.backgroundColor = "var(--xz-submit-color)";
                            }, { once: true });
                            checkbox.checked = false;
                            return;
                        }
                        xz_items.push(array[i]);
                        submit.innerHTML = `确定（已勾选 ${xz_items.length} 个，共可勾选 ${n} 个）`;
                    } else {
                        const index = xz_items.indexOf(array[i]);
                        if (index > -1) xz_items.splice(index, 1);
                        submit.innerHTML = `确定（已勾选 ${xz_items.length} 个，共可勾选 ${n} 个）`;
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
            dbmaps[key] = win_obj;

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

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const submitH = submit.getBoundingClientRect().height;
                const submitMargin = parseFloat(window.getComputedStyle(submit).marginBottom) || 0;
                const giveupH = giveup.getBoundingClientRect().height;
                const giveupMargin = parseFloat(window.getComputedStyle(giveup).marginBottom) || 0;
                mele.style.height = `${squareH + infH + submitH + submitMargin + giveupH + giveupMargin}px`;
            });
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(submit);
            resorb.observe(giveup);
            win_obj.resorb = resorb;

            submit.addEventListener("transitionend", () => { submit.focus(); }, { once: true });

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = (result) => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
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
                        delete dbmaps[key];
                    }, { once: true });
                }, { once: true });
                for (let r of win_obj.waitlist) r(result);
            };

            submit.onmouseover = () => { ld(submit, "75%"); };
            submit.onmouseleave = () => { ld(submit, "100%"); };
            submit.onclick = () => {
                if (xz_items.length === 0) {
                    warn({ str: "你还没有勾选！", form: "brief" });
                    mele.style.animation = `mfn_shake1 0.3s ${easing}`;
                    submit.style.backgroundColor = "#ffff00b0";
                    mele.addEventListener("animationend", () => {
                        mele.style.animation = "";
                        submit.style.backgroundColor = "var(--xz-submit-color)";
                    }, { once: true });
                    return;
                } else {
                    close_win(xz_items);
                }
            };

            giveup.onmouseover = () => { ld(giveup, "75%"); };
            giveup.onmouseleave = () => { ld(giveup, "100%"); };
            giveup.onclick = () => { close_win([null]); };
        });
    }
}

async function synchr({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Synchr()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Synchr()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "同步";
    else { tit = String(tit); if (!tit.trim()) tit = "同步"; }
    if (id == null || id == undefined) id = "";

    let key = `synchr|${str}|${tit}|${id}|${realstr}|${form}`;

    if (dbmaps[key]) {
        let win = dbmaps[key];
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
                    delete dbmaps[key];
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
    desc.innerHTML = "无任务";
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
    if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
    if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

    let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [] };
    dbmaps[key] = win_obj;

    mele.addEventListener("animationend", () => {
        inf.style.transform = "translateY(0)";
        inf.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        count.style.opacity = 1;
        bar.style.opacity = 1;
        desc.style.opacity = 1;
        mele.style.width = "30ch";
        mele.style.left = "calc(50% - 15ch)";
        mele.style.right = "calc(50% + 15ch)";
    });

    let resorb = new ResizeObserver(() => {
        const squareH = square.getBoundingClientRect().height;
        const infH = inf.getBoundingClientRect().height;
        const barH = bar.getBoundingClientRect().height;
        const descH = desc.getBoundingClientRect().height;
        mele.style.height = `${squareH + infH + barH + descH}px`;
    }); // 监测高度变化。
    resorb.observe(square);
    resorb.observe(inf);
    resorb.observe(bar);
    resorb.observe(desc);
    win_obj.resorb = resorb;

    let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
    square.style.height = square_height;
    inf.style.marginTop = square_height;

    let dur = smarttime(str);
    let tid = setTimeout(() => {
        if (win_obj.resorb) {
            win_obj.resorb.disconnect();
            win_obj.resorb = null;
        }
        inf.style.opacity = 0;
        inf.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        count.style.opacity = 0;
        bar.style.opacity = 0;
        desc.style.opacity = 0;
        mele.style.height = "0px";
        inf.addEventListener("transitionend", () => {
            square.style.height = "35px";
            mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
            mclose(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
                delete dbmaps[key];
            }, { once: true });
        }, { once: true });
    }, dur);
    win_obj.timeout_id = tid;
}

async function lj({ str, tit, url, id, realstr = false, form = "dainiv basic" }) {
    // 参数检查。
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 Lj() 函数中，str 不能为 null 或 undefined。"; }
    if (url == null || url == undefined) { warn({ str: "无法跳转至 null 或 undefined。" }); return "在 Lj() 函数中，url 参数不能为 null 或 undefined。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 Lj() 函数中，str 不能为空。"; }

    // url 规范化。
    const url_array = Array.isArray(url) ? url : [url];
    const urls = url_array.map(u => String(u)).filter(u => u.trim() !== "");
    if (urls.length === 0) { warn({ str: "无法跳转至空地址。" }); return "在 Lj() 函数中，url 参数不能全为空。"; }

    if (tit == null || tit == undefined) {
        tit = urls.every(u => u.toLowerCase().startsWith("mailto:")) ? "邮件" : "链接";
    } else { tit = String(tit); if (!tit.trim()) tit = "链接"; }
    if (id == null || id == undefined) id = "";

    let key = `lj|${str}|${tit}|${JSON.stringify(urls)}|${id}|${realstr}|${form}`;
    
    // 样式分发，
    if (form === "brief") {
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");
            const links = document.createElement("div");

            mele.className = "lj-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Link.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "lj-brief-title";
            inf.className = "brief-inf";
            links.className = "lj-brief-links";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);
            text.appendChild(links);

            let closed = false;
            const close = () => {
                if (closed) return;
                closed = true;
                document.removeEventListener("mousedown", outside_handler);
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve();
                }, { once: true });
            };

            urls.forEach((u) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "lj-brief-link";
                btn.textContent = u;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    if (!window.open(u, "_blank", `width=${defwid}, height=${defhei}`)) {
                        warn({ str: "弹出的窗口被阻止。" });
                    }
                    close(u);
                };
                links.appendChild(btn);
            });

            // 跟随鼠标。
            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            const outside_handler = (e) => {
                if (!mele.contains(e.target)) close(null);
            };
            setTimeout(() => {
                document.addEventListener("mousedown", outside_handler);
            }, 0);
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
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
            ignore.className = "lj-ignore";
            ignore.innerHTML = "忽略";
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
            mele.appendChild(ignore);
            square.appendChild(count);

            mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
            inf.innerHTML = `${realstr ? esc_str(str) : str}<div class="lj-line"></div>`;
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

            // 每个 url 一个按钮。
            const link_btns = [];
            urls.forEach((u) => {
                const link = document.createElement("button");
                link.type = "button";
                link.className = "lj-link";
                link.textContent = u;
                link.style.opacity = 0;
                link.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
                link.onmouseover = () => { ld(link, "75%"); };
                link.onmouseleave = () => { ld(link, "100%"); };
                link.onclick = () => {
                    if (!window.open(u, "_blank", `width=${defwid}, height=${defhei}`)) {
                        warn({ str: "弹出的窗口被阻止。" });
                    }
                    close_win(u);
                };
                inf.appendChild(link);
                link_btns.push(link);
            });

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

            mele.addEventListener("animationend", () => {
                inf.style.transform = "translateY(0)";
                inf.style.opacity = 1;
                icon.style.opacity = 1;
                txt.style.opacity = 1;
                count.style.opacity = 1;
                link_btns.forEach(b => b.style.opacity = 1);
                ignore.style.opacity = 1;
                mele.style.width = "30ch";
                mele.style.left = "calc(50% - 15ch)";
                mele.style.right = "calc(50% + 15ch)";
            });

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const ignoreH = ignore.getBoundingClientRect().height;
                const ignoreMargin = parseFloat(window.getComputedStyle(ignore).marginBottom) || 0;
                mele.style.height = `${squareH + infH + ignoreH + ignoreMargin}px`;
            });
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(ignore);
            win_obj.resorb = resorb;

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = (result) => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
                link_btns.forEach(b => b.style.opacity = 0);
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
                        delete dbmaps[key];
                    }, { once: true });
                }, { once: true });
                for (let r of win_obj.waitlist) r(result);
            };

            ignore.onmouseover = () => { ld(ignore, "75%"); };
            ignore.onmouseleave = () => { ld(ignore, "100%"); };
            ignore.onclick = () => {
                close_win(null);
            };
        });
    }
}

async function zd({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    function errorres(error, input) {
        // 提取 msg 和 name。
        const msg = String(error && error.message ? error.message : error);
        const name = String(error && error.name ? error.name : "Error");
        const code = (input == null) ? "" : String(input);

        // 从消息里提取片段，转义。
        function grab(pattern) {
            const m = msg.match(pattern);
            return m && m[1] != null ? esc_str(m[1]) : null;
        }

        // 0. ReferenceError
        if (name === "ReferenceError") {
            if (msg.includes(" is not defined")) {
                const v = grab(/(.+) is not defined/);
                return `引用了未定义的变量或函数 “<code class="var">${v || "?"}</code>”。`;
            }
            if (msg.includes("Cannot access")) {
                const v = grab(/Cannot access '(.+?)'/);
                return `无法在初始化前访问 “<code class="var">${v || "变量"}</code>”。`;
            }
            return `引用错误：“<code class="err">${esc_str(msg)}</code>”。`;
        }

        // 1. SyntaxError
        if (name === "SyntaxError") {
            if (msg.includes("Missing initializer in const declaration")) {
                return `<code class="key">const</code> 常量没有设置初始化值。`;
            }
            if (msg.includes("has already been declared")) {
                const v = grab(/Identifier '(.+?)'/);
                return `标识符 “<code class="var">${v || "未知"}</code>” 已经声明过。`;
            }
            if (msg.includes("Unexpected token")) {
                let token = "";
                if (msg.includes("Unexpected token '")) {
                    token = msg.split("Unexpected token '")[1]?.split("'")[0] || "";
                } else {
                    token = msg.split("Unexpected token")[1]?.trim() || "";
                }
                if (token === "end of input") return "意外代码结束，输入不完整。";
                return `意外符号 “<code class="token">${esc_str(token) || "?"}</code>”。`;
            }
            if (msg.includes("Unexpected identifier")) {
                const v = grab(/Unexpected identifier '(.+?)'/);
                return `“<code class="token">${v || "?"}</code>” 不是有效的标识符。`;
            }
            if (msg.includes("Unexpected end of input")) {
                return "缺少必要的符号。";
            }
            if (msg.includes("Invalid or unexpected token")) {
                // 检查引号对称。
                let dq = 0, sq = 0, bq = 0;
                let esc = false;
                for (let i = 0; i < code.length; i++) {
                    const c = code[i];
                    if (esc) { esc = false; continue; }
                    if (c === "\\") { esc = true; continue; }
                    if (c === '"') dq++;
                    else if (c === "'") sq++;
                    else if (c === "`") bq++;
                }
                if (bq % 2 === 1) return "模板字符串中可能缺少闭合反引号。";
                if (dq % 2 === 1 || sq % 2 === 1) return "字符串缺少结束引号。";
                if (code.includes("\\")) return `无效转义字符 "\\"。`;
                return "无效标识符或意外符号。";
            }
            if (msg.includes("Invalid left-hand side in assignment")) {
                return "赋值操作中左侧表达式无效。<br />不能给常量、字面量或只读属性赋值。";
            }
            if (msg.includes("Cannot use import statement outside a module")) {
                return `无法在此上下文中使用 <code class="key">import</code> 语句。`;
            }
            if (msg.includes("Illegal return statement")) {
                return `<code class="key">return</code> 语句在函数外部无效。`;
            }
            if (msg.includes("Cannot read properties of")) {
                const parts = msg.split("Cannot read properties of ")[1] || "";
                const val = parts.includes("null") ? "null" : "undefined";
                const prop = grab(/\(reading '(.+?)'\)/);
                return `无法读取 “<code class="var">${prop || "未知属性"}</code>” 的属性，其值为 “<code class="token">${val}</code>”。`;
            }
            if (msg.includes("Cannot set properties of")) {
                const parts = msg.split("Cannot set properties of ")[1] || "";
                const val = parts.includes("null") ? "null" : "undefined";
                return `无法设置属性，其值为 “<code class="token">${val}</code>”。`;
            }
            if (msg.includes("is not a function")) {
                const v = grab(/(.+) is not a function/);
                return `“<code class="token">${v || "?"}</code>” 不是函数。`;
            }
            if (msg.includes("Missing ) after argument list")) {
                return `参数列表缺少闭合括号 “<code class="token">)</code>”。`;
            }
            if (msg.includes("Missing } after function body")) {
                return `函数体缺少闭合花括号 “<code class="token">}</code>”。`;
            }
            if (msg.includes("Missing formal parameter")) {
                return "箭头函数或函数声明中缺少形参。";
            }
            if (msg.includes("Unterminated string literal")) {
                return "字符串缺少结束引号。";
            }
            return `语法错误：“<code class="err">${esc_str(msg)}</code>”。`;
        }

        // 2. TypeError
        if (name === "TypeError") {
            if (msg.includes("Assignment to constant variable")) {
                return `<code class="key">const</code> 常量不可重新赋值。`;
            }
            if (msg.includes("Cannot assign to read only property")) {
                return "无法为只读属性赋值。";
            }
            if (msg.includes("Cannot redefine property")) {
                const v = grab(/Cannot redefine property: (.+)/);
                return `无法重新定义属性 “<code class="var">${v || "?"}</code>”。`;
            }
            if (msg.includes("Cannot read private member")) {
                const v = grab(/Cannot read private member #(.+?) /);
                return `无法读取私有字段 “<code class="var">#${v || "?"}</code>”。`;
            }
            if (msg.includes("Cannot read properties of")) {
                const parts = msg.split("Cannot read properties of ")[1] || "";
                const val = parts.includes("null") ? "null" : "undefined";
                const prop = grab(/\(reading '(.+?)'\)/);
                return `无法读取 “<code class="var">${prop || "未知属性"}</code>” 的属性，其值为 “<code class="${val === "undefined" || val === "null" ? "nu" : "token"}">${val}</code>”。`;
            }
            if (msg.includes("Cannot set properties of")) {
                const parts = msg.split("Cannot set properties of ")[1] || "";
                const val = parts.includes("null") ? "null" : "undefined";
                return `无法设置属性，其值为 “<code class="${val === "undefined" || val === "null" ? "nu" : "token"}">${val}</code>”。`;
            }
            if (msg.includes("Cannot convert undefined or null to object")) {
                return "无法将 undefined 或 null 转换为对象。";
            }
            if (msg.includes("Cannot use 'in' operator")) {
                return `无法在非对象上使用 <code class="key">in</code> 运算符。`;
            }
            if (msg.includes("Cannot delete property")) {
                const v = grab(/Cannot delete property '(.+?)'/);
                return `无法删除属性 “<code class="var">${v || "?"}</code>”。`;
            }
            if (msg.includes("is not a function")) {
                const v = grab(/(.+?) is not a function/);
                return `“<code class="var">${v || "?"}</code>” 不是函数。`;
            }
            if (msg.includes("is not iterable")) {
                const v = grab(/(.+) is not iterable/);
                return `“<code class="var">${v || "?"}</code>” 不可迭代。`;
            }
            if (msg.includes("is not a constructor")) {
                const v = grab(/(.+?) is not a constructor/);
                return `“<code class="var">${v || "?"}</code>” 不能作为构造函数使用。`;
            }
            if (msg.includes("Cannot destructure property")) {
                const prop = grab(/Cannot destructure property '(.+?)'/);
                return `解构赋值失败，无法从 <code class="nu">undefined</code> 或 <code class="nu">null</code> 中读取 “<code>${prop || "?"}</code>”。`;
            }
            if (msg.includes("Invalid array length")) {
                return "数组长度无效。";
            }
            if (msg.includes("Cyclic object value")) {
                return "循环引用的对象值无法序列化。";
            }
            return `类型错误：“<code class="err">${esc_str(msg)}</code>”。`;
        }

        // 3. RangeError
        if (name === "RangeError") {
            if (msg.includes("Maximum call stack size exceeded")) {
                return "超出最大调用栈大小（递归过深或循环调用）。";
            }
            if (msg.includes("Invalid date")) {
                return "日期格式无效。";
            }
            if (msg.includes("Precision is out of range")) {
                return "数字精度超出范围。";
            }
            if (msg.includes("Invalid array length")) {
                return "数组长度无效。";
            }
            return `范围错误：“<code class="err">${esc_str(msg)}</code>”。`;
        }

        // 4. URIError
        if (name === "URIError") {
            return `URI 格式错误：“<code class="err">${esc_str(msg)}</code>”。`;
        }

        // 5. EvalError
        if (name === "EvalError") {
            return `Eval 安全错误：“<code class="err">${esc_str(msg)}</code>”。`;
        }

        // 6. 其他错误。
        return `意外 <code class="une">${esc_str(name)}</code> 错误：“<code class="err">${esc_str(msg)}</code>”。`;
    }

    return new Promise((resolve) => {
        if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Zd()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
        str = String(str);
        if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Zd()</code> 函数中，<code>str</code> 不能为空。"; }
        if (tit == null || tit == undefined) tit = "终端";
        else { tit = String(tit); if (!tit.trim()) tit = "终端"; }
        if (id == null || id == undefined) id = "";

        let key = `zd|${str}|${tit}|${id}|${realstr}|${form}`;
        if (dbmaps[key]) {
            let win = dbmaps[key];
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
        const status = document.createElement("div");
        const submit = document.createElement("button");

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
        count.className = "zd-count";
        count.innerText = "1";
        count.style.opacity = 0;
        status.className = "zd-status";
        status.style.opacity = 0;
        status.style.transition = `all 0.2s ${easing}`
        status.textContent = "行 1，列 1";
        submit.className = "zd-submit";
        submit.style.opacity = 0;
        submit.type = "button";
        submit.textContent = "运行";
        submit.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(box);
        mele.appendChild(status);
        mele.appendChild(submit);
        square.appendChild(count);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
        if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        dbmaps[key] = win_obj;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            box.style.opacity = 1;
            count.style.opacity = 1;
            status.style.opacity = 1;
            status.style.transform = "translateY(0)";
            submit.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
        });

        let resorb = new ResizeObserver(() => {
            const squareH = square.getBoundingClientRect().height;
            const infH = inf.getBoundingClientRect().height;
            const boxH = box.getBoundingClientRect().height;
            const boxMargin = parseFloat(window.getComputedStyle(box).marginBottom) || 0;
            const statusH = status.getBoundingClientRect().height;
            const submitH = submit.getBoundingClientRect().height;
            const submitMarginT = parseFloat(window.getComputedStyle(submit).marginTop) || 0;
            const submitMarginB = parseFloat(window.getComputedStyle(submit).marginBottom) || 0;
            mele.style.height = `${squareH + infH + boxH + boxMargin + statusH + submitH + submitMarginT + submitMarginB}px`;
        }); // 监测高度变化。
        resorb.observe(square);
        resorb.observe(inf);
        resorb.observe(box);
        resorb.observe(status);
        resorb.observe(submit);
        win_obj.resorb = resorb;

        box.addEventListener("transitionend", () => { box.focus(); }, { once: true });

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        const close_win = (val) => {
            if (win_obj.resorb) {
                win_obj.resorb.disconnect();
                win_obj.resorb = null;
            }
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            box.style.opacity = 0;
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            count.style.opacity = 0;
            status.style.opacity = 0;
            status.style.transform = "translateY(-10px)";
            submit.style.opacity = 0;
            mele.style.height = "0px";
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `out_mfn 0.3s forwards ${easing}`;
                mclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    delete dbmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r(val);
        };

        submit.onmouseover = () => { ld(submit, "75%"); };
        submit.onmouseleave = () => { ld(submit, "100%"); };
        submit.onclick = async () => { await exec(); };

        async function exec() {
            const value = box.value.trim();
            if (value === "") {
                box.style.height = getComputedStyle(box).minHeight; // 运行代码时折叠 Zd()，为后面的窗口留出位置。
                mele.style.animation = `mfn_shake1 0.3s ${easing}`;
                box.style.backgroundColor = "#ffff0099";
                mele.addEventListener("animationend", () => {
                    mele.style.animation = "";
                    box.style.backgroundColor = "#22222299";
                }, { once: true });
                await warn({ str: "不能输入空字符串。", form: "brief" });
                box.focus();
                return;
            }
            try {
                box.style.height = getComputedStyle(box).minHeight;
                let k = await eval(value);
                if (k !== undefined && k !== null) {
                    rz(`<code>${k}</code>`);
                    close_win(k);
                } else if (k === undefined) {
                    rz(`返回值为 <code class="nu">undefined</code>。`);
                    close_win();
                } else if (k === null) {
                    rz(`返回值为 <code class="nu">null</code>。`);
                    close_win();
                }
            } catch (error) {
                box.style.height = getComputedStyle(box).minHeight;
                mele.style.animation = `mfn_shake2 0.3s ${easing}`;
                box.style.backgroundColor = "#ff000099";
                mele.addEventListener("animationend", () => {
                    mele.style.animation = "";
                    box.style.backgroundColor = "#22222299";
                }, { once: true });

                let error_msg = errorres(error, value);
                await fail({ str: error_msg });
                box.focus();
            }
        }

        function line_upd() {
            const val = box.value;
            const pos = box.selectionStart;
            // 截取光标前的所有文本，按换行符分割。
            const before = val.substring(0, pos);
            const lines = before.split("\n");
            const line = lines.length; // 行号 => 分割后的段数。
            const column = lines[lines.length - 1].length + 1;  // 列号 => 最后一段长度 + 1。
            status.textContent = `行 ${line}，列 ${column}`;
        }

        box.addEventListener("input", line_upd);
        box.addEventListener("click", line_upd);
        box.addEventListener("keyup", line_upd);
        line_upd();

        box.addEventListener("keydown", async (event) => {
            if (event.isComposing) return; // 输入法正在组字时，直接跳过避免干扰。

            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();

                const start = box.selectionStart;
                const end = box.selectionEnd;
                const text = box.value;

                // 在光标当前位置插入换行符，如果选中了文本则替换选中部分。
                box.value = text.substring(0, start) + "\n" + text.substring(end);

                // 将光标移动到插入的换行符之后。
                box.selectionStart = box.selectionEnd = start + 1;

                box.focus();
            } else if (event.key === "Enter" && event.shiftKey) {
                submit?.focus();
            }

            function autofill(p) {
                event.preventDefault();

                const start = box.selectionStart;
                const end = box.selectionEnd;
                const text = box.value;
                let l = "";
                let r = "";
                switch (p) {
                    case "(":
                        l = "(";
                        r = ")";
                        break;
                    case "[":
                        l = "[";
                        r = "]";
                        break;
                    case "{":
                        l = "{";
                        r = "}";
                        break;
                    case '"':
                    case "'":
                    case "`":
                        l = p;
                        r = p;
                        break;
                    default:
                        return;
                }

                // 有选中文本 => 用括号包裹选中内容。
                if (start !== end) {
                    const selected = text.substring(start, end);
                    box.value = text.substring(0, start) + l + selected + r + text.substring(end);
                    box.selectionStart = box.selectionEnd = end + 2;
                }
                // 无选中文本 => 插入括号，光标置于中间。
                else {
                    box.value = text.substring(0, start) + l + r + text.substring(start);
                    box.selectionStart = box.selectionEnd = start + 1;
                }

                box.focus();
            }

            function ispaired(l, r) {
                const start = box.selectionStart;
                return start === box.selectionEnd && box.value[start - 1] === l && box.value[start] === r;
            }

            if (event.key === "(") {
                if (ispaired("(", ")")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    autofill("(");
                }
            }
            if (event.key === "[" && !event.shiftKey) {
                if (ispaired("[", "]")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    autofill("[");
                }
            }
            if (event.key === "{") {
                if (ispaired("{", "}")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    autofill("{");
                }
            }
            if (event.key === '"') {
                if (ispaired('"', '"')) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    autofill('"');
                }
            }
            if (event.key === "'") {
                if (ispaired("'", "'")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    autofill("'");
                }
            }
            if (event.key === "`") {
                if (ispaired("`", "`")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    autofill("`");
                }
            }

            // 右括号处理。
            if (event.key === ")") {
                if (ispaired("(", ")")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    event.preventDefault();
                    const start = box.selectionStart;
                    box.value = box.value.substring(0, start) + ")" + box.value.substring(start);
                    box.selectionStart = box.selectionEnd = start + 1;
                }
            }
            if (event.key === "]") {
                if (ispaired("[", "]")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    event.preventDefault();
                    const start = box.selectionStart;
                    box.value = box.value.substring(0, start) + "]" + box.value.substring(start);
                    box.selectionStart = box.selectionEnd = start + 1;
                }
            }
            if (event.key === "}") {
                if (ispaired("{", "}")) {
                    event.preventDefault();
                    box.selectionStart = box.selectionEnd = box.selectionStart + 1;
                } else {
                    event.preventDefault();
                    const start = box.selectionStart;
                    box.value = box.value.substring(0, start) + "}" + box.value.substring(start);
                    box.selectionStart = box.selectionEnd = start + 1;
                }
            }

            // 获取所选文本所在的完整行范围。
            function linerange(text, start, end) {
                let linestart = text.lastIndexOf("\n", start - 1) + 1;
                let lineend = text.indexOf("\n", end);
                if (lineend === -1) lineend = text.length;
                return [linestart, lineend];
            }
            if (event.key === "Tab" && !event.shiftKey) {
                event.preventDefault();
                const start = box.selectionStart;
                const end = box.selectionEnd;
                const text = box.value;

                if (start !== end) {
                    // 选中文本 => 每行增加缩进。
                    const [linestart, lineend] = linerange(text, start, end);
                    const lines = text.substring(linestart, lineend).split("\n");
                    const newlines = lines.map(line => "    " + line);
                    box.value = text.substring(0, linestart) + newlines.join("\n") + text.substring(lineend);
                    const newend = linestart + newlines.join("\n").length;
                    box.selectionStart = linestart;
                    box.selectionEnd = newend;
                } else {
                    // 无选中 => 插入缩进。
                    box.value = text.substring(0, start) + "    " + text.substring(start);
                    box.selectionStart = box.selectionEnd = start + 4;
                }
                box.focus();
            }
            else if (event.key === "Tab" && event.shiftKey) {
                event.preventDefault();
                const start = box.selectionStart;
                const end = box.selectionEnd;
                const text = box.value;

                if (start !== end) {
                    // 有选中文本 => 每行删除前面的空格。
                    const [linestart, lineend] = linerange(text, start, end);
                    const lines = text.substring(linestart, lineend).split("\n");
                    const newlines = lines.map(line => line.replace(/^ {1,4}/, ""));
                    box.value = text.substring(0, linestart) + newlines.join("\n") + text.substring(lineend);
                    const newend = linestart + newlines.join("\n").length;
                    box.selectionStart = linestart;
                    box.selectionEnd = newend;
                } else {
                    // 无选中 => 减少当前行前导空格。
                    const linestart = text.lastIndexOf("\n", start - 1) + 1;
                    const lineend = text.indexOf("\n", start);
                    const nowline = text.substring(linestart, lineend === -1 ? text.length : lineend);
                    const newline = nowline.replace(/^ {1,4}/, "");
                    if (newline !== nowline) {
                        box.value = text.substring(0, linestart) + newline + text.substring(lineend);
                        box.selectionStart = box.selectionEnd = linestart + newline.length;
                    }
                }
                box.focus();
            }
        });
    });
}

async function timer({ str, time, tit, id, realstr = false, form = "dainiv basic" }) {
    return new Promise((resolve) => {
        let passed_time = 0;
        let ls_finish = false;
        if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return `在 <code>Timer()</code> 函数中，<code>str</code> 参数不能为 <code class="nu">null</code> 或 <code class="nu">undefined</code>。`; }
        if (time == null || time == undefined) { fail({str: `<code class="nu">null</code> 或 <code class="nu">undefined</code> 不是有效的数字。`}); return "在 <code>Timer()</code> 函数中，time 参数不能为 null 或 undefined。"; }
        str = String(str);
        time = Number(time);
        if (!str.trim()) str = "";
        if (tit == null || tit == undefined) tit = "计时";
        else { tit = String(tit); if (!tit.trim()) tit = "计时"; }
        if (id == null || id == undefined) id = "";
        if (isNaN(time)) { fail({ str: "<code>time</code> 参数必须为可识别的数字或纯数字字符串。" }); return "在 <code>Timer()</code> 函数中，<code>time</code> 必须为可识别的数字或纯数字字符串。"; }
        else if (time < 1250) { warn({ str: "<code>time</code> 的值过小，无法正常计时。" }); return "在 <code>Timer()</code> 函数中，<code>time</code> 的值必须大于等于 1250。"; }
        else if (time > 3.15576e10 * 1.1568) { warn({ str: "<code>time</code> 的值过大，无法正常计时。" }); return "在 <code>Timer()</code> 函数中，<code>time</code> 的值必须小于等于 6.048e10。"; }

        let key = `timer|${str}|${tit}|${id}|${realstr}|${form}`;
        if (dbmaps[key]) {
            let win = dbmaps[key];
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
        if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
        inf.style.color = "black";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        earlyend.className = "timer-earlyend";
        earlyend.style.color = "black";
        earlyend.style.opacity = 0;
        earlyend.innerHTML = "提前结束";
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
        if (realstr) { txt.textContent = tit; inf.textContent = str; }
        else { txt.innerHTML = tit; inf.innerHTML = str; }

        let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
        dbmaps[key] = win_obj;

        let interval_speed;
        let interval_progress;
        let interval_check;

        const finish = () => {
            if (ls_finish) return;
            ls_finish = true;
            if (interval_speed) clearInterval(interval_speed);
            if (interval_progress) clearInterval(interval_progress);
            if (interval_check) clearInterval(interval_check);
            if (win_obj.resorb) {
                win_obj.resorb.disconnect();
                win_obj.resorb = null;
            }
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
                    delete dbmaps[key];
                }, { once: true });
            }, { once: true });
            for (let r of win_obj.waitlist) r(true);
        };

        interval_speed = setInterval(() => {
            passed_time += timer_speed * 10;
            if (timer_speed > 1) inf.style.color = "#ff0000";
            else if (timer_speed < 1 && timer_speed > 0) inf.style.color = "#0000ff";
            else if (timer_speed === 0) inf.style.color = "#d000d0";
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

        let resorb = new ResizeObserver(() => {
            const squareH = square.getBoundingClientRect().height;
            const infH = inf.getBoundingClientRect().height;
            const barH = bar.getBoundingClientRect().height;
            const earlyendH = earlyend.getBoundingClientRect().height;
            const timerdescH = timerdesc.getBoundingClientRect().height;
            const timerdescMargin = parseFloat(window.getComputedStyle(timerdesc).marginBottom) || 0;
            mele.style.height = `${squareH + infH + barH + earlyendH + timerdescH + timerdescMargin}px`;
        }); // 监测高度变化。
        resorb.observe(square);
        resorb.observe(inf);
        resorb.observe(bar);
        resorb.observe(earlyend);
        resorb.observe(timerdesc);
        win_obj.resorb = resorb;

        let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        earlyend.addEventListener("click", finish, { once: true });

        let prog = 0;
        interval_progress = setInterval(() => {
            let timer_backwards = timer_speed < 0;
            prog += timer_speed * 10 / (time / 100);
            bar.style.width = `${prog}%`;
            timerdesc.innerHTML = `${timer_speed === 0 ? "停滞" : String(timer_speed) + " 倍速"} | ${passed_time > 0 ? fhsj(passed_time) : fhsj(0)} / ${fhsj(time)} | ${prog > 0 ? prog.toFixed(2) : 0}%`;
            if (timer_speed > 1) {
                bar.style.backgroundColor = "#ff000049";
                timerdesc.style.color = "#ff0000";
            } else if (timer_speed < 1 && timer_speed > 0) {
                bar.style.backgroundColor = "#0000ff49";
                timerdesc.style.color = "#0000ff";
            } else if (timer_speed === 0) {
                bar.style.backgroundColor = "#d000d049";
                timerdesc.style.color = "#d000d0";
            } else if (timer_speed > -1 && timer_speed < 0) {
                bar.style.backgroundColor = "#d0d00049";
                timerdesc.style.color = "#d0d000";
            } else if (timer_speed < -1) {
                bar.style.backgroundColor = "#d0d0d049";
                timerdesc.style.color = "#d0d0d0";
            } else {
                bar.style.backgroundColor = "#00000049";
                timerdesc.style.color = "#000000";
            }
            if (prog >= 100) {
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

async function mb({ str, tit, id, realstr = false, form = "dainiv basic" }) {
    // 参数检查。
    if (str == null || str == undefined) { fail({ str: `不能输入 <code class="nu">${str}</code>！` }); return "在 <code>Mb()</code> 函数中，<code>str</code> 不能为 <code class=\"nu\">null</code> 或 <code class=\"nu\">undefined</code>。"; }
    str = String(str);
    if (!str.trim()) { warn({ str: "不能输入空字符串。" }); return "在 <code>Mb()</code> 函数中，<code>str</code> 不能为空。"; }
    if (tit == null || tit == undefined) tit = "面板";
    else { tit = String(tit); if (!tit.trim()) tit = "面板"; }
    if (id == null || id == undefined) id = "";

    let key = `mb|${str}|${tit}|${id}|${realstr}|${form}`;

    // 样式分发。
    if (form === "brief") {
        return new Promise((resolve) => {
            if (bfmaps[key]) {
                const old_dom = bfmaps[key].dom;
                if (old_dom && document.body.contains(old_dom)) {
                    old_dom.style.animation = `out_brief 0.2s forwards ${easing}`;
                    old_dom.addEventListener("animationend", () => {
                        if (document.body.contains(old_dom)) document.body.removeChild(old_dom);
                    }, { once: true });
                }
            }

            const mele = document.createElement("div");
            const icon = document.createElement("img");
            const text = document.createElement("div");
            const txt = document.createElement("div");
            const inf = document.createElement("div");

            mele.className = "mb-brief-mele";
            mele.id = id;
            icon.className = "brief-icon";
            icon.src = "Dainiv/images/Pad.png";
            icon.alt = "";
            text.className = "brief-txt";
            txt.className = "mb-brief-title";
            inf.className = "brief-inf";

            if (realstr) { txt.textContent = tit; inf.textContent = str; }
            else { txt.innerHTML = tit; inf.innerHTML = str; }

            document.body.appendChild(mele);
            mele.appendChild(icon);
            mele.appendChild(text);
            text.appendChild(txt);
            text.appendChild(inf);

            // 跟随鼠标。
            const x = (typeof window.x === "number") ? window.x : window.innerWidth / 2;
            const y = (typeof window.y === "number") ? window.y : window.innerHeight / 2;
            mele.style.left = `${x}px`;
            mele.style.top = `${y}px`;

            // 边界翻转。
            requestAnimationFrame(() => {
                const r = mele.getBoundingClientRect();
                if (r.right > window.innerWidth) {
                    mele.style.left = `${Math.max(8, window.innerWidth - r.width - 8)}px`;
                }
                if (r.bottom > window.innerHeight) {
                    mele.style.top = `${Math.max(8, y - r.height - 12)}px`;
                }
            });

            mele.style.animation = `in_brief 0.2s forwards ${easing}`;

            bfmaps[key] = { dom: mele };

            let closed = false;
            const close = () => {
                if (closed) return;
                closed = true;
                mele.style.animation = `out_brief 0.2s forwards ${easing}`;
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                    if (bfmaps[key] && bfmaps[key].dom === mele) {
                        delete bfmaps[key];
                    }
                    resolve();
                }, { once: true });
            };

            mele.onclick = () => { close(); };
        });
    }

    else {
        return new Promise((resolve) => {
            if (dbmaps[key]) {
                let win = dbmaps[key];
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
            if (realstr) { txt.textContent = tit; } else { txt.innerHTML = tit; }
            txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
            txt.style.opacity = 0;
            inf.className = "mfn-inf";
            if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
            inf.style.opacity = 0;
            inf.style.textAlign = "center";
            inf.style.minWidth = "30ch";
            inf.style.transition = `all 0.2s ${easing}`;
            gb.type = "button";
            gb.className = "mb-gb";
            gb.innerHTML = "关闭";
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

            let win_obj = { dom: mele, cnt: 1, cnt_ele: count, orig_tit: tit, waitlist: [resolve], anim_timer: null };
            dbmaps[key] = win_obj;

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

            let resorb = new ResizeObserver(() => {
                const squareH = square.getBoundingClientRect().height;
                const infH = inf.getBoundingClientRect().height;
                const gbH = gb.getBoundingClientRect().height;
                const gbMargin = parseFloat(window.getComputedStyle(gb).marginBottom) || 0;
                mele.style.height = `${squareH + infH + gbH + gbMargin}px`;
            }); // 监测高度变化。
            resorb.observe(square);
            resorb.observe(inf);
            resorb.observe(gb);
            win_obj.resorb = resorb;

            let square_height = hqgd(txt.innerHTML, "mfn-title", "div");
            square.style.height = square_height;
            inf.style.marginTop = square_height;

            const close_win = () => {
                if (win_obj.resorb) {
                    win_obj.resorb.disconnect();
                    win_obj.resorb = null;
                }
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
                        delete dbmaps[key];
                    }, { once: true });
                }, { once: true });
                for (let r of win_obj.waitlist) r("已确认。");
            };

            gb.onmouseover = () => { ld(gb, "75%"); };
            gb.onmouseleave = () => { ld(gb, "100%"); };
            gb.onclick = close_win;
        });
    }
}

async function rz(str, time, realstr = false) {
    return new Promise((resolve) => {
        if (str == null) {
            warn({ str: `这个值为 <code class="nu">null</code>。` });
            resolve();
        } else if (str == undefined) {
            warn({ str: `这个值为 <code class="nu">undefined</code>。` });
            resolve();
        }
        if (time == null || time == undefined) time = smarttime(str);

        const mele = document.createElement("div");
        mele.className = "rz-mele";
        mele.style.opacity = 0;
        const inf = document.createElement("div");
        inf.className = "rz-inf";
        inf.style.transition = `all 0.2s ${easing}`;
        if (realstr) { inf.textContent = str; } else { inf.innerHTML = str; }
        inf.style.opacity = 0;
        const bar = document.createElement("div");
        bar.className = "rz-bar";
        let timeup = false;
        let prog = 0;

        lcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `in_rz 0.5s forwards ${easing}`;
        mele.addEventListener("animationend", () => {
            inf.style.opacity = 1;
        }, { once: true });

        let i1;
        inf.addEventListener("transitionend", () => {
            i1 = setInterval(() => {
                prog += 10 / (time / 100);
                bar.style.width = `${prog}%`;
                if (prog >= 100) {
                    timeup = true;
                }
            }, 10);
        }, { once: true });

        function damnclose() {
            clearInterval(i1);
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

        mele.addEventListener("contextmenu", async (e) => {
            e.preventDefault();
            if (timeup) return;
            damnclose();
        });

        setInterval(() => {
            if (timeup) damnclose();
        }, 40);
    });
}