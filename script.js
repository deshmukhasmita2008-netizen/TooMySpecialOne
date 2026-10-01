/* =====================================================
   BOYFRIEND DAY WEBSITE — script.js
   Interactive magic: animations, effects, envelope
   ===================================================== */

'use strict';

/* ── Custom Cursor ──────────────────────────────────── */
(function initCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  let mouseX = -100, mouseY = -100;
  let curX = -100, curY = -100;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

/* ── Floating Hearts ────────────────────────────────── */
(function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const symbols = ['♡', '♡', '♡', '✦', '✿', '🌸', '✨'];
  const colors  = ['#f7c5d0', '#dfc4f5', '#c5dcf7', '#fde8d8', '#fbd5de'];

  function createHeart() {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left     = Math.random() * 100 + 'vw';
    el.style.color    = colors[Math.floor(Math.random() * colors.length)];
    el.style.fontSize = (Math.random() * 18 + 10) + 'px';
    const dur = Math.random() * 14 + 10;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay   = Math.random() * 5 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 5) * 1000);
  }

  // Seed initial hearts
  for (let i = 0; i < 18; i++) {
    setTimeout(createHeart, i * 400);
  }
  // Keep spawning
  setInterval(createHeart, 1200);
})();

/* ── Sparkle cursor trail ───────────────────────────── */
(function initSparkles() {
  const container = document.getElementById('sparkleContainer');
  const sparks = ['✦', '✨', '♡', '·', '✿', '★'];
  let lastX = 0, lastY = 0;

  document.addEventListener('mousemove', e => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.sqrt(dx * dx + dy * dy) < 18) return;
    lastX = e.clientX;
    lastY = e.clientY;

    if (Math.random() > 0.45) return; // sparse effect

    const el = document.createElement('span');
    el.className = 'sparkle';
    el.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    el.style.left = e.clientX + (Math.random() * 20 - 10) + 'px';
    el.style.top  = e.clientY + (Math.random() * 20 - 10) + 'px';
    el.style.color = `hsl(${Math.random() * 60 + 310}, 70%, 70%)`;
    el.style.fontSize = (Math.random() * 10 + 10) + 'px';
    container.appendChild(el);
    setTimeout(() => el.remove(), 800);
  });
})();

/* ── Touch sparkles ─────────────────────────────────── */
(function initTouchSparkles() {
  const container = document.getElementById('sparkleContainer');
  const sparks = ['✦', '♡', '✨', '✿', '★'];

  document.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    if (!touch) return;
    if (Math.random() > 0.3) return;

    const el = document.createElement('span');
    el.className = 'sparkle';
    el.textContent = sparks[Math.floor(Math.random() * sparks.length)];
    el.style.left = touch.clientX + 'px';
    el.style.top  = touch.clientY + 'px';
    el.style.color = `hsl(${Math.random() * 60 + 310}, 70%, 70%)`;
    el.style.fontSize = (Math.random() * 10 + 10) + 'px';
    container.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }, { passive: true });
})();

/* ── Scroll-based fade-up animations ───────────────── */
(function initScrollAnimations() {
  const targets = [
    '.reason-card',
    '.photo-card',
    '.thing-card',
    '.tl-item',
    '.section-header',
    '.big-heart-wrapper',
    '.final-text',
    '.surprise-btn',
    '.made-for-you',
    '.envelope-wrapper',
  ];

  const allEls = document.querySelectorAll(targets.join(','));

  allEls.forEach(el => {
    el.classList.add('fade-up');
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    el.style.transitionDelay = delay + 'ms';
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  allEls.forEach(el => observer.observe(el));
})();

/* ── Hero "Open Surprise" button smooth scroll ──────── */
document.getElementById('openSurpriseBtn')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('reasons')?.scrollIntoView({ behavior: 'smooth' });
});

/* ── Thing cards — tap effect on mobile ─────────────── */
document.querySelectorAll('.thing-card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.classList.add('tapped');
    setTimeout(() => card.classList.remove('tapped'), 600);
  }, { passive: true });
});

/* ── Envelope / Letter ──────────────────────────────── */
(function initEnvelope() {
  const envelope    = document.getElementById('envelope');
  const letterBtn   = document.getElementById('openLetterBtn');
  const letterContent = document.getElementById('letterContent');
  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    envelope.classList.add('open');
    letterBtn.classList.add('hidden');

    // Slide letter up after flap opens
    setTimeout(() => {
      letterContent.classList.add('open');
      burstHearts(envelope);
    }, 650);
  }

  envelope.addEventListener('click', openEnvelope);
  letterBtn.addEventListener('click', openEnvelope);
})();

/* ── Surprise reveal ────────────────────────────────── */
(function initSurprise() {
  const btn    = document.getElementById('surpriseBtn');
  const reveal = document.getElementById('surpriseReveal');
  let clicked  = false;

  btn?.addEventListener('click', () => {
    if (clicked) return;
    clicked = true;
    btn.style.transform = 'scale(0.92)';
    setTimeout(() => { btn.style.transform = ''; }, 200);

    reveal.classList.add('visible');
    reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Burst hearts on click
    burstHearts(btn, 20);
  });
})();

/* ── Music — Pretty Little Baby via YouTube IFrame Player API ── */
var ytMusicPlayer; // global so onYouTubeIframeAPIReady can set it

// Called automatically by the YouTube IFrame API script once loaded
window.onYouTubeIframeAPIReady = function () {
  ytMusicPlayer = new YT.Player('ytPlayerContainer', {
    height: '1',
    width: '1',
    videoId: '9xqs_6jM_Mc',          // Pretty Little Baby — Connie Francis
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: '9xqs_6jM_Mc',
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: function () {
        // Player is ready — volume at 80%
        ytMusicPlayer.setVolume(80);
      },
    },
  });
};

(function initMusicBtn() {
  const btn  = document.getElementById('musicBtn');
  const icon = document.getElementById('musicIcon');
  let playing = false;

  btn?.addEventListener('click', () => {
    if (!ytMusicPlayer) {
      showToast('Loading music… try again in a moment ♡');
      return;
    }
    if (!playing) {
      ytMusicPlayer.playVideo();
      btn.classList.add('playing');
      icon.textContent = '♬';
      playing = true;
      showToast('♪ Pretty Little Baby is playing ♡');
    } else {
      ytMusicPlayer.pauseVideo();
      btn.classList.remove('playing');
      icon.textContent = '♪';
      playing = false;
    }
  });
})();

/* ── Toast notification ─────────────────────────────── */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '80px',
      right: '24px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(14px)',
      border: '1.5px solid #f7c5d0',
      borderRadius: '14px',
      padding: '12px 20px',
      fontFamily: "'Nunito', sans-serif",
      fontSize: '0.88rem',
      color: '#8b6474',
      boxShadow: '0 8px 30px rgba(200,140,160,0.2)',
      zIndex: '10000',
      transition: 'all 0.4s ease',
      opacity: '0',
      transform: 'translateY(10px)',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3500);
}

/* ── Burst hearts helper ────────────────────────────── */
function burstHearts(anchor, count = 14) {
  const rect   = anchor.getBoundingClientRect();
  const cx     = rect.left + rect.width / 2;
  const cy     = rect.top  + rect.height / 2;
  const symbols = ['♡', '✦', '✿', '✨', '🌸'];
  const colors  = ['#f7c5d0', '#dfc4f5', '#c5dcf7', '#fbd5de', '#fde8d8'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top:  ${cy}px;
      pointer-events: none;
      z-index: 9999;
      font-size: ${Math.random() * 16 + 12}px;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      user-select: none;
    `;
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    document.body.appendChild(el);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.8;
    const dist  = Math.random() * 120 + 60;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;

    el.animate([
      { opacity: 1, transform: 'translate(-50%, -50%) scale(0.5)' },
      { opacity: 1, transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2)` },
      { opacity: 0, transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5 - 40}px)) scale(0.5)` },
    ], { duration: 900 + Math.random() * 400, easing: 'ease-out', fill: 'forwards' });

    setTimeout(() => el.remove(), 1500);
  }
}

/* ── Big heart click burst ──────────────────────────── */
document.getElementById('bigHeart')?.addEventListener('click', function() {
  burstHearts(this, 22);
});

/* ── Parallax hero deco on scroll ───────────────────── */
(function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const decos = hero.querySelectorAll('.deco-star, .deco-flower, .deco-heart');
    decos.forEach((el, i) => {
      const speed = 0.04 * (i + 1);
      el.style.transform = `translateY(${scroll * speed}px)`;
    });
  }, { passive: true });
})();

/* ── Photo card tilt on mousemove ───────────────────── */
document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* ── Reason card gentle shimmer on hover ─────────────── */
document.querySelectorAll('.reason-card').forEach(card => {
  card.addEventListener('mouseenter', () => burstHearts(card, 4));
});
