"use strict";

window.Myth = (function () {

    let layer;

    function open(){

        layer = document.getElementById("mythLayer");

        if(!layer) return;

        layer.classList.add("visible");

    }

    function close(){

        layer?.classList.remove("visible");

    }

    return{

        open,
        close

    };

})();
