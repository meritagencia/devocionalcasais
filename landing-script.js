const countdownNodes = document.querySelectorAll("[data-countdown], .timer");
let secondsLeft = 12 * 60; // 12 minutes countdown

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateCountdown() {
  countdownNodes.forEach((node) => {
    node.textContent = formatTime(secondsLeft);
  });

  secondsLeft = secondsLeft > 0 ? secondsLeft - 1 : 12 * 60;
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".faq details").forEach((otherDetail) => {
      if (otherDetail !== detail) {
        otherDetail.removeAttribute("open");
      }
    });
  });
});

const tickerTrack = document.querySelector(".ticker__track");
if (tickerTrack) {
  // Duplicate ticker for infinite loop
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}
