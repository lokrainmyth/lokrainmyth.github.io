"use strict";

/* ==========================================================
   GLOBAL PANELS ENGINE
========================================================== */


const Panels = {

    panel: null,
    content: null,
    closeButton: null,


    init(){

        this.panel =
            document.getElementById("globalPanel");


        this.content =
            document.getElementById("globalPanelContent");


        this.closeButton =
            document.getElementById("globalPanelClose");


        if(!this.panel) return;


        this.bind();

    },


    bind(){

        this.closeButton?.addEventListener(
            "click",
            ()=>{
                this.close();
            }
        );


        this.panel.addEventListener(
            "click",
            (event)=>{

                if(
                    event.target === this.panel
                ){

                    this.close();

                }

            }
        );


        document.addEventListener(
            "keydown",
            (event)=>{

                if(event.key === "Escape"){

                    this.close();

                }

            }
        );

    },


    open(content){

        if(!this.panel) return;


        this.content.innerHTML = content;


        this.panel.classList.add(
            "visible"
        );


        this.panel.setAttribute(
            "aria-hidden",
            "false"
        );

    },


    close(){

        if(!this.panel) return;


        this.panel.classList.remove(
            "visible"
        );


        this.panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }

};

const PANEL_CONTENT = {

    about: `

<h1>About</h1>

<div class="panel-text">

<p>
Lo.Krain is a project that has been forming intuitively for 15 years.
I never knew in advance what the next song or album would be about.
First came a feeling, a piece of music, a phrase, an image — and only years later I realized that the same myth had been repeating all along: exile, night, empty cities, a long search for connection, and dawn.
</p>

<p>
This album is the point where that path is seen as a whole for the first time.
It is about the fact that even if you don’t understand your path now, it doesn’t mean it has no meaning.
Sometimes meaning arrives only at dawn.
</p>

<p>
Io is the record where intuition and spontaneity finally outweighed the desire to “make something impressive.”
It grew out of my creative experiments since 2021, yet the album itself was recorded in just a few days.
</p>

<p>
I spent some time wondering what still needed to be changed, but eventually understood that the first impulse and sincerity mattered more.
Working on the record became as light and spontaneous as the way I write songs.
</p>

</div>

`,

    lyrics: `

<h1>Lyrics</h1>

<div class="lyrics-list">

<h2>01. ПУТЬ</h2>

<p>
Путь через ночь<br>
Я уезжаю прочь<br>
Сон мог бы помочь<br>
Но я не знаю
</p>

<p>
Путь через ночь<br>
Через реку без моста<br>
Сон уходит прочь<br>
И я не знаю, что сказать
</p>


<h2>02. КОФЕ С СОБОЙ</h2>

<p>
Перестань<br>
Нас могут слышать<br>
Нас не должны видеть тут<br>
И я не знаю<br>
Сможешь ли ты стать мне другом<br>
Но мне так хорошо когда ты рядом
</p>

<p>
Нам кофе с собой<br>
И два места<br>
Мы будем с тобой рядом<br>
До конца
</p>


<h2>03. ДРУГ</h2>

<p>
Весна нам с тобой достанется<br>
Мне так все это нравится<br>
Пусть в душе ничего не болит<br>
Время лечит, время летит
</p>

</div>

`,

    myth: `
        <h1>Lo.Krain Myth</h1>
        <p>
            Myth placeholder.
        </p>
    `,

    communication: `
        <h1>Communication</h1>
        <p>
            Communication placeholder.
        </p>
    `,

    creator: `
        <h1>Creator</h1>
        <p>
            About the creator.
        </p>
    `

};


document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        Panels.init();


        document
            .querySelectorAll("[data-panel]")
            .forEach(button=>{

                button.addEventListener(
                    "click",
                    ()=>{

                        const panel =
                            button.dataset.panel;


                        Panels.open(
                            PANEL_CONTENT[panel]
                        );

                    }
                );

            });

    }
);
