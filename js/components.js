/* =========================================================
   TEDxUniversityofPiraeus — Shared Components
   Injects the navbar + footer on every page so markup
   stays in one place. Edit links / socials here only.
   ========================================================= */

(function () {
  'use strict';

  /* ---- Reusable SVG social icons ---- */
  var ICONS = {
    instagram: '<svg width="W" height="H" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    tiktok:    '<svg width="W" height="H" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.53V6.75a4.85 4.85 0 01-1-.06z"/></svg>',
    youtube:   '<svg width="W" height="H" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    linkedin:  '<svg width="W" height="H" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    spotify:   '<svg width="W" height="H" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>'
  };

  function icon(name, size) {
    return ICONS[name].replace(/W/g, size).replace(/H/g, size);
  }

  /* ---- Single source of truth for socials ---- */
  var SOCIALS = [
    { name: 'Instagram', key: 'instagram', url: '#' },
    { name: 'TikTok',    key: 'tiktok',    url: '#' },
    { name: 'YouTube',   key: 'youtube',   url: '#' },
    { name: 'LinkedIn',  key: 'linkedin',  url: '#' },
    { name: 'Spotify',   key: 'spotify',   url: '#' }
  ];

  /* ---- Navbar ---- */
  var LOGO = '\
    <a href="index.html" class="nav-logo" aria-label="TEDxUniversityofPiraeus home">\
      <span class="nav-logo-ted">TED</span>\
      <span class="nav-logo-x">x</span>\
      <span class="nav-logo-name">University<br>of Piraeus</span>\
    </a>';

  var NAV_HTML = '\
    <nav class="navbar" id="navbar">' + LOGO + '\
      <ul class="nav-links">\
        <li><a href="index.html">Home</a></li>\
        <li><a href="about.html">About</a></li>\
        <li><a href="events.html">Events</a></li>\
        <li><a href="unrushed.html">Un-rushed</a></li>\
        <li><a href="team.html">Team</a></li>\
        <li><a href="events.html" class="nav-cta">Get Tickets →</a></li>\
      </ul>\
      <button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">\
        <span></span><span></span><span></span>\
      </button>\
    </nav>\
    <div class="nav-mobile" id="navMobile">\
      <a href="index.html">Home</a>\
      <a href="about.html">About</a>\
      <a href="events.html">Events</a>\
      <a href="unrushed.html">Un-rushed</a>\
      <a href="team.html">Team</a>\
    </div>';

  /* ---- Footer ---- */
  function footerSocials() {
    return SOCIALS.map(function (s) {
      return '<a href="' + s.url + '" class="social-link" target="_blank" rel="noopener">' +
        icon(s.key, 14) + s.name + '</a>';
    }).join('');
  }

  var FOOTER_HTML = '\
    <footer class="footer">\
      <div class="container">\
        <div class="footer-top">\
          <div class="footer-brand">\
            <div style="margin-bottom:20px;">' + LOGO + '</div>\
            <p>An independently organized TED event at the University of Piraeus, bringing ideas worth spreading to our community.</p>\
            <p style="margin-top:12px;font-size:12px;color:#555;">2026 · Piraeus, Greece</p>\
          </div>\
          <div class="footer-nav">\
            <h4>Navigation</h4>\
            <ul>\
              <li><a href="index.html">Home</a></li>\
              <li><a href="about.html">About TEDx</a></li>\
              <li><a href="events.html">Events</a></li>\
              <li><a href="unrushed.html">Un-rushed</a></li>\
              <li><a href="team.html">Our Team</a></li>\
            </ul>\
          </div>\
          <div class="footer-social">\
            <h4>Follow Us</h4>\
            <div class="social-links">' + footerSocials() + '</div>\
          </div>\
        </div>\
        <div class="footer-bottom">\
          <p class="footer-copy">This independent TEDx event is operated under license from TED. All rights reserved © 2026 TEDxUniversityofPiraeus.</p>\
          <div class="footer-ted-badge">TED</div>\
        </div>\
      </div>\
    </footer>';

  /* ---- Inject on load ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('nav-placeholder');
    if (nav) nav.outerHTML = NAV_HTML;

    var footer = document.getElementById('footer-placeholder');
    if (footer) footer.outerHTML = FOOTER_HTML;

    // Signal that components are in the DOM so main.js can bind to them
    document.dispatchEvent(new CustomEvent('components:ready'));
  });
})();
