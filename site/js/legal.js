/* ==========================================================================
   Andreis Service — Legal pages (Impressum / Datenschutz)
   Lightweight standalone DE/EN engine. German lives in the HTML; the EN
   dictionary is provided via window.LEGAL_EN. Mirrors the main i18n behaviour.
   ========================================================================== */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var EN = window.LEGAL_EN || {};
    var META = { title: document.title };

    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.dataset.de = el.innerHTML; });

    function apply(lang) {
      var en = lang === "en";
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var k = el.getAttribute("data-i18n");
        el.innerHTML = en && EN[k] != null ? EN[k] : el.dataset.de;
      });
      if (en && EN["meta.title"]) document.title = EN["meta.title"]; else document.title = META.title;
      document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang);
      });
      try { localStorage.setItem("andreis-lang", lang); } catch (e) {}
    }

    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang-btn")); });
    });

    var saved = "de";
    try { saved = localStorage.getItem("andreis-lang"); } catch (e) {}
    if (!saved) saved = (navigator.language || "de").slice(0, 2);
    apply(saved === "en" ? "en" : "de");

    // header subtle scroll state
    var header = document.querySelector(".header");
    if (header) {
      window.addEventListener("scroll", function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
      }, { passive: true });
    }
    // footer year (if present)
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });
})();
