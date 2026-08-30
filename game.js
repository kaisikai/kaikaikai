// ==========================================
// 漆線雕工坊 v2
// Part 1
// Canvas + SVG + Target System
// ==========================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 650;

// SVG
const outline = document.getElementById("outline");

let svgDoc = null;
let paths = [];
let targets = [];
let progress = 0;
// 玩家畫的線
let strokes = [];

let currentStroke = [];

//==============================
// 金粉粒子
//==============================

let particles = [];

// 玩家資料
let drawing = false;

let mouse = {

    x:0,
    y:0

};

//============================================
// 讀取 SVG
//============================================

outline.addEventListener("load",()=>{

    svgDoc = outline.contentDocument;

    if(!svgDoc){

        console.error("SVG讀取失敗");

        return;

    }

    paths = [...svgDoc.querySelectorAll("path")];



    console.log("SVG已讀取");

    console.log("Path數量：",paths.length);

    buildTargets();

});

//============================================
// 建立判定點
//============================================

function buildTargets() {

    targets = [];

    // SVG 根元素
    const svg = svgDoc.documentElement;

    // viewBox
    const vb = svg.viewBox.baseVal;

    // object 實際顯示大小
    const rect = outline.getBoundingClientRect();

    const scaleX = rect.width / vb.width;
    const scaleY = rect.height / vb.height;

    paths.forEach(path => {

        const len = path.getTotalLength();

        for (let i = 0; i <= len; i += 6) {

            const p = path.getPointAtLength(i);

            targets.push({

                x: p.x * scaleX,
                y: p.y * scaleY,

                hit:false

            });

        }

    });

    console.log("Target數量：", targets.length);

}

let gameStarted = false;

document.getElementById("startBtn").onclick = ()=>{

    gameStarted = true;

    progress = 0;

    strokes = [];

    currentStroke = [];

    targets.forEach(t=>{

        t.hit = false;

    });

}

function drawStroke(points){

    if(points.length<2) return;

    ctx.beginPath();

    ctx.moveTo(

        points[0].x,

        points[0].y

    );

    for(let i=1;i<points.length;i++){

        ctx.lineTo(

            points[i].x,

            points[i].y

        );

    }

    ctx.lineWidth = 10;

    const gold = ctx.createLinearGradient(

        points[0].x,

        points[0].y,

        points[points.length-1].x,

        points[points.length-1].y

    );

    gold.addColorStop(0,"#7a5600");
    gold.addColorStop(.25,"#d4af37");
    gold.addColorStop(.5,"#fff3a8");
    gold.addColorStop(.75,"#d4af37");
    gold.addColorStop(1,"#8b6508");

    ctx.strokeStyle = gold;

    ctx.shadowColor="#FFD54F";

    ctx.shadowBlur=20;

    ctx.lineCap="round";

    ctx.lineJoin="round";

    ctx.stroke();

const end = points[points.length-1];

ctx.beginPath();

ctx.fillStyle="#FFD54F";

ctx.shadowBlur=30;

ctx.arc(

    end.x,

    end.y,

    7,

    0,

    Math.PI*2

);

ctx.fill();

}

function createParticle(x, y){

    particles.push({

        x,
        y,

        vx:(Math.random()-0.5)*1.5,

        vy:(Math.random()-0.5)*1.5,

        size:2+Math.random()*3,

        life:40

    });

}

function updateParticles(){

    particles.forEach(p=>{

        p.x += p.vx;
        p.y += p.vy;

        p.life--;

    });

    particles = particles.filter(p=>p.life>0);

}

function drawParticles(){

    particles.forEach(p=>{

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,220,120,${p.life/40})`;

        ctx.arc(

            p.x,

            p.y,

            p.size,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

}

//============================================
// 畫判定點
//============================================

function drawTargets(){
    if(!gameStarted) return;

    targets.forEach(target=>{

        ctx.beginPath();

        if(target.hit){

            ctx.fillStyle="#FFD54F";

        }else{

            ctx.fillStyle="#555";

        }

        ctx.arc(

            target.x,

            target.y,

            4,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

}

//============================================
// 判定是否碰到 Target
//============================================

function checkTargets(){

    if(!drawing) return;

    if(!gameStarted) return;

    targets.forEach(target=>{

        if(target.hit) return;

        const dx = mouse.x - target.x;
        const dy = mouse.y - target.y;

        const distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < 10){

            target.hit = true;

            progress++;

        }

    });

}

//============================================
// 滑鼠
//============================================

canvas.addEventListener("mousedown",()=>{

    if(!gameStarted) return;

    drawing = true;

    currentStroke = [];

});

canvas.addEventListener("mouseup",()=>{

    drawing = false;

    if(currentStroke.length){

        strokes.push(currentStroke);

    }

});

canvas.addEventListener("mouseleave",()=>{

    drawing=false;

});

canvas.addEventListener("mousemove",(e)=>{

    const rect = canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;

    mouse.y = e.clientY - rect.top;

    if(drawing){

        currentStroke.push({

            x:mouse.x,

            y:mouse.y

        });

        createParticle(

            mouse.x,

            mouse.y

        );

    }

});

//============================================
// 動畫
//============================================

function animate(){

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    checkTargets();

    strokes.forEach(drawStroke);

    drawStroke(currentStroke);

    updateParticles();

    drawParticles();

    drawTargets();

    requestAnimationFrame(animate);

}

animate();


