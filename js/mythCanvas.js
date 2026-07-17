"use strict";

window.MythCanvas = (function () {

    let canvas;
    let ctx;

    let width;
    let height;

    let animation;
    let strokes = [];

    function start() {

        canvas =
            document.getElementById("mythCanvas");

        if (!canvas) return;

        ctx =
            canvas.getContext("2d");

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        animate();

    }

    function stop() {

        cancelAnimationFrame(
            animation
        );

    }

    function resize() {

        width =
            canvas.clientWidth;

        height =
            canvas.clientHeight;

        canvas.width = width;

        canvas.height = height;

        createStrokes();

    }

function createStrokes() {

    strokes = [];

    for (let i = 0; i < 350; i++) {

        strokes.push({

            x: Math.random() * width,

            y: Math.random() * height,

            angle: Math.random() * Math.PI * 2,

            length: 6 + Math.random() * 10,

            speed: 0.05 + Math.random() * 0.12,

            alpha: 0.15 + Math.random() * 0.35

        });

    }

}
    
    function animate() {

    animation = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    ctx.lineCap = "round";

    for (const s of strokes) {

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.globalAlpha = s.alpha;

        const colors = [

"#ffffff",

"#f7f7f7",

"#ececec",

"#dddddd"

];

        ctx.lineWidth = 2.2;

        ctx.beginPath();

        ctx.moveTo(s.x, s.y);

        ctx.lineTo(
            s.x + Math.cos(s.angle) * s.length,
            s.y + Math.sin(s.angle) * s.length
        );

        ctx.stroke();

    }

    // ← цикл закончился

    ctx.globalAlpha = 1;

    ctx.globalCompositeOperation = "destination-in";

    ctx.fillStyle = "#fff";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = '92px "Modak"';

    ctx.fillText(
        "LO.KRAIN MYTH",
        width / 2,
        height / 2
    );

    ctx.globalCompositeOperation = "source-over";

}

return {

    start,
    stop

};

})();
