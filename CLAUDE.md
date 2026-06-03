# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A design/build workspace for producing a **handyman / home-repair service website** (brand: a service offering appliance installation, plumbing, remodeling, and repair). There is **no application code, build system, package.json, or git repository yet** — this is greenfield. The repo currently holds only design directives (`.claude/rules/`) and reference/brand assets (`assets/`). When asked to build the site, you are creating it from scratch using the references here.

The default working language with the user (a designer) is **Ukrainian**.

## Design skill system (`.claude/rules/`)

`.claude/rules/` is a library of self-contained design "skills" — each is a `SKILL.md` of opinionated, anti-generic frontend directives. They are **already injected as project instructions** (loaded into context automatically), so their rules apply to any UI you produce. `.claude/rules/llms.txt` is the index describing what each skill is for. Key ones:

- `taste-skill`, `soft-skill`, `gpt-tasteskill` — premium frontend code (layout, type, color, motion, GSAP).
- `minimalist-skill`, `brutalist-skill` — specific aesthetic modes (editorial/Notion vs. Swiss/mechanical).
- `image-to-code-skill`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit` — image-first workflows (generate reference images, then build).
- `redesign-skill` — auditing/upgrading existing UI.
- `output-skill` — anti-laziness: never emit placeholder comments (`// ...`, `// TODO`), always full implementations.
- `stitch-skill` + `stitch-skill/DESIGN.md` — Google Stitch semantic design rules.

These skills share a consistent house style worth knowing before writing any frontend: no `Inter` font (use Geist/Outfit/Cabinet Grotesk/Satoshi), no pure black, no purple/blue "AI gradient", no 3-equal-card feature rows, no emojis anywhere, `min-h-[100dvh]` not `h-screen`, animate only `transform`/`opacity`, and use `picsum.photos/seed/...` for placeholders.

`.sixth/skills/` exists but is currently empty.

## Reference & brand assets (`assets/`)

- `assets/saveweb2zip-com-repairly-webflow-io/` — a **full downloaded Webflow template ("Repairly")** that is the primary visual reference for the site. Plain `index.html` + `css/` (one shared Webflow CSS file) + `js/` (jQuery, GSAP, ScrollTrigger, SplitText, Webflow runtime) + `images/`. It is a static export, not a buildable project — read it to extract layout, sections, typography, and component logic, do not treat it as the codebase to modify.
- `assets/Логотип сайту.png` — the site logo.
- `assets/Портфоліо/` — portfolio images (`page 1.jpg` … `page 13.jpg`) for project/gallery sections.
- `assets/відгуки/` — testimonial screenshots.
- `assets/Логотипи до відгуків/` — logos that accompany testimonials.

File and folder names are in Ukrainian; reference them via their exact paths.

## Working notes

- There are no commands to build, lint, or test — nothing is wired up. If you scaffold a real project (e.g. Vite/Next), choose the stack per the user's request and add the corresponding CLAUDE.md commands afterward.
- When generating frontend, follow the `.claude/rules/` directives (they override generic defaults) and pull real content from `assets/` rather than inventing placeholder brand/testimonial data.
