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

// Preselect service from URL and create the WhatsApp enquiry
const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get('service');
  const serviceSelect = enquiryForm.elements.service;
  if (selectedService && serviceSelect) {
    const matchingOption = [...serviceSelect.options].find(option => option.value === selectedService);
    if (matchingOption) serviceSelect.value = selectedService;
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
      '*NEW SERVICE REQUEST — NEZAAD INDUSTRIES*',
      '',
      `*Name:* ${data.get('name')}`,
      `*Phone:* ${data.get('phone')}`,
      `*Service:* ${data.get('service')}`,
      `*Approx. budget:* ${data.get('budget') || 'Not specified'}`,
      `*Preferred deadline:* ${data.get('deadline') || 'Flexible / not specified'}`,
      `*Best time to call:* ${data.get('calltime') || 'Any time'}`,
      '',
      '*Work details:*',
      data.get('details'),
      '',
      '_I understand that the final price depends on scope and complexity, includes up to 3 revisions, and that website domain/hosting charges are separate._'
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    if (status) status.textContent = 'Opening WhatsApp…';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
