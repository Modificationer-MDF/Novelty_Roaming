// rz 函数。
function rz(string, time) {
    if (string == null) {
        warn("这个值为 null。");
        return;
    } else if (string == undefined) {
        warn("这个值为 undefined。");
        return;
    }
    if (time == null || time == undefined) time = smarttime(string);

    const window = document.createElement("div");
    window.className = "rz-window";
    window.style.opacity = 0;
    const content = document.createElement("div");
    content.className = "rz-content";
    content.innerHTML = string;

    const l = Math.ceil(string.length / 14);
    const lh = parseInt(content.style.lineHeight);
    content.style.height = `${l * lh}px`;

    create(window);
    document.body.appendChild(window);
    window.appendChild(content);

    requestAnimationFrame(() => {
        window.style.animation = `jr_rz 350ms forwards ${easing}`;
    });

    setTimeout(() => {
        window.style.animation = `cc_rz 350ms forwards ${easing}`;
        setTimeout(() => {
            if (document.body.contains(window)) document.body.removeChild(window);
            close(window);
        }, 550);
    }, time);
}

// noti 函数。
async function noti(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Noti() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Noti() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "通知";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "通知";
        }
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const content = document.createElement("div");
        const okey = document.createElement("button");

        window.className = "noti-window";
        window.id = id;
        square.className = "noti-square";
        icon.src = "images/Notification.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        okey.type = "button";
        okey.className = "noti-okey";
        okey.innerHTML = "清楚了";
        okey.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        okey.style.opacity = 0;
        okey.style.width = 0;

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(okey);

        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            okey.style.width = "100%";
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                okey.style.opacity = 0;
                okey.style.width = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                resolve();
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            };
        }, 25);
    });
}

// cg 函数。
async function cg(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Cg() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Cg() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "完成";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "完成";
        }
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        window.className = "cg-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "cg-square";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "images/Suc.png";
        icon.style.opacity = 0;
        icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const okey = document.createElement("button");
        okey.type = "button";
        okey.className = "cg-okey";
        okey.innerHTML = "确定";
        okey.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        okey.style.opacity = 0;
        okey.style.width = 0;

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(okey);

        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            okey.style.width = "100%";
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                okey.style.opacity = 0;
                okey.style.width = 0;
                txt.style.opacity = 0;
                icon.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    resolve();
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            };
        }, 25);
    });
}

// fail 函数。
async function fail(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Fail() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Fail() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "错误";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "错误";
        }
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        window.className = "fail-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "fail-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "fail-icon";
        icon.style.opacity = 0;
        icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const okey = document.createElement("button");
        okey.type = "button";
        okey.className = "fail-lj";
        okey.innerHTML = "了解";
        okey.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        okey.style.opacity = 0;
        okey.style.width = 0;

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(okey);

        icon.src = "images/Err.png";
        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            okey.style.width = "100%";
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                okey.style.opacity = 0;
                okey.style.width = 0;
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    resolve();
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            };
        }, 25);
    });
}

// warn 函数。
async function warn(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Warn() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Warn() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "注意";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "注意";
        }
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        window.className = "warn-window";
        const square = document.createElement("div");
        square.className = "warn-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "warn-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const okey = document.createElement("button");
        okey.type = "button";
        okey.className = "warn-zx";
        okey.innerHTML = "知晓";
        okey.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        okey.style.opacity = 0;
        okey.style.width = 0;

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(okey);

        icon.src = "images/Exc.png";
        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            okey.style.width = "100%";
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                okey.style.opacity = 0;
                okey.style.width = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    resolve();
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            };
        }, 25);
    });
}

// inp 函数。
async function inp(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Inp() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Inp() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "输入";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "输入";
        }
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        window.className = "inp-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "inp-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "inp-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const box = document.createElement("textarea");
        box.type = "text";
        box.placeholder = "请输入内容.……";
        box.className = "inp-box";
        box.style.opacity = 0;
        box.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        box.focus();

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(box);

        icon.src = "images/Inp.png";
        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            box.style.opacity = 1;
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        box.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const value = box.value;
                content.style.transform = "translateY(-10px)";
                content.style.opacity = 0;
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    resolve(value);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            }
        });
    });
}

// xz 函数。
async function xz(string, n, names, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Xz() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Xz() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "选择";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "选择";
        }
        if (id == null || id == undefined) id = "";
        if (n > names.length) {
            fail("所给予的选项数量不足！");
            return;
        }

        const window = document.createElement("div");
        window.className = "xz-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "xz-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "xz-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const confirm = document.createElement("button");
        confirm.className = "xz-confirm";
        confirm.innerHTML = "确定";
        confirm.style.opacity = 0;
        confirm.style.width = 0;
        confirm.style.transition = `all 175ms ${easing}`;
        const giveup = document.createElement("button");
        giveup.className = "xz-giveup";
        giveup.innerHTML = "放弃选择";
        giveup.style.opacity = 0;
        giveup.style.width = 0;
        giveup.style.transition = `all 175ms ${easing}`;

        const array = Array.from(names);
        const xz_items = []; // 被选项。

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(confirm);
        window.appendChild(giveup);

        icon.src = "images/Sel.png";
        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            confirm.style.opacity = 1;
            confirm.style.width = "100%";
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            confirm.addEventListener(("transitionend"), () => {
                giveup.style.opacity = 1;
                giveup.style.width = "100%";
            });
            window.style.height = window.scrollHeight + "px";
        });

        giveup.addEventListener(("transitionend"), () => {
            window.style.height = `calc(${window.scrollHeight + 20}px)`;
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        const tohex = (r, g, b) => {
            const tohex_ = (value) => {
                const hex = value.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            return `#${tohex_(r)}${tohex_(g)}${tohex_(b)}`;
        };

        const color = () => {
            const r = Math.floor(Math.random() * 128);
            const g = Math.floor(Math.random() * 64);
            const b = Math.floor(Math.random() * 255);
            return tohex(r, g, b);
        }

        giveup.onmouseover = () => {
            ld(giveup, "75%");
        };
        giveup.onmouseleave = () => {
            ld(giveup, "100%");
        }
        giveup.onclick = () => {
            resolve(null);
            giveup.style.opacity = 0;
            giveup.style.width = 0;
            giveup.addEventListener("transitionend", () => {
                giveup.style.visibility = "hidden";
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                confirm.style.opacity = 0;
                confirm.style.width = 0;
                confirm.style.visibility = "hidden";
                confirm.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 550ms forwards ${easing}`;
                    close(window);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            });
        }

        confirm.onmouseover = () => {
            ld(confirm, "75%");
        };
        confirm.onmouseleave = () => {
            ld(confirm, "100%");
        }
        confirm.onclick = () => {
            if (xz_items.length === 0) {
                warn("你还没有勾选！");
                window.style.animation = `mfn_shake1 0.3s ${easing}`;
                confirm.style.backgroundColor = "#ffff00b0";
                window.addEventListener("animationend", () => {
                    window.style.animation = "";
                    confirm.style.backgroundColor = "#a700ffb0";
                }, { once: true });
                return;
            } else {
                resolve(xz_items);
                confirm.style.opacity = 0;
                confirm.style.width = 0;
                confirm.addEventListener("transitionend", () => {
                    confirm.style.visibility = "hidden";
                    content.style.opacity = 0;
                    content.style.transform = "translateY(-10px)";
                    icon.style.opacity = 0;
                    txt.style.opacity = 0;
                    giveup.style.opacity = 0;
                    giveup.style.width = 0;
                    giveup.style.visibility = "hidden";
                    giveup.addEventListener("transitionend", () => {
                        square.style.height = "35px";
                        window.style.animation = `cc_mfn 550ms forwards ${easing}`;
                        close(window);
                        setTimeout(() => {
                            if (document.body.contains(window)) document.body.removeChild(window);
                        }, 550);
                    });
                });
            }
        };

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

            btn.style.backgroundColor = `${color()}b0`;

            window.addEventListener("animationend", () => {
                btn.style.opacity = 1;
            }, { once: true });

            container.appendChild(checkbox);
            container.appendChild(btn);
            container.style.top = `${btn.offsetHeight + 25}px`;
            content.style.marginBottom = `25px`;

            checkbox.onchange = () => {
                if (checkbox.checked) {
                    if (xz_items.length >= n) {
                        fail(`勾选的选项数量已达上限。最多可勾选 ${n} 个。`);
                        window.style.animation = `mfn_shake2 0.3s ${easing}`;
                        confirm.style.backgroundColor = "#ff0000b0";
                        window.addEventListener("animationend", () => {
                            window.style.animation = "";
                            confirm.style.backgroundColor = "#a700ffb0";
                        }, { once: true });
                        checkbox.checked = false;
                        return;
                    }
                    xz_items.push(array[i]);
                } else {
                    const index = xz_items.indexOf(array[i]);
                    if (index > -1) {
                        xz_items.splice(index, 1);
                    }
                }
            };

            btn.onmouseover = () => {
                ld(btn, "75%");
            };
            btn.onmouseleave = () => {
                ld(btn, "100%");
            };
            btn.onclick = () => {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            };

            content.appendChild(container);
        }
    });
}

// synchr 函数。

async function synchr(string, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入空值！");
        return "在 Synchr() 函数中，string 参数不能为 null 或 undefined。";
    }
    string = String(string);
    let s_replaced = string.replace(/\s+/g, "");
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Synchr() 函数中，string 参数不能为空。";
    }
    if (title == null || title == undefined) title = "同步";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "同步";
    }
    if (id == null || id == undefined) id = "";

    const window = document.createElement("div");
    window.className = "synchr-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "synchr-square";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.className = "synchr-icon";
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.textAlign = "center";
    content.style.minWidth = "30ch";
    content.style.transition = `all 175ms ${easing}`;
    const bar = document.createElement("div");
    bar.className = "synchr-progressbar";
    const desc = document.createElement("div");
    desc.className = "fn-timerdesc";
    desc.innerHTML = "无任务";

    create(window);
    document.body.appendChild(window);

    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(bar);
    window.appendChild(desc);

    icon.src = "images/Synchronization.png";
    window.style.animation = `jr_mfn 350ms forwards ${easing}`;
    content.innerHTML = string;
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        window.style.width = "30ch";
        window.style.left = "calc(50% - 15ch)";
        window.style.right = "calc(50% + 15ch)";
        window.style.maxHeight = window.getBoundingClientRect().height + "px";
    });

    let square_height = hqgd(txt.innerHTML, "fn-title", "div");
    square.style.height = square_height;
    content.style.marginTop = square_height;

    setTimeout(() => {
        content.style.opacity = 0;
        content.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        content.addEventListener("transitionend", () => {
            square.style.height = "35px";
            window.style.animation = `cc_mfn 350ms forwards ${easing}`;
            close(window);
            setTimeout(() => {
                if (document.body.contains(window)) document.body.removeChild(window);
            }, 550);
        });
    }, smarttime(string));
}

// lj 函数。
async function lj(string, url, title, id) {
    if (string == null || string == undefined) {
        fail("不能输入空值！");
        return "在 Lj() 函数中，string 参数不能为 null 或 undefined。";
    }
    if (url == null || url == undefined) {
        warn("无法跳转至 null 或 undefined。");
        return "在 Lj() 函数中，url 参数不能为 null 或 undefined。";
    }
    string = String(string);
    url = String(url);
    let s_replaced = string.replace(/\s+/g, "");
    if (s_replaced === "") {
        warn("不能输入空字符串。");
        return "在 Lj() 函数中，string 参数不能为空。";
    }
    let u_replaced = url.replace(/\s+/g, "");
    if (u_replaced === "") {
        warn("无法跳转至空地址。");
        return "在 Lj() 函数中，url 参数不能为空。";
    }
    if (title == null || title == undefined) title = "链接";
    else {
        title = String(title);
        let t_replaced = title.replace(/\s+/g, "");
        if (t_replaced === "") title = "链接";
    }
    if (id == null || id == undefined) id = "";

    const window = document.createElement("div");
    window.className = "lj-window";
    window.id = id;
    const square = document.createElement("div");
    square.className = "lj-square";
    const icon = document.createElement("img");
    icon.alt = "";
    icon.className = "lj-icon";
    icon.style.opacity = 0;
    icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const txt = document.createElement("div");
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const content = document.createElement("div");
    content.className = "fn-content";
    content.style.opacity = 0;
    content.style.textAlign = "center";
    content.style.minWidth = "30ch";
    content.style.transition = `all 175ms ${easing}`;
    const link = document.createElement("button");
    link.className = "lj-link";
    link.style.opacity = 0;
    link.style.width = 0;
    link.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
    const ignore = document.createElement("button");
    ignore.className = "lj-ignore";
    ignore.style.opacity = 0;
    ignore.style.width = 0;
    ignore.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";

    create(window);
    document.body.appendChild(window);

    window.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    window.appendChild(content);
    window.appendChild(link);
    window.appendChild(ignore);

    icon.src = "images/Link.png";
    window.style.animation = `jr_mfn 350ms forwards ${easing}`;
    content.innerHTML = string;
    link.innerHTML = url;
    ignore.innerHTML = "忽略";
    txt.innerHTML = title;

    window.addEventListener("animationend", () => {
        content.style.transform = "translateY(0)";
        content.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        link.style.opacity = 1;
        link.style.width = "100%";
        window.style.width = "30ch";
        window.style.left = "calc(50% - 15ch)";
        window.style.right = "calc(50% + 15ch)";
        window.style.height = window.scrollHeight + "px";
        link.addEventListener(("transitionend"), () => {
            ignore.style.opacity = 1;
            ignore.style.width = "100%";
        }, { once: true });
    });

    ignore.addEventListener("transitionend", () => {
        window.style.height = `${window.scrollHeight + 20}px`;
    }, { once: true });

    let square_height = hqgd(txt.innerHTML, "fn-title", "div");
    square.style.height = square_height;
    content.style.marginTop = square_height;

    link.onmouseover = () => {
        ld(link, "75%");
    };
    link.onmouseleave = () => {
        ld(link, "100%");
    }
    link.onclick = () => {
        if (!open(url, "_blank", `width=${defwid}, height=${defhei}`)) {
            warn("弹出的窗口被阻止。");
        }
        link.style.opacity = 0;
        link.style.width = 0;
        link.style.visibility = "hidden";
        link.addEventListener(("transitionend"), () => {
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            ignore.style.opacity = 0;
            ignore.style.width = 0;
            ignore.style.visibility = "hidden";
            ignore.addEventListener("transitionend", () => {
                square.style.height = "35px";
                window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                close(window);
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        }, { once: true });
    };

    ignore.onmouseover = () => {
        ld(ignore, "75%");
    };
    ignore.onmouseleave = () => {
        ld(ignore, "100%");
    }
    ignore.onclick = () => {
        rz("已忽略该链接。");
        ignore.style.opacity = 0;
        ignore.style.width = 0;
        ignore.style.visibility = "hidden";
        ignore.addEventListener(("transitionend"), () => {
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            link.style.opacity = 0;
            link.style.width = 0;
            link.style.visibility = "hidden";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            link.addEventListener("transitionend", () => {
                square.style.height = "35px";
                window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                close(window);
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        }, { once: true });
    };
}

// zd 函数。
async function zd(string, title, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Zd() 函数中，string 参数不能为 null 或 undefined。";
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            warn("不能输入空字符串。");
            return "在 Zd() 函数中，string 参数不能为空。";
        }
        if (title == null || title == undefined) title = "终端";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "终端";
        }
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        window.className = "zd-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "zd-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.className = "zd-icon";
        icon.style.opacity = 0;
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const box = document.createElement("textarea");
        box.className = "zd-box";
        box.style.opacity = 0;
        box.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";
        box.focus();

        box.addEventListener("keypress", async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                const value = box.value.trim();
                if (value === "") {
                    warn("不能输入空字符串。");
                    window.style.animation = `mfn_shake1 0.3s ${easing}`;
                    box.style.backgroundColor = "#ffff0099";
                    window.addEventListener("animationend", () => {
                        window.style.animation = "";
                        box.style.backgroundColor = "#22222299";
                    }, { once: true });
                    return;
                }
                try {
                    let k = await eval(value);
                    if (k !== undefined && k !== null) {
                        rz(k);
                        resolve(k);
                    } else if (k === undefined) {
                        rz("返回值为 undefined。");
                        resolve();
                    } else if (k === null) {
                        rz("返回值为 null。");
                        resolve();
                    }
                } catch (error) {
                    window.style.animation = `mfn_shake2 0.3s ${easing}`;
                    box.style.backgroundColor = "#ff000099";
                    switch (error.name) {
                        case "ReferenceError":
                            let vof = error.message.split(" is not defined");
                            fail(`引用了未定义的变量或函数 ‘${vof[0]}’。`);
                            break;
                        case "SyntaxError":
                            if (error.message.includes("Unexpected identifier")) {
                                let err = "‘" + (error.message.split("Unexpected identifier '")[1].replace("'", "’"));
                                fail(`${err} 不是有效的标识符（Identifier）。`);
                            } else if (error.message.includes("Unexpected end of input")) {
                                fail("缺少必要的符号。");
                            } else if (error.message.includes("Unexpected token")) {
                                let token = "‘" + (error.message.split("Unexpected token '")[1].replace("'", "’"));
                                fail(`意外的符号 ${token}。`);
                            } else if (error.message.includes("Invalid or unexpected token")) {
                                if (value.includes("\\")) {
                                    fail("无效的转义字符 “\\”。");
                                } else {
                                    fail("无效标识符。");
                                }
                            } else if (error.message.includes("Missing initializer in const declaration")) {
                                fail("const 变量没有设置初始化值。");
                            } else if (error.message.includes("Invalid left-hand side in assignment")) {
                                fail("赋值操作中左侧表达式无效。");
                            } else if (error.message.includes("has already been declared") && error.message.includes("Identifier")) {
                                let err = error.message.replace("Identifier '", "").replace("' has already been declared", "").replace("'", "’");
                                fail(`标识符 ‘${err}’ 已经声明过。`);
                            } else {
                                fail(`语法错误：${error.message}。`);
                            }
                            break;
                        case "TypeError":
                            if (error.message.includes("is not a function")) {
                                let err = error.message.replace(" is not a function", "").replace("'", "’");
                                fail(`‘${err}’ 不是函数。`);
                            } else if (error.message.includes("Cannot read properties")) {
                                let err1 = error.message.split("Cannot read properties of ")[1].replace(" (reading '", "").replace("')", "");
                                let err2 = (err1.includes("null") ? "null" : "undefined");
                                err1 = err1.split(err2)[1];
                                fail(`‘${err1}’ 不能用于含 ‘${err2}’ 的对象上。`);
                            }
                            else {
                                fail(`类型错误：${error.message}。`);
                            }
                            break;
                        case "RangeError":
                            fail(`数值超出范围：${error.message}。`);
                            break;
                        default:
                            fail(error.message);
                            break;
                    }
                    resolve();
                }
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                box.value += "\n";
            }
        });

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(box);

        icon.src = "images/Com.png";
        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        content.innerHTML = string;
        txt.innerHTML = title;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            box.style.opacity = 1;
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;
    });
}

// timer 函数。
async function timer(string, time, title, id) {
    return new Promise((resolve) => {
        let passed_time = 0;
        let ls_finish = false;
        if (string == null || string == undefined) {
            fail("不能输入空值！");
            return "在 Timer() 函数中，string 参数不能为 null 或 undefined。";
        }
        if (time == null || time == undefined) {
            fail("null 或 undefined 不是有效的数字。");
            return "在 Timer() 函数中，time 参数不能为 null 或 undefined。";
        }
        string = String(string);
        time = Number(time);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") string = "";
        if (title == null || title == undefined) title = "计时";
        else {
            title = String(title);
            let t_replaced = title.replace(/\s+/g, "");
            if (t_replaced === "") title = "计时";
        }
        if (id == null || id == undefined) id = "";
        if (isNaN(time)) {
            fail("time 参数必须为可识别的数字或纯数字字符串。");
            return "在 Timer() 函数中，time 参数必须为可识别的数字或纯数字字符串。";
        } else if (time < 1250) {
            warn("time 的值过小，无法正常计时。");
            return "在 Timer() 函数中，time 的值必须大于等于 1250。";
        } else if (time > 3.15576e10 * 1.1568) {
            warn("time 的值过大，无法正常计时。");
            return "在 Timer() 函数中，time 的值必须小于等于 6.048e10。";
        }

        const window = document.createElement("div");
        window.className = "timer-window";
        window.id = id;
        const square = document.createElement("div");
        square.className = "timer-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "images/Timer.png";
        icon.style.opacity = 0;
        icon.style.transistion = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.style.color = "black";
        txt.style.opacity = 0;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.color = "black";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const bar = document.createElement("div");
        bar.className = "timer-progressbar";
        const timerdesc = document.createElement("div");
        timerdesc.className = "fn-timerdesc";
        timerdesc.color = "#000000";
        timerdesc.style.transition = `all 175ms ${easing}`;

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(bar);
        window.appendChild(timerdesc);

        window.style.animation = `jr_mfn 350ms forwards ${easing}`;
        txt.innerHTML = title;

        let i = setInterval(() => {
            passed_time += timer_speed * 10;
            content.innerHTML = string;
            if (timer_speed > 1) {
                content.style.color = "#ff0000";
            } else if (timer_speed < 1 && timer_speed > 0) {
                content.style.color = "#0000ff";
            } else if (timer_speed === 0) {
                content.style.color = "#d00000";
            } else if (timer_speed > -1 && timer_speed < 0) {
                content.style.color = "#d0d000";
            } else if (timer_speed < -1) {
                content.style.color = "#d0d0d0";
            } else {
                content.style.color = "#000000";
            }
        }, 10);

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            timerdesc.style.opacity = 1;
            timerdesc.style.transform = "translateX(0)";
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        let pro = 0;
        const interval = setInterval(() => {
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
                clearInterval(interval);
                ls_finish = true;
            } else if (timer_backwards && passed_time <= 0) {
                clearInterval(interval);
                ls_finish = true;
            }
        }, 10);
        setInterval(() => {
            if (ls_finish) {
                window.style.maxHeight = window.getBoundingClientRect().height + "px";
                content.style.opacity = 0;
                content.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                timerdesc.style.opacity = 0;
                timerdesc.style.transform = "translateX(25px)";
                resolve(true);
                content.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    window.style.animation = `cc_mfn 350ms forwards ${easing}`;
                    close(window);
                    setTimeout(() => {
                        if (document.body.contains(window)) document.body.removeChild(window);
                    }, 550);
                });
            }
        }, 25);
    });
}

// wz 函数。
async function wz(string, qj_title) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            fail("不能输入空值！", "错误", "中");
            resolve(39);
            return;
        }
        if (qj_title == null || qj_title == undefined || qj_title.replace(/\s+/g, "") === "") qj_title = "信息";

        const window = document.createElement("div");
        window.className = "wz-window";
        const square = document.createElement("div");
        square.className = "wz-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "images/Inf.png";
        icon.style.opacity = 0;
        icon.style.transistion = "all 150ms cubic-bezier(0.33, 1, 0.68, 1)";
        const title = document.createElement("div");
        title.className = "fn-title";
        title.innerHTML = qj_title;
        title.style.opacity = 0;
        title.style.transition = "all 150ms cubic-bezier(0.33, 1, 0.68, 1)";
        const txt = document.createElement("pre");
        txt.className = "wz-content";
        txt.innerHTML = string;
        const btn = document.createElement("img");
        btn.alt = "下一步";
        btn.className = "wz-btn";
        btn.src = "images/Next.png";

        document.body.appendChild(window);
        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(title);
        window.appendChild(txt);
        window.appendChild(btn);
        window.appendChild(btn);
        wzwin.push(window);

        window.style.animation = `jr_wz 0.5s forwards ${easing}`;
        setTimeout(() => {
            icon.style.opacity = 1;
            title.style.opacity = 1;
            title.style.maxWidth = "calc(50vw - 100px)";
            txt.style.animation = `jr_txt forwards 0.3s ${easing}`;
            btn.style.animation = `jr_btn forwards 0.3s ${easing}`;
        }, 250);

        btn.onclick = () => {
            txt.style.animation = `cc_txt 0.3s forwards ${easing}`;
            btn.style.animation = `cc_btn 0.3s forwards ${easing}`;
            icon.style.opacity = 0;
            title.style.opacity = 0;
            title.style.maxWidth = "30ch";
            setTimeout(() => {
                window.style.animation = `cc_wz 0.5s forwards ${easing}`;
            }, 150);
            resolve("已确认。");
            wzwin.pop();
            window.addEventListener("animationend", (i) => {
                if (i.animationName === "cc_wz") {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }
            });
        };
    });
}

// mb() 函数。
async function mb(strings, title, id) {
    return new Promise((resolve) => {
        if (strings.length === 0 || strings.includes(null) || strings.includes(undefined)) {
            fail("不能输入空值！");
            resolve(39);
            return;
        }
        if (title == null || title == undefined || String(title).replace(/\s+/g, "") === "") title = "面板";
        else title = String(title);
        if (id == null || id == undefined) id = "";

        const window = document.createElement("div");
        window.className = "mb-window";
        window.style.maxWidth = "450px";
        window.id = id;
        const square = document.createElement("div");
        square.className = "mb-square";
        const icon = document.createElement("img");
        icon.alt = "";
        icon.src = "images/Pad.png";
        icon.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        icon.style.opacity = 0;
        const txt = document.createElement("div");
        txt.className = "fn-title";
        txt.innerHTML = title;
        txt.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        txt.style.opacity = 0;
        const content = document.createElement("div");
        content.className = "fn-content";
        content.style.opacity = 0;
        content.style.textAlign = "center";
        content.style.minWidth = "30ch";
        content.style.transition = `all 175ms ${easing}`;
        const gb = document.createElement("button");
        gb.type = "button";
        gb.className = "mb-gb";
        gb.innerHTML = "关闭";
        gb.style.transition = "all 175ms cubic-bezier(0.33, 1, 0.68, 1)";
        gb.style.opacity = 0;

        create(window);
        document.body.appendChild(window);

        window.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        window.appendChild(content);
        window.appendChild(gb);

        window.style.animation = `jr_mfn 0.5s forwards ${easing}`;

        window.addEventListener("animationend", () => {
            content.style.transform = "translateY(0)";
            content.style.opacity = 1;
            square.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            gb.style.opacity = 1;
            window.style.width = "30ch";
            window.style.left = "calc(50% - 15ch)";
            window.style.right = "calc(50% + 15ch)";
            window.style.maxHeight = window.getBoundingClientRect().height + "px";
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        content.style.marginTop = square_height;

        for (let i = 0; i < strings.length; i++) {
            if (strings[i].startsWith("[标签] ")) {
                strings[i] = strings[i].slice(5, strings[i].length);
                if (strings[i].toLowerCase().startsWith("li: ")) {
                    const li = document.createElement("li");
                    li.innerHTML = strings[i].slice(4, strings[i].length);
                    content.appendChild(li);
                } else if (strings[i].toLowerCase().startsWith("h1: ")) {
                    const h1 = document.createElement("h1");
                    h1.innerHTML = strings[i].slice(4, strings[i].length);
                    content.appendChild(h1);
                } else if (strings[i].toLowerCase().startsWith("h2: ")) {
                    const h2 = document.createElement("h2");
                    h2.innerHTML = strings[i].slice(4, strings[i].length);
                    content.appendChild(h2);
                } else if (strings[i].toLowerCase().startsWith("h3: ")) {
                    const h3 = document.createElement("h3");
                    h3.innerHTML = strings[i].slice(4, strings[i].length);
                    content.appendChild(h3);
                } else if (strings[i].toLowerCase().startsWith("h4: ")) {
                    const h4 = document.createElement("h4");
                    h4.innerHTML = strings[i].slice(4, strings[i].length);
                    content.appendChild(h4);
                } else if (strings[i].toLowerCase().startsWith("h5: ")) {
                    const h5 = document.createElement("h5");
                    h5.innerHTML = strings[i].slice(4, strings[i].length);
                } else if (strings[i].toLowerCase().startsWith("code: ")) {
                    const code = document.createElement("code");
                    code.innerHTML = strings[i].slice(6, strings[i].length);
                    content.appendChild(code);
                } else if (strings[i].toLowerCase().startsWith("img: ")) {
                    const img = document.createElement("img");
                    img.src = strings[i].slice(5, strings[i].length);
                    img.alt = "";
                    content.appendChild(img);
                } else if (strings[i].toLowerCase().startsWith("a: ")) {
                    const a = document.createElement("a");
                    a.href = strings[i].slice(3, strings[i].length);
                    a.innerHTML = strings[i].slice(3, strings[i].length);
                    content.appendChild(a);
                } else if (strings[i].toLowerCase().startsWith("div: ")) {
                    const div = document.createElement("div");
                    div.innerHTML = strings[i].slice(5, strings[i].length);
                    content.appendChild(div);
                }
            } else {
                const p = document.createElement("p");
                p.innerHTML = strings[i];
                content.appendChild(p);
            }
        }

        gb.onclick = () => {
            square.style.opacity = 0;
            content.style.opacity = 0;
            content.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            gb.style.opacity = 0;
            resolve("已确认。");
            content.addEventListener("transitionend", (i) => {
                square.style.height = "35px";
                window.style.animation = `cc_mfn 0.5s forwards ${easing}`;
                close(window);
                setTimeout(() => {
                    if (document.body.contains(window)) document.body.removeChild(window);
                }, 550);
            });
        };
    });
}