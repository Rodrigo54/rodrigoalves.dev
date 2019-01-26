import { MDCDrawer } from '@material/drawer';
import { MDCTextField } from '@material/textfield';
import Typed from 'typed.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const backdrop = document.querySelector('.mdc-drawer-scrim');
const navbarToggler = document.querySelector('.navbar-toggler');

function togglerDrawer(event) {
  drawer.open = !drawer.open;
}
navbarToggler.addEventListener('click', togglerDrawer);
backdrop.addEventListener('click', togglerDrawer);

const typeString = document.querySelector('#typed');
if(typeString) {
  const typed = new Typed('#typed', {
    strings: ["Developer", "Designer", "Geek", "Rodrigo^10000"],
    typeSpeed: 200,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });
}

const form = document.querySelector('#contactForm');
if(form) {
  const inputNome = new MDCTextField(document.querySelector('.mdc-text-field-nome'));
  const inputEmail = new MDCTextField(document.querySelector('.mdc-text-field-email'));
  const inputMessage = new MDCTextField(document.querySelector('.mdc-text-field-message'));
}
