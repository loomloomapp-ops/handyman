/* ==========================================================================
   Andreis Service — Bilingual engine (DE primary, EN secondary)
   --------------------------------------------------------------------------
   German is the source of truth: it lives directly in the HTML so the page is
   fully readable and SEO-correct without JavaScript. On load we cache every
   German string from the DOM; switching to English applies the dictionary
   below, switching back to German restores the cached originals. Any key
   missing from EN simply falls back to the German text — never broken.
   ========================================================================== */
(function () {
  "use strict";

  const EN = {
    /* Meta */
    "a11y.skip": "Skip to content",
    "meta.title": "Andreis Service – Kitchen & furniture assembly and handyman service in Berlin & Brandenburg",
    "meta.desc": "Professional kitchen installation, furniture assembly, lighting installation and handyman service in Berlin & Brandenburg. Send photos or a link and receive a preliminary estimate.",

    /* Navigation */
    "nav.services": "Services",
    "nav.portfolio": "Projects",
    "nav.request": "Request",
    "nav.advantages": "Benefits",
    "nav.reviews": "Reviews",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    /* Hero */
    "hero.eyebrow": "Handyman service · Berlin & Brandenburg",
    "hero.h1": "Professional kitchen installation, furniture assembly &amp; <span class=\"hl\">handyman service</span> in Berlin and Brandenburg",
    "hero.sub": "Send us a kitchen link, your plan or photos — and receive a preliminary installation estimate shortly.",
    "hero.t1": "Over 5 years of experience",
    "hero.t2": "Fair pricing",
    "hero.t3": "Fast response via WhatsApp",
    "hero.badgeMeta": "50 reviews on CHECK24",
    "hero.chip": "100% would recommend",

    /* CTAs */
    "cta.estimate": "Request a free estimate",
    "cta.whatsapp": "Message on WhatsApp",
    "cta.call": "Call now",
    "cta.request": "Send request",

    /* Top bar */
    "tb.left": "Over 5 years of experience in Berlin & Brandenburg",

    /* About */
    "about.eyebrow": "About Andreis Service",
    "about.h2": "Reliable installation, honest work — on every project",
    "about.sub": "Andreis Mahotin and his team install kitchens and furniture cleanly, precisely and on schedule. From the first photo to the finished installation you have one reliable contact.",
    "about.c1": "Over 5 years of experience with kitchens of any complexity",
    "about.c2": "Kitchen, furniture and lighting from a single source",
    "about.c3": "Connection of oven, hob and extractor hood",
    "about.c4": "On site across Berlin and Brandenburg",

    /* Trust */
    "trust.eyebrow": "Why Andreis Service",
    "trust.h2": "Why customers in Berlin & Brandenburg trust us",
    "trust.sub": "4.9 out of 5 on CHECK24 and a 100% recommendation rate — the result of clean work and clear communication.",
    "tf1.t": "Experienced craftsman",
    "tf1.d": "Over 5 years of experience with kitchens, furniture and mounting.",
    "tf2.t": "Fast communication",
    "tf2.d": "Quick answers via WhatsApp and clear appointments.",
    "tf3.t": "Clean & safe execution",
    "tf3.d": "Precise work and a tidy site when we leave.",
    "tf4.t": "Fair, transparent pricing",
    "tf4.d": "A clear estimate up front — no surprises.",

    /* Process */
    "process.eyebrow": "How it works",
    "process.h2": "How your request works",
    "process.sub": "In three simple steps from the first message to the finished installation.",
    "st1.t": "Send a request",
    "st1.d": "Send us photos, a plan or a link to your kitchen or furniture — via the form or WhatsApp.",
    "st2.t": "Receive an estimate",
    "st2.d": "We review your project and get back to you shortly with an initial, transparent estimate.",
    "st3.t": "Appointment & installation",
    "st3.d": "We arrange a date and install cleanly, precisely and on schedule at your place.",

    /* Tips */
    "tips.eyebrow": "Tips & guides",
    "tips.h2": "Helpful tips on installation and assembly",
    "tips.sub": "Short, practical notes — so your project succeeds from the start.",
    "tip1.cat": "Kitchen",
    "tip1.t": "What matters most in a kitchen installation",
    "tip1.d": "Accurate measuring, straight worktops and the right appliance connection determine the result.",
    "tip2.cat": "Furniture",
    "tip2.t": "Assembling IKEA furniture stable and clean",
    "tip2.d": "With the right tools and secure wall fixing, cabinets last for the long term.",
    "tip3.cat": "Lighting",
    "tip3.t": "Mounting ceiling lights safely",
    "tip3.d": "Clean fixing and a correct connection ensure safety and a good light result.",
    "tips.more": "Learn more",

    /* CTA banner */
    "cb.h2": "Your home deserves clean, precise installation",
    "cb.sub": "Send us photos or a link — we'll get back to you shortly with an initial estimate.",

    /* Footer CTA */
    "fcta.h3": "Ready for your installation in Berlin or Brandenburg?",
    "fcta.sub": "Free preliminary estimate — fast response via WhatsApp.",

    /* Ticker */
    "tick.1": "Kitchen installation",
    "tick.2": "IKEA furniture assembly",
    "tick.3": "Lighting installation",
    "tick.4": "Worktops & precise cutting",
    "tick.5": "Appliance connection",
    "tick.6": "Handyman service",
    "tick.7": "Berlin & Brandenburg",

    /* Categories */
    "cat.kitchen": "Kitchen",
    "cat.furniture": "Furniture",
    "cat.light": "Lighting",
    "cat.mount": "Mounting",
    "cat.haus": "Handyman",

    /* Services */
    "svc.eyebrow": "Our services",
    "svc.h2": "Everything for kitchen, furniture and home — from a single source",
    "svc.lead": "From a complete kitchen installation to a single shelf on the wall: clean, precise work across Berlin and Brandenburg.",
    "svc.cta": "Request",
    "s1.t": "Kitchen installation",
    "s1.d": "Professional kitchen assembly in Berlin & Brandenburg — precise, clean and reliable.",
    "s2.t": "Kitchen removal",
    "s2.d": "Proper dismantling of existing kitchens to prepare for a move, renovation or new build.",
    "s3.t": "Kitchen move & reassembly",
    "s3.d": "Careful disassembly, transport preparation and reassembly of your kitchen.",
    "s4.t": "Worktops & mitre / European joints",
    "s4.d": "Clean worktop installation including precise joints and adjustments.",
    "s5.t": "Cut-outs for sink & hob",
    "s5.d": "Exact cut-outs for sinks, hobs and other kitchen elements.",
    "s6.t": "Appliance connection",
    "s6.d": "Mounting and connection of oven, hob, extractor hood and other appliances within the installation.",
    "s7.t": "Furniture assembly (IKEA & others)",
    "s7.d": "Assembly of furniture from IKEA, Höffner, Roller, XXXLutz and other manufacturers.",
    "s8.t": "Cabinets, wardrobes, dressers & beds",
    "s8.d": "Stable and clean assembly of furniture for apartment, house and office.",
    "s9.t": "Chandeliers & ceiling lights",
    "s9.d": "Safe and tidy mounting of ceiling lights, chandeliers and LED lighting.",
    "s10.t": "Curtain rods, shelves & mirrors",
    "s10.d": "Precise wall mounting of curtain rods, shelves, mirrors and other home accessories.",
    "s11.t": "Handyman service",
    "s11.d": "Reliable support with small maintenance, repair and mounting tasks.",
    "s12.t": "Small repair & mounting work",
    "s12.d": "Flexible help with everyday tasks in your apartment, house or office.",

    /* Portfolio */
    "pf.eyebrow": "Recent work",
    "pf.h2": "Selected projects from Berlin & Brandenburg",
    "pf.lead": "A look at real installations — kitchens, wardrobes, lighting and mounting work, delivered on site.",
    "tab.all": "All",
    "tab.kitchen": "Kitchen installation",
    "tab.furniture": "Furniture assembly",
    "tab.light": "Lighting",
    "tab.mount": "Mounting work",
    "tab.haus": "Handyman service",
    "w1.t": "Handleless kitchen with marble splashback",
    "w1.l": "Berlin",
    "w1.d": "Full kitchen assembly with worktop fitting, sink cut-out and connection of the Siemens appliances.",
    "w2.t": "Precise wall mounting with laser levelling",
    "w2.l": "Berlin",
    "w2.d": "Exact mounting and alignment using a laser level for a perfectly straight result.",
    "w3.t": "Kitchen with solid wood worktop",
    "w3.l": "Berlin",
    "w3.d": "Installation with wooden worktop, black granite sink and built-in dishwasher.",
    "w4.t": "Connection of hob & oven",
    "w4.l": "Berlin",
    "w4.d": "Correct electrical connection of hob and oven as part of the kitchen installation.",
    "w5.t": "Custom built-in wardrobe in the hallway",
    "w5.l": "Berlin",
    "w5.d": "Tailored wardrobe with internal drawers and shelving, fitted neatly into the hallway.",
    "w6.t": "Black kitchen with extractor hood",
    "w6.l": "Berlin",
    "w6.d": "Matte black kitchen with wood worktop, hob, oven and wall-mounted extractor hood.",
    "w7.t": "IKEA PAX wardrobe with mirror doors",
    "w7.l": "Berlin-Charlottenburg",
    "w7.d": "Assembly of an IKEA PAX wardrobe with internal fittings and mirror doors.",
    "w8.t": "IKEA furniture assembly",
    "w8.l": "Berlin-Charlottenburg",
    "w8.d": "On-site assembly of IKEA wardrobes including alignment and secure fixing.",
    "w9.t": "Bedroom wardrobe with mirror",
    "w9.l": "Berlin",
    "w9.d": "Wardrobe assembly with mirror door, drawers and pendant light in the bedroom.",
    "w10.t": "Sliding-door wardrobe in wood finish",
    "w10.l": "Brandenburg",
    "w10.d": "Assembly and alignment of a four-door sliding wardrobe in a wood finish.",
    "w11.t": "Storage loft with stairs (Lagerbühne)",
    "w11.l": "Berlin",
    "w11.d": "Construction of a stable storage loft with access stairs and ceiling spotlights.",
    "w12.t": "Mobile handyman service on site",
    "w12.l": "Berlin & Brandenburg",
    "w12.d": "Fully equipped and mobile across the region for small repair and mounting jobs.",

    /* Request */
    "rq.eyebrow": "Request",
    "rq.h2": "Request a free preliminary estimate for your installation",
    "rq.sub": "Send us information, photos or a link to your kitchen or furniture. We will get back to you shortly with an initial assessment.",
    "rq.li1": "Estimate based on a link, plan or photos — no on-site visit needed first",
    "rq.li2": "Fast reply, usually via WhatsApp",
    "rq.li3": "Transparent, fair pricing without surprises",
    "rq.li4": "On site across Berlin & Brandenburg",
    "rq.or": "or contact us directly",

    /* Form */
    "f.name": "Name",
    "f.phone": "Phone",
    "f.email": "Email",
    "f.service": "Service",
    "f.address": "Work address",
    "f.link": "Link to kitchen or furniture (IKEA, Höffner, Roller, XXXLutz)",
    "f.upload": "Upload photos or project file",
    "f.uploadCta": "Choose files or drop them here",
    "f.uploadHint": "JPG, PNG or PDF · up to 10 MB",
    "f.date": "Preferred date",
    "f.budget": "Budget",
    "f.comment": "Message",
    "f.optional": "(optional)",
    "f.submit": "Send request",
    "f.note": "We usually reply within a few hours during business hours.",
    "opt.choose": "Please choose",
    "opt.s.kitchen": "Kitchen installation",
    "opt.s.kdemo": "Kitchen removal",
    "opt.s.kmove": "Kitchen move / reassembly",
    "opt.s.furniture": "Furniture assembly",
    "opt.s.light": "Lighting installation",
    "opt.s.wall": "Curtain rods / shelves / mirrors",
    "opt.s.haus": "Handyman service",
    "opt.s.repair": "Small repair work",
    "opt.s.other": "Other request",
    "opt.b.1": "Up to €300",
    "opt.b.2": "€300–500",
    "opt.b.3": "€500–1000",
    "opt.b.4": "Over €1000",
    "opt.b.5": "Estimate needed",
    "f.privacy": "I have read the <a href=\"datenschutz.html\">Privacy Policy</a> and consent to the processing of my data to handle my request.",
    "ph.name": "First and last name",
    "ph.phone": "e.g. +49 1577 1234567",
    "ph.email": "your@email.com",
    "ph.address": "Street, postal code, city",
    "ph.link": "Paste a product link from the furniture store",
    "ph.comment": "Describe your project briefly — what should be installed?",
    "err.required": "Please fill in this field.",
    "err.email": "Please enter a valid email address.",
    "err.phone": "Please enter a valid phone number.",
    "err.privacy": "Please accept the privacy policy.",
    "success.title": "Thank you!",
    "success.text": "Your request has been sent. We will get back to you as soon as possible.",
    "success.back": "Send another request",

    /* Advantages */
    "adv.eyebrow": "Why Andreis Service",
    "adv.eyebrow2": "Your benefits",
    "adv.h2": "Reliable craftsmanship you can plan around",
    "adv.lead": "Clear communication, clean execution and fair pricing — that is what our customers value most.",
    "a1.t": "Over 5 years of hands-on experience",
    "a1.d": "Routine across hundreds of kitchens, wardrobes and mounting jobs.",
    "a2.t": "Specialised in kitchens of any complexity",
    "a2.d": "From compact kitchenettes to large fitted kitchens with appliances.",
    "a3.t": "Clean and precise execution",
    "a3.d": "Straight lines, tight joints and a tidy site when we leave.",
    "a4.t": "Fast communication via WhatsApp & phone",
    "a4.d": "Quick answers and clear scheduling without long waits.",
    "a5.t": "Transparent and fair pricing",
    "a5.d": "A clear estimate up front — no surprises on the invoice.",
    "a6.t": "Across all of Berlin and Brandenburg",
    "a6.d": "On site in the city and the surrounding region.",
    "a7.t": "An individual solution for every project",
    "a7.d": "We think along and adapt when plans and parts don't match.",
    "a8.t": "Positive customer reviews",
    "a8.d": "Rated 4.9 on CHECK24 with a 100% recommendation rate.",
    "a9.t": "Kitchen, furniture & lighting from one hand",
    "a9.d": "One reliable contact for the whole installation.",

    /* Reviews */
    "rv.eyebrow": "Reviews",
    "rv.h2": "What customers in Berlin & Brandenburg say",
    "rv.lead": "Real reviews from verified CHECK24 customers.",
    "rsum.meta": "50 reviews · 96% five stars",
    "rsum.rec": "100% would recommend",
    "m.quality": "Quality of work",
    "m.reliability": "Reliability",
    "m.communication": "Communication",
    "m.price": "Value for money",
    "rsum.sources": "Rated on",
    "r1.text": "“Building a storage loft — I am very happy with Andreis' work. He prepared everything, worked in a solution-oriented way and paid great attention to quality and stability. You can see it in the result. Anytime again!”",
    "r1.name": "Aldo Q.",
    "r1.loc": "Berlin",
    "r2.text": "“Excellent work! Structured, professional and with perfect technical equipment. He managed to build a shelf so that it still fit into my smaller flat. Very flexible — I'll gladly come back to Mr Mahotin.”",
    "r2.name": "Mrs Tietze",
    "r2.loc": "Berlin",
    "r3.text": "“On time, friendly and professional. Our IKEA furniture was assembled cleanly and mounted securely. The price was transparent.”",
    "r3.name": "Markus R.",
    "r3.loc": "Potsdam",
    "r4.text": "“We had lamps, shelves and mirrors installed. Everything was done very neatly and cleanly. Great communication throughout.”",
    "r4.name": "Elena S.",
    "r4.loc": "Berlin-Charlottenburg",

    /* FAQ */
    "faq.eyebrow": "FAQ",
    "faq.h2": "Frequently asked questions",
    "faq.lead": "Quick answers to the questions we hear most often.",
    "q1": "What does a kitchen installation cost?",
    "fa1": "The price depends on the size of the kitchen and the complexity of the work. For an initial estimate it is enough to send a link to the kitchen, a kitchen plan or photos.",
    "q2": "Do you work with IKEA kitchens?",
    "fa2": "Yes, we install kitchens from IKEA as well as from other manufacturers and furniture stores.",
    "q3": "Do you connect kitchen appliances?",
    "fa3": "Yes, we connect ovens, hobs, extractor hoods and other kitchen appliances as part of the installation.",
    "q4": "Do you also assemble furniture?",
    "fa4": "Yes, we assemble furniture for apartments, houses and offices.",
    "q5": "Do you install lamps and chandeliers?",
    "fa5": "Yes, we mount ceiling lights, chandeliers and LED lighting.",
    "q6": "Which regions do you work in?",
    "fa6": "We work throughout Berlin and Brandenburg.",
    "q7": "How quickly can an appointment be arranged?",
    "fa7": "In most cases we can offer the next available dates once we have received the project information.",

    /* Footer */
    "ft.about": "Professional kitchen installation, furniture assembly, lighting installation and handyman service in Berlin & Brandenburg.",
    "ft.colServices": "Services",
    "ft.colNav": "Navigation",
    "ft.colContact": "Contact",
    "ft.mapTitle": "Service area",
    "ft.area": "On site across Berlin & Brandenburg",
    "ft.rights": "© 2026 Andreis Service. All rights reserved.",
    "ft.impressum": "Imprint",
    "ft.privacy": "Privacy Policy",
    "ft.mapOpen": "Open in Google Maps",

    /* Popup */
    "pop.title": "Quick request",
    "pop.sub": "Leave your details and we'll get back to you shortly.",

    /* Cookie banner */
    "ck.title": "Privacy & cookies",
    "ck.text": "We only use technically necessary cookies. Optional analytics is loaded only after your consent. More in our <a href=\"datenschutz.html\">Privacy Policy</a>.",
    "ck.accept": "Accept all",
    "ck.reject": "Essential only",

    /* FAB / aria */
    "fab.form": "Send request",
    "fab.wa": "WhatsApp",
    "fab.call": "Call",
    "aria.menu": "Open menu",
    "aria.close": "Close",
    "aria.contact": "Open contact options",
    "aria.wa": "Write on WhatsApp",
    "aria.call": "Call now",
    "aria.email": "Send email",
    "aria.telegram": "Telegram"
  };

  const META = { title: "", desc: "" };

  function cacheDE() {
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.dataset.de = el.innerHTML; });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.dataset.phDe = el.getAttribute("placeholder") || ""; });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.dataset.ariaDe = el.getAttribute("aria-label") || ""; });
    META.title = document.title;
    const md = document.querySelector('meta[name="description"]');
    META.desc = md ? md.getAttribute("content") : "";
  }

  function apply(lang) {
    const en = lang === "en";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      el.innerHTML = en && EN[k] != null ? EN[k] : el.dataset.de;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const k = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", en && EN[k] != null ? EN[k] : el.dataset.phDe);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const k = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", en && EN[k] != null ? EN[k] : el.dataset.ariaDe);
    });

    document.title = en && EN["meta.title"] ? EN["meta.title"] : META.title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", en && EN["meta.desc"] ? EN["meta.desc"] : META.desc);

    document.querySelectorAll("[data-lang-btn]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-lang-btn") === lang);
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang-btn") === lang));
    });

    try { localStorage.setItem("andreis-lang", lang); } catch (e) {}
    window.ANDREIS_LANG = lang;
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.I18N = {
    init() {
      cacheDE();
      let saved = "de";
      try { saved = localStorage.getItem("andreis-lang"); } catch (e) {}
      if (!saved) saved = (navigator.language || "de").slice(0, 2);
      apply(saved === "en" ? "en" : "de");
    },
    set: apply,
    current() { return window.ANDREIS_LANG || "de"; }
  };
})();
