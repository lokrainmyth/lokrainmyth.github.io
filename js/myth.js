"use strict";

window.Myth = (function () {

    let layer;

    let panel;

    let theoNode;

    let pathTheoDreamer;

    function init(){

        layer =
            document.getElementById(
                "mythLayer"
            );

        panel =
            document.getElementById(
                "mythPanel"
            );

        theoNode =
            document.getElementById(
                "theoNode"
            );

        pathTheoDreamer =
            document.getElementById(
                "pathTheoDreamer"
            );

        if(!layer) return;

        console.log(
            "Myth ready"
        );

        activateTheo();

    }

    function activateTheo(){

        if(pathTheoDreamer){

            pathTheoDreamer.style.strokeDashoffset =
                "1200";

        }

        if(theoNode){

            theoNode.classList.remove(
                "hidden"
            );

            theoNode.addEventListener(

                "click",

                openTheoChapter

            );

        }

    }

    function openTheoChapter(){

        if(pathTheoDreamer){

            pathTheoDreamer.style.strokeDashoffset =
                "0";

        }

        panel.classList.add(
            "visible"
        );

        panel.innerHTML = `

<h2>Theo</h2>

<p>

The first memory.

The first fracture.

The beginning of the Lo.Krain Myth.

</p>

`;

    }

    return{

        init

    };

})();
