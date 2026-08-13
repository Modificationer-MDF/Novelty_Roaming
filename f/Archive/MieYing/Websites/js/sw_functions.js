// inf() 函数。
async function inf(string, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            console.error("不能输入空值！");
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
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
        icon.src = "images/Notification.png";
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
        inf.innerHTML = string;

        let finish = false;
        let passed_time = 0; // 已经过去的时间。
        let pro = 0; // 进度条进度。
        const i = setInterval(() => {
            passed_time += 20;
            pro += 20 / (smarttime(string) / 100);
            bar.style.width = `${pro}%`;
            if (pro >= 100) {
                clearInterval(i);
                finish = true;
            }
        }, 25);

        setInterval(() => {
            if (finish) {
                resolve();
                mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
                rclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }
        }, 40);
    });
}

// suc() 函数。
async function suc(string, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            console.error("不能输入空值！");
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
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
        icon.src = "images/Suc.png";
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
        inf.innerHTML = string;

        let finish = false;
        let passed_time = 0; // 已经过去的时间。
        let pro = 0; // 进度条进度。
        const i = setInterval(() => {
            passed_time += 20;
            pro += 20 / (smarttime(string) / 100);
            bar.style.width = `${pro}%`;
            if (pro >= 100) {
                clearInterval(i);
                finish = true;
            }
        }, 25);

        setInterval(() => {
            if (finish) {
                resolve();
                mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
                rclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }
        }, 40);
    });
}

// err() 函数。
async function err(string, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            console.error("不能输入空值！");
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
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
        icon.src = "images/Err.png";
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
        inf.innerHTML = string;

        let finish = false;
        let passed_time = 0; // 已经过去的时间。
        let pro = 0; // 进度条进度。
        const i = setInterval(() => {
            passed_time += 20;
            pro += 20 / (smarttime(string) / 100);
            bar.style.width = `${pro}%`;
            if (pro >= 100) {
                clearInterval(i);
                finish = true;
            }
        }, 25);

        setInterval(() => {
            if (finish) {
                resolve();
                mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
                rclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }
        }, 40);
    });
}

// caut() 函数。
async function caut(string, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            console.error("不能输入空值！");
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
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
        icon.src = "images/Exc.png";
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
        inf.innerHTML = string;

        let finish = false;
        let passed_time = 0; // 已经过去的时间。
        let pro = 0; // 进度条进度。
        const i = setInterval(() => {
            passed_time += 20;
            pro += 20 / (smarttime(string) / 100);
            bar.style.width = `${pro}%`;
            if (pro >= 100) {
                clearInterval(i);
                finish = true;
            }
        }, 25);

        setInterval(() => {
            if (finish) {
                resolve();
                mele.style.animation = `out_rfn 0.3s forwards ${easing}`;
                rclose(mele);
                mele.addEventListener("animationend", () => {
                    if (document.body.contains(mele)) document.body.removeChild(mele);
                }, { once: true });
            }
        }, 40);
    });
}

// conf() 函数。
async function conf(string, id) {
    return new Promise((resolve) => {
        if (string == null || string == undefined) {
            console.error("不能输入空值！");
        }
        string = String(string);
        let s_replaced = string.replace(/\s+/g, "");
        if (s_replaced === "") {
            console.warn("不能输入空字符串。");
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
        icon.src = "images/Confirm.png";
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
        inf.innerHTML = string;

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