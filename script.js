/* ============================================================
   SEWWANDA LAKSHITHA — PORTFOLIO JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('done');
  }, 1800);

  /* ── CUSTOM CURSOR ── */
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth outline follow
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = document.querySelectorAll('a, button, .project-card, .contact-card, .skill-pill, .tool-card, .soft-skill');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      outline.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      outline.classList.remove('hovering');
    });
  });

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  /* ── AUTO-CLOSE MENU ON RESIZE TO DESKTOP ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    if (navOverlay) navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking the backdrop overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close on ANY nav link click (including mobile CV button)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }
  updateActiveNav();

  /* ── SMOOTH SCROLL for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── REVEAL ON SCROLL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger delay for grouped items
        const delay = entry.target.closest('.skills-grid, .projects-grid, .timeline, .about-grid, .contact-grid')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
          : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ── SKILL BAR ANIMATION ── */
  const pillFills = document.querySelectorAll('.pill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  pillFills.forEach(fill => skillObserver.observe(fill));

  /* ── TILT EFFECT on Project Cards ── */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const angleX = dy * -6;
      const angleY = dx * 6;
      card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value.trim();
      const email = document.getElementById('emailInput').value.trim();
      const subject = document.getElementById('subjectInput').value.trim();
      const message = document.getElementById('msgInput').value.trim();

      if (!name || !email || !message) return;

      const mailtoLink = `mailto:sewwandalakshitha28@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact: ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;

      success.hidden = false;
      setTimeout(() => { success.hidden = true; }, 6000);
      form.reset();
    });
  }

  /* ── TYPED TEXT EFFECT on Hero (optional flair) ── */
  const roles = ['Software Engineer', 'Web Developer', 'Problem Solver', 'Creative Thinker'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const heroSub = document.querySelector('.hero-sub');

  if (heroSub) {
    // Keep original text, add a dynamic subtitle below
    const typedEl = document.createElement('span');
    typedEl.className = 'typed-role';
    heroSub.parentElement.insertBefore(typedEl, heroSub.nextSibling);

    function typeRole() {
      const current = roles[roleIndex];
      if (!deleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeRole, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeRole, deleting ? 55 : 90);
    }
    setTimeout(typeRole, 2000);
  }

  /* ── PARTICLE SPARKS on hero click ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('click', (e) => {
      for (let i = 0; i < 10; i++) {
        createParticle(e.clientX, e.clientY);
      }
    });
  }

  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${x}px; top: ${y}px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: ${['#ff6b35', '#4ecdc4', '#ffe66d', '#ff8c60'][Math.floor(Math.random() * 4)]};
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(particle);
    const angle = Math.random() * Math.PI * 2;
    const velocity = 60 + Math.random() * 80;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    let ox = 0, oy = 0, opacity = 1;

    function animate() {
      ox += vx * 0.04;
      oy += vy * 0.04 + 2;
      opacity -= 0.035;
      particle.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`;
      particle.style.opacity = opacity;
      if (opacity > 0) requestAnimationFrame(animate);
      else particle.remove();
    }
    requestAnimationFrame(animate);
  }

  /* ── COUNTER ANIMATION on Stats ── */
  const statNums = document.querySelectorAll('.stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const end = parseInt(el.textContent);
        if (isNaN(end)) return;
        const suffix = el.textContent.replace(/\d/g, '');
        let current = 0;
        const step = end / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= end) { current = end; clearInterval(timer); }
          el.textContent = Math.ceil(current) + suffix;
        }, 30);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  /* ── NAVBAR link smooth close on mobile (extra safety) ── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

});

/* ── Add typed-role style dynamically ── */
const style = document.createElement('style');
style.textContent = `
  .typed-role {
    display: block;
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    font-weight: 600;
    color: #4ecdc4;
    letter-spacing: -0.5px;
    margin-top: 4px;
    min-height: 1.6em;
  }
  .typed-role::after {
    content: '|';
    animation: blink-cursor 0.8s step-end infinite;
    color: #ff6b35;
    margin-left: 2px;
  }
  @keyframes blink-cursor {
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);
