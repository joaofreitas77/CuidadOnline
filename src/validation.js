export function validateForm({ register, name, email, password, confirm }) {
  const errors = {};
  if (register && name.trim().length < 2) errors.name = 'Digite seu nome, por favor.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Confira o e-mail. Exemplo: nome@email.com';
  if (password.length < 8) errors.password = 'Use pelo menos 8 caracteres.';
  if (register && password !== confirm) errors.confirm = 'As duas senhas precisam ser iguais.';
  return errors;
}
