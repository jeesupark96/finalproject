
export default function checkAlphanumeric(string) {
  let code;
  for (let i = 0; i < string.length; i++) {
    code = string.charCodeAt(i);
    if ((code > 47 && code < 58) ||
      (code > 64 && code < 91) ||
      (code > 96 && code < 123)
    ) {
      return true;
    }
  }
  return false;
}
