/* ==========================================================================
   Andreis Service — Interactions
   Vanilla JS, no dependencies. Mobile-first, accessible.
   ========================================================================== */
(function () {
  "use strict";

  const cfg = window.ANDREIS_CONFIG;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initPreloader();
    if (window.I18N) window.I18N.init();
    wireContactLinks();
    initHeader();
    initMobileMenu();
    initLangButtons();
    initTabs();
    initFaq();
    initReveal();
    initForms();
    initModal();
    initFab();
    initStickyCta();
    initCookie();
    initScrollSpy();
    initRevSlider();
    initNewsletter();
    initYear();
    initHeadingReveal();
    initCounters();
    document.addEventListener("langchange", function () {
      wireContactLinks();   // refresh prefilled messages
      resplitHeadings();    // re-run heading reveal after i18n replaced the text
    });
  }

  /* ---------- Preloader (brand intro) ---------- */
  function initPreloader() {
    const pl = document.getElementById("preloader");
    const root = document.documentElement;
    if (!pl) { root.classList.remove("is-preloading"); return; }

    const MIN = 1600;   // keep the intro on screen long enough to read
    const MAX = 6000;   // hard fail-safe so it never traps the page
    const startT = (window.performance && performance.now) ? performance.now() : Date.now();
    let finished = false;

    const remove = () => { if (pl && pl.parentNode) pl.parentNode.removeChild(pl); };
    const hide = () => {
      if (finished) return;
      finished = true;
      root.classList.remove("is-preloading");   // unlock scroll as it reveals
      pl.classList.add("is-done");
      let removed = false;
      const done = () => { if (removed) return; removed = true; remove(); };
      pl.addEventListener("transitionend", (e) => { if (e.target === pl) done(); }, { once: true });
      setTimeout(done, 1200); // fallback in case transitionend doesn't fire
    };

    const ready = () => {
      const elapsed = ((window.performance && performance.now) ? performance.now() : Date.now()) - startT;
      setTimeout(hide, Math.max(0, MIN - elapsed));
    };

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    setTimeout(hide, MAX);
  }

  /* ---------- Contact links from config ---------- */
  function waLink() {
    const lang = (window.ANDREIS_LANG || "de");
    const msg = encodeURIComponent(cfg.prefill[lang] || cfg.prefill.de);
    return `https://wa.me/${cfg.contact.whatsappNumber}?text=${msg}`;
  }
  function wireContactLinks() {
    $$('[data-contact="phone"]').forEach((a) => (a.href = `tel:${cfg.contact.phoneHref}`));
    $$('[data-contact="whatsapp"]').forEach((a) => (a.href = waLink()));
    $$('[data-contact="telegram"]').forEach((a) => (a.href = `https://t.me/${cfg.contact.telegramUser}`));
    $$('[data-contact="email"]').forEach((a) => (a.href = `mailto:${cfg.contact.email}`));
    $$('[data-contact-text="phone"]').forEach((el) => (el.textContent = cfg.contact.phoneDisplay));
    $$('[data-contact-text="email"]').forEach((el) => (el.textContent = cfg.contact.email));
    $$('[data-contact-text="telegram"]').forEach((el) => (el.textContent = "@" + cfg.contact.telegramUser));
    $$('[data-contact-text="area"]').forEach((el) => (el.textContent = cfg.contact.serviceArea));
  }

  /* ---------- Header hide/show on scroll ---------- */
  function initHeader() {
    const header = $(".header");
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 8);
      if (y > lastY && y > 240 && !document.body.classList.contains("no-scroll")) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
      lastY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  let lastFocused = null;
  function initMobileMenu() {
    const burger = $(".burger");
    const menu = $(".mobile-menu");
    if (!burger || !menu) return;
    const close = () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
      burger.focus();
    };
    const open = () => {
      menu.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
      const first = $("a, button", menu);
      if (first) first.focus();
    };
    burger.addEventListener("click", () => (menu.classList.contains("open") ? close() : open()));
    $(".mobile-menu__close", menu).addEventListener("click", close);
    menu.addEventListener("click", (e) => { if (e.target === menu) close(); });
    $$("a", menu).forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) close(); });
  }

  /* ---------- Language buttons ---------- */
  function initLangButtons() {
    $$("[data-lang-btn]").forEach((b) =>
      b.addEventListener("click", () => window.I18N && window.I18N.set(b.getAttribute("data-lang-btn")))
    );
  }

  /* ---------- Portfolio tabs ---------- */
  function initTabs() {
    const tabs = $$(".tab");
    const works = $$(".work");
    if (!tabs.length) return;
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        tabs.forEach((t) => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        const filter = tab.getAttribute("data-filter");
        works.forEach((w) => {
          const cats = (w.getAttribute("data-cat") || "").split(" ");
          const show = filter === "all" || cats.includes(filter);
          w.classList.toggle("is-hidden", !show);
          if (show) { w.style.animation = "none"; void w.offsetWidth; w.style.animation = ""; }
        });
      })
    );
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    $$(".faq__item").forEach((item) => {
      const q = $(".faq__q", item);
      const a = $(".faq__a", item);
      if (!q || !a) return;
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        $$(".faq__item.open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            $(".faq__q", other).setAttribute("aria-expanded", "false");
            $(".faq__a", other).style.maxHeight = null;
          }
        });
        item.classList.toggle("open", !isOpen);
        q.setAttribute("aria-expanded", String(!isOpen));
        a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------- Scroll reveal + review bars ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); animateBars(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));

    const summary = $(".reviews__summary");
    if (summary) {
      const bo = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { animateBars(); bo.disconnect(); } });
      }, { threshold: 0.3 });
      bo.observe(summary);
    }
  }
  function animateBars() {
    $$(".rbar__fill").forEach((f) => { f.style.width = (f.getAttribute("data-fill") || "0") + "%"; });
  }

  /* ---------- Forms (full + popup) ---------- */
  function initForms() {
    $$("form[data-lead-form]").forEach(setupForm);
    // file upload display
    $$(".upload").forEach((up) => {
      const input = $('input[type="file"]', up);
      const out = $(".upload__files", up);
      if (!input) return;
      const render = () => {
        const names = Array.from(input.files).map((f) => f.name);
        out.textContent = names.length ? names.join(", ") : "";
      };
      input.addEventListener("change", render);
      ["dragover", "dragenter"].forEach((ev) => up.addEventListener(ev, (e) => { e.preventDefault(); up.classList.add("drag"); }));
      ["dragleave", "drop"].forEach((ev) => up.addEventListener(ev, (e) => { e.preventDefault(); up.classList.remove("drag"); }));
      up.addEventListener("drop", (e) => { if (e.dataTransfer && e.dataTransfer.files.length) { input.files = e.dataTransfer.files; render(); } });
    });
  }

  function t(key, fallback) {
    // tiny helper: read localized error text via a hidden dictionary element if present
    const en = (window.ANDREIS_LANG === "en");
    const map = {
      "err.required": en ? "Please fill in this field." : "Bitte füllen Sie dieses Feld aus.",
      "err.email": en ? "Please enter a valid email address." : "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      "err.phone": en ? "Please enter a valid phone number." : "Bitte geben Sie eine gültige Telefonnummer ein.",
      "err.privacy": en ? "Please accept the privacy policy." : "Bitte stimmen Sie der Datenschutzerklärung zu."
    };
    return map[key] || fallback || "";
  }

  function setError(field, msg) {
    field.classList.add("field--error");
    const err = $(".field__err", field);
    if (err) err.textContent = msg;
  }
  function clearError(field) { field.classList.remove("field--error"); }

  function setupForm(form) {
    const card = form.closest(".formcard, .modal__box");
    const successEl = card ? $(".form-success", card) : null;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      let firstBad = null;

      $$(".field", form).forEach(clearError);

      // required text/select fields
      $$("[data-required]", form).forEach((input) => {
        const field = input.closest(".field");
        if (!field) return;
        const val = (input.value || "").trim();
        if (!val) { setError(field, t("err.required")); valid = false; firstBad = firstBad || input; }
      });

      // email
      const email = $('input[type="email"]', form);
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email.closest(".field"), t("err.email")); valid = false; firstBad = firstBad || email;
      }
      // phone
      const phone = $('input[type="tel"]', form);
      if (phone && phone.hasAttribute("data-required")) {
        const digits = (phone.value.match(/\d/g) || []).length;
        if (digits < 6) { setError(phone.closest(".field"), t("err.phone")); valid = false; firstBad = firstBad || phone; }
      }
      // privacy
      const privacy = $('input[type="checkbox"][data-required]', form);
      if (privacy && !privacy.checked) { setError(privacy.closest(".field"), t("err.privacy")); valid = false; firstBad = firstBad || privacy; }

      if (!valid) { if (firstBad) firstBad.focus(); return; }

      // build payload
      const fd = new FormData(form);
      const fileInput = $('input[type="file"]', form);
      const fileNames = fileInput ? Array.from(fileInput.files).map((f) => f.name).join(", ") : "";
      const payload = {
        formType: form.getAttribute("data-lead-form"),
        name: fd.get("name") || "",
        phone: fd.get("phone") || "",
        email: fd.get("email") || "",
        service: fd.get("service") || "",
        address: fd.get("address") || "",
        link: fd.get("link") || "",
        date: fd.get("date") || "",
        budget: fd.get("budget") || "",
        comment: fd.get("comment") || "",
        files: fileNames,
        lang: window.ANDREIS_LANG || "de",
        page: location.href,
        ts: new Date().toISOString()
      };

      const submitBtn = $('button[type="submit"]', form);
      const original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = "0.7"; }

      try {
        await window.submitLead(payload);
        if (successEl) {
          form.style.display = "none";
          successEl.classList.add("show");
        }
        form.reset();
        $$(".upload__files", form).forEach((o) => (o.textContent = ""));
      } catch (err) {
        if (submitBtn) submitBtn.innerHTML = (window.ANDREIS_LANG === "en")
          ? "Something went wrong — please call us"
          : "Etwas ist schiefgelaufen — bitte anrufen";
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ""; if (!successEl || !successEl.classList.contains("show")) submitBtn.innerHTML = original || submitBtn.innerHTML; }
      }
    });

    // "send another" reset
    const back = card ? $("[data-form-reset]", card) : null;
    if (back && successEl) {
      back.addEventListener("click", () => {
        successEl.classList.remove("show");
        form.style.display = "";
      });
    }
  }

  /* ---------- Modal (popup form) ---------- */
  function initModal() {
    const modal = $(".modal");
    if (!modal) return;
    const box = $(".modal__box", modal);

    const open = (trigger) => {
      lastFocused = trigger || document.activeElement;
      modal.classList.add("open");
      document.body.classList.add("no-scroll");
      const first = $("input, select, textarea, button", box);
      if (first) setTimeout(() => first.focus(), 60);
    };
    const close = () => {
      modal.classList.remove("open");
      document.body.classList.remove("no-scroll");
      if (lastFocused) lastFocused.focus();
    };
    window.openPopup = open;

    $$("[data-open-popup]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); open(b); }));
    $(".modal__close", modal).addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") trapFocus(e, box);
    });
  }

  function trapFocus(e, container) {
    const focusable = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container)
      .filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Desktop floating widget ---------- */
  function initFab() {
    const fab = $(".fab");
    if (!fab) return;
    const toggle = $(".fab__toggle", fab);
    toggle.addEventListener("click", () => {
      const open = fab.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (e) => { if (!fab.contains(e.target)) { fab.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); } });
    $$(".fab__action", fab).forEach((a) => a.addEventListener("click", () => fab.classList.remove("open")));
  }

  /* ---------- Mobile sticky CTA ---------- */
  function initStickyCta() {
    const bar = $(".sticky-cta");
    if (!bar) return;
    const onScroll = () => bar.classList.toggle("show", window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Cookie banner ---------- */
  function initCookie() {
    const banner = $(".cookie");
    if (!banner) return;
    let stored = null;
    try { stored = localStorage.getItem("andreis-cookie"); } catch (e) {}
    if (!stored) setTimeout(() => banner.classList.add("show"), 900);
    const decide = (value) => {
      try { localStorage.setItem("andreis-cookie", value); } catch (e) {}
      banner.classList.remove("show");
      if (value === "all") loadAnalytics();
    };
    $("[data-cookie-accept]", banner).addEventListener("click", () => decide("all"));
    $("[data-cookie-reject]", banner).addEventListener("click", () => decide("essential"));
    if (stored === "all") loadAnalytics();
  }
  function loadAnalytics() {
    /* Consent given — load non-essential / analytics scripts here.
       No tracking is loaded before this point (DSGVO-compliant). */
  }

  /* ---------- Scrollspy (active nav link) ---------- */
  function initScrollSpy() {
    const links = $$(".nav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = {};
    links.forEach((l) => { const id = l.getAttribute("href").slice(1); if (id) map[id] = l; });
    const sections = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          if (map[en.target.id]) map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Reviews slider ---------- */
  function initRevSlider() {
    $$(".rev-slider").forEach((slider) => {
      const track = $(".rev-track", slider);
      if (!track) return;
      const prev = $(".rev-prev", slider);
      const next = $(".rev-next", slider);
      const stepBy = () => {
        const card = track.querySelector(".review");
        return card ? card.getBoundingClientRect().width + 18 : track.clientWidth * 0.85;
      };
      const update = () => {
        const max = track.scrollWidth - track.clientWidth - 4;
        if (prev) prev.disabled = track.scrollLeft <= 4;
        if (next) next.disabled = track.scrollLeft >= max;
      };
      if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -stepBy(), behavior: "smooth" }));
      if (next) next.addEventListener("click", () => track.scrollBy({ left: stepBy(), behavior: "smooth" }));
      track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    });
  }

  /* ---------- Footer newsletter ---------- */
  function initNewsletter() {
    $$("form[data-newsletter]").forEach((form) => {
      const input = $('input[type="email"]', form);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = (input && input.value || "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { if (input) input.focus(); return; }
        const okText = (window.ANDREIS_LANG === "en")
          ? "Thank you! Please check your inbox to confirm."
          : "Danke! Bitte bestätigen Sie die Anmeldung in Ihrem Postfach.";
        form.innerHTML = '<p style="color:#BFE6D4;font-weight:600;margin:0">' + okText + "</p>";
        console.info("[Andreis Service] Newsletter signup (mock):", val);
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- Heading word-by-word reveal (SplitText-style) ---------- */
  let headingObserver = null;
  function splitWords(el) {
    if (el.dataset.split === "1") return;
    const frag = document.createDocumentFragment();
    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach((tok) => {
          if (tok === "") return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); }
          else { const w = document.createElement("span"); w.className = "aw"; w.textContent = tok; frag.appendChild(w); }
        });
      } else {
        if (node.classList) node.classList.add("aw");
        frag.appendChild(node);
      }
    });
    el.innerHTML = "";
    el.appendChild(frag);
    el.dataset.split = "1";
    Array.from(el.querySelectorAll(".aw")).forEach((w, i) => { w.style.transitionDelay = (i * 0.045) + "s"; });
  }
  function initHeadingReveal() {
    const heads = $$('[data-anim="words"]');
    heads.forEach(splitWords);
    if (!("IntersectionObserver" in window)) { heads.forEach((h) => h.classList.add("aw-in")); return; }
    headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("aw-in"); headingObserver.unobserve(en.target); } });
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    heads.forEach((h) => headingObserver.observe(h));
  }
  function resplitHeadings() {
    $$('[data-anim="words"]').forEach((el) => { el.dataset.split = ""; splitWords(el); el.classList.add("aw-in"); });
  }

  /* ---------- Number count-up ---------- */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count")) || 0;
      const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      const dur = 1100; let start = null;
      const fmt = (v) => v.toLocaleString("de-DE", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      const tick = (ts) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }
})();
