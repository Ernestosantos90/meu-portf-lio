// Ano automático no footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Tema: carregar preferência e alternar
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    body.setAttribute('data-theme', savedTheme);
  } else {
    const prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    body.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  }

  function updateThemeUI() {
    const current = body.getAttribute('data-theme');
    if (current === 'light') {
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Light';
    } else {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Dark';
    }
  }
  updateThemeUI();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeUI();
    });
  }

  // Scroll suave para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Menu mobile: abre/fecha nav como overlay
  const navToggle = document.getElementById('navToggle');
  const desktopNav = document.getElementById('desktopNav');
  let mobileNavOpen = false;

  if (navToggle && desktopNav) {
    navToggle.addEventListener('click', () => {
      mobileNavOpen = !mobileNavOpen;
      if (mobileNavOpen) {
        desktopNav.style.display = 'flex';
        desktopNav.style.position = 'absolute';
        desktopNav.style.top = '64px';
        desktopNav.style.right = '16px';
        desktopNav.style.padding = '0.4rem';
        desktopNav.style.borderRadius = '999px';
        desktopNav.style.background = getComputedStyle(
          document.body
        ).getPropertyValue('--glass');
        desktopNav.style.backdropFilter = 'blur(18px)';
        desktopNav.style.boxShadow = '0 18px 42px rgba(15,23,42,0.7)';
      } else {
        desktopNav.removeAttribute('style');
      }
    });

    // Ocultar menu mobile ao clicar em um link
    desktopNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 980 && mobileNavOpen) {
          mobileNavOpen = false;
          desktopNav.removeAttribute('style');
        }
      });
    });
  }

  // Animação de reveal nas seções
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // fallback: mostra tudo se IntersectionObserver não existir
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // Formulário: validação simples
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  if (form && formMsg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.textContent = '';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMsg.textContent = 'Por favor, preencha todos os campos.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMsg.textContent = 'Email inválido.';
        return;
      }

      formMsg.textContent =
        'Mensagem enviada (exemplo). Configure um backend ou serviço de formulários para envio real.';
      form.reset();
      setTimeout(() => (formMsg.textContent = ''), 5000);
    });
  }

  // Botão mailto
  const mailtoBtn = document.getElementById('mailtoBtn');
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      const name = encodeURIComponent(
        document.getElementById('name')?.value || ''
      );
      const email = encodeURIComponent(
        document.getElementById('email')?.value || ''
      );
      const message = encodeURIComponent(
        document.getElementById('message')?.value || ''
      );
      const body = `Nome: ${name}%0AEmail: ${email}%0A%0A${message}`;
      window.location.href = `mailto:LadioBenkz@gmail.com?subject=Contato%20do%20Portf%C3%B3lio&body=${body}`;
    });
  }
});
