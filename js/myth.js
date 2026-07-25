"use strict";

window.Myth = (function(){

    let svg;

    function init(){

        svg = document.querySelector("#mythViewport svg");

        if(!svg){

            console.log("MYTH SVG NOT FOUND");

            return;

        }

        console.log("MYTH SVG READY");

        prepare();

    }


    function prepare(){

        const route =
            svg.querySelector("#pathTheoDreamer");


        if(route){

            route.style.strokeDasharray =
                route.getTotalLength();

            route.style.strokeDashoffset =
                route.getTotalLength();


            requestAnimationFrame(()=>{

                route.style.transition =
                    "stroke-dashoffset 4s ease";

                route.style.strokeDashoffset = 0;

            });

        }


        const nodes =
            svg.querySelectorAll(".node-hidden");


        nodes.forEach(node=>{

            node.style.opacity = "0.15";

        });


    }


    return {

        init

    };


})();



document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        Myth.init();

    }
);
