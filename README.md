# NEZAAD Industries Website

A lightweight, database-free multi-page website for NEZAAD Industries. Service enquiries are formatted locally in the browser and opened in WhatsApp.

## Preview locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to Vercel

Import this folder/repository in Vercel. No framework, build command, environment variables, database, or API keys are required.

## Enquiry flow

The form in `contact.html` builds a WhatsApp message and opens `wa.me/918977206820`. To change the destination number, edit `WHATSAPP_NUMBER` in `assets/script.js`.
