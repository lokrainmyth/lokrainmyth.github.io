"use strict";

window.Myth = {

    init(){

        console.log("MYTH READY");

        const path =
        document.getElementById("pathTheoDreamer");


        if(path){

            path.style.strokeDashoffset = 0;

        }


        const theo =
        document.getElementById("theoNode");


        if(theo){

            theo.addEventListener(
                "click",
                ()=>{

                    console.log("THEO NODE");

                }
            );

        }

    }

};
