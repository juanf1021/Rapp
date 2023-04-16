document.addEventListener("DOMContentLoaded", ()=>{
    nonVisible(document.getElementById('easy'))
    document.getElementById('join').onclick = function(){
    nonVisible(document.getElementById('play'))
    visible(document.getElementById('easy'))
    };

    function nonVisible(element){
        element.style.display = "none";
    }
    function visible(element){
        element.style.display = "block";
    }
});