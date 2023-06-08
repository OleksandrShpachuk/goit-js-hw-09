const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

stopButton.setAttribute('disabled', true);
startButton.addEventListener('click', startChangingBackgroundColor);

function startChangingBackgroundColor() {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

stopButton.addEventListener('click', stopChangingBackgroundColor);

function stopChangingBackgroundColor() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
}

function changeBackgroundColor() {
  const body = document.body;
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
