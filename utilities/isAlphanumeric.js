export default function isAlphanumeric(str) {
  for (let i = 0, len = str.length; i < len; i++) {
    let code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) &&
      !(code > 64 && code < 91) &&
      !(code > 96 && code < 123)
    ) {
      return false;
    } else if (code === 32) {
      return true;
    }
  }
  return true;
}
