/* =========================
   MAHDI TAHERI PORTFOLIO JS
   ========================= */

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navLinks");
const progress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

/* Mobile navigation */
menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("i").className = isOpen ? "bx bx-x" : "bx bx-menu";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");

    const icon = menuToggle?.querySelector("i");
    if (icon) icon.className = "bx bx-menu";
  });
});

/* Reveal elements as they enter the viewport */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

/* Active navigation link */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => link.classList.remove("active"));

    const activeLink = document.querySelector(
      `.nav-links a[href="#${entry.target.id}"]`
    );

    activeLink?.classList.add("active");
  });
}, {
  rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => sectionObserver.observe(section));

/* Scroll progress + back-to-top */
function updateScrollUI() {
  const scrollTop = window.scrollY;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

  progress.style.width = `${percentage}%`;
  backToTop.classList.toggle("show", scrollTop > 650);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* FAQ: keep the interaction clean by closing other items */
document.querySelectorAll(".faq-list details").forEach(detail => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".faq-list details").forEach(other => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

/* Demo contact form */
contactForm?.addEventListener("submit", event => {
  event.preventDefault();

  const button = contactForm.querySelector("button");
  button.disabled = true;
  button.textContent = "Sending...";

  setTimeout(() => {
    formStatus.textContent =
      "Message captured for this demo. Connect the form to your backend/email service.";
    button.disabled = false;
    button.textContent = "Send Message";
    contactForm.reset();
  }, 800);
});

/* Small parallax effect for the hero portrait */
const heroPhoto = document.querySelector(".hero-image-wrap");

window.addEventListener("scroll", () => {
  if (!heroPhoto || window.innerWidth < 700) return;

  const rect = heroPhoto.getBoundingClientRect();
  const centerOffset = (window.innerHeight / 2 - (rect.top + rect.height / 2));
  const move = Math.max(-14, Math.min(14, centerOffset * 0.025));

  heroPhoto.style.transform = `translateY(${move}px)`;
}, { passive: true });
