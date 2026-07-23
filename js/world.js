/* ==========================================================
   PROJECT DAWN
   WORLD ENGINE
   FINAL FOUNDATION
========================================================== */

"use strict";

const World = {

    state: "night",

    introOpen: true,

    windPlayed: false,

    currentLayer: "dawn",

    elements:{},

    init(){

        this.cache();

        this.bind();

        this.prepare();

    },

/* ====================================================== */

    cache(){

        this.elements={

            intro:document.getElementById("intro"),

            outro:document.getElementById("outro"),

            world:document.querySelector(".world"),

            cover:document.querySelector(".album-cover"),

            wind:document.getElementById("windSound"),

            mythSound:document.getElementById("mythSound"),

            main:document.querySelector(".world"),

            myth:document.getElementById("mythLayer"),

            theo:document.getElementById("theoLayer")

        };

    },

/* ====================================================== */

    bind(){

        this.elements.intro?.addEventListener(

            "click",

            ()=>this.enter()

        );

        window.addEventListener(

            "keydown",

            e=>{

                if(this.introOpen){

                    if(

                        e.code==="Enter" ||

                        e.code==="Space"

                    ){

                        e.preventDefault();

                        this.enter();

                    }

                }

                if(e.key==="Escape"){

                    this.escape();

                }

            }

        );

    },

/* ====================================================== */

    prepare(){

        if(this.elements.wind){

            this.elements.wind.volume=.55;

            this.elements.wind.loop=false;

        }

        if(this.elements.cover){

            this.elements.cover.style.opacity="0";

            this.elements.cover.style.transition=

                "opacity 5s ease";

        }

    },

/* ====================================================== */

    async enter(){

        if(!this.introOpen)return;

        this.introOpen=false;

        this.playWind();

        this.elements.intro?.classList.add("hidden");

        await this.wait(900);

        this.elements.world?.classList.add(

            "world-awake"

        );

        if(this.elements.cover){

            this.elements.cover.style.opacity="1";

        }

    },

/* ====================================================== */

    playWind(){

        if(this.windPlayed)return;

        this.windPlayed=true;

        this.elements.wind

            ?.play()

            .catch(()=>{});

    },

/* ====================================================== */

    wait(ms){

        return new Promise(r=>setTimeout(r,ms));

    }

};

/* ==========================================================
   AUTO START
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    World.init();

});

/* ==========================================================
   WORLD STATES
========================================================== */

const WORLD_STATES = [
    "night",
    "deep-night",
    "pre-dawn",
    "dawn",
    "morning"
];

function clamp(v,min,max){
    return Math.min(max,Math.max(min,v));
}

function setWorldProgress(progress){

    progress = clamp(progress,0,1);

    document.documentElement.style.setProperty(
        "--world-progress",
        progress
    );

    document.documentElement.style.setProperty(
        "--world-brightness",
        (0.18 + progress*0.82).toFixed(3)
    );

    document.documentElement.style.setProperty(
        "--world-saturation",
        (0.42 + progress*0.58).toFixed(3)
    );

    document.documentElement.style.setProperty(
        "--world-warmth",
        progress.toFixed(3)
    );

    document.documentElement.style.setProperty(
        "--cover-opacity",
        (.35 + progress*.65).toFixed(3)
    );

    document.documentElement.style.setProperty(
        "--cover-scale",
        (.985 + progress*.015).toFixed(3)
    );

    updateWorldClass(progress);

}

/* ==========================================================
   WORLD CLASS
========================================================== */

function updateWorldClass(progress){

    document.body.classList.remove(
        "night",
        "deep-night",
        "pre-dawn",
        "dawn",
        "morning"
    );

    if(progress<0.15){

        document.body.classList.add("night");
        return;

    }

    if(progress<0.35){

        document.body.classList.add("deep-night");
        return;

    }

    if(progress<0.60){

        document.body.classList.add("pre-dawn");
        return;

    }

    if(progress<0.88){

        document.body.classList.add("dawn");
        return;

    }

    document.body.classList.add("morning");

}

/* ==========================================================
   TRACK PROGRESS
========================================================== */

function updateJourneyWorld(completed,total){

    if(!total)return;

    const progress = completed/total;

    setWorldProgress(progress);

    revealSections(progress);

}

/* ==========================================================
   REVEAL
========================================================== */

function revealSections(progress){

    const about=document.getElementById("aboutSection");
    const lyrics=document.getElementById("lyricsSection");
    const communication=document.getElementById("communicationSection");

    if(about){

        about.classList.toggle(
            "visible",
            progress>=0.30
        );

    }

    if(lyrics){

        lyrics.classList.toggle(
            "visible",
            progress>=0.60
        );

    }

    if(communication){

        communication.classList.toggle(
            "visible",
            progress>=1
        );

    }

}

/* ==========================================================
   OUTRO
========================================================== */

function showOutro(){

    document
        .querySelector(".world")
        ?.classList.add("outro-active");

    setTimeout(()=>{

        World.elements.outro
            ?.classList.remove("hidden");

        World.elements.outro
            ?.classList.add("visible");

    },1800);

}

/* ==========================================================
   LAYERS
========================================================== */

function switchLayer(name){

    const layers={

        dawn:World.elements.main,

        myth:World.elements.myth,

        theo:World.elements.theo

    };

    Object.values(layers).forEach(layer=>{

        if(!layer) return;

        layer.classList.remove("visible");

        layer.classList.add("hidden");

    });

    const target=layers[name];

    if(!target) return;

    target.classList.remove("hidden");

    requestAnimationFrame(()=>{

        target.classList.add("visible");

    });

    World.currentLayer=name;

}

/* ==========================================================
   OPENERS
========================================================== */

function openTheo(){

    console.log("OPEN THEO");

    const theo = document.getElementById("theoLayer");

    if(!theo) return;

    World.currentLayer = "theo";

    theo.classList.remove("hidden");
    theo.classList.add("visible");

   const audio = new Audio("assets/sounds/lokrainmyth.mp3");

audio.volume = 0.18;

audio.play().catch(() => {});

   document
    .querySelector(".world")
    ?.classList.remove("outro-active");

World.elements.outro?.classList.remove("visible");
World.elements.outro?.classList.add("hidden");

   Theo.open();

}

function closeTheo(){

    switchLayer("dawn");

    Theo.close();

    document.body.classList.remove("theo-mode");

}

function openMyth() {

    document
        .getElementById("theoLayer")
        .classList
        .add("hidden");

    document
        .getElementById("mythLayer")
        .classList
        .remove("hidden");

}

}

function closeMyth(){

    switchLayer("dawn");

    document.body.classList.remove("myth-mode");

    World.elements.mythSound?.pause();

}

/* ==========================================================
   ESCAPE
========================================================== */

World.escape=function(){

    switch(World.currentLayer){

        case "theo":

            closeTheo();

            return;

        case "myth":

            closeMyth();

            return;

    }

};

/* ==========================================================
   SECRET
========================================================== */

let theoBuffer="";

window.addEventListener(

    "keydown",

    e=>{

        if(World.currentLayer!=="dawn") return;

        theoBuffer+=e.key.toLowerCase();

        theoBuffer=theoBuffer.slice(-10);

        if(theoBuffer.includes("theo")){

            theoBuffer="";

            openTheo();

        }

    }

);

document.addEventListener("keydown", e=>{

    if(e.key.toLowerCase()==="t"){

        openTheo();

    }

});
