export default function getThemeColor() {
  if (globalThis?.__getThemeColor) {
    return globalThis.__getThemeColor() ?? '';
  }
}
