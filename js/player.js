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

/* ==========================================================
   AIRPORT MASK ENGINE
========================================================== */

const airportTimers = [];

function createAirportMask(title){

    const chars = [...title];

    const letters = [];

    chars.forEach((c,index)=>{

        if(c!==" "){

            letters.push(index);

        }

    });

    if(!letters.length){

        return title;

    }

    const hidden = Math.max(

        1,

        Math.floor(letters.length*0.35)

    );

    const positions=[...letters];

    positions.sort(()=>Math.random()-0.5);

    const selected=positions.slice(0,hidden);

    const output=[...chars];

    selected.forEach(i=>{

        output[i]="_";

    });

    return output.join("");

}

/* ==========================================================
   START MASKS
========================================================== */

function startAirportMasks(){

    stopAirportMasks();

    journey.forEach(track=>{

        if(track.completed){

            return;

        }

        if(track.id===currentTrack && isPlaying){

            return;

        }

        const delay =

            900+

            Math.random()*500;

        const timer=setInterval(()=>{

            renderTrackTitle(track.id);

        },delay);

        airportTimers.push(timer);

    });

}

/* ==========================================================
   STOP MASKS
========================================================== */

function stopAirportMasks(){

    airportTimers.forEach(timer=>{

        clearInterval(timer);

    });

    airportTimers.length=0;

}

/* ==========================================================
   TRACK TITLE
========================================================== */

function getDisplayedTitle(track){

    if(track.completed){

        return "☼ " + track.title;

    }

    if(track.id===currentTrack && isPlaying){

        return track.title;

    }

    return createAirportMask(track.title);

}

/* ==========================================================
   RENDER TITLE
========================================================== */

function renderTrackTitle(id){

    const row=document.querySelector(

        `[data-track="${id}"] .track-title`

    );

    if(!row){

        return;

    }

    row.textContent=

        getDisplayedTitle(

            journey[id]

        );

}

/* ==========================================================
   BUILD PLAYLIST
========================================================== */

function buildPlaylist(){

    if(!playlist){

        return;

    }

    playlist.innerHTML="";

    journey.forEach(track=>{

        const row=document.createElement("div");

        row.className="track";

        row.dataset.track=track.id;

        row.innerHTML=`

            <div class="track-number">

                ${(track.id+1).toString().padStart(2,"0")}

            </div>

            <div class="track-title">

                ${getDisplayedTitle(track)}

            </div>

        `;

        row.addEventListener(

            "click",

            ()=>{

                requestTrack(track.id);

            }

        );

        playlist.appendChild(row);

    });

    startAirportMasks();

    refreshPlaylist();

}

/* ==========================================================
   REFRESH
========================================================== */

function refreshPlaylist(){

    journey.forEach(track=>{

        const row=document.querySelector(

            `[data-track="${track.id}"]`

        );

        if(!row){

            return;

        }

        row.classList.toggle(

            "current",

            track.id===currentTrack

        );

        row.classList.toggle(

            "completed",

            track.completed

        );

        renderTrackTitle(track.id);

    });

}

/* ==========================================================
   REQUEST TRACK
========================================================== */

function requestTrack(index){

    if(index===currentTrack){

        return;

    }

    if(index>currentTrack){

        showSkipDialog(index);

        return;

    }

    loadTrack(index);

}

/* ==========================================================
   SKIP DIALOG
========================================================== */

function showSkipDialog(target){

    const ok=confirm(

        document.documentElement.lang==="ru"

        ? "Путь запоминается.\n\nХотите пропустить шаг?"

        : "The journey remembers.\n\nSkip this step?"

    );

    if(!ok){

        return;

    }

    skippedTracks.add(currentTrack);

    journey[currentTrack].skipped=true;

    loadTrack(target);

}
