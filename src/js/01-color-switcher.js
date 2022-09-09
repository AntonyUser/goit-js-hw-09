const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const bodyEl = document.querySelector('body')

let timerId = null;
btnStop.setAttribute("disabled", "true");

btnStart.addEventListener('click', changeBodyBackgroundColor)
btnStop.addEventListener('click', stopChangeBodyBackgroundColor)

function changeBodyBackgroundColor() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)
    btnStart.setAttribute("disabled", "true");
    btnStop.removeAttribute("disabled");
}

function stopChangeBodyBackgroundColor() {
    clearInterval(timerId)
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "true");
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}