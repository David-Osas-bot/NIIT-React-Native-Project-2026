export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#!$&^]).{8,}$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}