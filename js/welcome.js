// Welcome page entrance animations
document.addEventListener('DOMContentLoaded', () => {
  const icon = document.querySelector('.app-icon');
  const title = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  const desc = document.querySelector('.hero-description');
  const content = document.querySelector('.content-section');
  const cta = document.querySelector('.cta-button');

  const els = [icon, title, subtitle, desc, content, cta].filter(Boolean);
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});
