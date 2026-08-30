const Myth = (() => {

    let stage = 0;
    let active = false;
    let audio = null;

    const myth = document.getElementById("myth");
    const stageBox = document.getElementById("myth-stage");

    const svg = `
    <svg class="myth-svg" viewBox="0 0 1200 800">

        <!-- paths -->
        <g class="paths">

            <path id="path1"
            d="M120 650 C260 560 390 500 520 410"/>

            <path id="path2"
            d="M520 410 C650 330 720 350 790 420"/>

            <path id="path3"
            d="M790 420 C900 300 960 210 1040 150"/>

        </g>


        <!-- THEO -->
        <g class="node theo">

            <circle class="pulse"
            cx="120"
            cy="650"
            r="7"/>

            <text x="145" y="660">
                THEO
            </text>


            <!-- scarecrow -->
            <g class="ghost scarecrow">

                <line x1="120" y1="610" x2="120" y2="560"/>
                <line x1="90" y1="585" x2="150" y2="585"/>

                <circle cx="120" cy="545" r="15"/>

                <path d="
                M90 530
                Q120 510 150 530
                L145 520
                L95 520 Z"/>

            </g>

        </g>



        <!-- DREAMER -->

        <g class="node dreamer hidden">

            <circle class="dot"
            cx="520"
            cy="410"
            r="6"/>

            <text x="545" y="420">
                DREAMER
            </text>


            <!-- sitting boy -->

            <g class="ghost boy">

                <circle cx="520" cy="455" r="12"/>

                <path d="
                M520 470
                C500 490 510 530 550 540
                M510 520
                L480 560
                M540 520
                L580 540
                "/>

                <path d="
                M520 455
                Q540 445 550 455"/>

            </g>

        </g>




        <!-- DARKEST -->

        <g class="node darkest hidden">

            <circle class="dot"
            cx="790"
            cy="420"
            r="6"/>


            <text x="815" y="430">
                THE DARKEST HOUR
            </text>


            <g class="stars">

                <text x="760" y="500">★</text>
                <text x="820" y="550">★</text>
                <text x="900" y="510">★</text>

            </g>

        </g>




        <!-- IO -->

        <g class="node io hidden">

            <circle class="pulse io-dot"
            cx="1040"
            cy="150"
            r="7"/>


            <!-- sun -->

            <g class="sun">

                <circle cx="1040" cy="150" r="35"/>

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
                q20 -20 40 0"/>

                <path d="
                M1140 120
                q20 -20 40 0
                q20 -20 40 0"/>

                <path d="
                M1170 150
                q20 -20 40 0
                q20 -20 40 0"/>

            </g>

        </g>



    </svg>


    <div class="listen">
        Listen on all streaming platforms
    </div>
    `;


    function open(){

        active = true;
        stage = 0;

        myth.classList.add("active");

        stageBox.innerHTML = svg;

        audio = new Audio("/assets/sounds/lokrainmyth.mp3");
        audio.volume = 0.5;
        audio.play().catch(()=>{});

        bind();

    }



    function next(){

        if(!active) return;

        stage++;


        if(stage === 1){

            show(".path1");
            show(".dreamer");

        }


        if(stage === 2){

            show(".path2");
            show(".darkest");

        }


        if(stage === 3){

            show(".path3");
            show(".io");

        }


    }



    function finish(){

        document.querySelector(".listen")
        .classList.add("visible");


        setTimeout(()=>{

            close();

        },1200);

    }



    function close(){

        if(audio){

            audio.pause();
            audio.currentTime = 0;
            audio = null;

        }


        myth.classList.remove("active");

        document
        .querySelector(".world")
        ?.classList.remove("hidden");


        stageBox.innerHTML="";

        active=false;

    }



    function show(selector){

        document
        .querySelector(selector)
        ?.classList.add("visible");

    }



    function bind(){

        myth.onclick = e=>{

            if(e.target.closest(".io")){

                finish();
                return;

            }

            if(stage < 3){

                next();

            }

        };


        document
        .querySelector(".myth-close")
        ?.addEventListener(
            "click",
            close
        );


        document.addEventListener(
            "keydown",
            e=>{

                if(e.key==="Escape")
                    close();

            }
        );

    }


    return {

        open,
        close

    };


})();
