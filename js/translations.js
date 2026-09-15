"use strict";

const translations = {

    en: {

        albumDescription:
`An album completing a fifteen-year journey from night to dawn. Start listening and head into the night, track by track, <span class="pathReveal">
<span>u</span><span>n</span><span>t</span><span>i</span><span>l</span><span>&nbsp;</span>
<span>t</span><span>h</span><span>e</span><span>&nbsp;</span>
<span>p</span><span>a</span><span>t</span><span>h</span><span>&nbsp;</span>
<span>r</span><span>e</span><span>v</span><span>e</span><span>a</span><span>l</span><span>s</span><span>&nbsp;</span>
<span>i</span><span>t</span><span>s</span><span>e</span><span>l</span><span>f</span><span class="pathDot">.</span>
</span>` ,

        about:
        "About",

        lyrics:
        "Lyrics",

        myth:
        "Lo.Krain Myth",

        communication:
        "Communication",

        creator:
        "Creator",

        play:
        "Play",

        pause:
        "Pause",

        skip:
        "Skip",

        send:
        "Send",

        sending:
"Sending...",

sent:
"Sent",

messageSent:
"Your words have reached Lo.Krain.",

    error:
"Something went wrong.",

        journey:
        "Journey to the Dawn",

        goDeeper: 
        "Go Deeper?",

        welcomeTitle:
"Welcome to IO",

welcomeDescription:
`This is not a regular music album.

Io is an interactive journey from night to dawn.

Press Play and listen to the first few tracks without skipping.

As the journey unfolds, the hidden path will reveal itself.

Discover the story behind the album, meet the creator, and share your thoughts.`,

begin:
"BEGIN",

    },


    ru: {

     albumDescription:
`Альбом, завершающий пятнадцатилетнее путешествие от ночи к рассвету. Начни слушать и отправляйся в ночь — трек за треком, <span class="pathReveal">
<span>п</span><span>о</span><span>к</span><span>а</span><span>&nbsp;</span>
<span>п</span><span>у</span><span>т</span><span>ь</span><span>&nbsp;</span>
<span>н</span><span>е</span><span>&nbsp;</span>
<span>о</span><span>т</span><span>к</span><span>р</span><span>о</span><span>е</span><span>т</span><span>с</span><span>я</span><span>&nbsp;</span>
<span>с</span><span>а</span><span>м</span><span class="pathDot">.</span>
</span>`,

        about:
        "О проекте",

        lyrics:
        "Тексты",

        myth:
        "Миф Lo.Krain",

        communication:
        "Связь",

        creator:
        "Автор",

        play:
        "Слушать",

        pause:
        "Пауза",

        skip:
        "Пропустить",

        send:
        "Отправить",

        sending:
"Отправляется...",

sent:
"Отправлено",

messageSent:
"Ваши слова достигли Lo.Krain.",

        error:
"Что-то пошло не так.",

        journey:
        "Путь к рассвету",

        goDeeper: 
        "Продолжить путь?",

    welcomeTitle:
"Добро пожаловать в IO",

welcomeDescription:
`Это не обычный музыкальный альбом.

Io — интерактивное путешествие от ночи к рассвету.

Нажмите Play и слушайте первые несколько треков без переключения.

По мере путешествия откроется скрытый путь.

Познакомьтесь с историей альбома, автором и поделитесь своими мыслями.`,

begin:
"НАЧАТЬ"

    }

};

function setLanguage(lang){

    document.documentElement.lang = lang;


    document
    .querySelectorAll("[data-i18n]")
    .forEach(element=>{

        const key =
        element.dataset.i18n;


        if(
            translations[lang] &&
            translations[lang][key]
        ){

            element.innerHTML =
translations[lang][key];

        }

    });


    localStorage.setItem(
        "dawn_language",
        lang
    );

}

document.addEventListener(
"click",
event=>{


    const button =
    event.target.closest(".lang-btn");


    if(!button)return;


    setLanguage(
        button.dataset.lang
    );


    document
    .querySelectorAll(".lang-btn")
    .forEach(btn=>{

        btn.classList.remove("active");

    });


    document
    .querySelectorAll(
        `[data-lang="${button.dataset.lang}"]`
    )
    .forEach(btn=>{

        btn.classList.add("active");

    });


});

        setLanguage(
            button.dataset.lang
        );


        document
        .querySelectorAll(".lang-btn")
        .forEach(btn=>{

            btn.classList.remove("active");

        });


        button.classList.add("active");

});

document.addEventListener(
"DOMContentLoaded",
()=>{

    const saved =
    localStorage.getItem(
        "dawn_language"
    )
    ||
    "en";


    setLanguage(saved);

    document
.querySelectorAll(".lang-btn")
.forEach(btn=>{

    btn.classList.toggle(
        "active",
        btn.dataset.lang === saved
    );

});

});
