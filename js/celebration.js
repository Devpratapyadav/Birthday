// DOM refs
const candles    = document.querySelectorAll('.candle');
const blowSound  = document.getElementById('blow-sound');
const happyText  = document.getElementById('happy-text');
const cake       = document.getElementById('cake');
const frosting   = document.getElementById('frosting');
const candlesWrap= document.getElementById('candles');
const letterLink = document.getElementById('letter-link');
const canvas     = document.getElementById('confetti');
const ctx        = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let blown     = false;
let particles = [];

// CONFETTI HELPERS
function spawnConfetti(x, y, color) {
  const types = ['circle','square','triangle'];
  particles.push({
    x, y,
    size: Math.random() * 6 + 4,
    speedY: -(Math.random() * 3 + 2),
    speedX: Math.random() * 4 - 2,
    color,
    type: types[Math.floor(Math.random()*types.length)]
  });
}

function burstConfetti() {
  const baseX = window.innerWidth / 2;
  const baseY = window.innerHeight * 0.4;
  for (let i = 0; i < 200; i++) {
    const hue = Math.random() * 360;
    spawnConfetti(
      baseX + (Math.random()*200 - 100),
      baseY + (Math.random()*50 - 25),
      `hsl(${hue},80%,60%)`
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p,i) => {
    ctx.fillStyle = p.color;
    ctx.save();
    ctx.translate(p.x, p.y);
    if (p.type==='triangle') {
      ctx.beginPath();
      ctx.moveTo(0,-p.size);
      ctx.lineTo(p.size,p.size);
      ctx.lineTo(-p.size,p.size);
      ctx.closePath();
      ctx.fill();
    } else if (p.type==='square') {
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
    } else {
      ctx.beginPath();
      ctx.arc(0,0,p.size,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
    p.y += p.speedY;
    p.x += p.speedX;
    p.speedY += 0.05;
    if (p.y > canvas.height + 20) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

// BLOW CANDLE → HAPPY BIRTHDAY
candles.forEach(candle => {
  candle.addEventListener('click', () => {
    if (blown) return;

    blowSound.currentTime = 0;
    blowSound.play();

    // extinguish flames
    document.querySelectorAll('.flame').forEach(f => f.classList.add('out'));

    // fade & hide cake pieces
    cake.classList.add('fade-out');
    frosting.classList.add('hidden');
    candlesWrap.classList.add('hidden');

    // reveal message, confetti & letter link
    happyText.classList.remove('hidden');
    happyText.classList.add('visible');
    burstConfetti();
    setTimeout(() => {
      letterLink.classList.remove('hidden');
      letterLink.classList.add('visible');
    }, 1000);

    blown = true;
  });
});
