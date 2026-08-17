async function fd_warn(content, title = "此回复含有不宜内容。") {
    return new Promise((resolve) => {
        const mele = document.createElement("div");
        const square = document.createElement("div");
        const wt = document.createElement("div");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const togbtn = document.createElement("button");

        mele.className = "fd-warn-mele";
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;
        square.className = "fd-warn-square";
        wt.className = "fd-warn-wt"
        wt.style.opacity = 0;
        wt.innerHTML = "本条回复包含辱骂、人身攻击等易对部分人群产生误导的语言。为了反映《灭蝇行动》主旨并响应“清朗行动”，折叠处理。"
        mele.style.transition = `all 0.2s ${easing}`;
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        inf.style.overflow = "hidden";
        inf.style.maxHeight = "0";
        inf.style.padding = "0";
        inf.style.margin = "0";
        togbtn.type = "button";
        togbtn.className = "fd-warn-toggle";
        togbtn.innerHTML = "展开 ▼";
        togbtn.style.transition = `all 0.2s ${easing}`;
        togbtn.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(txt);
        mele.appendChild(wt);
        mele.appendChild(inf);
        mele.appendChild(togbtn);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = content;
        txt.innerHTML = title;

        let isopen = false;

        const open = () => {
            if (isopen) return;
            isopen = true;
            wt.style.opacity = 0;
            wt.style.height = 0;
            wt.style.padding = "0px";
            inf.style.maxHeight = "2000px";
            inf.style.padding = "14px 25px";
            inf.style.opacity = "1";
            togbtn.innerHTML = "收起 ▲";
            const th = square.getBoundingClientRect().height + inf.scrollHeight + togbtn.getBoundingClientRect().height + 20;
            mele.style.height = `${th}px`;
            wt.addEventListener(("transitionend"), () => {
                wt.style.display = "none";
            }, { once: true });
            resolve();
        };

        const toggle = () => {
            if (isopen) {
                isopen = false;
                inf.style.maxHeight = "0";
                inf.style.padding = "0";
                inf.style.opacity = "0";
                togbtn.innerHTML = "展开 ▼";
                const th = square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20;
                mele.style.height = `${th}px`;
            } else {
                open();
            }
        };

        togbtn.onclick = (e) => {
            e.stopPropagation();
            toggle();
        };

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            wt.style.opacity = 1;
            txt.style.opacity = 1;
            togbtn.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            const th = square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20 + wt.getBoundingClientRect().height;
            mele.style.height = `${th}px`;
        }, { once: true });

        togbtn.onmouseover = () => { togbtn.style.opacity = "0.8"; };
        togbtn.onmouseleave = () => { togbtn.style.opacity = "1"; };
    });
}

async function fd_caut(content, title = "此回复含有限制级内容。") {
    return new Promise((resolve) => {
        const mele = document.createElement("div");
        const square = document.createElement("div");
        const txt = document.createElement("div");
        const wt = document.createElement("div");
        const inf = document.createElement("div");
        const togbtn = document.createElement("button");

        mele.className = "fd-caut-mele";
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;
        square.className = "fd-caut-square";
        txt.className = "mfn-title";
        txt.style.opacity = 0;
        txt.style.transition = `all 0.2s ${easing}`;
        wt.className = "fd-caut-wt";
        wt.style.opacity = 0;
        wt.innerHTML = "本条回复包含对他人的人格侮辱、精神诅咒及危险动作等违反道德或法律的行为，且可能涉及死亡相关话题。为了保护未成年人及一些可能受到影响的人群，折叠处理。";
        wt.style.transition = `all 0.2s ${easing}`;
        inf.className = "mfn-inf";
        inf.style.opacity = 0;
        inf.style.textAlign = "center";
        inf.style.minWidth = "30ch";
        inf.style.transition = `all 0.2s ${easing}`;
        inf.style.overflow = "hidden";
        inf.style.maxHeight = "0";
        inf.style.padding = "0";
        inf.style.margin = "0";
        togbtn.type = "button";
        togbtn.className = "fd-caut-toggle";
        togbtn.innerHTML = "展开 ▼";
        togbtn.style.transition = `all 0.2s ${easing}`;
        togbtn.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(txt);
        mele.appendChild(wt);
        mele.appendChild(inf);
        mele.appendChild(togbtn);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = content;
        txt.innerHTML = title;

        let isopen = false;

        const open = async () => {
            if (isopen) return;
            const confirmed = await conf("确定要展开此内容？");
            if (confirmed) {
                isopen = true;
                wt.style.opacity = 0;
                wt.style.height = 0;
                wt.style.padding = "0px";
                inf.style.maxHeight = "2000px";
                inf.style.padding = "14px 25px";
                inf.style.opacity = "1";
                togbtn.innerHTML = "收起 ▲";
                const th = square.getBoundingClientRect().height + inf.scrollHeight + togbtn.getBoundingClientRect().height + 20;
                mele.style.height = `${th}px`;
                wt.addEventListener(("transitionend"), () => {
                    wt.style.display = "none";
                }, { once: true });
                resolve();
            }
        };

        const toggle = async () => {
            if (isopen) {
                isopen = false;
                inf.style.maxHeight = "0";
                inf.style.padding = "0";
                inf.style.opacity = "0";
                togbtn.innerHTML = "展开 ▼";
                const th = square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20;
                mele.style.height = `${th}px`;
            } else {
                await open();
            }
        };

        togbtn.onclick = (e) => {
            e.stopPropagation();
            toggle();
        };

        mele.addEventListener("animationend", () => {
            inf.style.transform = "translateY(0)";
            wt.style.opacity = 1;
            txt.style.opacity = 1;
            togbtn.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            const th = square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20 + wt.getBoundingClientRect().height;
            mele.style.height = `${th}px`;
        }, { once: true });

        togbtn.onmouseover = () => { togbtn.style.opacity = "0.8"; };
        togbtn.onmouseleave = () => { togbtn.style.opacity = "1"; };
    });
}