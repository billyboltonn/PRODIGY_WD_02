let startTime, elapsedTime = 0, intervalId;
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');
const lapTimesList = document.getElementById('lapTimes');

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  displayMinutes.textContent = String(minutes).padStart(2, '0');
  displaySeconds.textContent = String(seconds).padStart(2, '0');
  displayMilliseconds.textContent = String(milliseconds).padStart(2, '0');
}

function startStopwatch() {
  if (!intervalId) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
  }
}

function pauseStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
  elapsedTime = 0;
  displayMinutes.textContent = '00';
  displaySeconds.textContent = '00';
  displayMilliseconds.textContent = '00';
  lapTimesList.innerHTML = '';
}

function recordLap() {
  if (elapsedTime) {
    const lapTime = `${displayMinutes.textContent}:${displaySeconds.textContent}:${displayMilliseconds.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapTimesList.appendChild(lapItem);
  }
}
