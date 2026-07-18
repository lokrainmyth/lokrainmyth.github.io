"use strict";

window.MythCanvas = (function () {

    let canvas;
    let ctx;

    let width;
    let height;

    let animation;
    let strokes = [];

    let maskCanvas;
    let maskCtx;

    let textPixels;

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

        buildMask();

        createStrokes();

    }

    function buildMask() {

    maskCanvas = document.createElement("canvas");

    maskCanvas.width = width;

    maskCanvas.height = height;

    maskCtx = maskCanvas.getContext("2d");

    maskCtx.clearRect(0,0,width,height);

    maskCtx.fillStyle = "#fff";

    maskCtx.textAlign = "center";

    maskCtx.textBaseline = "middle";

    maskCtx.font = '92px "Modak"';

    maskCtx.fillText(

        "LO.KRAIN MYTH",

        width/2,

        height/2

    );

    textPixels = maskCtx.getImageData(

        0,

        0,

        width,

        height

    ).data;

}

function createStrokes() {

    strokes = [];

    while (strokes.length < 700) {

        const x = Math.random() * width;

        const y = Math.random() * height;

        const index =

            (Math.floor(y) * width +

             Math.floor(x)) * 4 + 3;

        if (textPixels[index] < 20)
            continue;

        strokes.push({

            x,

            y,

            homeX: x,
            homeY: y,

            angle:
                Math.random() * Math.PI * 2,

            length:
                4 + Math.random() * 8,

            speed:
                0.02 + Math.random() * 0.05,

            alpha:
                0.25 + Math.random() * 0.35

        });

    }

}
    
   function animate() {

    animation = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    ctx.lineCap = "round";

    const t = performance.now() * 0.001;

    for (const s of strokes) {

        // частица "дышит" возле своей исходной позиции

        s.x =
            s.homeX +
            Math.sin(t + s.homeY * 0.03) * 0.7;

        s.y =
            s.homeY +
            Math.cos(t + s.homeX * 0.03) * 0.5;

        // слегка меняется направление мазка

        const angle =
            s.angle +
            Math.sin(t + s.homeX * 0.05) * 0.25;

        ctx.globalAlpha = s.alpha;

        ctx.strokeStyle = "#ffffff";

        ctx.lineWidth = 1.4;

        ctx.beginPath();

        ctx.moveTo(s.x, s.y);

        ctx.lineTo(

            s.x + Math.cos(angle) * s.length,

            s.y + Math.sin(angle) * s.length

        );

        ctx.stroke();

    }

}

return {

    start,
    stop

};

})();
