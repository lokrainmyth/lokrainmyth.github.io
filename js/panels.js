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

<p>
Впереди<br>
Две недели приключений нас ждут<br>
И даже если они нас с тобой найдут<br>
Мы будем впереди их на два шага
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

<p>
Даже если ничего впереди<br>
Я хочу узнать тебя<br>
Подожди!
</p>

<p>
Даже если нам не быть вместе вдруг<br>
Я хочу узнать тебя милый друг
</p>

<p>
Я хочу узнать!
</p>


<h2>04. НЕБО ТЁМНОЕ</h2>

<p>
Небо тёмное<br>
Мысли стрёмные<br>
Мы с тобой далеко ушли<br>
Мы хотели выжить<br>
Но не смогли<br>
И теперь мы здесь
</p>

<p>
Подождем до весны<br>
А там посмотрим кому мы нужны<br>
Подождем до весны<br>
А там узнаем кому мы нужны
</p>

<p>
Море чёрное<br>
Мысли стрёмные<br>
Мы с тобой глубоко ушли<br>
Мы хотели выжить<br>
Но не смогли<br>
И теперь мы здесь
</p>


<h2>05. ДОГОЛА</h2>

<p>
До темна догулять<br>
Догола раздеться<br>
Лечь в кровать<br>
Вспоминать как там было в детстве
</p>

<p>
У забора река<br>
Пели рыбам песни<br>
Были вместе всегда<br>
Не разлей вода
</p>

<p>
Играй!
</p>

<p>
В пять утра<br>
Затемно, пока никто не видит<br>
В темный лес ты идешь<br>
Чтобы никто не слышал
</p>

<p>
Ты в шкатулку сложи<br>
Все свои секреты<br>
Глубоко закопай<br>
И иди домой
</p>

<p>
Играй!
</p>


<h2>06. ГРУСТНАЯ МУЗЫКА</h2>

<p>
Я хочу играть грустную музыку<br>
Для тебя
</p>

<p>
Глупые мечты уже не сбудутся<br>
Никогда
</p>


<h2>07. ДЕКАБРЬ</h2>

<p>
Древнее море без сна<br>
Тихо стекает луна<br>
Древнее море не спит<br>
Смотрит как время летит
</p>

<p>
В декабре
</p>


<h2>08. 17</h2>

<p>
Моя душа это папироса<br>
Окурок у обочины<br>
Я такой, не смотри на возраст<br>
Мне всего 17 лет
</p>

<p>
Лето догорает зря<br>
Мама, я продал себя<br>
Я не стал кем я мечтал быть<br>
Мама, я устал
</p>


<h2>09. КРАСИВО</h2>

<p>
Ты лежала красиво<br>
В небо руки раскинув<br>
Кровь текла на кольцо<br>
И разбито лицо
</p>

<p>
Нежно ноги расставив<br>
Туфли где-то остались<br>
У дороги ночной<br>
Но тебе все равно
</p>

<p>
Если есть в жизни радость<br>
Если есть любовь<br>
Ощутить твою сладость<br>
Я хотел бы вновь
</p>

<p>
Твои раны открыты<br>
В волосах цветы<br>
Твое сердце разбито<br>
И разбита ты
</p>


<h2>10. РАССВЕТ</h2>

<p>
Я доверял тебе все свои разговоры<br>
Позади горы, а впереди рассвет
</p>

<p>
Солнце плетет в глазах цветные узоры<br>
Позади склоны, а впереди рассвет
</p>

<p>
Я оставлю все как есть<br>
И не вернусь туда<br>
Этот город не для меня
</p>

<p>
Я забуду кто ты есть<br>
И не вернусь туда<br>
Этот город не для меня
</p>

<p>
Если ты хочешь ты можешь выпить кофе у нас<br>
Мы всегда открыты 24/7 для таких как ты<br>
Сладкие булочки и мягкие пирожки тебя ждут у дороги<br>
Мы навсегда избавим тебя от тоски
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


<form
    id="communicationForm"
    class="communication-form">


<p class="communication-hint">
Leave a message and a contact for connection.
</p>


<input
    id="contactName"
    type="text"
    placeholder="Name">


<input
    id="contactContact"
    type="text"
    placeholder="Contact">


<textarea
    id="contactMessage"
    placeholder="Message"></textarea>


<button
    id="sendMessageButton"
    class="communication-send">

    Send

</button>


<div
    id="communicationStatus"
    class="communication-status">
</div>


</form>

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
