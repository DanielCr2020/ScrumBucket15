const validation = require('./clientValidation');

test('checkUsername returns the username when valid', () => {
  expect(validation.checkUsername('JohnDoe')).toBe('JohnDoe');
});

test('checkUsername throws an error when no username is provided', () => {
  expect(() => validation.checkUsername()).toThrow('No username provided');
});

test('checkUsername throws an error when username is not a string', () => {
  expect(() => validation.checkUsername(123)).toThrow('Username must be a string');
});

test('checkUsername throws an error when username is too short', () => {
  expect(() => validation.checkUsername('JD')).toThrow('Username must be at least 3 characters long');
});

test('checkPassword returns the password when valid', () => {
  expect(validation.checkPassword('SecurePassword123')).toBe('SecurePassword123');
});

test('checkPassword throws an error when no password is provided', () => {
  expect(() => validation.checkPassword()).toThrow('No password provided');
});

test('checkPassword throws an error when password is not a string', () => {
  expect(() => validation.checkPassword(12345)).toThrow('Password must be a string');
});

test('checkPassword throws an error when password is too short', () => {
  expect(() => validation.checkPassword('12')).toThrow('Password must be at least 3 characters long');
});

test('checkDisplayName returns the displayName when valid', () => {
  expect(validation.checkDisplayName('John Doe')).toBe('John Doe');
});

test('checkDisplayName throws an error when no displayName is provided', () => {
  expect(() => validation.checkDisplayName()).toThrow('No displayName provided');
});

test('checkDisplayName throws an error when displayName is not a string', () => {
  expect(() => validation.checkDisplayName(12345)).toThrow('displayName must be a string');
});

test('checkDisplayName throws an error when displayName is too short', () => {
  expect(() => validation.checkDisplayName('JD')).toThrow('displayName must be at least 3 characters long');
});
