/* ==========================================================
   PROJECT DAWN
   PLAYER ENGINE
========================================================== */

"use strict";

/* ==========================================================
   TRACK DATA
========================================================== */

let journey = [];

let currentTrack = 0;

let currentAudio = null;

let isPlaying = false;

let introFinished = false;

let skippedTracks = new Set();

let completedTracks = new Set();

/* ==========================================================
   ELEMENTS
========================================================== */

const audio =
    document.getElementById("player");

const playButton =
    document.getElementById("playButton");

const pauseButton =
    document.getElementById("pauseButton");

const skipButton =
    document.getElementById("skipButton");

const playlist =
    document.getElementById("playlist");

const progressFill =
    document.getElementById("progressFill");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const wind =
    document.getElementById("windSound");

/* ==========================================================
   TRACK LIST
========================================================== */

const TRACK_FILES = [

    "01-put.mp3",

    "02-kofe-s-soboy.mp3",

    "03-drug.mp3",

    "04-nebo-temnoe.mp3",

    "05-dogola.mp3",

    "06-grustnaya-muzyka.mp3",

    "07-dekabr.mp3",

    "08-17.mp3",

    "09-krasivo.mp3",

    "10-rassvet.mp3"

];

const TRACK_NAMES = [

    "Путь",

    "Кофе с собой",

    "Друг",

    "Небо тёмное",

    "Догола",

    "Грустная музыка",

    "Декабрь",

    "17",

    "Красиво",

    "Рассвет"

];

/* ==========================================================
   BUILD JOURNEY
========================================================== */

function buildJourney(){

    journey=[];

    TRACK_NAMES.forEach((title,index)=>{

        journey.push({

            id:index,

            title,

            file:TRACK_FILES[index],

            completed:false,

            skipped:false,

            unlocked:index===0

        });

    });

}

/* ==========================================================
   INIT
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        buildJourney();

        buildPlaylist();

        restoreJourney();

        updateJourneyWorld(

            completedTracks.size,

            journey.length

        );

    }

);
