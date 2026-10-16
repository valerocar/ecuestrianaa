'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
navigation.addEventListener('focusout', event => {
  if (!event.relatedTarget?.closest('.header')) closeMenu();
});

const filmDialog = document.querySelector('#film-dialog');
const film = document.querySelector('#school-film');
let lastTrigger = null;
function openDialog(dialog, trigger) {
  lastTrigger = trigger;
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-open-film]').forEach(button => {
  button.addEventListener('click', () => {
    openDialog(filmDialog, button);
    film.play().catch(() => { /* Native video controls remain available. */ });
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (dialog === filmDialog) film.pause();
    lastTrigger?.focus({preventScroll: true});
  });
});

const gallery = [
  { src: 'assets/enhanced/training-enhanced.jpg', title: 'El placer de estar aquí', alt: 'Una amazona y su caballo comparten la pista con un perro' },
  { src: 'assets/enhanced/jumping-enhanced.jpg', title: 'Un salto a la vez', alt: 'Una amazona y su caballo durante un salto' },
  { src: 'assets/enhanced/community-enhanced.jpg', title: 'La mejor compañía', alt: 'Una amazona acaricia a un caballo sentada sobre el pasto' }
];
const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const galleryTitle = document.querySelector('#gallery-title');
let galleryIndex = 0;
function showPhoto(index) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const photo = gallery[galleryIndex];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryTitle.textContent = photo.title;
  document.querySelector('#gallery-counter').textContent = `${galleryIndex + 1} / ${gallery.length}`;
  galleryDialog.setAttribute('aria-label', `Galería: ${photo.title}`);
}
document.querySelectorAll('[data-gallery]').forEach(button => {
  button.addEventListener('click', () => {
    showPhoto(Number(button.dataset.gallery));
    openDialog(galleryDialog, button);
  });
});
document.querySelector('#gallery-prev').addEventListener('click', () => showPhoto(galleryIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showPhoto(galleryIndex + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPhoto(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

// A horizontal swipe advances photos; vertical scrolling and pinch zoom stay native.
let photoGesture = null;
galleryImage.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch' && event.isPrimary) {
    photoGesture = {id: event.pointerId, x: event.clientX, y: event.clientY};
  }
});
galleryImage.addEventListener('pointerup', event => {
  if (!photoGesture || event.pointerId !== photoGesture.id) return;
  const dx = event.clientX - photoGesture.x;
  const dy = event.clientY - photoGesture.y;
  photoGesture = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    showPhoto(galleryIndex + (dx < 0 ? 1 : -1));
  }
});
galleryImage.addEventListener('pointercancel', () => { photoGesture = null; });
galleryDialog.addEventListener('close', () => { photoGesture = null; });

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#visitor-name').value.trim();
  const interest = document.querySelector('#visitor-interest').value;
  const message = `Hola, Ecuestrianaa.${name ? ` Soy ${name}.` : ''} Me gustaría ${interest}. ¿Me pueden compartir información?`;
  window.open(`https://wa.me/523334431233?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  document.querySelector('#contact-status').textContent = 'Abriendo WhatsApp con tu mensaje. También puedes usar el enlace de contacto directo.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
