# Irton De Ascencao — Personal Website

A personal portfolio site for a Systems Engineer. Built with vanilla HTML, CSS, and an Express static server — no frameworks, no build step.

---

## Stack

- **Frontend** — HTML5, CSS3 (JetBrains Mono, Font Awesome)
- **Server** — Node.js + Express (static file serving)
- **Hosting** — Self-hosted via Docker on HomeNAS

---

## Structure

```
MyWebsite/
├── public/
│   ├── index.html              # Home page
│   ├── css/
│   │   └── style.css           # Global styles
│   ├── pages/
│   │   ├── projects.html       # Projects listing
│   │   ├── homeNas.html        # HomeNAS project detail
│   │   ├── journey.html        # My Journey page
│   │   └── contact_me.html     # Contact page
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── products/
├── src/
│   └── server.js               # Express entry point
├── package.json
└── .gitignore
```

---

## Running Locally

```bash
npm install
node src/server.js
```

Then open `http://localhost:3000` in your browser.

---

## Pages

| Page | Description |
|---|---|
| Home | Hero layout with skills, journey, and product exposure |
| Projects | Project listing with cards linking to dedicated pages |
| HomeNAS | 5-year homelab NAS build journey across 4 versions |
| My Journey | Career and education timeline |
| Contact Me | Contact form |
