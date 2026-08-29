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
class="myth-map"
viewBox="0 0 1200 1200"
xmlns="http://www.w3.org/2000/svg"
aria-label="Lo.Krain Myth">


<defs>


<radialGradient id="sphereLight">

    <stop offset="0%" stop-color="#ffffff"/>
    <stop offset="45%" stop-color="#bcd8ff"/>
    <stop offset="100%" stop-color="#304060"/>

</radialGradient>


<filter id="blueGlow">

    <feGaussianBlur
        stdDeviation="8"
        result="blur"/>

    <feMerge>

        <feMergeNode in="blur"/>

        <feMergeNode in="SourceGraphic"/>

    </feMerge>

</filter>


<linearGradient
id="dawnRoad"
x1="0"
x2="1">

<stop
offset="0%"
stop-color="#6d8cff"/>

<stop
offset="50%"
stop-color="#fff0b0"/>

<stop
offset="100%"
stop-color="#ffffff"/>

</linearGradient>


</defs>


<!-- =========================
     PATH
========================= -->


<g class="myth-paths">


<path
id="pathHorizontal"
class="myth-path"
d="
M300 600
C420 600 470 600 600 600
C730 600 780 600 900 600
"/>


<path
id="pathDown"
class="myth-path"
d="
M600 600
C600 760 600 820 600 950
"/>


<path
id="pathVertical"
class="myth-path"
d="
M600 600
C600 430 600 350 600 200
"/>


</g>



<!-- =========================
     CENTRAL IO SPHERE
========================= -->


<g class="io-sphere">


<circle
cx="600"
cy="600"
r="90"
fill="url(#sphereLight)"
filter="url(#blueGlow)"
/>


<circle
cx="600"
cy="600"
r="110"
fill="none"
stroke="rgba(200,220,255,.35)"
stroke-width="2"
/>


<path
d="
M530 600
Q600 560 670 600
Q600 640 530 600
"
fill="none"
stroke="rgba(255,255,255,.4)"
/>


</g>



<!-- =========================
     THEO
========================= -->


<g
class="myth-node myth-theo"
data-myth-action="expulsion">


<circle
class="myth-point"
cx="300"
cy="600"
r="12"
/>


<text
class="myth-label"
x="250"
y="700">

THEO

</text>



<!-- scarecrow -->

<g class="myth-figure">


<circle
cx="300"
cy="500"
r="28"/>


<line
x1="300"
y1="530"
x2="300"
y2="620"/>


<line
x1="250"
y1="560"
x2="350"
y2="560"/>


<path
d="
M260 470
Q300 430
340 470
"
/>


</g>


</g>




<!-- =========================
     DREAMER
========================= -->


<g
class="myth-node myth-dreamer"
data-myth-action="dreamer">


<circle
class="myth-point"
cx="900"
cy="600"
r="12"
/>


<text
class="myth-label"
x="780"
y="700">

DREAMER

</text>



<g class="myth-figure">


<circle
cx="900"
cy="500"
r="24"
/>


<path
d="
M875 540
L925 540
L940 620
L860 620
Z
"
/>


</g>


</g>




<!-- =========================
     NIGHT
========================= -->


<g
class="myth-node myth-darkest"
data-myth-action="darkest">


<circle
class="myth-point"
cx="600"
cy="950"
r="12"
/>


<text
class="myth-label"
x="520"
y="1080">

NIGHT

</text>


<g class="stars">


<circle cx="540" cy="850" r="5"/>
<circle cx="600" cy="820" r="5"/>
<circle cx="660" cy="850" r="5"/>


</g>


</g>




<!-- =========================
     DAWN
========================= -->


<g
class="myth-node myth-dawn"
data-myth-action="dawn">


<circle
class="myth-point"
cx="600"
cy="200"
r="12"
/>



<circle
class="sun"
cx="600"
cy="120"
r="45"
filter="url(#blueGlow)"
/>


<path
class="road"
d="
M600 200
L600 350
"
stroke="url(#dawnRoad)"
/>



<text
class="myth-label"
x="520"
y="320">

DAWN

</text>



<g class="birds">

<path d="M500 160 Q520 140 540 160"/>
<path d="M660 160 Q680 140 700 160"/>

</g>


</g>


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
