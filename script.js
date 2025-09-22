const pages = document.querySelectorAll(".page");
let current = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove("active");
    if (i === index) {
      page.classList.add("active");
    }
  });
}

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % pages.length;
  showPage(current);
});

document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + pages.length) % pages.length;
  showPage(current);
});

// === SWIPE DETECTION ===
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diff = startX - endX;
  if (Math.abs(diff) > 50) { 
    if (diff > 0) {
      current = (current + 1) % pages.length; // swipe kiri = next
    } else {
      current = (current - 1 + pages.length) % pages.length; // swipe kanan = prev
    }
    showPage(current);
  }
}

// tampilkan halaman pertama
showPage(current);

// Pesan rahasia LDR
const messages = [
  "🌙 Walaupun kita jauh, aku tetap merasa dekat setiap kali lihat fotomu",
  "💌 Jarak ini hanya angka, cintaku nggak pernah berkurang sedikit pun",
  "✨ Suatu hari nanti, LDR ini akan jadi cerita indah tentang perjuangan kita",
  "❤️ Rindu ini memang berat, tapi aku rela asal kamu yang ada di ujungnya",
  "🥹 Aku janji sejauh apapun jarak, aku tetap milikmu dan kamu tetap milikku"
];

let currentMessage = 0;
let typing = false;

function typeWriter(text, element, i = 0) {
  if (i < text.length) {
    element.innerHTML = text.substring(0, i + 1);
    setTimeout(() => typeWriter(text, element, i + 1), 50);
  } else {
    typing = false;
  }
}

function showSecret() {
  if (typing) return;
  const secret = document.getElementById("secret");
  secret.innerHTML = "";
  typing = true;

  if (currentMessage < messages.length) {
    typeWriter(messages[currentMessage], secret);
    currentMessage++;
  } else {
    // Pesan terakhir
    secret.innerHTML = "✨I LOVE YOU MORE MY PRINCESS💕";
    secret.classList.add("glow-text"); // tambahkan efek glowing

    // Disable tombol
    const btn = document.querySelector("button[onclick='showSecret()']");
    btn.disabled = true;

    // Efek confetti 🎉
    startConfetti();
  }
}


// === MUSIK MANUAL ===
const music = document.getElementById("romanticMusic");

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function startConfetti() {
  const duration = 3 * 1000; // 3 detik
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { 
      particleCount, 
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } 
    }));
  }, 250);
}
