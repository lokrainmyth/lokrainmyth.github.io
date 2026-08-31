"use strict";

const Myth = {

    initialized: false,

    viewport: null,
    screen: null,

    step: 0,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        this.screen =
            document.getElementById("mythScreen");

        this.viewport =
            document.getElementById("mythViewport");

        if (!this.screen || !this.viewport) return;

        this.build();
    },

   build() {

this.viewport.innerHTML = `

<svg 
class="myth-svg"
viewBox="0 0 1000 800"
preserveAspectRatio="xMidYMid meet">
<style>

.myth-svg text {

    fill:#ffffff;
    font-family:Arial, sans-serif;
    font-size:22px;
    letter-spacing:4px;

}


.paths path {

    fill:none;
    stroke:#ffffff;
    stroke-width:2;
    opacity:.5;

    stroke-dasharray:900;
    stroke-dashoffset:900;

}


.paths path.draw {

    animation:
    drawPath 2.5s ease forwards;

}


@keyframes drawPath {

    to {

        stroke-dashoffset:0;

    }

}



.myth-theo {

    opacity:1;

}



.myth-dreamer,
.myth-darkest,
.myth-dawn {

    opacity:0;

    transition:
    opacity 2s ease;

}



.myth-dreamer.reveal,
.myth-darkest.reveal,
.myth-dawn.reveal {

    opacity:1;

}



.ghost {

    fill:none;
    stroke:white;
    stroke-width:2;
    opacity:.4;

}



.pulse {

    fill:white;

    animation:
    pulse 2s infinite;

}



@keyframes pulse {

    0%,100% {

        opacity:.3;

        r:6;

    }


    50% {

        opacity:1;

        r:10;

    }

}



.stars text {

    fill:white;
    font-size:35px;

    animation:
    starPulse 6s infinite;

}



.stars text:nth-child(2) {

    animation-delay:2s;

}



.stars text:nth-child(3) {

    animation-delay:4s;

}



@keyframes starPulse {

    0%,100% {

        opacity:.4;

    }


    50% {

        opacity:1;

    }

}




.sun path {

    stroke:white;
    stroke-width:2;

}



.birds path {

    fill:none;
    stroke:white;
    stroke-width:2;

}



.subtitle {

    font-size:14px;

}

.listen-platforms {

    opacity:0;

    font-size:18px;

    letter-spacing:5px;

    text-anchor:middle;

    fill:white;

}


.myth-dawn.reveal ~ .listen-platforms {

    animation:
    listenGlow 5s infinite;

}



@keyframes listenGlow {


0%,100% {

    opacity:.35;

}


50% {

    opacity:1;

}


}

</style>




<!-- PATHS -->

<g class="paths">


<path id="pathHorizontal"
d="M120 650 C260 560 390 500 520 410"/>


<path id="pathDown"
d="M520 410 C650 330 720 350 790 420"/>


<path id="pathVertical"
d="M790 420 
C820 320 830 240 850 160"/>


</g>





<!-- THEO -->

<g class="myth-theo"
data-myth-action="expulsion">

.myth-theo,
.myth-dreamer,
.myth-darkest,
.myth-dawn {

    cursor:pointer;

    pointer-events:all;

}

<circle class="pulse"
cx="120"
cy="650"
r="7"/>



<text x="150" y="660">

THEO

</text>




<g class="ghost scarecrow">


<path d="
M90 520
Q120 500 150 520
L145 535
L95 535 Z
"/>



<circle
cx="120"
cy="550"
r="14"/>



<line
x1="120"
y1="565"
x2="120"
y2="620"/>



<line
x1="90"
y1="585"
x2="150"
y2="585"/>


</g>


</g>








<!-- DREAMER -->

<g class="myth-dreamer"
data-myth-action="dreamer">


<circle class="pulse"
cx="520"
cy="410"
r="6"/>



<text x="550" y="420">

DREAMER

</text>




<g class="ghost boy">


<circle
cx="520"
cy="465"
r="12"/>



<path d="
M520 478
C500 500 510 535 550 545

M510 520
L470 555

M540 525
L590 555
"/>



<path d="
M520 455
Q540 445 550 455
"/>


</g>


</g>








<!-- DARKEST -->

<g class="myth-darkest"
data-myth-action="darkest">


<circle class="pulse"
cx="790"
cy="420"
r="6"/>



<text x="820" y="430">

THE DARKEST HOUR

</text>




<g class="stars">


<text x="760" y="500">

★

</text>


<text x="830" y="550">

★

</text>


<text x="900" y="510">

★

</text>


</g>


</g>








<!-- IO -->

<g class="myth-dawn"
data-myth-action="dawn">


<circle class="pulse"
cx="850"
cy="160"
r="7"/>




<g>


<circle
class="sun-disc"
cx="900"
cy="90"
r="34"/>


<path
class="sun-rays"
d="
M900 45V32
M900 135V148

M855 90H842
M945 90H958

M870 60L860 50
M930 120L940 130

M930 60L940 50
M870 120L860 130
"/>


</g>





<text x="885" y="170">

IO

</text>





<g class="birds"


<path d="
M820 115
q12 -12 24 0
q12 -12 24 0
"/>


<path d="
M850 135
q12 -12 24 0
q12 -12 24 0
"/>


<path d="
M880 155
q12 -12 24 0
q12 -12 24 0
"/>


</g>



</g>

<text
class="listen-platforms"
x="500"
y="740">

Listen on all streaming platforms

</text>

<text
class="artist"

x="120"
y="70">

LO.KRAIN

</text>




</svg>


`;

        this.bind();
    },

    bind() {

        this.viewport
            .querySelectorAll("[data-myth-action]")
            .forEach(node => {

                node.addEventListener("click", () => {

                    this.activate(
                        node.dataset.mythAction
                    );

                });

            });

    },

    activate(action) {

        if (action === "expulsion") {

            this.activateExpulsion();

        }

        if (action === "dreamer") {

            this.activateDreamer();

        }

        if (action === "darkest") {

            this.activateDarkest();

        }

        if (action === "dawn") {

            this.activateDawn();

        }

    },

    activateExpulsion() {

        if (this.step > 0) return;

        this.step = 1;

        document
            .getElementById("pathHorizontal")
            ?.classList.add("draw");

        document
            .querySelector(".myth-dreamer")
            ?.classList.add("reveal");

    },

    activateDreamer() {

        if (this.step < 1) return;

        if (this.step > 1) return;

        this.step = 2;

        document
            .getElementById("pathDown")
            ?.classList.add("draw");

        document
            .querySelector(".myth-darkest")
            ?.classList.add("reveal");

    },

    activateDarkest() {

        if (this.step < 2) return;

        if (this.step > 2) return;

        this.step = 3;

        document
            .getElementById("pathVertical")
            ?.classList.add("draw");

        document
            .querySelector(".myth-dawn")
            ?.classList.add("reveal");

        document
.querySelector(".listen-platforms")
?.classList.add("show");

        document
.querySelector(".artist")
?.classList.add("show");

    },

    activateDawn() {

    if (this.step < 3) return;

    this.step = 4;

    this.screen
        ?.classList.add("myth-complete");

    setTimeout(() => {

        this.close();

unlockAfterMyth();

document
.querySelector(".myth-dawn")
?.addEventListener("click", ()=>{

    this.close();

    unlockAfterMyth();

});

document
    .querySelector(".world")
    ?.classList.remove("hidden");

document
    .querySelector(".world")
    ?.classList.remove("outro-active");

    }, 1200);

},

    open() {

        this.step = 0;

        this.screen
            ?.classList.remove("hidden");

        this.screen
            ?.setAttribute("aria-hidden", "false");

        this.build();

    },

    close() {

        this.screen
            ?.classList.add("hidden");

        this.screen
            ?.setAttribute("aria-hidden", "true");

    }

};
