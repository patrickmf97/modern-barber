// Troque pelo WhatsApp da barbearia no formato DDI + DDD + número, somente dígitos.
// Exemplo: '5521999999999'. Vazio mantém o site em modo demonstração.
const BARBERSHOP_WHATSAPP = '';

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menu = document.querySelector('#navbarNav');
  const serviceSelect = document.querySelector('#servico');
  const form = document.querySelector('#booking-form');
  document.querySelector('#current-year').textContent = new Date().getFullYear();

  const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateNavbar(); window.addEventListener('scroll', updateNavbar, { passive: true });
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { const collapse = bootstrap.Collapse.getInstance(menu); if (collapse) collapse.hide(); }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const showDemoNotice = () => { const notice = document.querySelector('#demo-notice'); notice.classList.add('visible'); window.setTimeout(() => notice.classList.remove('visible'), 4500); };
  const openWhatsApp = message => {
    if (!BARBERSHOP_WHATSAPP) { showDemoNotice(); document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' }); return; }
    window.open(`https://wa.me/${BARBERSHOP_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  document.querySelectorAll('.js-booking').forEach(button => button.addEventListener('click', event => { if (!BARBERSHOP_WHATSAPP) return; event.preventDefault(); openWhatsApp('Olá! Vim pelo site e gostaria de agendar um horário.'); }));
  document.querySelectorAll('.js-service').forEach(button => button.addEventListener('click', event => { event.preventDefault(); serviceSelect.value = button.dataset.service; document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' }); }));
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!form.checkValidity()) { form.reportValidity(); return; }
    const name = document.querySelector('#nome').value.trim(); const phone = document.querySelector('#telefone').value.trim(); const service = serviceSelect.value; const preference = document.querySelector('#preferencia').value.trim() || 'a combinar';
    openWhatsApp(`Olá! Meu nome é ${name}. Gostaria de solicitar um agendamento.\n\nServiço: ${service}\nPreferência: ${preference}\nMeu WhatsApp: ${phone}`);
  });
});
