export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Requires: 8+ characters, at least one letter, at least one number
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}