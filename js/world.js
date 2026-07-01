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
