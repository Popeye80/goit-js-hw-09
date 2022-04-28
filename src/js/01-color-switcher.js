function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
timerId = null;
btnStart.addEventListener("click", handlerColor);

function handlerColor (event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.disabled = true; 
};

btnStop.addEventListener("click", handlerStop);

function handlerStop (event) {
  if (timerId) {clearInterval(timerId);
    btnStart.disabled = false}
};
