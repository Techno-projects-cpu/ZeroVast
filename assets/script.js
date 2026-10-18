const EMAIL_ADDRESSES = [
  'themerchantofdeath2011@gmail.com',
  'themerchantofdeath2000@gmail.com'
];

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

// Preselect project type from the URL and build the enquiry email
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
    const projectType = data.get('type');

    const body = [
      'New project request — NEZAAD Industries',
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Project type: ${projectType}`,
      `Timeline: ${data.get('timeline') || 'Not specified'}`,
      `Budget range: ${data.get('budget') || 'Not specified'}`,
      '',
      'Scope / details:',
      '----------------',
      data.get('details'),
      '',
      '---',
      "I'll reply within one working day to confirm scope and a timeline."
    ].join('\n');

    const subject = `New project request — ${projectType}`;
    const url = `mailto:${EMAIL_ADDRESSES.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // exposed for debugging; the browser then hands off to the visitor's mail app
    enquiryForm.dataset.mailto = url;
    if (status) status.textContent = 'Opening your email app…';
    window.location.href = url;
  });
}
