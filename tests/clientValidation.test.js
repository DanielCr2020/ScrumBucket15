import clientValidation from "../src/clientValidation";

test('checkUsername returns the username when valid', () => {
  expect(clientValidation.checkUsername('JohnDoe')).toBe('JohnDoe');
});

test('checkUsername throws an error when no username is provided', () => {
  expect(() => clientValidation.checkUsername()).toThrow('No username provided');
});

test('checkUsername throws an error when username is not a string', () => {
  expect(() => clientValidation.checkUsername(123)).toThrow('Username must be a string');
});

test('checkUsername throws an error when username is too short', () => {
  expect(() => clientValidation.checkUsername('JD')).toThrow('Username must be at least 3 characters long');
});

test('checkPassword returns the password when valid', () => {
  expect(clientValidation.checkPassword('SecurePassword123')).toBe('SecurePassword123');
});

test('checkPassword throws an error when no password is provided', () => {
  expect(() => clientValidation.checkPassword()).toThrow('No password provided');
});

test('checkPassword throws an error when password is not a string', () => {
  expect(() => clientValidation.checkPassword(12345)).toThrow('Password must be a string');
});

test('checkPassword throws an error when password is too short', () => {
  expect(() => clientValidation.checkPassword('12')).toThrow('Password must be at least 3 characters long');
});

test('checkDisplayName returns the displayName when valid', () => {
  expect(clientValidation.checkDisplayName('John Doe')).toBe('John Doe');
});

test('checkDisplayName throws an error when no displayName is provided', () => {
  expect(() => clientValidation.checkDisplayName()).toThrow('No displayName provided');
});

test('checkDisplayName throws an error when displayName is not a string', () => {
  expect(() => clientValidation.checkDisplayName(12345)).toThrow('displayName must be a string');
});

test('checkDisplayName throws an error when displayName is too short', () => {
  expect(() => clientValidation.checkDisplayName('JD')).toThrow('displayName must be at least 3 characters long');
});

// Skill Validation
test('checkSkillname returns the skill name when valid', () => {
  expect(clientValidation.checkSkillname('Knitting')).toBe('Knitting');
});

test('checkSkillname throws an error when no skill name is provided', () => {
  expect(() => clientValidation.checkSkillname()).toThrow('No skill name provided');
});

test('checkSkillname throws an error when skill name is not a string', () => {
  expect(() => clientValidation.checkSkillname(123)).toThrow('Skill name must be a string');
});

test('checkSkillname throws an error when skill name is too short', () => {
  expect(() => clientValidation.checkSkillname('KN')).toThrow('Skill name must be at least 3 characters long');
});

test('checkSkilllevel returns the skill level when valid', () => {
  expect(clientValidation.checkSkilllevel('4')).toBe(4);
});

test('checkSkilllevel throws an error when no skill level is provided', () => {
  expect(() => clientValidation.checkSkilllevel()).toThrow('No skill level provided');
});

test('checkSkilllevel throws an error when skill level is not a string', () => {
  expect(() => clientValidation.checkSkilllevel(12345)).toThrow('Skill level must be a number ranging from 0-10');
});