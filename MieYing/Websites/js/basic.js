function ld(el, percent) { // 控制亮度。
    let ls_t = getComputedStyle(el).transition;
    el.style.transition = `all 0.2s ${easing}`;
    el.style.filter = `brightness(${percent})`;
    el.addEventListener("transitionend", () => {
        el.style.transition = ls_t;
    }, { once: true });
}

function xzsj() { // 现在时间。
    const t = new Date();
    const y = t.getFullYear();
    const m = t.getMonth() + 1;
    const d = t.getDate();
    const h = t.getHours();
    const mi = t.getMinutes();
    const s = t.getSeconds();
    const time = `${y}.${m}/${d} ${h}:${mi >= 10 ? mi : "0" + String(mi)}:${s >= 10 ? s : "0" + String(s)}`;
    return time;
}

function fhsj(time) { // 返回带正确单位的时间。
    units = ["秒", "分钟", "小时", "天", "周", "年"];
    if (time < 6e4) {
        unit = units[0];
        transfer = 1000;
    } else if (time >= 6e4 && time < 3.6e6) {
        unit = units[1];
        transfer = 6e4;
    } else if (time >= 3.6e6 && time < 8.64e7) {
        unit = units[2];
        transfer = 3.6e6;
    } else if (time >= 8.64e7 && time < 6.048e8) {
        unit = units[3];
        transfer = 8.64e7;
    } else if (time >= 6.048e8 && time < 3.15576e10) {
        unit = units[4];
        transfer = 6.048e8;
    } else if (time >= 3.15576e10) {
        unit = units[5];
        transfer = 3.15576e10;
    }
    return `${(time / transfer).toFixed(2)} ${unit}`;
}

function width(name) {
    const el = document.querySelector(name);
    el.style.width = window.innerWidth + "px";
}

function hqgd(str, cl, kind) { // 获取元素高度。
    let el1 = document.createElement(kind);
    el1.className = cl;
    el1.innerHTML = str;
    el1.style.position = "absolute";
    el1.style.transform = "translate(9999px, 9999px)";
    el1.style.visibility = "hidden";
    document.body.appendChild(el1);
    let ls_gd = el1.offsetHeight;
    document.body.removeChild(el1);
    return String(ls_gd) + "px";
}

function hqkd(str, cl, kind) { // 获取元素宽度。
    let el2 = document.createElement(kind);
    el2.className = cl;
    el2.innerHTML = str;
    el2.style.position = "absolute";
    el2.style.transform = "translate(-9999px, -9999px)";
    el2.style.visibility = "hidden";
    document.body.appendChild(el2);
    let ls_kd = el2.offsetWidth;
    document.body.removeChild(el2);
    return String(ls_kd) + "px";
}

function chara_sort(str) {
    let zh = 0; // 中文字符数。
    let al = 0; // 字符数。
    let ma = 0; // 标点符号数。（包括全角符号和半角符号）
    for (var i = 0; i <= str.length - 1; i++) {
        if (alphabets.includes(str[i])) {
            al++;
        } else if (marks.includes(str[i])) {
            ma++;
        } else {
            zh++;
        }
    }
    return [zh, al, ma];
}

function smarttime(str) {
    str = String(str);
    str = str.replace(/\s+/g, "");

    if (deftime === "Smart") {
        let [zh, al, ma] = chara_sort(str);
        let time = zh * 165 + al * 95 + ma * 50;
        return (time > 1250 ? time : 1250);
    } else {
        return deftime;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor = "#ffffff";
    document.body.addEventListener("transitionend", () => {
        document.body.style.transition = `all 0.3s ${easing}`;

    });
});

function totop() { // 返回顶部。
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function hqzd(s) { // 获取栈顶元素。
    const t = s.pop();
    s.push(t);
    return t;
}

function pos(p) {
    let total = 3 * window.innerHeight / 100;
    function fn(w) {
        w.forEach((window) => {
            const wh = window.getBoundingClientRect().height;
            window.style.transition = `all 0.55s ${easing}`;
            window.style.top = `${total}px`;
            total += (wh + 3);
        });
    }
    if (p === 0) {
        fn(left_win);
    } else if (p === 1) {
        fn(right_win);
    } else if (p === 2) {
        fn(mid_win);
    }
}

function create(window) { // 创建窗口。
    if (window.className === "rz-window") {
        left_win.push(window);
        pos(0);
    } else if (midwins.includes(window.className)) {
        mid_win.push(window);
        pos(2);
    }
}

function close(window) { // 关闭窗口。
    if (window.className === "rz-window") {
        left_win = left_win.filter(win => win !== window);
        pos(0);
    } else if (midwins.includes(window.className)) {
        mid_win = mid_win.filter(win => win !== window);
        pos(2);
    }
}