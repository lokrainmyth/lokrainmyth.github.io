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
viewBox="0 0 1200 900"
xmlns="http://www.w3.org/2000/svg"
aria-label="Lo.Krain Myth">


<defs>


<radialGradient id="sphereGlow">

<stop offset="0%" stop-color="#9fc8ff"/>

<stop offset="60%" stop-color="#38557c"/>

<stop offset="100%" stop-color="#101724"/>

</radialGradient>


<filter id="blueGlow">

<feGaussianBlur
stdDeviation="6"
result="blur"/>

<feMerge>

<feMergeNode in="blur"/>

<feMergeNode in="SourceGraphic"/>

</feMerge>

</filter>


<filter id="softGlow">

<feGaussianBlur
stdDeviation="3"/>

</filter>


</defs>



<!-- ==================================================
PATH
================================================== -->


<g class="myth-paths">


<path
id="pathTheo"
class="myth-path"
d="
M600 450
C470 450 350 390 210 430
"/>


<path
id="pathDreamer"
class="myth-path"
d="
M600 450
C760 450 850 380 980 420
"/>


<path
id="pathNight"
class="myth-path"
d="
M600 450
C600 330 600 250 600 150
"/>


<path
id="pathDawn"
class="myth-path"
d="
M600 450
C600 570 600 680 600 780
"/>


</g>




<!-- ==================================================
CENTER SPHERE
================================================== -->


<g class="myth-sphere">


<circle
cx="600"
cy="450"
r="95"
fill="url(#sphereGlow)"
filter="url(#blueGlow)"
/>


<!-- chess grid -->


<g
class="sphere-grid"
stroke="rgba(255,255,255,.35)"
fill="none">


<ellipse
cx="600"
cy="450"
rx="95"
ry="35"/>


<ellipse
cx="600"
cy="450"
rx="95"
ry="65"/>


<path
d="
M505 450
H695
"/>


<path
d="
M600 355
V545
"/>


</g>



<circle
class="sphere-core"
cx="600"
cy="450"
r="18"/>


</g>





<!-- ==================================================
THEO
================================================== -->


<g
class="myth-node myth-theo"
data-myth-action="expulsion">


<circle
class="myth-point"
cx="210"
cy="430"
r="14"/>


<circle
class="myth-hit"
cx="210"
cy="430"
r="45"/>



<!-- hat -->

<path
class="theo-hat"
d="
M170 350
Q210 320 250 350
L250 365
L170 365Z"
/>



<!-- head -->

<circle
cx="210"
cy="385"
r="22"
/>


<!-- body -->

<path
d="
M185 410
L235 410
L250 520
L170 520Z"
/>



<text
x="150"
y="580"
class="myth-label">

THEO

</text>


</g>





<!-- ==================================================
DREAMER
================================================== -->


<g
class="myth-node myth-dreamer"
data-myth-action="dreamer"
opacity="0">


<circle
class="myth-point"
cx="980"
cy="420"
r="14"/>


<circle
class="myth-hit"
cx="980"
cy="420"
r="45"/>



<circle
cx="980"
cy="370"
r="22"
/>


<path
d="
M950 400
L1010 400
L1025 520
L935 520Z"
/>


<text
x="930"
y="580"
class="myth-label">

DREAMER

</text>


</g>






<!-- ==================================================
NIGHT
================================================== -->


<g
class="myth-node myth-darkest"
data-myth-action="darkest"
opacity="0">


<circle
class="myth-point"
cx="600"
cy="150"
r="14"/>


<circle
class="myth-hit"
cx="600"
cy="150"
r="45"/>



<g class="stars">


<circle cx="540" cy="100" r="5"/>

<circle cx="600" cy="70" r="4"/>

<circle cx="660" cy="110" r="6"/>


</g>


<text
x="520"
y="220"
class="myth-label">

NIGHT

</text>


</g>






<!-- ==================================================
DAWN
================================================== -->


<g
class="myth-node myth-dawn"
data-myth-action="dawn"
opacity="0">


<circle
class="myth-point"
cx="600"
cy="780"
r="14"/>


<circle
class="myth-hit"
cx="600"
cy="780"
r="45"/>



<circle
cx="600"
cy="700"
r="55"
class="sun"
/>



<path
class="road"
d="
M600 760
L560 850
M600 760
L640 850
"/>



<text
x="550"
y="880"
class="myth-label">

DAWN

</text>


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
