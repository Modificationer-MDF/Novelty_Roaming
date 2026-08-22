async function fd_warn(cont, title = "不宜内容警告") {
    return new Promise((resolve) => {
        const mele = document.createElement("div");
        const square = document.createElement("div");
        const txt = document.createElement("div");
        const ht = document.createElement("div");
        const wt = document.createElement("div");
        const inf = document.createElement("div");
        const togbtn = document.createElement("button");
        const togt = document.createElement("span"); // “展开”/“收起”。
        const toga = document.createElement("span"); // “▼”/“▲”。

        mele.className = "fd-warn-mele";
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;

        square.className = "fd-warn-square";
        square.style.display = "flex";
        square.style.alignItems = "center";
        square.style.padding = "10px 20px";

        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        txt.innerHTML = title;

        ht.className = "fd-warn-content";
        ht.style.overflow = "hidden";
        ht.style.transition = `all 0.4s ${easing}`;

        wt.className = "fd-warn-wt";
        wt.style.transition = `all 0.3s ${easing}`;
        wt.style.transform = "translateY(0)";
        wt.style.opacity = 0;
        wt.style.padding = "14px 25px";
        wt.innerHTML = "以下内容包含辱骂、人身攻击等易对部分人群产生误导的语言。折叠处理。";

        inf.className = "mfn-inf";
        inf.style.transition = `all 0.3s ${easing}`;
        inf.style.opacity = 0;
        inf.style.padding = "14px 25px";
        inf.style.margin = "0";
        inf.style.transform = "translateY(20px)";
        inf.innerHTML = cont;

        togbtn.type = "button";
        togbtn.className = "fd-warn-toggle";
        togbtn.style.transition = `all 0.2s ${easing}`;
        togbtn.style.opacity = 0;

        togt.innerHTML = "展开";

        toga.innerHTML = "▼";
        toga.className = "fd-toga";
        toga.style.transition = `all 0.3s ${easing}`;
        toga.style.transform = "rotate(0deg)";

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(txt);
        mele.appendChild(ht);
        ht.appendChild(wt);
        ht.appendChild(inf);
        mele.appendChild(togbtn);
        togbtn.appendChild(togt);
        togbtn.appendChild(toga);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;

        let isopen = false;

        const open = () => {
            if (isopen) return;
            isopen = true;

            ht.style.maxHeight = (wt.scrollHeight + inf.scrollHeight) + "px";
            inf.style.opacity = "1";
            inf.style.transform = "translateY(0)";
            togt.innerHTML = "收起";
            toga.style.transform = "rotate(180deg)";

            mele.style.height = (square.scrollHeight + wt.scrollHeight + inf.scrollHeight + togbtn.scrollHeight + 20) + "px";
            resolve();
        };

        const close = () => {
            if (!isopen) return;
            isopen = false;

            ht.style.maxHeight = `${wt.scrollHeight}px`;
            wt.style.transform = "translateY(0)";
            inf.style.opacity = "0";
            inf.style.transform = "translateY(20px)";
            togt.innerHTML = "展开";
            toga.style.transform = "rotate(0deg)";

            mele.style.height = (square.scrollHeight + wt.scrollHeight + togbtn.scrollHeight + 20) + "px";
        };

        const toggle = () => {
            if (isopen) {
                close();
            } else {
                open();
            }
        };

        togbtn.onclick = (e) => {
            e.stopPropagation();
            toggle();
        };
        square.onclick = toggle;

        mele.addEventListener("animationend", () => {
            txt.style.opacity = 1;
            togbtn.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";

            square.style.height = `${txt.scrollHeight}px`;
            square.style.overflow = "hidden";

            ht.style.maxHeight = `${wt.scrollHeight}px`;
            wt.style.transform = "translateY(0)";
            wt.style.opacity = "1";
            inf.style.opacity = "0";

            mele.style.height = (square.scrollHeight + wt.scrollHeight + togbtn.scrollHeight + 20) + "px";
        }, { once: true });

        togbtn.onmouseover = () => { togbtn.style.opacity = "0.8"; };
        togbtn.onmouseleave = () => { togbtn.style.opacity = "1"; };
    });
}

async function fd_caut(cont, title = "限制级内容警告") {
    return new Promise((resolve) => {
        const mele = document.createElement("div");
        const square = document.createElement("div");
        const txt = document.createElement("div");
        const ht = document.createElement("div");
        const wt = document.createElement("div");
        const inf = document.createElement("div");
        const togbtn = document.createElement("button");
        const togt = document.createElement("span"); // “展开”/“收起”。
        const toga = document.createElement("span"); // “▼”/“▲”。

        mele.className = "fd-caut-mele";
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;

        square.className = "fd-caut-square";
        square.style.display = "flex";
        square.style.alignItems = "center";
        square.style.padding = "10px 20px";

        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        txt.innerHTML = title;

        ht.className = "fd-caut-content";
        ht.style.overflow = "hidden";
        ht.style.transition = `all 0.4s ${easing}`;

        wt.className = "fd-caut-wt";
        wt.style.transition = `all 0.3s ${easing}`;
        wt.style.transform = "translateY(0)";
        wt.style.opacity = 0;
        wt.style.padding = "14px 25px";
        wt.innerHTML = "以下内容包含对他人的人格侮辱、精神诅咒及危险动作等违反道德或法律的行为，且可能涉及死亡相关话题。为了保护未成年人及一些可能受到影响的人群，折叠处理。";

        inf.className = "mfn-inf";
        inf.style.transition = `all 0.3s ${easing}`;
        inf.style.opacity = 0;
        inf.style.padding = "14px 25px";
        inf.style.margin = "0";
        inf.style.transform = "translateY(20px)";
        inf.innerHTML = cont;

        togbtn.type = "button";
        togbtn.className = "fd-caut-toggle";
        togbtn.style.transition = `all 0.2s ${easing}`;
        togbtn.style.opacity = 0;

        togt.innerHTML = "展开";
        toga.innerHTML = "▼";
        toga.className = "fd-toga";
        toga.style.transition = `all 0.3s ${easing}`;
        toga.style.transform = "rotate(0deg)";

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(txt);
        mele.appendChild(ht);
        ht.appendChild(wt);
        ht.appendChild(inf);
        mele.appendChild(togbtn);
        togbtn.appendChild(togt);
        togbtn.appendChild(toga);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;

        let isopen = false;
        let confirmed = false;

        const open = async () => {
            if (isopen) return;
            if (!confirmed) {
                const result = await conf("确定要展开此限制级内容吗？");
                if (!result) return;
                confirmed = true;
            }
            isopen = true;

            ht.style.maxHeight = (wt.scrollHeight + inf.scrollHeight) + "px";
            inf.style.opacity = "1";
            inf.style.transform = "translateY(0)";
            togt.innerHTML = "收起";
            toga.style.transform = "rotate(180deg)";

            mele.style.height = (square.scrollHeight + wt.scrollHeight + inf.scrollHeight + togbtn.scrollHeight + 20) + "px";
            resolve();
        };

        const close = () => {
            if (!isopen) return;
            isopen = false;

            ht.style.maxHeight = `${wt.scrollHeight}px`;
            wt.style.transform = "translateY(0)";
            inf.style.opacity = "0";
            inf.style.transform = "translateY(20px)";
            togt.innerHTML = "展开";
            toga.style.transform = "rotate(0deg)";

            mele.style.height = (square.scrollHeight + wt.scrollHeight + togbtn.scrollHeight + 20) + "px";
        };

        const toggle = async () => {
            if (isopen) {
                close();
            } else {
                await open();
            }
        };

        togbtn.onclick = (e) => {
            e.stopPropagation();
            toggle();
        };
        square.onclick = toggle;

        mele.addEventListener("animationend", () => {
            txt.style.opacity = 1;
            togbtn.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";

            square.style.height = `${txt.scrollHeight}px`;
            square.style.overflow = "hidden";

            ht.style.maxHeight = `${wt.scrollHeight}px`;
            wt.style.transform = "translateY(0)";
            wt.style.opacity = "1";
            inf.style.opacity = "0";

            mele.style.height = (square.scrollHeight + wt.scrollHeight + togbtn.scrollHeight + 20) + "px";
        }, { once: true });

        togbtn.onmouseover = () => { togbtn.style.opacity = "0.8"; };
        togbtn.onmouseleave = () => { togbtn.style.opacity = "1"; };
    });
}