const wheel = document.getElementById("wheelNav");

document.querySelectorAll(".nav-item").forEach(item=>{

    item.onclick=()=>{

        location.href=item.dataset.page;

    }

})

let hideTimer = null;

// 滑鼠接近底部時展開
document.addEventListener("mousemove", (e) => {

    if (e.clientY > window.innerHeight - 50) {

        clearTimeout(hideTimer);
        wheel.classList.add("show");

    } else {

        // 如果滑鼠不在輪盤上，延遲收回
        if (!wheel.matches(":hover")) {

            clearTimeout(hideTimer);

            hideTimer = setTimeout(() => {
                wheel.classList.remove("show");
            }, 100);

        }

    }

});

// 滑鼠進入輪盤
wheel.addEventListener("mouseenter", () => {

    clearTimeout(hideTimer);
    wheel.classList.add("show");

});

// 滑鼠離開輪盤
wheel.addEventListener("mouseleave", () => {

    hideTimer = setTimeout(() => {
        wheel.classList.remove("show");
    }, 400);

});





