export default function getThemeColor() {
  return getComputedStyle(document.body).getPropertyValue('--color1-shade');
}
