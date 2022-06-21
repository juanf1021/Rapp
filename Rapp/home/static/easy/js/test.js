function fetchData(){
    fetch('/play/data')
    .then(response => response.json()
    .then(data =>{
        console.log(data[1][0].word);
    }))
}

fetchData();
