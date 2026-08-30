
/* =========================
   成員作品集
========================= */

const portfolioData = {

    guan: {

        name: "官秀娜",

        photo: "img/member2.jpg",

        job: `
            美術設計<br>
            採訪拍攝
        `,

        instagram: "siew_0605",

        works: [
            "member/kuan/1.png",
            "member/kuan/2.png",
            "member/kuan/3.png",
            "member/kuan/4.png",
            "member/kuan/5.png",
            "member/kuan/6.png"
        ]

    },


    tang: {

        name: "唐凱",

        photo: "img/member1.jpg",

        job: `
            對接采訪<br>
            資料整合
        `,

        instagram: "jeffrey050930",

        works: [
            "member/tang/1.png",
            "member/tang/2.png",
            "member/tang/3.png",
            "member/tang/4.png",
            "member/tang/5.png",
            "member/tang/6.png"
        ]

    },


    wei: {

        name: "魏德楷",

        photo: "img/member3.jpg",

        job: `
            程式設計<br>
            網頁互動
        `,

        instagram: "_dekai_08_",

        works: [
            "member/wei/1.png",
            "member/wei/2.png",
            "member/wei/3.png",
            "member/wei/4.png",
            "member/wei/5.png",
            "member/wei/6.png"
        ]

    }

};


const portfolioModal =
    document.getElementById("portfolioModal");

const portfolioClose =
    document.getElementById("portfolioClose");


function openPortfolio(id) {

    const data = portfolioData[id];

    if (!data) return;


    document.getElementById("portfolioPhoto")
        .src = data.photo;


    document.getElementById("portfolioName")
        .textContent = data.name;


    document.getElementById("portfolioJob")
        .innerHTML = data.job;


    document.getElementById("portfolioInstagram")
        .textContent = data.instagram;


    const works =
        document.getElementById("portfolioWorks");


    works.innerHTML = "";


    data.works.forEach(src => {

        const item =
            document.createElement("div");

        item.className =
            "portfolio-work";


        const img =
            document.createElement("img");

        img.src = src;

        img.alt = "作品";


        item.appendChild(img);

        works.appendChild(item);

    });


    portfolioModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* 關閉 */

function closePortfolio() {

    portfolioModal.classList.remove("show");

    document.body.style.overflow = "";

}


portfolioClose.addEventListener(
    "click",
    closePortfolio
);


/* 點擊黑色背景關閉 */

portfolioModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === portfolioModal
        ) {

            closePortfolio();

        }

    }
);


/* ESC 關閉 */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closePortfolio();

        }

    }
);