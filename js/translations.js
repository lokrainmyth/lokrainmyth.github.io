"use strict";

const translations = {

    en: {

        albumDescription:
'An album completing a fifteen-year journey from night to dawn. Start listening and head into the night, track by track, <span class="path-reveal">until the path reveals itself.</span>',

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
'Альбом, завершающий пятнадцатилетний путь от ночи к рассвету. Начни слушать и отправляйся в ночь — трек за треком, — <span class="path-reveal">пока путь не откроется сам.</span>',

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

            element.innerHTML =
translations[lang][key];

        }

    });

    function animatePathLetters(){

    document
    .querySelectorAll(".path-reveal")
    .forEach(element=>{

        const text = element.textContent;

        element.innerHTML =
        [...text]
        .map((letter,index)=>{

            const rotations = [
                -2,
                1,
                -1,
                2,
                -3,
                1.5,
                -1.5,
                3
            ];

            const rotate =
            rotations[index % rotations.length];


            return `
            <span
            class="letter"
            style="transform:rotate(${rotate}deg)"
            >
            ${letter}
            </span>
            `;

        })
        .join("");

    });

}

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
animatePathLetters();

    document
.querySelectorAll(".lang-btn")
.forEach(btn=>{

    btn.classList.toggle(
        "active",
        btn.dataset.lang === saved
    );

});

});
