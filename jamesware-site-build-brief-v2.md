# JamesWare.dev — Website Build Brief

> **Status:** Working source-of-truth document  
> **Site:** [jamesware.dev](https://jamesware.dev)  
> **Brand:** JamesWare  
> **Parent company:** Jewhurst Engineering  
> **Core line:** **Made with care, by JamesWare.**

---

# 1. What JamesWare Is

JamesWare is an independent software studio for apps, developer tools, experiments, and useful software.

It should feel like a small, opinionated software studio run by an experienced builder — not a freelancer portfolio, not a résumé site, and not a fake SaaS company.

The work should be the personality.

JamesWare exists as the public software/maker identity, with Jewhurst Engineering as the underlying company.

```text
Jewhurst Engineering
└── JamesWare
    ├── Apps
    ├── Developer Tools
    ├── Experiments
    ├── Open Source
    └── Notes / Build Logs
```

---



# 2. Brand Positioning



## Primary positioning

> **Independent software. Apps, tools, and useful things.**

Alternative supporting statements:

> **Software that makes complicated things simpler.**

> **Useful software, thoughtfully made.**

> **Apps, tools, experiments, and things worth building.**

> **Building useful things with care.**

The tone should be confident and experienced without sounding corporate.

Avoid phrases like:

- Digital transformation
- Innovative solutions
- Cutting-edge technology
- Unlocking business value
- World-class software
- Enterprise-grade solutions
- Book a demo
- Contact sales

JamesWare should sound like a software workshop, not a consultancy brochure.

---



# 3. Core Philosophy

JamesWare software should generally feel:

- Useful
- Thoughtful
- Quiet
- Fast
- Understandable
- Local-first when practical
- Native when native makes sense
- Carefully designed
- Technically solid
- Focused on real problems

The recurring product philosophy is:

> **Useful > impressive.**

> **Simple > clever.**

> **Thoughtful > feature-packed.**

> **Software for people actually doing something.**

Another useful phrase:

> **An instrument on a developer's workbench.**

That description originally fit AI Meter well, but it also captures the broader JamesWare product philosophy.

---



# 4. Who James Is — In Relation to JamesWare

James is a product-minded software engineer and architect who likes building useful systems from beginning to end.

The work often spans:

```text
product
   ↓
UX
   ↓
architecture
   ↓
engineering
   ↓
automation
   ↓
operations
```

The site should not present James primarily as a list of programming languages.

Technology matters, but the stronger story is:

> **I build software that makes complicated things simpler.**

James has experience across software architecture, product development, backend systems, integrations, developer tooling, native Apple applications, engineering processes, automation, and operational software.

---



# 5. Technical Background

Relevant technologies and areas include:

## Backend / Systems

- PHP
- Laravel
- Go
- Python
- FastAPI
- TypeScript
- Node.js
- PostgreSQL
- Redis
- APIs
- Integrations
- Authentication
- Caching
- Background processing
- Distributed systems
- Production systems



## Web

- TypeScript
- React
- Vue
- HTML
- CSS
- JavaScript
- Static sites
- GitHub Pages



## Apple / Native

- Swift
- SwiftUI
- macOS
- iPhone
- iPad
- Apple Watch
- WidgetKit
- Menu bar utilities
- Native applications



## Infrastructure / Engineering

- Docker
- AWS
- RDS
- SSM
- GitHub Actions
- CI/CD
- Testing
- Feature flags
- Release automation
- Production operations



## AI / Automation

- LLM workflows
- Agent systems
- Structured document analysis
- Product-analysis pipelines
- Automated research
- Web intelligence gathering
- Slack-integrated automation
- Scheduled analysis systems

The website should **not** dump all of these into a giant skills cloud.

PHP and Laravel should be treated as part of James's real backend/web application experience, alongside Go, Python, and TypeScript — not as incidental legacy technologies.

Use technologies selectively as supporting evidence underneath projects and experience.

---



# 6. Strong Domain Experience



## Automotive Software

James has deep experience building software around independent automotive repair operations.

Relevant areas include:

- Shop management systems
- Work orders
- Appointments
- Technician scheduling
- Bays
- Customer communication
- Messaging
- Phone / telecom workflows
- Automotive integrations
- Operational workflows
- Scheduling interfaces
- Product design for real shop workflows

This should be presented as a genuine domain specialty without making JamesWare an automotive-only company.

Possible site wording:

> **Deep experience building software for automotive operations, including shop management, scheduling, communications, integrations, and workflow systems.**

---



# 7. Product / Engineering Perspective

JamesWare should communicate that the work is not only about coding.

James spends significant time thinking about:

- What should be built
- Why it should exist
- Product requirements
- Acceptance criteria
- Edge cases
- UX
- Architecture
- Engineering processes
- Documentation
- Release workflows
- Testing
- Code review
- Product/engineering handoff
- AI-assisted development workflows

This gives JamesWare a product-engineering identity rather than a generic developer identity.

---



# 8. Current / Recent JamesWare Project Universe

Not every project needs to be public.

Projects can be categorized as:

- **Released**
- **Building**
- **Experimental**
- **Open Source**
- **Archived**

This lets the site show work honestly without pretending every project is a finished commercial product.

---



## 8.1 JamesWare AI Meter

This is currently one of the strongest flagship JamesWare projects.

**Status:** Building (pre-1.0). Native apps exist and run. Not on the Mac App Store. iPhone / Watch are aimed at TestFlight. GitHub repo still named `cursor-usage-tracker`.

**Shipping name:** AI Meter / JamesWare AI Meter. Cursor Usage Tracker is the repo and older docs name, not what the binary displays.

### Product idea

A local-first, glanceable usage meter for people who live in AI coding tools and hate opening dashboards.

On Mac it connects to **Cursor** (Pro / Pro+ / Ultra), **Claude Code**, and **Codex / ChatGPT** from sessions already on the machine. On iPhone it is Cursor-only. Tokens stay in Keychain. There is no JamesWare account and no product server.

It is meant to feel like a battery meter or menu-bar instrument, not a SaaS analytics portal.

### Platforms

Shipped in the current apps:

- macOS 14+ menu bar extra (no Dock icon by default)
- macOS desktop widgets
- iPhone (iOS 17+)
- iPhone Home Screen widgets
- Apple Watch companion glance
- Watch complications
- Multiple accounts (Cursor + Claude + Codex on Mac; Cursor-only on iPhone)

Not shipped (do not claim on the site):

- Mac App Store (sandbox would block local IDE credentials)
- iPhone Lock Screen widgets
- Team / Enterprise Admin API
- iCloud sync, product account, push backend

### Capabilities

- Cursor Models / Other Models / Total included usage
- Subscription spend vs included cap, bonus credits
- On-demand usage, cap or unlimited
- Per-model cost for the billing window
- Spend by cycle and a linear pace projection
- Warnings / alerts (menu-bar dots, optional notifications)
- Mac-only Cursor Agents: This Mac, CLI, Cloud
- Claude Code and Codex rolling windows (Mac only)
- Combined or separate menu-bar status items
- Export current snapshot as CSV/JSON (no credentials)

How it works: local-first. Cursor uses the same personal session APIs as the dashboard — not HTML scraping, not a public individual usage API. Claude and Codex read local OAuth credentials already created by those CLIs. Watch gets a sanitized snapshot only. No cookies or JWTs on the wrist.

### Product personality

- Quiet
- Native
- Precise
- Local-first
- Glanceable
- Unofficial companion
- Not another SaaS dashboard

### Good project tagline

> **A quiet, local-first usage meter for Cursor, Claude, and Codex — Mac menu bar, iPhone, and Apple Watch. No account. No dashboard refreshing.**

About UI line already in the app:

> Menu bar meter for Cursor, Claude, and Codex — unofficial, local-first.

This should likely be the first large project featured on the site.

---

## 8.2 Daily On Plan

**Status:** Building. Usable as a native app on James’s devices. Not App Store–released. Personal Xcode / sideload now; TestFlight and Universal Purchase planned.

**Shipping name:** Daily On Plan. On Plan is short chrome (menu bar, spoken fallback). OnPlan is the older brand-kit spelling. Daily On Plan Tracker is a brief nickname, not the home-screen name. Local checkout folder is `weight`.

### Product idea

A personal, on-device daily nutrition sheet for protein-forward / ketosis-style weight loss. Digitizes the paper log. Does not become another generic calorie social app.

Built first for James. Single user. No accounts. No JamesWare backend. It should feel like **your sheet**, not a network.

> Stay on plan. One day at a time.

### Platforms

Shipped in this repo:

- iPhone (primary)
- iPad (same iOS target)
- Apple Watch companion (not standalone)
- Home Screen / Lock Screen widgets
- Native Mac menu-bar accessory + desktop widgets
- App Intents / Shortcuts

Not a product: Android. Brand-kit Play Store art exists; there is no Android app.

### Capabilities

- Protein kcal vs a single protein goal (the ring is protein, not total macros)
- Ketosis Y/N (self-report — the app does not measure)
- Followed plan Y/N, with honest off-plan reason chips
- Hydration, optional habits, saved meals, food preferences
- Week 1 / Week 2+ food guide
- Weight & BMI with privacy collapse
- Optional HealthKit on iPhone
- Reports, CSV / PDF / Excel export, on-device backup/restore
- Suggest is a shuffle from prefers/excludes — **not AI**

### Product philosophy

- Personal + sharp, not clinical
- Honest and low-shame (especially off-plan logging)
- Prefer clarity over wellness fluff
- Single user, no account, no clinic portal
- Daily ritual over social calorie tracking
- Not a medical device

### Privacy

Journal lives on iPhone / Watch / Mac. Optional iCloud CloudKit syncs across **the user’s** iCloud — not a Daily On Plan server. No ads, no analytics SDKs, no sale of data. USDA API key stays in device Keychain. Notifications are local.

### Good project tagline

> **Stay on plan. One day at a time.**

Supporting line:

> A personal, on-device daily nutrition sheet — digitize the paper log, not become another generic calorie social app.

This is another good example of the JamesWare preference for focused local-first utilities.

---



# 9. AI / LLM Projects

AI should be present on the site, but not as marketing hype.

James is interested in AI as software infrastructure and workflow automation.

---



## 9.1 Product Analysis Pipeline

**Status:** In use, internal. Not a standalone open-source product. Not in the AI Meter / `cursor-usage-tracker` repo.

A Cursor **skill family** used inside SHIFT (`shift-sms-ts`). Hub skill `product-analysis`, conductor `/product-pipeline`, and stage skills `/product-init` through `/product-share`. Skills are guided workflows, not fire-and-forget scripts.

It turns product evidence into a cited local model, diffs that model against Linear as a dry-run, and only writes tickets after a human gate.

> You put **evidence** in a topic folder (meetings + existing tickets), turn that into a **local model** of what the product is, then **compare** that to Linear as a dry-run — and only write to Linear when you say so.

### Inputs (first-class)

- BuildBetter calls / recordings / transcripts
- Linear tickets (read-only ingest, including existing acceptance criteria)
- Notes, transcripts, local docs
- Figma as product evidence (stub — not design-to-code)
- Wiki / document drop zones

PRDs are primarily an **output**, not the main input. OCR PDFs and audio transcription are out of scope.

### What it produces

- A structured, cited model: facts, decisions, requests, entities, conflicts, open questions
- Living specs (including ELI5 versions)
- Linear reconcile dry-run, then gated apply
- Optional PRD draft + read-only drift reports
- Per-ticket implementation specs with acceptance checks and an append-only build log

### How it works

Default order: init → ingest → extract → **human model review** → reconcile dry-run → optional PRD → stop.

Gates the pipeline never crosses on its own: Linear apply, ingest approve, PRD baseline, implement close.

Citations are required everywhere. Conflicts stay open until a human resolves them. Unclear becomes a question or assumption, not an invented fact. Repo evidence is checked before creating tickets.

### Where it has been used

Production proof on SHIFT **Scheduling V0**: BuildBetter calls, Linear issues, notes, and Figma packs → extract + human review → reconcile apply (17 Linear mutations) → implementation breakdown and closeout comments. Build PRs merged onto `scheduling-v0`.

This is agent orchestration as software infrastructure: adapters, a canonical YAML model, citation discipline, a validator, and human gates before the tracker changes. Not an AI button on a product.

---



## 9.2 Automotive Intelligence Scout

**Status:** Detailed build plan (August 2026). Not implemented. One blueprint, no running system, no git repo yet.

Working name: **Scout**. Internal only — shops are the subject of research, not the users of Scout. It is not a customer-facing shop product and not an AI button in a shop management system.

An always-on research and intelligence system for the independent automotive repair industry. Continuously discover, store, analyze, and surface public market signals so JamesWare can decide what to build, how to improve an SMS, and what competitors and the industry are doing.

Scout identifies opportunities. Humans decide the roadmap.

### Four questions it would answer

1. What should we build?
2. How should we improve our shop management system?
3. What is happening in the industry?
4. What are competitors doing?

### Specified inputs

- Industry news, acquisitions, regulation, EV / hybrid repair, labor, parts
- Competitor pages, launches, pricing, integrations, release notes
- Social / X, forums, YouTube, podcasts (one signal source, not ground truth)
- Shop pain points and software complaints
- Market trends
- Known-source RSS, review sites, press, jobs/careers as directional intel

### Specified outputs

- Daily Slack digest (~5 minute scan)
- Product opportunities scored from evidence only
- SMS / workflow improvement patterns
- Competitor intelligence
- Emerging pain-point clusters
- High-signal alerts
- `@Scout` conversational Q&A over the corpus (live web/X only when asked)

### Architecture (planned)

OpenClaw is orchestration (agent, cron, Slack, search tools). It is **not** the system of record.

Durable asset: PostgreSQL + pgvector — sources, documents, signals, pain points, opportunities, clusters, embeddings, feedback, historical changes.

TypeScript/Node `automotive-intel-api`. Slack Socket Mode. One web search provider plus X search. Collection cheaper than reasoning.

> Every intelligence conclusion must trace back to evidence.

> The long-term moat is not OpenClaw or the LLM. It is the accumulated, normalized, evidence-backed automotive intelligence corpus.

This is a strong example of JamesWare building AI into an actual workflow rather than adding an AI button to a product.

---



# 10. Design Philosophy

James is very opinionated about interface design.

Recurring priorities:

- Strong visual hierarchy
- Consistent spacing
- Good grouping
- Dense without clutter
- Useful information density
- Minimal wasted space
- Clear relationships between things
- Consistent controls
- UI that feels intentional

JamesWare should demonstrate those principles rather than merely saying them.

---



# 11. JamesWare Visual Identity

The current visual direction is distinctive and should remain consistent.

## Core inspiration

> **British engineering + 1980s terminal + modern software studio**

Think:

- British Racing Green
- Deep dark green
- Terminal phosphor green
- Dark neutral backgrounds
- Monospace typography
- Engineering equipment
- Old workstations
- Precision instruments
- Modern layout
- Clean typography

Avoid:

- Generic startup blue
- Overdone cyberpunk neon
- Matrix-style hacker clichés
- Excessive scanlines
- Too many blinking elements
- Fake terminal gimmicks everywhere

The goal is:

> **Retro character + modern usability.**

A useful mental image:

> A very expensive engineering terminal from 1986 that somehow runs beautifully on a modern Mac.

---



# 12. Color Direction

Exact values can evolve, but the system should roughly contain:

## Backgrounds

- Near-black green
- Very dark racing green
- Deep neutral charcoal



## Primary brand

- British Racing Green



## Accent

- Terminal / phosphor green



## Supporting accent possibilities

The logo has also been explored with:

- Red
- Orange
- Purple

These may be useful for project accents but should not overpower the main green identity.

---



# 13. Typography

The site should combine:

## Primary UI / body font

A clean modern sans-serif.

## Technical / decorative font

A monospace font used for:

- Terminal output
- Metadata
- Project status
- Labels
- Navigation accents
- Small UI details

Do not make the entire site monospace.

The contrast between modern typography and terminal details is part of the JamesWare look.

---



# 14. Logo

Current direction:

- JW monogram / mark
- Geometric
- Clean
- Works at small sizes
- British Racing Green + terminal green
- Technical without looking like a generic coding logo

The logo should work as:

- Favicon
- Header mark
- GitHub avatar
- Social icon
- App/project studio mark
- Footer brand

---



# 15. Recommended Single-Page Site Architecture

The first version of JamesWare should remain a focused single-page site.

Do not overbuild it.

Recommended structure:

```text
Header
↓
Hero
↓
Terminal / Brand Statement
↓
Selected Work
↓
Workbench
↓
What I Build
↓
About
↓
Links / Contact
↓
Footer
```

---



# 16. Header

Keep the header compact.

Possible structure:

```text
[JW] JAMESWARE

WORK
ABOUT
GITHUB
```

Alternative:

```text
[JW] jamesware.dev

projects
workbench
about
```

The site should not have a giant corporate navigation system.

---



# 17. Hero

The hero should immediately explain the brand.

Recommended direction:

# JamesWare

**Independent software. Apps, tools, and useful things.**

Supporting copy:

> JamesWare is an independent software studio for native apps, developer tools, experiments, and software that solves real problems.

Possible actions:

- View Work
- GitHub

Avoid giant paragraphs in the hero.

---



# 18. Terminal Element

The terminal interaction is worth keeping because it gives the site character.

It should be a supporting visual element rather than the entire website.

Possible sequence:

```text
> whoami
JamesWare

> mission
Building useful things with care.

> status
Currently making software.

> location
jamesware.dev
```

Alternative:

```text
> BUILDING USEFUL THINGS
> WITH CARE
> FOR PEOPLE WHO USE THEM
```

Typing animation is encouraged.

Keep it:

- Fast
- Subtle
- Readable
- Optional
- Non-blocking

The content should remain visible even if JavaScript fails.

---



# 19. Selected Work

This is the most important section of the site.

Use a small number of strong projects.

Do not create a wall of 20 cards.

Recommended initial structure:

## Featured project



### AI Meter

Large card with:

- Logo/icon
- Project name
- Short tagline
- Status
- Platform badges
- Screenshot
- GitHub
- Project page / details

Example:

```text
AI METER
BUILDING

A quiet, local-first usage meter for Cursor Pro,
Pro+, and Ultra.

macOS · iPhone · Apple Watch · Swift

[View Project] [GitHub]
```

---



## Supporting projects

Smaller cards for:

- Daily On Plan
- Other future utilities

Only include projects that are interesting enough to communicate something about JamesWare.

---



# 20. Project Card Metadata

A consistent metadata system could be useful.

Example:

```text
STATUS      BUILDING
PLATFORM    macOS / iOS
STACK       Swift / SwiftUI
TYPE        Utility
```

Statuses:

- RELEASED
- BUILDING
- EXPERIMENT
- OPEN SOURCE
- ARCHIVED

These should feel like small terminal/instrument labels.

---



# 21. Workbench

This could become one of the signature JamesWare sections.

Purpose:

A home for things that are interesting but not polished products.

Possible content:

- Experiments
- Proofs of concept
- CLI tools
- Swift utilities
- APIs
- AI experiments
- Design prototypes
- Small GitHub projects

Possible heading:

# Workbench

Supporting line:

> Experiments, prototypes, and things I'm figuring out.

This gives JamesWare permission to ship unfinished ideas publicly.

---



# 22. What I Build

Keep this focused.

Possible categories:

## Native Apps

macOS, iPhone, iPad, Apple Watch, widgets, and focused utilities.

## Developer Tools

Tools that make building, monitoring, or understanding software easier.

## Systems

APIs, integrations, backend services, operational workflows, and production software.

## AI + Automation

Agents, automated research, document analysis, and workflow tooling.

## Experiments

Ideas worth testing even when they do not need to become companies.

---



# 23. About

The About section should be short.

Possible starting copy:

> JamesWare is the independent software studio of James Jewhurst. I’m a software architect and product-minded engineer who likes building useful systems from end to end — from product and UX through architecture, implementation, and operations.

> My professional work has included software platforms, APIs, integrations, automotive systems, communications, developer tooling, and engineering infrastructure. JamesWare is where I build the smaller tools, native apps, experiments, and ideas I want to exist.

> I care about software that is fast, understandable, thoughtful, and genuinely useful.

This section can later link to a full `/about` page if needed.

---



# 24. GitHub

GitHub should be prominent.

JamesWare should make it easy to move between:

```text
JamesWare
↕
GitHub
↕
Project
```

Project links may eventually include:

- Website
- GitHub
- Download
- Docs
- App Store

Only show actions that actually exist.

---



# 25. Footer

Recommended footer:

```text
Made with care, by JamesWare.
A Jewhurst Engineering company.
```

Optional technical detail:

```text
Built by hand. Hosted on GitHub.
```

Or:

```text
© 2026 JamesWare
Made with care.
```

Keep it understated.

---



# 26. Site Personality

The site should feel:

- Personal without being autobiographical
- Technical without being inaccessible
- Retro without being kitschy
- Professional without being corporate
- Experienced without bragging
- Playful without looking amateur
- Minimal without feeling empty

---



# 27. Things We Should Avoid

Do not build:

### A résumé homepage

Avoid:

```text
20+ years experience
Go
Python
AWS
Leadership
Agile
```

as the primary story.

### A fake agency

Avoid:

```text
Our solutions
Our clients
Book a call
Transform your business
```

JamesWare is not pretending to be a 40-person agency.

### A hacker parody

Avoid:

- Matrix rain
- Constant glitching
- Excessive scanlines
- Fake root prompts
- Green text everywhere
- Sound effects



### A generic portfolio

Avoid huge grids of:

```text
Weather App
Todo App
Calculator
Demo Project
```

Projects should exist because they say something about JamesWare.

---



# 28. Content Voice

Writing should be:

- Short
- Clear
- Slightly technical
- Human
- Confident
- Matter-of-fact
- Occasionally playful

Good:

> A tiny macOS utility that keeps AI usage where it belongs: one glance away.

Good:

> Experiments, prototypes, and things I'm figuring out.

Good:

> Independent software. Apps, tools, and useful things.

Bad:

> Leveraging next-generation technologies to create innovative digital experiences.

---



# 29. Possible Microcopy

Terminal / status style labels:

```text
STATUS: BUILDING
TYPE: UTILITY
PLATFORM: macOS
SOURCE: OPEN
```

Navigation hover:

```text
open project →
```

Workbench:

```text
currently on the bench
```

Project status:

```text
shipping soon
```

GitHub:

```text
view source →
```

Footer:

```text
made with care
```

---



# 30. Suggested v1 Content

For the first public version, keep the scope small.

## Hero

JamesWare

Independent software. Apps, tools, and useful things.

## Terminal

Animated brand message.

## Selected Work

1. AI Meter
2. Daily On Plan Tracker
3. Product Analysis / AI tooling
4. One additional project if polished enough



## Workbench

3–6 smaller experiments.

## What I Build

4 categories.

## About

2–3 paragraphs.

## Footer

Made with care, by JamesWare.

A Jewhurst Engineering company.

---



# 31. Project Detail Page — Future

Eventually individual projects can use:

```text
/project/cursor-usage-tracker
/project/james-poker
```

Recommended structure:

```text
Project Name
Tagline
Screenshot
Status
Platforms
Links

Problem
What it does
Why I built it
Technology
Current state
Screenshots
GitHub / Download
```

But this is not required for v1.

---



# 32. Notes / Build Log — Future

A future `/notes` section could be valuable.

Topics might include:

- Building native Swift utilities
- Local-first software
- Cursor usage APIs
- Software architecture
- Automotive product design
- AI workflow experiments
- Building with LLMs
- Product engineering
- Developer tools

The writing should feel like engineering notes rather than SEO blog posts.

Possible section names:

- Notes
- Log
- Build Log
- Lab Notes
- Dispatches

**Notes** is probably the cleanest.

---



# 33. Site Implementation Philosophy

The implementation should reflect the product philosophy.

Prefer:

- Static HTML
- CSS
- Small amount of JavaScript
- GitHub Pages
- Fast loading
- No unnecessary framework
- Accessible markup
- Responsive layout
- Progressive enhancement

Do not introduce a framework simply because frameworks exist.

The site itself should be an example of JamesWare software:

> small, understandable, fast, and carefully made.

---



# 34. Terminal Implementation Rules

The terminal typing effect is part of the identity and should remain.

Requirements:

- Real HTML text underneath animation
- Respect `prefers-reduced-motion`
- Do not delay access to important content
- Keep typing speed relatively fast
- Do not endlessly replay
- Mobile-friendly
- No layout jumping
- No audio
- No fake loading delays

Possible flow:

```text
jamesware@dev:~$ whoami
JamesWare

jamesware@dev:~$ mission
Building useful things with care.

jamesware@dev:~$ status
Making software.
```

---



# 35. Visual Details Worth Exploring

Potential design motifs:

- Terminal cursor
- Small status LEDs
- Grid / technical drawing patterns
- Instrument labels
- Fine green borders
- PCB-like traces used very sparingly
- Hex / engineering geometry
- Small monospace metadata
- CRT-inspired glow used subtly
- Project status lights
- Crosshair / coordinate marks
- Vintage equipment labels

The design should never compromise readability.

---



# 36. Potential Hero Variations



## Option A — Strongest

```text
JAMESWARE

Independent software.
Apps, tools, and useful things.

[View Work]   [GitHub]
```



## Option B

```text
JAMESWARE

Software that makes
complicated things simpler.

Apps · Tools · Experiments
```



## Option C

```text
JAMESWARE

Useful software,
thoughtfully made.
```

Option A is currently the strongest because it leaves room for the work to define the brand.

---



# 37. Possible Section Labels

Instead of generic headings:


| Generic          | JamesWare     |
| ---------------- | ------------- |
| Portfolio        | Selected Work |
| Side Projects    | Workbench     |
| Services         | What I Build  |
| Blog             | Notes         |
| About Me         | About         |
| Technologies     | Tools / Stack |
| Contact          | Find Me       |
| Current Projects | On the Bench  |


Use these selectively. Too much themed terminology can become gimmicky.

---



# 38. Long-Term JamesWare Structure

If the site expands:

```text
jamesware.dev
│
├── /
│   └── studio homepage
│
├── /projects
│   └── project index
│
├── /projects/cursor-usage-tracker
│
├── /projects/james-poker
│
├── /workbench
│
├── /notes
│
├── /about
│
└── /github → external
```

Do not build this complexity until the content requires it.

---



# 39. Brand Architecture

Recommended:

```text
JEWHURST ENGINEERING
        ↓
    JAMESWARE
        ↓
 ┌──────┼─────────┐
 Apps  Tools  Experiments
```

JamesWare is the brand users should remember.

Jewhurst Engineering can remain subtle.

Example:

```text
JamesWare
A Jewhurst Engineering company
```

Do not make users understand a complicated company structure.

---



# 40. Current Brand Rules



## Use

**JamesWare**

Capital J, capital W.

Domain:

**jamesware.dev**

Signature:

**Made with care, by JamesWare.**

## Avoid making primary

- MadeByJames
- Made by James
- Jewhurst Engineering

Those can still exist contextually, but JamesWare should remain the main studio identity.

---



# 41. Homepage Content Priority

When someone visits jamesware.dev, they should understand these things in roughly this order:

1. **JamesWare makes software.**
2. **The software is independent, useful, and thoughtfully built.**
3. **Here are real things JamesWare is making.**
4. **There is serious engineering experience behind the work.**
5. **JamesWare has personality.**
6. **Here is where to see the code / learn more.**

The visitor should not have to read the About section to understand the site.

---



# 42. v1 Definition of Done

The first strong version of jamesware.dev is done when:

- [ ] Hero clearly explains JamesWare
- [ ] British Racing Green / terminal-green identity is consistent
- [ ] JW logo is used cleanly
- [ ] Terminal typing effect works
- [ ] Reduced-motion users get a clean experience
- [ ] AI Meter is featured
- [ ] At least 2–3 other projects are present
- [ ] Workbench section exists
- [ ] About section is concise
- [ ] GitHub is easy to find
- [ ] Mobile layout feels intentional
- [ ] No unnecessary framework dependency
- [ ] Page loads quickly
- [ ] Metadata / SEO tags are complete
- [ ] Open Graph image exists
- [ ] Favicon exists
- [ ] Footer includes JamesWare identity
- [ ] `Made with care, by JamesWare.` appears naturally
- [ ] Site feels like JamesWare rather than a template

---



# 43. Next Build Steps



## Phase 1 — Structure

- Finalize homepage sections
- Decide public projects
- Decide project statuses
- Write final hero copy
- Write About copy
- Write project summaries



## Phase 2 — Visual System

- Lock primary colors
- Lock fonts
- Finalize logo usage
- Define spacing system
- Define card styles
- Define terminal style
- Define status badges
- Define mobile behavior



## Phase 3 — Build

- Update HTML structure
- Build responsive layout
- Implement project cards
- Preserve / improve terminal animation
- Add subtle retro details
- Add accessibility support
- Test reduced motion
- Test mobile



## Phase 4 — Content

- Add screenshots
- Add GitHub links
- Add project links
- Add statuses
- Add metadata
- Add social preview image



## Phase 5 — Polish

- Review spacing
- Review hierarchy
- Remove unnecessary elements
- Check color contrast
- Optimize assets
- Test page speed
- Test Safari
- Test Chrome
- Test mobile Safari

---



# 44. Guiding Question

Any time we are unsure whether something belongs on jamesware.dev, ask:

> **Does this make JamesWare feel more like a thoughtful software workshop, or more like a generic developer portfolio?**

Choose the software workshop.

---



# 45. North Star

The finished site should leave someone with this impression:

> JamesWare is a small independent software studio run by someone who has spent a long time building real software, still enjoys making things, cares about how they work, and ships tools because they ought to exist.

It should feel experienced without feeling corporate.

Technical without feeling performative.

Retro without feeling nostalgic for nostalgia's sake.

And above all:

> **Made with care, by JamesWare.**

