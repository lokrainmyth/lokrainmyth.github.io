"use strict";

window.Myth = (function () {

    let layer;
    let viewport;
    let panel;
    let svg;

    function init() {

        layer = document.getElementById("mythLayer");
        viewport = document.getElementById("mythViewport");
        panel = document.getElementById("mythPanel");

        if (!layer || !viewport) {

            console.warn("Myth: layer not found");
            return;

        }

        svg = viewport.querySelector("svg");

        if (!svg) {

            console.warn("Myth: SVG not found");
            return;

        }

        console.log("Myth ready");

    }

    function open() {

        if (!layer) return;

        layer.classList.remove("hidden");
        layer.classList.add("visible");

    }

    function close() {

        if (!layer) return;

        layer.classList.remove("visible");
        layer.classList.add("hidden");

    }

    return {

        init,
        open,
        close

    };

})();
