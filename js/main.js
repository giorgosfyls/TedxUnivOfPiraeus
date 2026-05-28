/* =========================================================
   TEDxUniversityofPiraeus — Main JS
   Navbar behaviour, mobile menu, scroll reveals,
   counters, ticker loop, cursor glow.
   ========================================================= */

(function () {
  'use strict';

  /* Bind everything that depends on the injected navbar/footer
     once components.js reports it is ready. Falls back to
     DOMContentLoaded in case the event already fired. */
  function init() {
    initNavbarScroll();
    initActiveLink();
    initMobileMenu();
    initReveals();
    initStaggerGroups();
    initTicker();
    initCounters();
    initCursorGlow();
  }

  document.addEventListener('components:ready', init);
  // Safety net: if no placeholders exist, still run on DOM ready.
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('nav-placeholder') &&
        !document.querySelector('.navbar')) {
      init();
    }
  });

  /* ---- Navbar background on scroll ---- */
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    var onScroll = function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Highlight current page in nav ---- */
  function initActiveLink() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Mobile hamburger menu ---- */
  function initMobileMenu() {
    var btn  = document.querySelector('.nav-hamburger');
    var menu = document.getElementById('navMobile');
    if (!btn || !menu) return;

    function close() {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---- Scroll reveal (single elements) ---- */
  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i * 0.08) + 's';
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Staggered reveal for grouped children ---- */
  function initStaggerGroups() {
    var groups = document.querySelectorAll('.stagger-group');
    if (!groups.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach(function (child, i) {
            setTimeout(function () { child.classList.add('visible'); }, i * 120);
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    groups.forEach(function (g) { io.observe(g); });
  }

  /* ---- Seamless ticker loop ---- */
  function initTicker() {
    document.querySelectorAll('.ticker-track').forEach(function (track) {
      track.innerHTML += track.innerHTML; // duplicate content for the loop
    });
  }

  /* ---- Animated number counters ---- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.dataset.count; });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.count, 10);
        var duration = 1500;
        var start = performance.now();
        (function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target);
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---- Soft red cursor glow (desktop only) ---- */
  function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768) return;

    var glow = document.createElement('div');
    glow.style.cssText =
      'position:fixed;width:300px;height:300px;border-radius:50%;' +
      'pointer-events:none;z-index:0;transform:translate(-50%,-50%);' +
      'background:radial-gradient(circle,rgba(230,43,30,0.06) 0%,transparent 70%);' +
      'will-change:transform;';
    document.body.appendChild(glow);

    var mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });

    (function loop() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.transform = 'translate(' + (cx - 150) + 'px,' + (cy - 150) + 'px)';
      requestAnimationFrame(loop);
    })();
  }
})();
