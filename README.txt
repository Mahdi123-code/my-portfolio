# Mahdi Taheri — Animated Personal Portfolio

## Files
- `index.html` — page structure/content
- `style.css` — responsive design, colors, cards and animations
- `script.js` — scroll reveal, active navigation, mobile menu, FAQ, progress bar and back-to-top
- `assets/` — starter images extracted from the supplied screenshot

## Run
Open `index.html` directly in a browser, or use VS Code + Live Server.

## Important
The images in `assets/` are starter crops from the supplied screenshot. Replace them with your original high-resolution portrait/project screenshots for the best visual result.

## Main animation system
The website uses `IntersectionObserver` in `script.js`. Elements with `.reveal` become `.is-visible` when they enter the viewport. The CSS then animates opacity and transform.

You can control the animation speed in `.reveal` inside `style.css`.

## Replace project links
Search for:
`href="#"`

and replace those links with your real project/case-study URLs.

## Connect the contact form
The current form is a frontend demo. Connect it to your Node/Express API, PHP endpoint, Formspree, EmailJS, or another backend/email service when ready.
