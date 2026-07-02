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

            main:document.getElementById("mainApp"),

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
