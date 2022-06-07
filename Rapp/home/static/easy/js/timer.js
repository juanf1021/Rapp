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
let notDefined = false;
let definitionElement
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
        restartValues();
        let audio = document.getElementById("audio");
        let beat = evento.target.value;
        audio.src = `${beat}`;
        resetTimer();
        changeInner(palabra," ");
        nonVisible(btnRestart);
        visible(btnPlay);
        deleteDivChild(wordContainerHtml);
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
                visible(btnRestart);
            }
            if(firstClick == 1){
                changeInner(seconds, "PREPÁRATE");
                changeInner(palabra, " ");
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
                changeInner(btnPlay, "Pause");
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
            changeInner(btnPlay, "Pause");
        }else{
            isPlaying = false;
            changeInner(btnPlay, "Play");
            audio.pause();
            pauseAllTimers();
        }
    }
)
    // this restart everythin when that btn is clicked
    let btnRestart= document.getElementById("restart");
    btnRestart.addEventListener("click", ()=>{
            restartTimer();
            changeInner(btnPlay, "Pause");
            changeInner(palabra, " ");
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
        definitionElement = document.createElement("p");
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
        definitionElement.innerHTML = cleanedDefinition;
        wordContainerHtml.appendChild(wordContainer);
        wordContainer.appendChild(wordElement);
        wordContainer.appendChild(definitionElement);
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
    visible(damos);
    displayTime(startValue);
    if (startValue == 0){
        playTimer();
        nonVisible(damos);
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
        nonVisible(btnPlay);
        changeInner(seconds, "ULTIMA!!!");
        pauseTimer(time);
    }else{
    // update counter an run function every second
        if (count % 10 == 0){
            iterator++;
            // while(notDefined){
            //     iterator++;
            //     notDefined = isUndefined(datos,iterator);
            // }
            if(notDefined){
                iterator++
            }
            usedWords(datos, iterator);
            showWordList(datos, iterator);
        }
        count--;
        time = setTimeout("playTimer()", 1000);
    }
}

// this return true if definition of fetch is empty
function isUndefined(data, iterator){
    if (data.body[iterator].DefinitionMD == ""){
        return true;
    }else if(typeof data.body[iterator].DefinitionMD === 'undefined'){
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

// this makes an element not visible
function nonVisible(element){
    element.style.display = "none";
}

// this makes an element visible
function visible(element){
    element.style.display = "inline-block";
}

function changeInner(element,text){
    element.innerHTML = `${text}`    
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
    changeInner(seconds, "PREPÁRATE");
    changeInner(palabra, " ");
    isPlaying = true;
    visible(btnPlay);
    audio.currentTime = 0;
    audio.play();
    changeInner(btnPlay, "Pause");
}

// this reset the timer but doesnt play it
function resetTimer(){
    pauseAllTimers();
    restartValues();
    isPlaying = false;
    changeInner(btnPlay, "Play");
    changeInner(palabra, " ");
    changeInner(seconds, "START");
}

function musicStart(){
    var estallido = audios.options[audios.selectedIndex].id;
    estallido = parseInt(estallido);
    if (countMusic == (estallido - 4)){
        visible(damos);
        changeInner(seconds, " ");
    }
    if (countMusic == (estallido - 3)){
        start()
    }
    if(countMusic == (70 + estallido)){
        audio.pause();
        changeInner(seconds, "TIEMPO!!!");
        changeInner(palabra, " ");
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
        changeInner(seconds, "TIEMPO!!!");
        changeInner(palabra, " ");
    }
    else{
        countMusic++;
        timeMusic = setTimeout("musicStart()", 1000);
    }
}
