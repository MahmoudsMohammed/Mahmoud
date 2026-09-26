import emailjs from '@emailjs/browser';
import { gsap, prefersReduced } from './animations/setup.js';

const EMAILJS = {
  service: 'service_cg0kdwt',
  template: 'template_3kqzz2c',
  publicKey: '0RGJJ45VdilTT11ha',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

let toastTl;

export function showToast(message, type = 'success') {
  const toast = document.querySelector('.toast');
  toast.querySelector('.toast__text').textContent = message;
  toast.classList.toggle('is-error', type === 'error');
  const [circle, check] = toast.querySelectorAll('.toast__icon > *');
  check.style.display = type === 'error' ? 'none' : '';

  toastTl?.kill();
  const reduce = prefersReduced();
  toastTl = gsap
    .timeline()
    .fromTo(toast, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: reduce ? 0.01 : 0.5, ease: 'back.out(1.6)' })
    .fromTo(circle, { drawSVG: 0 }, { drawSVG: '100%', duration: reduce ? 0.01 : 0.6, ease: 'power2.out' }, '<0.1')
    .fromTo(check, { drawSVG: 0 }, { drawSVG: '100%', duration: reduce ? 0.01 : 0.4, ease: 'power2.out' }, '-=0.15')
    .to(toast, { autoAlpha: 0, y: 20, duration: 0.4, ease: 'power2.in' }, '+=3.2');
}

function shake(el) {
  if (prefersReduced()) return;
  gsap.fromTo(el, { x: 0 }, { keyframes: { x: [-8, 8, -6, 6, -3, 3, 0] }, duration: 0.5, ease: 'none' });
}

function validate(form) {
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    message: form.elements.message,
  };
  let error = '';
  const invalid = [];

  Object.values(fields).forEach((input) => {
    if (!input.value.trim()) invalid.push(input);
  });
  if (invalid.length) {
    error = 'Please fill in all the fields.';
  } else if (!EMAIL_RE.test(fields.email.value.trim())) {
    error = 'Please enter a valid email address.';
    invalid.push(fields.email);
  }

  form.querySelectorAll('.field').forEach((f) => f.classList.remove('is-invalid'));
  invalid.forEach((input) => {
    const field = input.closest('.field');
    field.classList.add('is-invalid');
    shake(field);
  });
  invalid[0]?.focus();
  return error;
}

function initForm() {
  const form = document.querySelector('#contact-form');
  const errorEl = form.querySelector('.form__error');
  const submit = form.querySelector('.form__submit');
  const submitText = submit.querySelector('.form__submit-text');

  form.addEventListener('input', (e) => {
    e.target.closest('.field')?.classList.remove('is-invalid');
    errorEl.textContent = '';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const error = validate(form);
    errorEl.textContent = error;
    if (error) return;

    submit.disabled = true;
    submitText.textContent = 'Sending…';
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form, { publicKey: EMAILJS.publicKey });
      form.reset();
      showToast("Message sent. I'll get back to you soon.");
    } catch {
      showToast('Something went wrong. Please email me directly.', 'error');
    } finally {
      submit.disabled = false;
      submitText.textContent = 'Send message';
    }
  });
}

function initCopy() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        showToast('Email copied to clipboard.');
        const icon = btn.querySelector('i');
        icon.className = 'fa-solid fa-check';
        gsap.fromTo(icon, { scale: 0.4 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
        setTimeout(() => (icon.className = 'fa-regular fa-copy'), 2000);
      } catch {
        showToast('Could not copy. Please copy it manually.', 'error');
      }
    });
  });
}

export function initContact() {
  initForm();
  initCopy();
}
