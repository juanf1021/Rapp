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
let notDefined;
// these are some elements
let seconds = document.getElementById("seconds");
let btnPlay = document.getElementById("play");
let btnRestart = document.getElementById("restart");
btnRestart.style.display = "none";
let damos = document.getElementById("damos");
let audio = document.getElementById("audio");
let palabra = document.getElementById("palabra");
let wordContainerHtml = document.getElementById("wordContainerHtml");
// this make the fetch request when the page is loaded
apiSearchList();


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
            if (firstClick >= 1){
                btnRestart.style.display = "inline-block";
            }
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
        } 
    }
)
    // this restart everythin when that btn is clicked
    let btnRestart= document.getElementById("restart");
    btnRestart.addEventListener("click", ()=>{
            restartTimer();
            btnPlay.innerHTML = "Pause";
            palabra.innerHTML = " ";
            deleteDivChild(wordContainerHtml);
    })
})

function apiSearchList(){
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/multiple-random')
  .then(response => response.json())
  .then(data =>{
        datos = data;
        console.log(data);
  })
  .catch(error=> console.log(error));
}

// this functions shows the description of used words
function usedWords(data, iterator){
        let wordContainer = document.createElement("div");
        wordContainer.className = "full-word";
        let wordElement = document.createElement("h6");
        wordElement.className = "word-element";
        let definitionElement = document.createElement("p");
        definitionElement.className = "definition-element";
        let wordObject = data.body[iterator].Word;
        let wordObjectCapitalized = capitalize(wordObject);
        let wordDefinition = data.body[iterator].DefinitionMD;
        let cleanedDefinition = cleanDefinition(wordDefinition);
        if (typeof cleanedDefinition === 'undefined'){
            cleanedDefinition = wordDefinition; 
        }
        let textDefinition = document.createTextNode(`${cleanedDefinition}`);
        let textWord = document.createTextNode(`${wordObjectCapitalized}:`);
        wordElement.appendChild(textWord);
        definitionElement.appendChild(textDefinition);
        wordContainerHtml.appendChild(wordContainer);
        wordContainer.appendChild(wordElement);
        wordContainer.appendChild(textDefinition);
//     // let palabrota = data.body[0].Word;
//     console.log(data);
}

// this function clean the description received from api in order to make it shorter
function cleanDefinition(definition){
    let index = definition.indexOf(":");
    if(index == -1){
        let index = definition.indexOf(".");
        index++;
        for(index; index < definition.length; index ++){
            if(definition.charAt(index) == "."){
               let cleanedDefinition = definition.slice(0, index + 1);
               return cleanedDefinition;
            }
        }
    }
    else if(typeof definition === 'undefined'){
        let cleanedDefinition = "Sorry, something happened";
        return cleanedDefinition
    }else{
        for(index; index < definition.length; index ++){
            if(definition.charAt(index) == "."){
               let cleanedDefinition = definition.slice(0, index + 1);
               return cleanedDefinition;
            }
        }
    } 
}


// this changes the word displayed
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
    }else{
    // update counter an run function every second
        if (count % 10 == 0){
            iterator++;
            notDefined = isUndefined(datos,iterator);
            if(notDefined){
                iterator++;
            }
            usedWords(datos, iterator); 
            showWordList(datos, iterator);
            console.log(iterator)
        }
        count--;
        time = setTimeout("playTimer()", 1000);
    }
}

// this return true if definition of fetch is empty
function isUndefined(data, iterator){
    if (data.body[iterator].DefinitionMD == ""){
        return true;
    }else if(data.body[iterator].DefinitionMD === 'undefined'){
        return true;
    }
    else{
        return false;
    }
}

// this capitalize the first letter
function capitalize(word){
    firstLetter = word.charAt(0).toUpperCase() + word.slice(1);
    return firstLetter;
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

// this restart the values inside of it
function restartValues(){
    startValue = 3;
    count = 60;
    firstClick = 0;
    countMusic = 0;
}


// this deletes all childs from a div
function deleteDivChild(father){
    let child = father.lastChild;
    while(child){
        father.removeChild(child);
        child = father.lastElementChild;
    }
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
