import { MDCDrawer } from '@material/drawer';
import { MDCTextField } from '@material/textfield';

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const backdrop = document.querySelector('.mdc-drawer-scrim');
const navbarToggler = document.querySelector('.navbar-toggler');

function togglerDrawer(event) {
  drawer.open = !drawer.open;
}
navbarToggler.addEventListener('click', togglerDrawer);
backdrop.addEventListener('click', togglerDrawer);

const form = document.querySelector('#contactForm');
if(form) {
  const inputNome = new MDCTextField(document.querySelector('.mdc-text-field-nome'));
  const inputEmail = new MDCTextField(document.querySelector('.mdc-text-field-email'));
  const inputMessage = new MDCTextField(document.querySelector('.mdc-text-field-message'));
}


