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
   REFRESH PLAYLIST (UPDATED)
========================================================== */

function refreshPlaylist(){

    applyTrackState();

    journey.forEach(track=>{

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

/* ==========================================================
   LOAD TRACK
========================================================== */

function loadTrack(index){

    const track = journey[index];

    if(!track) return;

    currentTrack = index;

    audio.src = "assets/music/" + track.file;

    audio.load();

    isPlaying = false;

    refreshPlaylist();

    stopAirportMasks();

    setTimeout(()=>{

        startAirportMasks();

    },300);

}

/* ==========================================================
   PLAY
========================================================== */

function playTrack(){

    if(!audio.src) return;

    audio.play().then(()=>{

        isPlaying = true;

        introFinished = true;

        startAirportMasks();

    }).catch(()=>{});

    if(wind){

        wind.pause();

        wind.currentTime = 0;

    }

}

/* ==========================================================
   PAUSE
========================================================== */

function pauseTrack(){

    audio.pause();

    isPlaying = false;

    startAirportMasks();

}

/* ==========================================================
   PROGRESS
========================================================== */

function updateProgress(){

    if(!audio.duration) return;

    const percent = audio.currentTime / audio.duration;

    if(progressFill){

        progressFill.style.width = (percent * 100) + "%";

    }

    if(currentTimeElement){

        currentTimeElement.textContent = formatTime(audio.currentTime);

    }

    if(durationElement){

        durationElement.textContent = formatTime(audio.duration);

    }

}

/* ==========================================================
   TIME FORMAT
========================================================== */

function formatTime(sec){

    const m = Math.floor(sec / 60);

    const s = Math.floor(sec % 60);

    return `${m}:${s.toString().padStart(2,"0")}`;

}

/* ==========================================================
   TRACK END
========================================================== */

audio.addEventListener("ended",()=>{

    const track = journey[currentTrack];

    if(track){

        track.completed = true;

        completedTracks.add(currentTrack);

       saveJourney();
applyTrackState();

    }

    updateJourneyWorld(

        completedTracks.size,

        journey.length

    );

    refreshPlaylist();

    stopAirportMasks();

    const next = currentTrack + 1;

    if(next < journey.length){

        loadTrack(next);

    } else {

        showGoDeeper();

    }

});

/* ==========================================================
   AUDIO EVENTS
========================================================== */

audio.addEventListener("timeupdate", updateProgress);

/* ==========================================================
   UI CONTROLS
========================================================== */

playButton?.addEventListener("click", playTrack);

pauseButton?.addEventListener("click", pauseTrack);

skipButton?.addEventListener("click", ()=>{

    const next = currentTrack + 1;

    if(next < journey.length){

        loadTrack(next);

    } else {

        showGoDeeper();

    }

});

/* ==========================================================
   STORAGE
========================================================== */

const STORAGE_KEY = "dawn_journey_v1";

function saveJourney(){

    const data = {

        currentTrack,

        completed:[...completedTracks],

        skipped:[...skippedTracks]

    };

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

function restoreJourney(){

    const raw = localStorage.getItem(STORAGE_KEY);

    if(!raw) return;

    try{

        const data = JSON.parse(raw);

        currentTrack = data.currentTrack || 0;

        completedTracks = new Set(data.completed || []);

        skippedTracks = new Set(data.skipped || []);

        journey.forEach(track=>{

            if(completedTracks.has(track.id)){

                track.completed = true;

            }

            if(skippedTracks.has(track.id)){

                track.skipped = true;

            }

        });

        loadTrack(currentTrack);

    }catch(e){}

}

/* ==========================================================
   VISUAL STATE UPDATE
========================================================== */

function applyTrackState(){

    journey.forEach(track=>{

        const row = document.querySelector(

            `[data-track="${track.id}"]`

        );

        if(!row) return;

        if(track.completed){

            row.classList.add("completed");

        }

        if(track.id === currentTrack){

            row.classList.add("current");

        } else {

            row.classList.remove("current");

        }

    });

}

/* ==========================================================
   SKIP TRACK (UPDATED)
========================================================== */

function skipTrack(){

    const track = journey[currentTrack];

    if(track){

        track.skipped = true;

        skippedTracks.add(currentTrack);

    }

    saveJourney();

    const next = currentTrack + 1;

    if(next < journey.length){

        loadTrack(next);

    } else {

        showGoDeeper();

    }

}

/* ==========================================================
   SKIP BUTTON UPDATE
========================================================== */

skipButton?.addEventListener("click", ()=>{

    const msg = document.documentElement.lang === "ru"

        ? "Путь запоминается.\n\nХотите пропустить шаг?"

        : "The journey remembers.\n\nSkip this step?";

    const ok = confirm(msg);

    if(ok){

        skipTrack();

    }

});

/* ==========================================================
   AUTO SAVE
========================================================== */

audio.addEventListener("timeupdate", ()=>{

    updateProgress();

    saveJourney();

});
