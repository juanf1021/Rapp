function fetchData(){
    fetch('/play/data')
    .then(response => response.text()
    .then(text =>{
        console.log(text);
    }))
}

fetchData();
