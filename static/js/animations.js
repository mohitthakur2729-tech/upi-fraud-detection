/**
 * UPI Fraud Detection — Modern Animations
 * Particle network, typing effect, scroll animations, navbar behavior
 */

(function () {
  "use strict";

  /* ============================================================
     PARTICLE NETWORK CANVAS
     ============================================================ */
  function initParticleNetwork() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 40;
    const connectionDistance = 150;
    const mouseDistance = 200;
    let mouse = { x: null, y: null };

    function resize() {
      const parent = canvas.parentElement;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 242, 255, 0.6)";
        ctx.fill();

        // Connect to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.2 * (1 - dist / mouseDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.15 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    canvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    resize();
    createParticles();
    drawParticles();
  }

  /* ============================================================
     TYPING EFFECT
     ============================================================ */
  function initTypingEffect() {
    const elements = document.querySelectorAll("[data-typing]");
    elements.forEach((el) => {
      const text = el.getAttribute("data-typing");
      const speed = parseInt(el.getAttribute("data-typing-speed")) || 80;
      el.textContent = "";
      el.style.borderRight = "2px solid var(--accent-cyan)";
      el.style.paddingRight = "4px";
      el.style.animation = "blink 0.8s step-end infinite";

      let i = 0;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          el.style.borderRight = "none";
          el.style.animation = "none";
        }
      }
      setTimeout(type, 500);
    });
  }

  // Add blink keyframe dynamically
  const blinkStyle = document.createElement("style");
  blinkStyle.textContent = `
    @keyframes blink {
      0%, 100% { border-color: transparent; }
      50% { border-color: var(--accent-cyan); }
    }
  `;
  document.head.appendChild(blinkStyle);

  /* ============================================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================================ */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => {
            entry.target.classList.add("animate-fadeInUp");
            entry.target.style.opacity = "1";
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-animate]").forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });
  }

  /* ============================================================
     NAVBAR SCROLL EFFECT
     ============================================================ */
  function initNavbarScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */
  function initMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const navbar = document.querySelector("#navbar");
    if (!toggle || !navbar) return;

    toggle.addEventListener("click", () => {
      navbar.classList.toggle("navbar-mobile");
      toggle.classList.toggle("bi-list");
      toggle.classList.toggle("bi-x");
    });

    // Close mobile nav on link click
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          toggle.classList.add("bi-list");
          toggle.classList.remove("bi-x");
        }
      });
    });
  }

  /* ============================================================
     PRELOADER
     ============================================================ */
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    const backToTop = document.querySelector(".back-to-top");
    if (!backToTop) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    });

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     GLOWING BORDER ANIMATION FOR CARDS
     ============================================================ */
  function initGlowingBorders() {
    document.querySelectorAll("[data-glow]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* ============================================================
     RESULT ANIMATION
     ============================================================ */
  function initResultAnimation() {
    const output = document.getElementById("output");
    if (!output) return;

    const text = output.textContent.trim();
    if (text.includes("VALID")) {
      output.classList.add("result-valid");
    } else if (text.includes("FRAUD")) {
      output.classList.add("result-fraud");
    }

    // Scale-in animation
    output.style.transform = "scale(0.5)";
    output.style.opacity = "0";
    output.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
    setTimeout(() => {
      output.style.transform = "scale(1)";
      output.style.opacity = "1";
    }, 300);
  }

  /* ============================================================
     INITIALIZE ALL
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    initParticleNetwork();
    initTypingEffect();
    initScrollAnimations();
    initNavbarScroll();
    initMobileNav();
    initPreloader();
    initBackToTop();
    initGlowingBorders();
    initResultAnimation();
  });
})();

