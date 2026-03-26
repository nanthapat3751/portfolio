/* ═══════════════════════════════════════════════
   BA Portfolio · script.js
═══════════════════════════════════════════════ */

'use strict';
/*
 ── Dark Mode Toggle ── 
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });
}

initTheme();*/

/* ── Click Animation for Images ── */
const clickableImages = document.querySelectorAll('.clickable-image');
clickableImages.forEach(image => {
  image.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    // Bounce animation is handled by CSS :active
  });
});

/* ── Click Animation for Brings Items ── */
const bringsItems = document.querySelectorAll('.brings-item');
bringsItems.forEach(item => {
  item.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── Intersection Observer for Reveal Animation ── */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Toast Notification ── */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, duration);
}

/* ── Copy to Clipboard ── */
function copyToClipboard(text, message = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Mobile Menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(a => a.classList.remove('active-link'));
      document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add('active-link');
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

/* ── Intersection Observer: reveal animations ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Skill bar animations ── */
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const pct = bar.dataset.pct || '0';
      // slight delay so it triggers after card reveal
      setTimeout(() => {
        bar.style.width = pct + '%';
      }, 300);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 70; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Animated number counter (hero stats) ── */
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const run = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(run);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(run);
}

// Observe hero card numbers
const heroStats = document.querySelectorAll('.hc-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const raw = el.textContent.replace(/[^0-9]/g, '');
      const suffix = el.textContent.replace(/[0-9]/g, '');
      const target = parseInt(raw, 10);
      if (!isNaN(target)) {
        animateCounter({ set textContent(v) { el.textContent = v + suffix; } }, target);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
heroStats.forEach(el => counterObserver.observe(el));

/* ── Typing cursor effect for hero tagline ── */
(function() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  // Just add a subtle pulse to the em elements
  tagline.querySelectorAll('em').forEach(em => {
    em.style.borderBottom = '2px solid rgba(196,118,58,0.4)';
    em.style.paddingBottom = '2px';
  });
})();

/* ── Parallax on hero background shape ── */
const heroBgShape = document.querySelector('.hero-bg-shape');
if (heroBgShape) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBgShape.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
}

/* ── Project card tilt on hover (subtle) ── */
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 4;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
    card.style.transform = `translateY(-4px) rotateY(${x}deg) rotateX(${-y}deg)`;
    card.style.transition = 'transform 100ms ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1)';
  });
});

/* ── Copy Contact Info ── */
document.addEventListener('DOMContentLoaded', () => {
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D for dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      themeToggle?.click();
    }
    // Esc to close mobile menu
    if (e.key === 'Escape' && menuOpen) {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
});

/* ── Year auto-update in footer ── */
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  const year = new Date().getFullYear();
  footerCopy.textContent = `© ${year} · Designed & built with care`;
}

/* ── Ripple Effect for Navigation ── */
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = diameter + 'px';
  circle.style.left = event.clientX - rect.left - radius + 'px';
  circle.style.top = event.clientY - rect.top - radius + 'px';
  circle.classList.add('ripple-effect');

  const ripple = button.querySelector('.ripple-effect');
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Add ripple effect to navigation links
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  link.addEventListener('click', createRipple);
});

const phrases = [
  'เข้าใจทั้งธุรกิจและเทคโนโลยี',
  'แปลงความต้องการเป็นภาษาคอมพิวเตอร์ได้',
];

let pi = 0;
let ci = 0;
let deleting = false;

const el = document.getElementById('typingText');

function type() {
  const phrase = phrases[pi];

  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);

    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    el.textContent = phrase.slice(0, --ci);

    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 40 : 70);
}

type();

const track = document.getElementById('techTrack');

// clone ทั้ง track
const clone = track.innerHTML;
track.innerHTML += clone;

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));