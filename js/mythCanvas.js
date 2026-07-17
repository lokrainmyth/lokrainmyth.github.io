"use strict";

window.MythCanvas = (function () {

    let canvas;
    let ctx;

    let width;
    let height;

    let animation;

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

    }

    function animate() {

        animation =
            requestAnimationFrame(
                animate
            );

        ctx.clearRect(

            0,
            0,
            width,
            height

        );

    }

    return {

        start,
        stop

    };

})();
