// take data from the fetch and place it in the html
function showWord(data){
    let palabra = document.getElementById("palabra");
    palabraData = data.body.Word
    palabra.innerHTML = palabraData.toUpperCase();
}

// this make a request in words api to get a random word an run the showwordfunction
function apiSearch(){
    fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
  .then(response => response.json())
  .then(data =>{
        showWord(data);
        console.log(data);
  })
  .catch(error=> console.log(error));
}
