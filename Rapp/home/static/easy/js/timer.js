// this is the initial value of the counter
let count = 60;
let time;
let tiempo;
let isPlaying = false;
let startValue = 3;
let countMusic = 0;
let timeMusic;
let firstClick = 0;
let iterator = 0;
let datos;
let elementP;
let textWord;
// these are some elements
let seconds = document.getElementById("seconds");
let btnPlay = document.getElementById("play");
let damos = document.getElementById("damos");
let audio = document.getElementById("audio");
let palabra = document.getElementById("palabra");
let lista = document.getElementById("lista");

// this make the fetch request when the page is loaded
apiSearchList();

// here is a bug
usedWords(datos);

document.addEventListener("DOMContentLoaded", ()=>{
let audios = document.getElementById("audios");
    // this check if there is a change on the audio Selection, if that happens
    // it changes the src in html
    audios.addEventListener('change', (evento) => {
        let audio = document.getElementById("audio");
        let beat = evento.target.value;
        audio.src = `${beat}`
        resetTimer();
        palabra.innerHTML = " ";
    })

    btnPlay.addEventListener("click", ()=>{
    // when play bnt is clicked, checks if isPlaying is false and the play timer function start
    // if is playing is true and the bnt is clicked, the timer stop
    var estallido = audios.options[audios.selectedIndex].id;
        firstClick++;
        if(!isPlaying){
            audio.play();
            // if its the first click then change second for text 
            if(firstClick == 1){
                seconds.innerHTML = "PREPÁRATE";
                palabra.innerHTML = " ";
            }else{
// this avoids changing the counter too fast whe btn is clicked many times
                count++;
                countMusic--;
            }
    // this check if the program is in the 3 scnds timer
            if(startValue > 0 && startValue < 3){
                start();
                playMusicStart();
                isPlaying = true;
                btnPlay.innerHTML = "Pause";
                startValue++;
            }
            else if(countMusic < (estallido - 3)){
                musicStart();
            }
            else{
                playMusicStart();
                playTimer();
            }
            isPlaying = true;
            btnPlay.innerHTML = "Pause";
        }else{
            isPlaying = false;
            btnPlay.innerHTML = "Play";
            audio.pause();
            pauseAllTimers();
            pauseWords();
        } 
    }
)
    // this restart everythin when that btn is clicked
    let btnRestart= document.getElementById("restart");
    btnRestart.addEventListener("click", ()=>{
            restartTimer();
            btnPlay.innerHTML = "Pause";
            palabra.innerHTML = " ";
    })
})

// this make a request in words api to get a random word an run the showwordfunction
// function apiSearch(){
//     fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
//   .then(response => response.json())
//   .then(data =>{
//         showWord(data);
//         console.log(data);
//   })
//   .catch(error=> console.log(error));
// }

function usedWords(data){
    // for(let i = 0; i < 6 ; i++){
    //     // elementP = document.createElement("p");
    //     // let wordObject = datos.body[i];
    //     // textWord = document.createTextNode(`la palabra es ${wordObject.Wor} y la definicion es ${wordObject.Definition}`);
    //     // elementP.appendChild(textWord);d
    //     // lista.appendChild(elementP);
    //     // console.log(datos)
    // }
    let palabrota = data.body[0];
    console.log(palabrota);
}


function apiSearchList(){
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/multiple-random')
  .then(response => response.json())
  .then(data =>{
        datos = data;
  })
  .catch(error=> console.log(error));
}

// take data from the fetch and place it in the html
// function showWord(data){
//     let palabra = document.getElementById("palabra");
//     palabraData = data.body.Word
//     palabra.innerHTML = palabraData.toUpperCase();
// }

function showWordList(data, iterator){
    let palabra = document.getElementById("palabra");
    let palabraData = data.body[iterator].Word;
    palabra.innerHTML = palabraData.toUpperCase();
}

function displayTime(count){
    seconds.innerHTML = count;
    // update the timer html
}

// this start the 3 scds counter and then start the 60 scnds timer
function start(){
    count = 60;
    damos.style.display = "inline-block";
    displayTime(startValue);
    if (startValue == 0){
        playTimer();
        damos.style.display = "none";
    }else{
            startValue--;
            time = setTimeout("start()", 1000);
        }
}

function playTimer(){
    // this update the html of the counter
    displayTime(count);
    // if counter 0 then stop and make playbtn not visible
    if (count == 0){
        btnPlay.style.display = "none";
        seconds.innerHTML = "ULTIMA!!!"
        pauseTimer(time);
        pauseWords();
    }else{
    // update counter an run function every second
        if (count % 10 == 0){
            iterator++;
            // here is a bug
            showWordList(datos, iterator);
        }
        count--;
        time = setTimeout("playTimer()", 1000);
    }
}

//This pause all the timers
function pauseAllTimers(){
    pauseTimer(time);
    pauseTimer(timeMusic);  
}

// this pause the timer
function pauseTimer(timeValue){
    clearTimeout(timeValue);
}

function restartValues(){
    startValue = 3;
    count = 60;
    firstClick = 0;
    countMusic = 0;
}

// this restart the timer and make the btn visible
function restartTimer(){
    pauseAllTimers();
    restartValues();
    musicStart();
    seconds.innerHTML = "PREPÁRATE";
    palabra.innerHTML = " ";
    isPlaying = true;
    btnPlay.style.display = "inline-block";
    audio.currentTime = 0;
    audio.play();
    btnPlay.innerHTML = "Pause";
}

// this reset the timer but doesnt play it
function resetTimer(){
    pauseAllTimers();
    restartValues();
    isPlaying = false;
    btnPlay.innerHTML = "Play";
    palabra.innerHTML = " ";
    seconds.innerHTML= "START";
}

function musicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if (countMusic == (estallido - 4)){
        damos.style.display = "inline-block";
        seconds.innerHTML = " "
    }
    if (countMusic == (estallido - 3)){
        start()
    }
    if(countMusic == (70 + estallido)){
        audio.pause();
        seconds.innerHTML = "TIEMPO!!!";
        palabra.innerHTML = " ";
    }
    else{ 
        timeMusic = setTimeout("musicStart()", 1000);
    }
    countMusic++;
}

function playMusicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if(countMusic == (70 + estallido)){
        audio.pause();
        seconds.innerHTML = "TIEMPO!!!";
        palabra.innerHTML = " ";
    }
    else{ 
        countMusic++;
        timeMusic = setTimeout("musicStart()", 1000);
    }
}


