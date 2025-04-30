
const bgMusic = document.getElementById('bg-music');


function enableAudioPlayback() {
  bgMusic.play().catch((e) => {
    console.log("Autoplay blocked:", e);
  });
  document.removeEventListener('click', enableAudioPlayback);
  document.removeEventListener('keydown', enableAudioPlayback);

}

document.addEventListener('click', enableAudioPlayback);
document.addEventListener('keydown', enableAudioPlayback);

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices');

let currentScene = 0;
let timer;
let isMuted = false;

// story scenes
const scenes = [
  {
    text: "Azai wakes up in a strange, dark forest. Which way should he go?", /*scene 0 */
    choices: [
      { text: "Left toward the river", nextScene: 1 },
      { text: "Right toward the tall trees", nextScene: 2 }
    ]
  },
  {
    text: "He turns left and spots a river, deciding to follow its course. Soon, he hears splashing ahead. Darkness is closing in. What now?", /*scene 1 */
    choices: [
      { text: "Call out for help", nextScene: 3 },
      { text: "Hide behind a tree", nextScene: 4 }
    ]
  },
  {
    text: "He walks toward the trees and finds a cave. Go in?", /*scene 2 */
    choices: [
      { text: "Yes", nextScene: 5 },
      { text: "No", nextScene: 6 }
    ]
  },
   {
    text: "He calls out for help and hears a strange noise and notices movement in the near by bushes. ", /*scene 3 */
    choices: [
      { text: "Should he go towards the bushes?", nextScene: 7 },
      { text: "Should he continue on his path?", nextScene: 8 }
    ]
	},
   {
    text: "While hiding behind the tree, Azai saw an old bridge, half-shrouded in mist and shadow  ", /*scene 5 */
    choices: [
      { text: "Should he cross", nextScene: 9 },
      { text: "Should he continue on his journey ", nextScene: 10 }
    ]
  },
  {
    text: "A rescuer hears him and brings him home. Azai is safe. 🎉",
    choices: []
  },
  {
    text: "The cave leads to safety. Azai finds a road and goes home. 😱",
    choices: []
  },
  {
    text: "A wild animal approaches. Azai runs deeper into the forest. 🏡",
    choices: []
  },
  {
    text: "He gets lost in the darkness. Azai is never seen again... 🌑",
    choices: []
  },
  {
    text: "Azai crosses the bridge and, to his surprise, finds himself in a familiar place, he has found his way home.🎉",
    choices: []
  },
  {
    text: "He gets lost in the darkness. Azai is never seen again... 🌑",
    choices: []
  }
];

function startGame() {
  currentScene = 0;
  showScene();
}

function restartGame() {
  storyText.innerHTML = `<p>Click "Start Game" to begin Azai’s adventure.</p>`;
  choicesContainer.innerHTML = '';
}

function toggleSound() {
  isMuted = !isMuted;
  soundToggleBtn.innerText = isMuted ? "Unmute" : "Mute";
}

function showScene() {
  clearTimeout(timer);
  const scene = scenes[currentScene];

  // Show story text
  storyText.innerHTML = `<p>${scene.text}</p>`;

  // Clear old choices
  choicesContainer.innerHTML = '';

  // Add new choices
  scene.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.innerText = choice.text;
    button.onclick = () => {
      currentScene = choice.nextScene;
      showScene();
    };
    choicesContainer.appendChild(button);
  });

  // Timer logic (5 seconds to decide)
  timer = setTimeout(() => {
    storyText.innerHTML = "<p>⏳ Time’s up! Azai hesitated too long and got lost...</p>";
    choicesContainer.innerHTML = '';
  }, 5000);
  const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("sound-toggle-btn");

soundToggleBtn.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  soundToggleBtn.innerText = bgMusic.muted ? "Unmute" : "Mute";
});

  
 }
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
soundToggleBtn.addEventListener('click', toggleSound);
