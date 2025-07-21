const messages = [
  "Oh, today feels different… like someone truly special was born on this day.🤔😌💗",
  "oh Yeah on this day my 'Apsara jaisi madam ji' taked birth 😌💖🎀",
  "No doubt , This day feels so Good to me 😌💓",
  "Happy birthday Meri Madam ji , Meri Miss universe ,Most beautiful and gorgeous human being , meri sakhi ji , Theodoron , last but not least Meri maunjolika 😁💟🧿(waise jalkukdi bhi acha lagega 😁)",
  "**Click the button For Surprises 💖**"
];

let msgIndex = 0;
let i = 0;
let typing = false;

function typeWriter(msg, callback) {
  if (i < msg.length) {
    document.getElementById("typedText").innerHTML += msg.charAt(i);
    i++;
    setTimeout(() => typeWriter(msg, callback), 40);
  } else {
    setTimeout(() => {
      typing = false;
      i = 0;
      if (callback) callback(); // Run callback after message finishes
    }, 100);
  }
}

function showMessage() {
  if (typing || msgIndex >= messages.length) return;

  const message = messages[msgIndex];
  const typedText = document.getElementById("typedText");
  typedText.innerHTML = "";
  typing = true;

  typeWriter(message, () => {
    msgIndex++;

    // ✅ Reveal button once LAST message finishes
    if (msgIndex === messages.length) {
      document.getElementById("celebrateBtn").classList.add("show");
    }
  });
}

document.getElementById("triggerArea").addEventListener("click", showMessage);

function getRandomGradient() {
  const gradients = [
    ['#ffb6c1', '#e6b3e6'],
    ['#ffd1dc', '#c1c8e4'],
    ['#ffe6f0', '#e3c2ef'],
    ['#f8d9ff', '#d1c4e9'],
    ['#fce4ec', '#f3e5f5']
  ];
  const pair = gradients[Math.floor(Math.random() * gradients.length)];
  return `radial-gradient(circle, ${pair[0]} 0%, ${pair[1]} 100%)`;
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = Math.random() * 100 + 'vh';
  heart.style.animationDuration = (3 + Math.random() * 2) + 's';
  heart.style.background = getRandomGradient();
  document.getElementById('heart-container').appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeart, 500);
