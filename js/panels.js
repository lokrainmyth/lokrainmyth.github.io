"use strict";

/* ==========================================================
   GLOBAL PANELS ENGINE
========================================================== */


const Panels = {

    panel: null,
    content: null,
    closeButton: null,


    init(){

        this.panel =
            document.getElementById("globalPanel");


        this.content =
            document.getElementById("globalPanelContent");


        this.closeButton =
            document.getElementById("globalPanelClose");


        if(!this.panel) return;


        this.bind();

    },


    bind(){

        this.closeButton?.addEventListener(
            "click",
            ()=>{
                this.close();
            }
        );


        this.panel.addEventListener(
            "click",
            (event)=>{

                if(
                    event.target === this.panel
                ){

                    this.close();

                }

            }
        );


        document.addEventListener(
            "keydown",
            (event)=>{

                if(event.key === "Escape"){

                    this.close();

                }

            }
        );

    },


    open(content){

        if(!this.panel) return;


        this.content.innerHTML = content;


        this.panel.classList.add(
            "visible"
        );


        this.panel.setAttribute(
            "aria-hidden",
            "false"
        );

    },


    close(){

        if(!this.panel) return;


        this.panel.classList.remove(
            "visible"
        );


        this.panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }

};





document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        Panels.init();

    }
);
