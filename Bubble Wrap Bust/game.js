const ROWS = 8;
const COLS = 10;
const bubbleWrap = document.getElementById('bubble-wrap');
const message = document.getElementById('message');
const popSound = document.getElementById('pop-sound');

let poppedCount = 0;
const totalBubbles = ROWS * COLS;

// Generate bubbles
for (let i = 0; i < ROWS * COLS; i++) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.dataset.index = i;
  bubble.addEventListener('click', () => popBubble(bubble));
  bubbleWrap.appendChild(bubble);
}

function popBubble(bubble) {
  if (bubble.classList.contains('popped')) return;
  bubble.classList.add('popped');
  poppedCount++;

  // Play pop sound
  popSound.currentTime = 0;
  popSound.play();

  bubble.innerHTML = '<span style="font-size:1.2em;">💥</span>';
  if (poppedCount === totalBubbles) {
    message.textContent = "🎉 All bubbles popped! You win!";
  }
}