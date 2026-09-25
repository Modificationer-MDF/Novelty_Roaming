// inf() 函数。
async function inf({ str, id }) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) {
            console.error("不能输入空值！");
            return;
        }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
            return;
        }
        if (id == null || id == undefined) id = "";

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const inf = document.createElement("div");
        const bar = document.createElement("div");

        mele.className = "inf-mele";
        mele.id = id;
        square.className = "inf-square";
        icon.src = "Dainiv/images/Notification.png";
        icon.alt = "";
        inf.className = "rfn-inf";
        bar.className = "inf-bar";

        rcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        bar.style.animation = `rfn_prog ${smarttime(str)}ms forwards linear`;

        bar.addEventListener("animationend", () => {
            mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
            rclose(mele);
            setTimeout(() => {
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }, 1);
            resolve();
        }, { once: true });
    });
}

// suc() 函数。
async function suc({ str, id }) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) {
            console.error("不能输入空值！");
            return;
        }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
            return;
        }
        if (id == null || id == undefined) id = "";

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const inf = document.createElement("div");
        const bar = document.createElement("div");

        mele.className = "suc-mele";
        mele.id = id;
        square.className = "suc-square";
        icon.src = "Dainiv/images/Suc.png";
        icon.alt = "";
        inf.className = "rfn-inf";
        bar.className = "suc-bar";

        rcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        bar.style.animation = `rfn_prog ${smarttime(str)}ms forwards linear`;

        bar.addEventListener("animationend", () => {
            mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
            rclose(mele);
            setTimeout(() => {
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }, 1);
            resolve();
        }, { once: true });
    });
}

// err() 函数。
async function err({ str, id }) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) {
            console.error("不能输入空值！");
            return;
        }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
            return;
        }
        if (id == null || id == undefined) id = "";

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const inf = document.createElement("div");
        const bar = document.createElement("div");

        mele.className = "err-mele";
        mele.id = id;
        square.className = "err-square";
        icon.src = "Dainiv/images/Err.png";
        icon.alt = "";
        inf.className = "rfn-inf";
        bar.className = "err-bar";

        rcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        bar.style.animation = `rfn_prog ${smarttime(str)}ms forwards linear`;

        bar.addEventListener("animationend", () => {
            mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
            rclose(mele);
            setTimeout(() => {
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }, 1);
            resolve();
        }, { once: true });
    });
}

// caut() 函数。
async function caut({ str, id }) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) {
            console.error("不能输入空值！");
            return;
        }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
            return;
        }
        if (id == null || id == undefined) id = "";

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const inf = document.createElement("div");
        const bar = document.createElement("div");

        mele.className = "caut-mele";
        mele.id = id;
        square.className = "caut-square";
        icon.src = "Dainiv/images/Exc.png";
        icon.alt = "";
        inf.className = "rfn-inf";
        bar.className = "caut-bar";

        rcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        mele.appendChild(inf);
        mele.appendChild(bar);

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        bar.style.animation = `rfn_prog ${smarttime(str)}ms forwards linear`;

        bar.addEventListener("animationend", () => {
            mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
            rclose(mele);
            setTimeout(() => {
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }, 1);
            resolve();
        }, { once: true });
    });
}

// conf() 函数。
async function conf({ str, id }) {
    return new Promise((resolve) => {
        if (str == null || str == undefined) {
            console.error("不能输入空值！");
            return;
        }
        str = String(str);
        let s_replaced = str.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
            return;
        }
        if (id == null || id == undefined) id = "";

        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const inf = document.createElement("div");
        const yes = document.createElement("button");
        const no = document.createElement("button");

        mele.className = "conf-mele";
        mele.id = id;
        square.className = "conf-square";
        icon.src = "Dainiv/images/Confirm.png";
        icon.alt = "";
        inf.className = "rfn-inf";
        yes.className = "conf-yes";
        no.className = "conf-no";

        rcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        mele.appendChild(inf);
        mele.appendChild(yes);
        mele.appendChild(no);

        mele.style.animation = `in_rfn 0.3s forwards ${easing}`;
        inf.innerHTML = str;

        yes.innerHTML = "是。";
        no.innerHTML = "否。";

        yes.onclick = () => {
            resolve(true);
            mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
            rclose(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
            }, { once: true });
        };
        no.onclick = () => {
            resolve(false);
            mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
            rclose(mele);
            mele.addEventListener("animationend", () => {
                if (document.body.contains(mele)) document.body.removeChild(mele);
            }, { once: true });
        };
    });
}