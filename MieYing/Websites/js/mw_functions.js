// rz() 函数。
async function rz(string, time) {
    return new Promise((resolve) => {
        if (string == null) {
            warn("这个值为 null。");
            return;
        } else if (string == undefined) {
            warn("这个值为 undefined。");
            return;
        }
        if (time == null || time == undefined) time = smarttime(string);

        const mele = document.createElement("div");
        mele.className = "rz-mele";
        mele.style.opacity = 0;
        const inf = document.createElement("div");
        inf.className = "rz-inf";
        inf.style.transition = `all 0.2s ${easing}`;
        inf.innerHTML = string;
        inf.style.opacity = 0;
        const bar = document.createElement("div");
        bar.className = "rz-progressbar";
        let timeup = false;
        let pro = 0;

        create(mele);
        document.body.appendChild(mele);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `jr_rz 0.4s forwards ${easing}`;

        mele.addEventListener("animationend", () => {
            inf.style.opacity = 1;
        }, { once: true });

        mele.oncontextmenu = async () => {
            let c1 = await xz("关闭该 rz() 窗口？", 1, ["是。", "否。"]);
            if (c1 != null) {
                if (c1[0] === "是。") {
                    inf.style.opacity = 0;
                    inf.addEventListener("transitionend", () => {
                        mele.style.animation = `cc_rz 0.4s forwards ${easing}`;
                        mele.addEventListener("animationend", () => {
                            if (document.body.contains(mele)) document.body.removeChild(mele);
                            close(mele);
                            resolve();
                        }, { once: true });
                    }, { once: true });
                }
            }
        };

        let i1 = setInterval(() => {
            pro += 10 / (time / 100);
            bar.style.width = `${pro}%`;
            if (pro >= 100) {
                timeup = true;
                clearInterval(i1);
            }
        }, 10);

        setInterval(() => {
            if (timeup) {
                inf.style.opacity = 0;
                inf.addEventListener("transitionend", () => {
                    mele.style.animation = `cc_rz 0.4s forwards ${easing}`;
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                        close(mele);
                        resolve();
                    }, { once: true });
                }, { once: true });
            }
        }, 25);
    });
}

// noti() 函数。
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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");

        mele.className = "noti-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;
        square.className = "noti-square";
        icon.src = "images/Notification.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "noti-okey";
        okey.innerHTML = "知晓";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener(("transitionend"), () => {
            okey.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                okey.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    resolve();
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
            };
        }, 25);
    });
}

// cg() 函数。
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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");

        mele.className = "cg-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "cg-square";
        icon.src = "images/Suc.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "cg-okey";
        okey.innerHTML = "知晓";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener(("transitionend"), () => {
            okey.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                okey.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    resolve();
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
            };
        }, 25);
    });
}

// warn() 函数。
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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");

        mele.className = "warn-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "warn-square";
        icon.src = "images/Exc.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "warn-zx";
        okey.innerHTML = "知晓";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener(("transitionend"), () => {
            okey.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                okey.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    resolve();
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
            };
        }, 25);
    });
}

// fail() 函数。
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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const okey = document.createElement("button");

        mele.className = "fail-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "fail-square";
        icon.src = "images/Err.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = `all 0.2s ${easing}`;
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        okey.type = "button";
        okey.className = "fail-lj";
        okey.innerHTML = "知晓";
        okey.style.transition = `all 0.2s ${easing}`;
        okey.style.opacity = 0;

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(okey);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            okey.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + okey.getBoundingClientRect().height}px + ${window.getComputedStyle(okey).marginBottom})`;
        });

        okey.addEventListener(("transitionend"), () => {
            okey.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        setInterval(() => {
            okey.onmouseover = () => {
                ld(okey, "75%");
            };
            okey.onmouseleave = () => {
                ld(okey, "100%");
            };
            okey.onclick = () => {
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                okey.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    resolve();
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const box = document.createElement("textarea");

        mele.className = "inp-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "inp-square";
        icon.src = "images/Inp.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "fn-inf";
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

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(box);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            box.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + box.getBoundingClientRect().height}px + ${window.getComputedStyle(box).marginBottom})`;
        });

        box.addEventListener(("transitionend"), () => {
            box.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        box.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const value = box.value;
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    resolve(value);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const submit = document.createElement("button");
        const giveup = document.createElement("button");

        mele.className = "xz-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "xz-square";
        icon.src = "images/Sel.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        submit.className = "xz-submit";
        submit.innerHTML = "确定";
        submit.style.opacity = 0;
        submit.style.transition = `all 0.2s ${easing}`;
        giveup.className = "xz-giveup";
        giveup.innerHTML = "放弃选择";
        giveup.style.opacity = 0;
        giveup.style.transition = `all 0.2s ${easing}`;

        const array = Array.from(names);
        const xz_items = [];
        const btns = []; // 存储所有按钮。

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(submit);
        mele.appendChild(giveup);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

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
                    return hex.length === 1 ? '0' + hex : hex;
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
                        fail(`勾选的选项数量已达上限。最多可勾选 ${n} 个。`);
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
        }

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            submit.style.opacity = 1;
            giveup.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + submit.getBoundingClientRect().height + giveup.getBoundingClientRect().height}px + ${window.getComputedStyle(submit).marginBottom} + ${window.getComputedStyle(giveup).marginBottom})`;

            for (let btn of btns) { // 将所有选项按钮的 opacity 设为 1。
                btn.style.opacity = 1;
            }
        });

        submit.addEventListener(("transitionend"), () => {
            submit.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        setInterval(() => {
            submit.onmouseover = () => {
                ld(submit, "75%");
            };
            submit.onmouseleave = () => {
                ld(submit, "100%");
            };
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
                    resolve(xz_items);
                    submit.style.opacity = 0;
                    giveup.style.opacity = 0;
                    inf.style.opacity = 0;
                    inf.style.transform = "translateY(-10px)";
                    icon.style.opacity = 0;
                    txt.style.opacity = 0;
                    mele.style.height = "0px";
                    inf.addEventListener("transitionend", () => {
                        square.style.height = "35px";
                        mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                        close(mele);
                        mele.addEventListener("animationend", () => {
                            if (document.body.contains(mele)) document.body.removeChild(mele);
                        }, { once: true });
                    }, { once: true });
                }
            };
            giveup.onmouseover = () => {
                ld(giveup, "75%");
            };
            giveup.onmouseleave = () => {
                ld(giveup, "100%");
            };
            giveup.onclick = () => {
                resolve(null);
                submit.style.opacity = 0;
                giveup.style.opacity = 0;
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
            };
        }, 25);
    });
}

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

    const mele = document.createElement("div");
    const square = document.createElement("div");
    const icon = document.createElement("img");
    const txt = document.createElement("div");
    const inf = document.createElement("div");
    const bar = document.createElement("div");
    const desc = document.createElement("div");

    mele.className = "synchr-mele";
    mele.id = id;
    mele.style.height = "0px";
    mele.style.transition = `height 0.2s ${easing}`;
    square.className = "synchr-square";
    icon.src = "images/Synchronization.png";
    icon.alt = "";
    icon.style.opacity = 0;
    icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    inf.className = "fn-inf";
    inf.style.opacity = 0;
    inf.style.textAlign = "center";
    inf.style.minWidth = "30ch";
    inf.style.transition = `all 0.2s ${easing}`;
    bar.className = "synchr-progressbar";
    desc.className = "fn-timerdesc";
    desc.innerHTML = "无任务";

    create(mele);
    document.body.appendChild(mele);

    mele.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    mele.appendChild(inf);
    mele.appendChild(bar);
    mele.appendChild(desc);

    mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
    inf.innerHTML = string;
    txt.innerHTML = title;

    mele.addEventListener("animationend", () => {
        inf.style.transform = "translateY(0)";
        inf.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        mele.style.width = "30ch";
        mele.style.left = "calc(50% - 15ch)";
        mele.style.right = "calc(50% + 15ch)";
        mele.style.height = `${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + bar.getBoundingClientRect().height + desc.getBoundingClientRect().height}px`;
    });

    let square_height = hqgd(txt.innerHTML, "fn-title", "div");
    square.style.height = square_height;
    inf.style.marginTop = square_height;

    setTimeout(() => {
        inf.style.opacity = 0;
        inf.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        mele.style.height = "0px";
        inf.addEventListener("transitionend", () => {
            square.style.height = "35px";
            mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
            close(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
            }, { once: true });
        }, { once: true });
    }, smarttime(string));
}

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

    const mele = document.createElement("div");
    const square = document.createElement("div");
    const icon = document.createElement("img");
    const txt = document.createElement("div");
    const inf = document.createElement("div");
    const link = document.createElement("button");
    const ignore = document.createElement("button");

    mele.className = "lj-mele";
    mele.id = id;
    mele.style.height = "0px";
    mele.style.transition = `height 0.2s ${easing}`;
    square.className = "lj-square";
    icon.src = "images/Link.png";
    icon.alt = "";
    icon.style.opacity = 0;
    icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    txt.className = "fn-title";
    txt.style.opacity = 0;
    txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    inf.className = "fn-inf";
    inf.style.opacity = 0;
    inf.style.textAlign = "center";
    inf.style.minWidth = "30ch";
    inf.style.transition = `all 0.2s ${easing}`;
    link.className = "lj-link";
    link.innerHTML = url;
    link.style.opacity = 0;
    link.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
    ignore.className = "lj-ignore";
    ignore.innerHTML = "忽略";
    ignore.style.opacity = 0;
    ignore.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";

    create(mele);
    document.body.appendChild(mele);

    mele.appendChild(square);
    square.appendChild(icon);
    square.appendChild(txt);
    mele.appendChild(inf);
    mele.appendChild(link);
    mele.appendChild(ignore);

    mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
    inf.innerHTML = string;
    txt.innerHTML = title;

    mele.addEventListener("animationend", () => {
        inf.style.transform = "translateY(0)";
        inf.style.opacity = 1;
        icon.style.opacity = 1;
        txt.style.opacity = 1;
        link.style.opacity = 1;
        ignore.style.opacity = 1;
        mele.style.width = "30ch";
        mele.style.left = "calc(50% - 15ch)";
        mele.style.right = "calc(50% + 15ch)";
        mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + link.getBoundingClientRect().height + ignore.getBoundingClientRect().height}px + ${window.getComputedStyle(link).marginBottom} + ${window.getComputedStyle(ignore).marginBottom})`;
    });

    link.addEventListener(("transitionend"), () => {
        link.focus();
    }, { once: true });

    let square_height = hqgd(txt.innerHTML, "fn-title", "div");
    square.style.height = square_height;
    inf.style.marginTop = square_height;

    link.onmouseover = () => {
        ld(link, "75%");
    };
    link.onmouseleave = () => {
        ld(link, "100%");
    };
    link.onclick = () => {
        if (!open(url, "_blank", `width=${defwid}, height=${defhei}`)) {
            warn("弹出的窗口被阻止。");
        }
        link.style.opacity = 0;
        ignore.style.opacity = 0;
        inf.style.opacity = 0;
        inf.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        mele.style.height = "0px";
        inf.addEventListener("transitionend", () => {
            square.style.height = "35px";
            mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
            close(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
            }, { once: true });
        }, { once: true });
    };

    ignore.onmouseover = () => {
        ld(ignore, "75%");
    };
    ignore.onmouseleave = () => {
        ld(ignore, "100%");
    };
    ignore.onclick = () => {
        rz("已忽略该链接。");
        link.style.opacity = 0;
        ignore.style.opacity = 0;
        inf.style.opacity = 0;
        inf.style.transform = "translateY(-10px)";
        icon.style.opacity = 0;
        txt.style.opacity = 0;
        mele.style.height = "0px";
        inf.addEventListener("transitionend", () => {
            square.style.height = "35px";
            mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
            close(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
            }, { once: true });
        }, { once: true });
    };
}

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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const box = document.createElement("textarea");

        mele.className = "zd-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "zd-square";
        icon.src = "images/Com.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "fn-title";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        box.name = "terminalbox";
        box.className = "zd-box";
        box.style.opacity = 0;
        box.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        box.style.resize = "none";

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(box);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = string;
        txt.innerHTML = title;

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            box.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + box.getBoundingClientRect().height}px + ${window.getComputedStyle(box).marginBottom})`;
        });

        box.addEventListener(("transitionend"), () => {
            box.focus();
        }, { once: true });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        box.addEventListener("keypress", async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                const value = box.value.trim();
                if (value === "") {
                    warn("不能输入空字符串。");
                    mele.style.animation = `mfn_shake1 0.3s ${easing}`;
                    box.style.backgroundColor = "#ffff0099";
                    mele.addEventListener("animationend", () => {
                        mele.style.animation = "";
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
                    mele.style.animation = `mfn_shake2 0.3s ${easing}`;
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
                            } else {
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
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                box.style.opacity = 0;
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                mele.style.height = "0px";
                inf.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
                box.value += "\n";
            }
        });
    });
}

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

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const earlyend = document.createElement("button");
        const bar = document.createElement("div");
        const timerdesc = document.createElement("div");

        mele.className = "timer-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "timer-square";
        icon.src = "images/Timer.png";
        icon.alt = "";
        icon.style.opacity = 0;
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.className = "fn-title";
        txt.style.color = "black";
        txt.style.opacity = 0;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        inf.className = "fn-inf";
        inf.innerHTML = string;
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
        bar.className = "timer-progressbar";
        timerdesc.className = "fn-timerdesc";
        timerdesc.color = "#000000";
        timerdesc.style.transition = `all 0.2s ${easing}`;
        
        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(earlyend);
        mele.appendChild(bar);
        mele.appendChild(timerdesc);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;
        txt.innerHTML = title;

        setInterval(() => {
            passed_time += timer_speed * 10;
            if (timer_speed > 1) {
                inf.style.color = "#ff0000";
            } else if (timer_speed < 1 && timer_speed > 0) {
                inf.style.color = "#0000ff";
            } else if (timer_speed === 0) {
                inf.style.color = "#d00000";
            } else if (timer_speed > -1 && timer_speed < 0) {
                inf.style.color = "#d0d000";
            } else if (timer_speed < -1) {
                inf.style.color = "#d0d0d0";
            } else {
                inf.style.color = "#000000";
            }
        }, 10);

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            earlyend.style.opacity = 1;
            timerdesc.style.opacity = 1;
            timerdesc.style.transform = "translateX(0)";
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + bar.getBoundingClientRect().height + earlyend.getBoundingClientRect().height + timerdesc.getBoundingClientRect().height}px + ${getComputedStyle(timerdesc).marginBottom})`;
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        earlyend.onclick = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            earlyend.style.opacity = 0;
            timerdesc.style.opacity = 0;
            timerdesc.style.transform = "translateX(25px)";
            mele.style.height = "0px";
            resolve(true);
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                close(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }, { once: true });
        };

        let pro = 0; // 进度条进度。
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
                inf.style.opacity = 0;
                inf.style.transform = "translateY(-10px)";
                icon.style.opacity = 0;
                txt.style.opacity = 0;
                earlyend.style.opacity = 0;
                timerdesc.style.opacity = 0;
                timerdesc.style.transform = "translateX(25px)";
                mele.style.height = "0px";
                resolve(true);
                inf.addEventListener("transitionend", () => {
                    square.style.height = "35px";
                    mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                    close(mele);
                    mele.addEventListener("animationend", () => {
                        if (document.body.contains(mele)) document.body.removeChild(mele);
                    }, { once: true });
                }, { once: true });
            }
        }, 25);
    });
}

async function mb(string, title, id) {
    return new Promise((resolve) => {
        string = String(string);
        if (string.length === 0 || string.includes(null) || string.includes(undefined)) {
            fail("不能输入空值！");
            resolve(39);
            return;
        }
        if (title == null || title == undefined || String(title).replace(/\s+/g, "") === "") title = "面板";
        else title = String(title);
        if (id == null || id == undefined) id = "";

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const gb = document.createElement("button");

        mele.className = "mb-mele";
        mele.id = id;
        mele.style.height = "0px";
        mele.style.transition = `height 0.2s ${easing}`;
        square.className = "mb-square";
        icon.src = "images/Pad.png";
        icon.alt = "";
        icon.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        icon.style.opacity = 0;
        txt.className = "fn-title";
        txt.innerHTML = title;
        txt.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        txt.style.opacity = 0;
        inf.className = "fn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        gb.type = "button";
        gb.className = "mb-gb";
        gb.innerHTML = "关闭";
        gb.style.transition = "all 0.2s cubic-bezier(0.33, 1, 0.68, 1)";
        gb.style.opacity = 0;

        create(mele);
        document.body.appendChild(mele);

        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(gb);

        mele.style.animation = `jr_mfn 0.3s forwards ${easing}`;

        if (string.startsWith("[标签] ")) {
            string = string.slice(5, string.length);
            if (string.toLowerCase().startsWith("li: ")) {
                const li = document.createElement("li");
                li.innerHTML = string.slice(4, string.length);
                inf.appendChild(li);
            } else if (string.toLowerCase().startsWith("h1: ")) {
                const h1 = document.createElement("h1");
                h1.innerHTML = string.slice(4, string.length);
                inf.appendChild(h1);
            } else if (string.toLowerCase().startsWith("h2: ")) {
                const h2 = document.createElement("h2");
                h2.innerHTML = string.slice(4, string.length);
                inf.appendChild(h2);
            } else if (string.toLowerCase().startsWith("h3: ")) {
                const h3 = document.createElement("h3");
                h3.innerHTML = string.slice(4, string.length);
                inf.appendChild(h3);
            } else if (string.toLowerCase().startsWith("h4: ")) {
                const h4 = document.createElement("h4");
                h4.innerHTML = string.slice(4, string.length);
                inf.appendChild(h4);
            } else if (string.toLowerCase().startsWith("h5: ")) {
                const h5 = document.createElement("h5");
                h5.innerHTML = string.slice(4, string.length);
            } else if (string.toLowerCase().startsWith("code: ")) {
                const code = document.createElement("code");
                code.innerHTML = string.slice(6, string.length);
                inf.appendChild(code);
            } else if (string.toLowerCase().startsWith("img: ")) {
                const img = document.createElement("img");
                img.src = string.slice(5, string.length);
                img.alt = "";
                inf.appendChild(img);
            } else if (string.toLowerCase().startsWith("a: ")) {
                const a = document.createElement("a");
                a.href = string.slice(3, string.length);
                a.innerHTML = string.slice(3, string.length);
                inf.appendChild(a);
            } else if (string.toLowerCase().startsWith("div: ")) {
                const div = document.createElement("div");
                div.innerHTML = string.slice(5, string.length);
                inf.appendChild(div);
            }
        } else {
            const p = document.createElement("p");
            p.innerHTML = string;
            inf.appendChild(p);
        }

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            gb.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + inf.getBoundingClientRect().height + gb.getBoundingClientRect().height}px + ${window.getComputedStyle(gb).marginBottom})`;
        });

        let square_height = hqgd(txt.innerHTML, "fn-title", "div");
        square.style.height = square_height;
        inf.style.marginTop = square_height;

        gb.onmouseover = () => {
            ld(gb, "75%");
        };
        gb.onmouseleave = () => {
            ld(gb, "100%");
        };
        gb.onclick = () => {
            inf.style.opacity = 0;
            inf.style.transform = "translateY(-10px)";
            icon.style.opacity = 0;
            txt.style.opacity = 0;
            gb.style.opacity = 0;
            mele.style.height = "0px";
            resolve("已确认。");
            inf.addEventListener("transitionend", () => {
                square.style.height = "35px";
                mele.style.animation = `cc_mfn 0.3s forwards ${easing}`;
                close(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }, { once: true });
        };
    });
}