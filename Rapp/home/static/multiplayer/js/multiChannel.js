document.addEventListener("DOMContentLoaded", ()=>{
    adjustFontSize();
    nonVisible(document.getElementById('easy'))
    document.getElementById('joinnn').onclick = function(){
    nonVisible(document.getElementById('lobby-section'))
    visible(document.getElementById('easy'))
    };

    function nonVisible(element){
        element.style.display = "none";
    }
    function visible(element){
        element.style.display = "block";
    }
});


const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const playerParent= document.getElementById("players");
function adjustFontSize() {
  const containerWidth1 = playerParent.offsetWidth;
  const textWidth1 = player1.scrollWidth;
  const textWidth2 = player2.scrollWidth;
    console.log(player1.parentNode);
  console.log(containerWidth1, "containerWidth1");
  console.log(textWidth1, "textWidth1");
  console.log(containerWidth1, "containerWidth2");
  console.log(textWidth2, "textWidth2");
  if (textWidth1 >= containerWidth1) {
    const fontSize = (containerWidth1 / textWidth1) * 100;
    player1.style.fontSize = `${fontSize}%`;
    console.log(fontSize);
  } else {
    player1.style.fontSize = "100%";
    console.log(player1.style.fontSize);
  }

  if (textWidth2 > containerWidth1) {
    const fontSize = (containerWidth1 / textWidth2) * 100;
    player2.style.fontSize = `${fontSize}%`;
    console.log(fontSize);
  } else {
    player2.style.fontSize = "100%";
    console.log(player2.style.fontSize);
  }
}

//window.addEventListener("resize", adjustFontSize);
