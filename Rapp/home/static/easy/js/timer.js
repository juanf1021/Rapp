// this is the initial value of the counter
let count = 60;
let seconds = document.getElementById("seconds");
let time;
let isPlaying = false;
let startValue = 3;
let btnPlay = document.getElementById("play");
let damos = document.getElementById("damos");
document.addEventListener("DOMContentLoaded", ()=>{
    btnPlay.addEventListener("click", ()=>{
    // when play bnt is clicked, checks if isPlaying is false and the play timer function start
    // if is playing is true and the bnt is clicked, the timer stop
        if(!isPlaying){
            start();
            isPlaying = true;
            btnPlay.innerHTML = "Pause";
        }else{
            pauseTimer();
            isPlaying = false;
            btnPlay.innerHTML = "Play";
        }    
    }
)

    let btnRestart= document.getElementById("restart");
    btnRestart.addEventListener("click", ()=>{
            restartTimer();
            btnPlay.innerHTML = "Pause";
    })
})

function displayTime(count){
    seconds.innerHTML = count;
    // update the timer html
}

function start(){
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
        pauseTimer();
        btnPlay.style.display = "none";
    }else{
    // update counter an run function every second
        count--;
        time = setTimeout("playTimer()", 1000);
    }
}

// this pause the timer
function pauseTimer(){
    clearTimeout(time);
}

// this restart the timer and make the btn visible
function restartTimer(){
    pauseTimer();
    startValue = 3;
    count = 60;
    start();
    isPlaying = true;
    btnPlay.style.display = "inline-block";
}

// prueba
// document.addEventListener("DOMContentLoaded", ()=>{
//     let canicasBot = 10;
//     let canicasPlayer = 10;
//     let parBtn = document.getElementById("parBtn");
//     let imparBtn = document.getElementById("imparBtn");
//     let final = document.getElementById("final");
//     let again = document.getElementById('again');

//     parBtn.addEventListener("click", ()=>{
//     let par = esPar();
//     let number = randomPoints();
//     let estado = document.getElementById('estado');
//     if(par){
//         canicasBot = sumaPuntos(canicasBot, canicasPlayer, number)[1];
//         canicasPlayer = sumaPuntos(canicasBot, canicasPlayer, number)[0];
//         ganasteText(canicasBot, canicasPlayer, number)
//         ganar(canicasPlayer);
//     }else{
//         canicasBot = restaPuntos(canicasBot, canicasPlayer, number)[1];
//         canicasPlayer = restaPuntos(canicasBot, canicasPlayer, number)[0];
//         perdisteText(canicasBot, canicasPlayer, number);
//         perdiste(canicasBot);
//     }
// })

// imparBtn.addEventListener("click", ()=>{
//     let par = esPar();
//     let number = randomPoints()
//     if(!par){
//         canicasBot = sumaPuntos(canicasBot, canicasPlayer, number)[1];
//         canicasPlayer = sumaPuntos(canicasBot, canicasPlayer, number)[0];
//         ganasteText(canicasBot, canicasPlayer, number)
//         ganar(canicasPlayer);
//     }else{
//         canicasBot = restaPuntos(canicasBot, canicasPlayer, number)[1];
//         canicasPlayer = restaPuntos(canicasBot, canicasPlayer, number)[0];
//         perdisteText(canicasBot, canicasPlayer, number);
//         perdiste(canicasBot);
//     }
// })

// again.addEventListener("click", ()=>{
//     estado.innerText = "";
//     final.innerHTML = "";
//     parBtn.style.display = 'block';
//     imparBtn.style.display = 'block';
//     again.style.display = "none";
//     canicasBot = 10;
//     canicasPlayer = 10;
//     document.getElementById('botCan').innerHTML = canicasBot;
//     document.getElementById('playerCan').innerHTML = canicasPlayer;
// })

// document.getElementById("botCan").innerHTML = canicasBot;
// document.getElementById("playerCan").innerHTML = canicasPlayer;

// })

    
// function esPar(){
//    let number = Math.floor((Math.random() * (100 - 1 + 1)) + 1);
//    if (number%2 == 0){
//     return true
//    }else{
//        false
//    }
// }

// function randomPoints(){
//     let number = Math.floor((Math.random() * (5 - 1 + 1)) + 1);
//     return number
// }

// function sumaPuntos(canicasBot, canicasPlayer, number){
//     canicasPlayer = canicasPlayer + number;
//     canicasBot = canicasBot - number;
//     return [canicasPlayer, canicasBot]
// }

// function restaPuntos(canicasBot, canicasPlayer, number){
//     canicasPlayer = canicasPlayer - number;
//     canicasBot = canicasBot + number;
//     return [canicasPlayer, canicasBot]
// }

// function ganasteText(canicasBot, canicasPlayer, number){
//     texto = document.createTextNode(`Ganaste ${number} canica :)`);
//     estado.innerHTML = "";
//     estado.appendChild(texto);
//     document.getElementById('botCan').innerHTML = canicasBot;
//     document.getElementById('playerCan').innerHTML = canicasPlayer;
// }

// function perdisteText(canicasBot, canicasPlayer, number){
//     texto = document.createTextNode(`Perdiste ${number} canica :(`);
//     estado.innerHTML = "";
//     estado.appendChild(texto);
//     document.getElementById('botCan').innerHTML = canicasBot;
//     document.getElementById('playerCan').innerHTML = canicasPlayer;
// }

// function ganar(canicasPlayer){
//     if (canicasPlayer >= 20){
//         texto = document.createTextNode("Ganaste!!!!!");
//         btnNew(texto);
//         again.style.display = "block";
//     }
// }

// function perdiste(canicasBot){
//     if(canicasBot >= 20){
//         texto = document.createTextNode("Perdiste :((((")
//         btnNew(texto)
//         again.style.display = "block";
//     }
// }

// function btnNew(texto){
//     final.appendChild(texto);
//     parBtn.style.display = "none";
//     imparBtn.style.display = "none";
// }