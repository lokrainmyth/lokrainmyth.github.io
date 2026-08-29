"use strict";

const translations = {

    en: {

        albumDescription:
        "An album completing a fifteen-year journey from night to dawn. Listen from beginning to end. And be ready for a transfer after a few tracks.",

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

        journey:
        "Journey to the Dawn"

    },


    ru: {

        albumDescription:
        "Альбом, завершающий пятнадцатилетний путь от ночи к рассвету. Слушайте от начала до конца. И будьте готовы к пересадке через несколько треков.",

        about:
        "О проекте",

        lyrics:
        "Тексты",

        myth:
        "Миф Lo.Krain",

        communication:
        "Связь",

        creator:
        "Создатель",

        play:
        "Слушать",

        pause:
        "Пауза",

        skip:
        "Пропустить",

        send:
        "Отправить",

        journey:
        "Путь к рассвету"

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


});
