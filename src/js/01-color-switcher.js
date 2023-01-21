const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.disabled = true;
let timerID = null;


startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  stopBtn.disabled = false;
  startBtn.disabled = true;

  timerID = setInterval(changeColor, 1000);
}

function onStopBtnClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  
  clearInterval(timerID);
}

function changeColor (){
  document.body.style.backgroundColor = getRandomHexColor(); 
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

