// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight nav on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('main .section');
  let scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// Contact form feedback
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    }, 1200);
  });
}

// --- Modern Skills Section: Tooltips Only ---
document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelectorAll('.skill-modern');
  skills.forEach(skill => {
    // Only add tooltip, no progress bar
    const desc = skill.getAttribute('data-desc');
    if (desc) {
      const tooltip = document.createElement('span');
      tooltip.className = 'tooltip';
      tooltip.textContent = desc;
      skill.appendChild(tooltip);
      skill.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
      });
      skill.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        tooltip.style.opacity = '0';
      });
    }
  });
});

// Mobile nav hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');
if (navToggle && navLinksList) {
  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });
  // Close menu when a link is clicked (on mobile)
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
    });
  });
}
