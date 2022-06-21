function fetchData(){
    fetch('/play/data')
    .then(response => response.json()
    .then(data =>{
        console.log(data[4][0]);
    }))
}

fetchData();
