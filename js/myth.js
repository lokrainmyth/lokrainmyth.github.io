"use strict";

const Myth = {

    initialized: false,

    viewport: null,
    screen: null,

    audio:null,

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
d="M120 650 C230 570 330 500 440 410"/>


<path id="pathDown"
d="M440 410 C570 330 640 350 670 420"/>


<path id="pathVertical"
d="
M670 420
L740 160
"/>


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




<g id="theoScarecrow"
class="ghost scarecrow"
style="cursor:pointer">

<!-- hat -->

<path d="
M104 524
Q120 507 136 524
"/>

<line
x1="90"
y1="528"
x2="150"
y2="528"/>



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
data-myth-action="dreamer"
transform="translate(-80 0)">


<circle class="pulse"
cx="520"
cy="410"
r="6"/>



<text x="550" y="420">

DREAMER

</text>




<g class="ghost boy"
transform="translate(62 52) scale(.88)">

    <!-- head -->

    <circle
    cx="520"
    cy="465"
    r="18"/>

    <!-- neck -->

    <line
    x1="520"
    y1="483"
    x2="520"
    y2="491"/>

    <!-- back -->

    <path d="
    M520 491
    Q502 515 512 539
    Q524 553 548 549
    "/>

    <!-- knees -->

    <circle
    cx="552"
    cy="547"
    r="2.5"/>

    <!-- left arm -->

    <path d="
    M514 511
    Q530 529 552 547
    "/>

    <!-- right arm -->

    <path d="
    M526 509
    Q540 527 552 547
    "/>

    <!-- folded shin -->

    <path d="
    M552 547
    Q570 555 585 567
    "/>

    <!-- hidden second leg -->

    <path d="
    M544 549
    Q560 562 572 573
    "/>

</g>

</g>








<!-- DARKEST -->

<g class="myth-darkest"
data-myth-action="darkest"
transform="translate(-120 0)">


<circle class="pulse"
cx="790"
cy="420"
r="6"/>



<text x="820" y="430">

THE DARKEST

<tspan
x="820"
dy="28">

HOUR

</tspan>

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
data-myth-action="dawn"
transform="translate(-110 0)">


<circle class="pulse"
cx="850"
cy="160"
r="7"/>




<g>


<circle
class="sun-disc"
cx="870"
cy="80"
r="34"/>


<path
class="sun-rays"
d="

M870 38
V20

M870 122
V140


M828 80
H810

M912 80
H930


M840 50
L827 37

M900 110
L913 123


M900 50
L913 37

M840 110
L827 123

"/>


</g>





<text x="885" y="170">

IO

</text>





<g class="birds">

<path d="
M925 55
q10 -10 20 0
q10 -10 20 0
"/>

<path d="
M950 80
q10 -10 20 0
q10 -10 20 0
"/>


<path d="
M975 105
q10 -10 20 0
q10 -10 20 0
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

<text
class="explore-story"
x="500"
y="780">

Explore the story

</text>




</svg>


`;

        this.bind();
    },

    bind() {

        // выход через IO
this.viewport
.querySelector(".myth-dawn")
?.addEventListener("click", () => {

    this.exit();

});


// выход через солнце
this.viewport
.querySelector(".sun-disc")
?.addEventListener("click", () => {

    this.exit();

});


// выход через LO.KRAIN
this.viewport
.querySelector(".artist")
?.addEventListener("click", () => {

    this.exit();

});

//         const scarecrow =
//     this.viewport.querySelector("#theoScarecrow");
        
// scarecrow?.addEventListener(

//     "click",

//     (event)=>{

//         event.stopPropagation();

//         Theo.open();

//     }

// );

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

        setTimeout(()=>{

    document
    .querySelector(".listen-platforms")
    ?.classList.add("show");


    document
    .querySelector(".explore-story")
    ?.classList.add("show");


},3700);

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

    playMythSound(){

    this.audio =
        document.getElementById("mythSound");

    console.log("MYTH SOUND", this.audio);

    if(!this.audio) return;

    this.audio.volume = 0.45;
    this.audio.loop = true;
    this.audio.currentTime = 0;

    this.audio.play();

    console.log("PLAY CALLED");

},

    open() {

        this.step = 0;

        this.screen
            ?.classList.remove("hidden");

        this.screen
            ?.setAttribute("aria-hidden", "false");

        this.build();

        this.playMythSound();

    },

  close(){

    if(this.audio){

        this.audio.pause();

        this.audio.currentTime = 0;

    }


    this.screen
        ?.classList.add("hidden");


    this.screen
        ?.setAttribute(
            "aria-hidden",
            "true"
        );

},

    exit(){

    unlockAfterMyth();

    document
    .querySelector(".world")
    ?.classList.remove("hidden");

    document
    .querySelector(".world")
    ?.classList.remove("outro-active");

    this.close();

},

};
