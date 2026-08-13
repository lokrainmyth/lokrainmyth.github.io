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

const PANEL_CONTENT = {

    about: `
        <h1>About</h1>
        <p>
            Information about Lo.Krain.
        </p>
    `,

    lyrics: `
        <h1>Lyrics</h1>
        <p>
            Lyrics section.
        </p>
    `,

    myth: `
        <h1>Lo.Krain Myth</h1>
        <p>
            Myth placeholder.
        </p>
    `,

    communication: `
        <h1>Communication</h1>
        <p>
            Communication placeholder.
        </p>
    `,

    creator: `
        <h1>Creator</h1>
        <p>
            About the creator.
        </p>
    `

};


document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        Panels.init();


        document
            .querySelectorAll("[data-panel]")
            .forEach(button=>{

                button.addEventListener(
                    "click",
                    ()=>{

                        const panel =
                            button.dataset.panel;


                        Panels.open(
                            PANEL_CONTENT[panel]
                        );

                    }
                );

            });

    }
);
