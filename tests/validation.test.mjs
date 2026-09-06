import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateForm } from '../src/validation.js';
const valid = { register: true, name: 'Ana', email: 'ana@example.com', password: 'exemplo123', confirm: 'exemplo123' };
test('cadastro válido não produz erros', () => assert.deepEqual(validateForm(valid), {}));
test('cadastro rejeita campos vazios e e-mail inválido', () => {
  const errors = validateForm({ register: true, name: '', email: 'invalido', password: '', confirm: '' });
  assert.deepEqual(Object.keys(errors).sort(), ['email', 'name', 'password']);
});
test('confirmação de senha diferente impede cadastro', () => assert.ok(validateForm({ ...valid, confirm: 'outra123' }).confirm));
test('login não exige nome nem confirmação', () => assert.deepEqual(validateForm({ ...valid, register: false, name: '', confirm: '' }), {}));
test('espaços não contam como nome e e-mail é aparado', () => {
  assert.ok(validateForm({ ...valid, name: '  ' }).name);
  assert.deepEqual(validateForm({ ...valid, email: '  ana@example.com  ' }), {});
});
