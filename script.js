// ===== Mobile menu toggle =====
const menuBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ===== Highlight active nav link =====
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === here || (here === '' && href === 'index.html')) a.classList.add('active');
});

// ===== Reveal on scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== 3D tilt on mouse move (product + hero bottles) =====
function attachTilt(el, intensity = 12) {
  let rafId;
  const onMove = (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(1.02)`;
    });
  };
  const reset = () => {
    cancelAnimationFrame(rafId);
    el.style.transform = '';
  };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', reset);
}
document.querySelectorAll('.product-card').forEach(c => attachTilt(c, 10));
document.querySelectorAll('.hero-bottle').forEach(c => attachTilt(c, 14));

// ===== Contact form (demo only) =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      form.reset();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2000);
    }, 800);
  });
}
