/* Circa Iceland — interactions */
(function () {
  "use strict";

  /* ---- year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- sticky nav shadow ---- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- project filters ---- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll("#projectGrid .card");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.style.display = show ? "" : "none";
        if (show) { card.classList.remove("in"); requestAnimationFrame(function () { card.classList.add("in"); }); }
      });
    });
  });

  /* ---- click-to-play video facades (privacy-friendly) ---- */
  document.querySelectorAll(".slide-play[data-embed]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-embed");
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", url);
      iframe.setAttribute("title", btn.getAttribute("aria-label") || "Video");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      var media = btn.parentNode;
      media.innerHTML = "";
      media.appendChild(iframe);
    });
  });

  /* ---- social stripe carousel ---- */
  var stripe = document.getElementById("stripe");
  var prev = document.getElementById("stripePrev");
  var next = document.getElementById("stripeNext");
  if (stripe && prev && next) {
    var step = function () {
      var card = stripe.querySelector(".slide");
      return card ? card.getBoundingClientRect().width + 20 : 320;
    };
    var sync = function () {
      var max = stripe.scrollWidth - stripe.clientWidth - 4;
      prev.disabled = stripe.scrollLeft <= 4;
      next.disabled = stripe.scrollLeft >= max;
    };
    prev.addEventListener("click", function () { stripe.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { stripe.scrollBy({ left: step(), behavior: "smooth" }); });
    stripe.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
