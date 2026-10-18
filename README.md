# NEZAAD Industries — Website

A lightweight, database-free multi-page website for **Nezaad**, an independent web developer
based in Kalluru, Khammam, Telangana. Project enquiries are formatted locally in the browser
and opened in WhatsApp — nothing is sent to a server, and nothing is stored.

## Stack

Hand-written HTML, CSS and vanilla JavaScript. No framework, no bundler, no dependencies,
no build step. The whole site is four pages and one stylesheet.

## Preview locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to Vercel

Import this folder/repository in Vercel. No framework preset, build command, environment
variables, database or API keys are required — Vercel serves the files as static output.
`vercel.json` sets `cleanUrls` and three security headers. `404.html` is served automatically
for unknown paths.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, what I build, stack & capabilities, how I work |
| `capabilities.html` | Detailed capabilities, the full stack, and stated limits |
| `about.html` | Background, principles, working environment |
| `contact.html` | Enquiry form → WhatsApp message |
| `404.html` | Not-found page |

## Enquiry flow

The form in `contact.html` builds a WhatsApp message and opens `wa.me/918977206820`. The
message is assembled in the browser from the form fields; the visitor reviews it and chooses
to send it. To change the destination number, edit `WHATSAPP_NUMBER` in `assets/script.js`.

Project types can be pre-selected through the URL, e.g. `contact.html?type=Web%20app%20or%20internal%20tool`.

## Before going live

- **Canonical + Open Graph URLs** — the `og:image` and `og:title` tags use relative paths.
  Replace them with absolute URLs (`https://your-domain/...`) once the domain is live.
- **Sitemap** — add a `Sitemap:` line to `robots.txt` and a `sitemap.xml` at the root.
- **Domain and hosting** are registered in the client's name and billed by the provider
  directly; they are not marked up here.
