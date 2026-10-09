/* Michael J. Durovic. Standalone script. No library, no demo code. */
(function () {
  'use strict';

  var nav = document.getElementById('mdNav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) { nav.classList.add('md-stuck'); }
    else { nav.classList.remove('md-stuck'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById('mdBurger');
  var links = document.getElementById('mdLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('md-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.add('md-stuck');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('md-open');
        burger.setAttribute('aria-expanded', 'false');
        onScroll();
      }
    });
  }

  // Reveal on scroll. Replaces the demo's animation library.
  var items = document.querySelectorAll('.md-reveal');
  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) { items[i].classList.add('md-in'); }
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('md-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  items.forEach(function (el) { io.observe(el); });
}());
