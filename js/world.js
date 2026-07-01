/* ==========================================================
   PROJECT DAWN
   WORLD.JS
   PART 1
   World Engine
========================================================== */

const World = {

    state: "night",

    introOpen: true,

    windPlayed: false,

    elements: {},

    init() {

        this.cache();

        this.bind();

        this.prepare();

    },

    /* ====================================================== */

    cache() {

        this.elements = {

            intro: document.querySelector(".intro"),

            world: document.querySelector(".world"),

            cover: document.querySelector(".album-cover"),

            goDeeper: document.querySelector(".go-deeper"),

            mythPortal: document.querySelector(".myth-portal"),

            wind: document.getElementById("windSound")

        };

    },

    /* ====================================================== */

    bind() {

        if (this.elements.intro) {

            this.elements.intro.addEventListener(
                "click",
                () => this.enter()
            );

        }

        document.addEventListener("keydown", (event) => {

            if (!this.introOpen) return;

            if (
                event.code === "Enter" ||
                event.code === "Space"
            ) {

                event.preventDefault();

                this.enter();

            }

        });

    },

    /* ====================================================== */

    prepare() {

        if (this.elements.wind) {

            this.elements.wind.loop = false;

            this.elements.wind.volume = 0.55;

        }

        if (this.elements.cover) {

            this.elements.cover.style.opacity = "0";

            this.elements.cover.style.transition =
                "opacity 5s ease";

        }

    },

    /* ====================================================== */

    async enter() {

        if (!this.introOpen) return;

        this.introOpen = false;

        this.playWind();

        this.fadeIntro();

        await this.wait(900);

        this.revealWorld();

        document.dispatchEvent(
            new CustomEvent("worldEntered")
        );

    },

    /* ====================================================== */

    playWind() {

        if (this.windPlayed) return;

        this.windPlayed = true;

        if (!this.elements.wind) return;

        this.elements.wind.currentTime = 0;

        this.elements.wind.play().catch(() => {});

    },

    /* ====================================================== */

    fadeIntro() {

        if (!this.elements.intro) return;

        this.elements.intro.classList.add("hidden");

    },

    /* ====================================================== */

    revealWorld() {

        if (this.elements.cover) {

            this.elements.cover.style.opacity = "1";

        }

        if (this.elements.world) {

            this.elements.world.classList.add(
                "world-awake"
            );

        }

    },

    /* ====================================================== */

    wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

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
