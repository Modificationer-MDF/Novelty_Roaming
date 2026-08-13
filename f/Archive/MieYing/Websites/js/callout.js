async function fd_warn(content, title = "此回复含有不宜内容") {
    return new Promise((resolve) => {
        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const togbtn = document.createElement("button");

        mele.className = "fd-warn-mele";
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;
        square.className = "fd-warn-square";
        icon.src = "images/Warning.png";
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
        inf.style.overflow = "hidden";
        inf.style.maxHeight = "0";
        inf.style.padding = "0 20px 0 20px";
        togbtn.type = "button";
        togbtn.className = "fd-warn-toggle";
        togbtn.innerHTML = "展开 ▼";
        togbtn.style.transition = `all 0.2s ${easing}`;
        togbtn.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
        mele.appendChild(inf);
        mele.appendChild(togbtn);

        mele.style.animation = `in_mfn 0.3s forwards ${easing}`;
        inf.innerHTML = content;
        txt.innerHTML = title;

        let isopen = false;

        const open = () => {
            if (isopen) return;
            isopen = true;
            inf.style.maxHeight = "2000px";
            inf.style.padding = "14px 25px";
            togbtn.innerHTML = "收起 ▲";
            mele.style.height = `${square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20 + txt.getBoundingClientRect().height}px`;
            resolve();
        };

        const toggle = () => {
            if (isopen) {
                isopen = false;
                inf.style.maxHeight = "0";
                inf.style.padding = "7px 11px";
                togbtn.innerHTML = "展开 ▼";
                mele.style.height = `${square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20}px`;
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
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            togbtn.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `calc(${square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20}px`;
        }, { once: true });

        togbtn.onmouseover = () => { togbtn.style.opacity = "0.8"; };
        togbtn.onmouseleave = () => { togbtn.style.opacity = "1"; };
    });
}

async function fd_caut(content, title = "此回复含有限制级内容") {
    return new Promise((resolve, reject) => {
        const mele = document.createElement("div");
        const square = document.createElement("div");
        const icon = document.createElement("img");
        const txt = document.createElement("div");
        const inf = document.createElement("div");
        const togbtn = document.createElement("button");

        mele.className = "fd-caut-mele";
        mele.style.height = "0px";
        mele.style.transition = `all 0.2s ${easing}`;
        square.className = "fd-caut-square";
        icon.src = "images/Caution.png";
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
        inf.style.overflow = "hidden";
        inf.style.maxHeight = "0";
        inf.style.padding = "0 20px 0 20px";
        togbtn.type = "button";
        togbtn.className = "fd-caut-toggle";
        togbtn.innerHTML = "展开 ▼";
        togbtn.style.transition = `all 0.2s ${easing}`;
        togbtn.style.opacity = 0;

        mcreate(mele);
        document.body.appendChild(mele);
        mele.appendChild(square);
        square.appendChild(icon);
        square.appendChild(txt);
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
                inf.style.maxHeight = "2000px";
                inf.style.padding = "14px 25px";
                togbtn.innerHTML = "收起 ▲";
                mele.style.height = `${square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20 + txt.getBoundingClientRect().height}px`;
                resolve();
            }
        };

        const toggle = async () => {
            if (isopen) {
                isopen = false;
                inf.style.maxHeight = "0";
                inf.style.padding = "7px 11px";
                togbtn.innerHTML = "展开 ▼";
                mele.style.height = `${square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20}px`;
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
            inf.style.opacity = 1;
            icon.style.opacity = 1;
            txt.style.opacity = 1;
            togbtn.style.opacity = 1;
            mele.style.width = "30ch";
            mele.style.left = "calc(50% - 15ch)";
            mele.style.right = "calc(50% + 15ch)";
            mele.style.height = `${square.getBoundingClientRect().height + togbtn.getBoundingClientRect().height + 20}px`;
        }, { once: true });

        togbtn.onmouseover = () => { togbtn.style.opacity = "0.8"; };
        togbtn.onmouseleave = () => { togbtn.style.opacity = "1"; };
    });
}