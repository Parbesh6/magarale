# Perfect Academy — Frontend Website

A complete, responsive frontend website for **Perfect Academy**, a practical, technology and career-focused education academy.

> "Information Technology is Most Important in Our Daily Life." — Perfect Academy

## ✨ Features

- 7 fully built pages: Home, About Us, Courses, Certificate Verification, Reviews, Testimonials, Contact Us
- Sticky, scroll-aware Bootstrap 5 navbar with mobile hamburger menu
- Animated trust statistics (132K+ followers counter)
- Course slider (Slick Slider) and testimonials slider
- Category-based course filtering (jQuery, no page reload)
- Certificate Verification tool with sample frontend dataset + DataTables-powered records table (search, sort, pagination)
- Contact form and review form with jQuery validation
- Smooth scrolling, scroll-reveal animations, animated counters, back-to-top button
- Fully responsive: desktop, laptop, tablet, mobile

## 🛠 Tech Stack

Pure frontend — no backend or framework required:

- HTML5 / CSS3 / JavaScript (ES6)
- Bootstrap 5
- jQuery
- Slick Slider
- DataTables
- Bootstrap Icons
- Google Fonts (Space Grotesk, Inter, JetBrains Mono)

## 📁 Folder Structure

```
perfect-academy/
│
├── index.html
├── about.html
├── courses.html
├── certificate.html
├── reviews.html
├── testimonials.html
├── contact.html
│
├── css/
│   ├── style.css        # design tokens + all component styles
│   └── responsive.css   # breakpoint refinements
│
├── js/
│   ├── main.js           # navbar, counters, reveal animations, sliders, back-to-top
│   ├── courses.js        # course category filtering
│   ├── certificate.js    # certificate verification + DataTables
│   ├── reviews.js        # rating bars, star input, review form
│   └── validation.js     # contact form validation
│
├── images/
│   ├── logo/
│   ├── courses/
│   ├── students/
│   └── banners/
│
└── README.md
```

## 🚀 Getting Started

This is a fully static site — no build step or server required.

1. Unzip the project folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the best experience:
   ```bash
   cd perfect-academy
   python3 -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

## 🔎 Certificate Verification (Demo)

The Certificate Verification page uses a **sample, frontend-only dataset** defined in `js/certificate.js`. Try these sample IDs:

- `PA-2026-000123` — Valid
- `PA-2026-000128` — Revoked
- Any unknown ID — Not Found

> In production, replace `CERTIFICATE_DATA` in `js/certificate.js` with a real API call to Perfect Academy's certificate database/backend.

## 📌 Notes

- All contact details (phone, email, address, social links) are **placeholders** — replace with Perfect Academy's real information before going live.
- The map section is a placeholder — swap in a real Google Maps embed once the academy's location is confirmed.
- Replace placeholder icons/illustrations in `images/` with real photography/branding assets as available.

## © License

© 2026 Perfect Academy. All Rights Reserved.
