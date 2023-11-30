document.addEventListener("DOMContentLoaded", function() {
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  const body = document.body;

  let intervalId;

  function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
  }

  startButton.addEventListener('click', function() {
    startButton.disabled = true;
    intervalId = setInterval(changeColor, 1000);
  });

  stopButton.addEventListener('click', function() {
    startButton.disabled = false;
    clearInterval(intervalId);
  });
});
