"use strict";

const translations = {

    en: {

        albumDescription:
        "An album completing a fifteen-year journey from night to dawn. Start listening and head into the night, track by track, until the hidden becomes clear.",

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
        "Go Deeper?"

    },


    ru: {

        albumDescription:
        "Альбом, завершающий пятнадцатилетний путь от ночи к рассвету. Начни слушать и отправляйся в ночь — трек за треком, — пока скрытое не станет явным.",

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
        "Продолжить путь?"

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

            element.textContent =
            translations[lang][key];

        }

    });


    localStorage.setItem(
        "dawn_language",
        lang
    );

}

document
.querySelectorAll(".lang-btn")
.forEach(button=>{


    button.addEventListener(
    "click",
    ()=>{


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
