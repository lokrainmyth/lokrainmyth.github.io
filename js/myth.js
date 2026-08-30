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

   <svg class="myth-svg" viewBox="0 0 1200 800">

    <!-- paths -->
    <g class="paths">

        <path id="pathHorizontal"
            d="M120 650 C260 560 390 500 520 410"/>

        <path id="pathDown"
            d="M520 410 C650 330 720 350 790 420"/>

        <path id="pathVertical"
            d="M790 420 C900 300 960 210 1040 150"/>

    </g>



    <!-- THEO -->

    <g class="node theo"
       data-myth-action="expulsion">

        <circle class="pulse"
            cx="120"
            cy="650"
            r="7"/>


        <text x="145" y="660">
            THEO
        </text>


        <!-- scarecrow -->

        <g class="ghost scarecrow">

            <path d="
                M90 520
                Q120 500 150 520
                L145 535
                L95 535 Z"/>


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

    <g class="node dreamer hidden"
       data-myth-action="dreamer">


        <circle class="dot"
            cx="520"
            cy="410"
            r="6"/>


        <text x="545" y="420">
            DREAMER
        </text>



        <!-- sitting boy -->

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






    <!-- THE DARKEST HOUR -->

    <g class="node darkest hidden"
       data-myth-action="darkest">


        <circle class="dot"
            cx="790"
            cy="420"
            r="6"/>


        <text x="815" y="430">
            THE DARKEST HOUR
        </text>



        <g class="stars">

            <text x="760" y="500">
                ★
            </text>


            <text x="820" y="550">
                ★
            </text>


            <text x="900" y="510">
                ★
            </text>


        </g>


    </g>







    <!-- IO -->

    <g class="node io hidden"
       data-myth-action="dawn">


        <circle class="pulse io-dot"
            cx="1040"
            cy="150"
            r="7"/>



        <!-- SUN -->

        <g class="sun">

            <circle
                cx="1040"
                cy="150"
                r="35"/>


            <path d="
                M1040 95V75
                M1040 205V225

                M985 150H965
                M1095 150H1115

                M1000 110L985 95
                M1080 190L1095 205

                M1080 110L1095 95
                M1000 190L985 205
            "/>


        </g>





        <text x="1090" y="150">
            IO
        </text>


        <text class="subtitle"
              x="1090"
              y="185">
            The Dawn has come
        </text>





        <!-- birds -->

        <g class="birds">


            <path d="
                M1110 90
                q20 -20 40 0
                q20 -20 40 0
            "/>


            <path d="
                M1140 120
                q20 -20 40 0
                q20 -20 40 0
            "/>


            <path d="
                M1170 150
                q20 -20 40 0
                q20 -20 40 0
            "/>


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
