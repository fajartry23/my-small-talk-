document.addEventListener("DOMContentLoaded", () => {

  // 1. LOADING SCREEN TIMEOUT
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => loadingScreen.classList.add("hidden"), 800);
    }, 2500);
  }

  // 2 & 3. ENVELOPE MODAL HANDLER
  const btnOpenLetter = document.getElementById("btn-open-letter");
  const envelopeModal = document.getElementById("envelope-modal");
  const envelope = document.querySelector(".envelope");
  const btnToPassword = document.getElementById("btn-to-password");

  if (btnOpenLetter) {
    btnOpenLetter.addEventListener("click", () => {
      if (envelopeModal) envelopeModal.classList.remove("hidden");
      setTimeout(() => {
        if (envelope) envelope.classList.add("open");
      }, 300);
    });
  }

  if (btnToPassword) {
    btnToPassword.addEventListener("click", () => {
      if (envelopeModal) envelopeModal.classList.add("hidden");
      const passModal = document.getElementById("password-modal");
      if (passModal) passModal.classList.remove("hidden");
    });
  }

  // 4. PASSWORD CHECK
  const btnSubmitPass = document.getElementById("btn-submit-pass");
  const passwordInput = document.getElementById("password-input");
  const passwordError = document.getElementById("password-error");
  const passwordModal = document.getElementById("password-modal");
  const mainContent = document.getElementById("main-content");
  const coverPage = document.getElementById("cover-page");

  if (btnSubmitPass) {
    btnSubmitPass.addEventListener("click", () => {
      const val = passwordInput ? passwordInput.value.trim().toLowerCase() : "";
      if (val === "sicantikku") {
        if (passwordModal) passwordModal.classList.add("hidden");
        if (coverPage) coverPage.classList.add("hidden");
        if (mainContent) mainContent.classList.remove("hidden");
        initScrollReveal();
      } else {
        if (passwordError) passwordError.classList.remove("hidden");
        if (passwordInput) passwordInput.value = "";
      }
    });
  }

  // 5. MUSIC PLAYER WITH SYNCD LYRICS (PAUL PARTOHAP)
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  const lyricsBox = document.getElementById("lyrics-box");
  const lyricsText = document.getElementById("lyrics-text");

  const songLyrics = [
    { time: 0, text: "🎵 Thank You 4 Lovin' Me - Paul Partohap" },
    { time: 13, text: "I know I'm not the easiest to love..." },
    { time: 19, text: "I know I can be complicated..." },
    { time: 26, text: "With all my flaws and my mistakes..." },
    { time: 32, text: "You still choose to stay..." },
    { time: 39, text: "Thank you for loving me..." },
    { time: 45, text: "Through all my ups and downs..." },
    { time: 52, text: "Thank you for holding me..." },
    { time: 58, text: "When my world is falling down..." },
    { time: 65, text: "You make me feel enough ❤️" }
  ];

  let isPlaying = false;

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", () => {
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerText = "🎵 Music";
        if (lyricsBox) lyricsBox.classList.add("hidden");
      } else {
        bgMusic.play().then(() => {
          musicToggle.innerText = "🔊 Playing";
          if (lyricsBox) lyricsBox.classList.remove("hidden");
        }).catch((err) => {
          console.log("Gagal memutar audio:", err);
          alert("Gagal memutar lagu. Pastikan file lagu 'bgm.mp3' ada di dalam folder 'music'!");
        });
      }
      isPlaying = !isPlaying;
    });

    bgMusic.addEventListener("timeupdate", () => {
      const currentTime = bgMusic.currentTime;
      for (let i = songLyrics.length - 1; i >= 0; i--) {
        if (currentTime >= songLyrics[i].time) {
          if (lyricsText && lyricsText.innerText !== songLyrics[i].text) {
            lyricsText.innerText = songLyrics[i].text;
          }
          break;
        }
      }
    });
  }

  // 7. PHOTO LIGHTBOX
  const photos = document.querySelectorAll(".clickable-photo");
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.getElementById("close-lightbox");

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      if (lightboxImg) lightboxImg.src = photo.src;
      if (lightboxModal) lightboxModal.classList.remove("hidden");
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
      if (lightboxModal) lightboxModal.classList.add("hidden");
    });
  }

  // 8. SCROLL ANIMATION
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  // 9. FLOATING PARTICLES
  const particlesContainer = document.getElementById("particles-container");
  const particleTypes = ["🌸", "❤️", "🍓", "✨"];

  function createParticle() {
    if (!particlesContainer) return;
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.innerText = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.fontSize = Math.random() * 15 + 12 + "px";
    particle.style.animationDuration = Math.random() * 5 + 5 + "s";
    particlesContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 10000);
  }
  setInterval(createParticle, 600);

  // 10. STRAWBERRY EASTER EGG
  const strawberryEgg = document.getElementById("strawberry-egg");
  const easterModal = document.getElementById("easter-modal");
  const closeEaster = document.getElementById("close-easter");

  if (strawberryEgg) {
    strawberryEgg.addEventListener("click", () => {
      if (easterModal) easterModal.classList.remove("hidden");
      strawberryEgg.innerText = "❤️";
    });
  }

  if (closeEaster) {
    closeEaster.addEventListener("click", () => {
      if (easterModal) easterModal.classList.add("hidden");
    });
  }

  // 15. MEMORY BOX VIDEO HANDLER
  const btnMemoryBox = document.getElementById("btn-memory-box");
  const videoModal = document.getElementById("video-modal");
  const closeVideo = document.getElementById("close-video");
  const memoryVideo = document.getElementById("memory-video");

  if (btnMemoryBox) {
    btnMemoryBox.addEventListener("click", () => {
      if (videoModal) videoModal.classList.remove("hidden");
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        if (musicToggle) musicToggle.innerText = "🎵 Music";
        isPlaying = false;
      }
    });
  }

  if (closeVideo) {
    closeVideo.addEventListener("click", () => {
      if (videoModal) videoModal.classList.add("hidden");
      if (memoryVideo) {
        memoryVideo.pause();
        memoryVideo.currentTime = 0;
      }
    });
  }

});