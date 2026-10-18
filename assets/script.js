const WHATSAPP_NUMBER = "918977206820";

// Mobile navigation
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Header state
const header = document.querySelector('.site-header');
const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

// Reveal on scroll
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Footer year
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

// Preselect project type from the URL and build the WhatsApp enquiry
const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const selectedType = params.get('type');
  const typeSelect = enquiryForm.elements.type;
  if (selectedType && typeSelect) {
    const matchingOption = [...typeSelect.options].find(option => option.value === selectedType);
    if (matchingOption) typeSelect.value = selectedType;
  }

  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      if (status) status.textContent = 'Please complete the required fields.';
      return;
    }

    const data = new FormData(enquiryForm);
    const message = [
      '*NEW PROJECT REQUEST — NEZAAD INDUSTRIES*',
      '',
      `*Name:* ${data.get('name')}`,
      `*Email:* ${data.get('email') || 'Not provided'}`,
      `*Phone:* ${data.get('phone')}`,
      `*Project type:* ${data.get('type')}`,
      `*Timeline:* ${data.get('timeline') || 'Not specified'}`,
      `*Budget range:* ${data.get('budget') || 'Not specified'}`,
      '',
      '*Scope / details:*',
      data.get('details'),
      '',
      "_I'll reply within one working day to confirm scope and a timeline._"
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    if (status) status.textContent = 'Opening WhatsApp…';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
