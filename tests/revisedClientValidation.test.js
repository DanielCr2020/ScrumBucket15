import clientValidation from "../src/refactoredClientValidation";

// test('checkUsername returns the username when valid', () => {
//   expect(clientValidation.checkUsername('JohnDoe')).toBe('JohnDoe');
// });

// test('checkUsername throws an error when no username is provided', () => {
//   expect(() => clientValidation.checkUsername()).toThrow('No username provided');
// });

// test('checkUsername throws an error when username is not a string', () => { 
//   expect(() => clientValidation.checkUsername(123)).toThrow('Username must be a string');
// });

// test('checkUsername throws an error when username is too short', () => {
//   expect(() => clientValidation.checkUsername('JD')).toThrow('Username must be at least 3 characters long');
// });

// test('checkPassword returns the password when valid', () => {
//   expect(clientValidation.checkPassword('SecurePassword123')).toBe('SecurePassword123');
// });

// test('checkPassword throws an error when no password is provided', () => {
//   expect(() => clientValidation.checkPassword()).toThrow('No password provided');
// });

// test('checkPassword throws an error when password is not a string', () => {
//   expect(() => clientValidation.checkPassword(12345)).toThrow('Password must be a string');
// });

// test('checkPassword throws an error when password is too short', () => {
//   expect(() => clientValidation.checkPassword('12')).toThrow('Password must be at least 3 characters long');
// });

// test('checkDisplayName returns the displayName when valid', () => {
//   expect(clientValidation.checkDisplayName('John Doe')).toBe('John Doe');
// });

// test('checkDisplayName throws an error when no displayName is provided', () => {
//   expect(() => clientValidation.checkDisplayName()).toThrow('No displayName provided');
// });

// test('checkDisplayName throws an error when displayName is not a string', () => {
//   expect(() => clientValidation.checkDisplayName(12345)).toThrow('displayName must be a string');
// });

// test('checkDisplayName throws an error when displayName is too short', () => {
//   expect(() => clientValidation.checkDisplayName('JD')).toThrow('displayName must be at least 3 characters long');
// });

test('checkProficiency throws an error when the proficiency parameter is not provided', () => {
  expect(() => clientValidation.checkProficiency()).toThrow('No proficiency provided.');
});
 
test('checkProficiency throws an error when the proficiency parameter is not a string', () => {
  expect(() => clientValidation.checkProficiency(123)).toThrow('Proficiency is not a string');
});

test('checkProficiency throws an error when the proficiency parameter is not a string', () => {
  expect(() => clientValidation.checkProficiency(true)).toThrow('Proficiency is not a string');
});

test('checkProficiency throws an error when the proficiency parameter is not a string', () => {
  expect(() => clientValidation.checkProficiency([])).toThrow('Proficiency is not a string');
});

test('checkProficiency throws an error when the proficiency parameter is not a string', () => {
  expect(() => clientValidation.checkProficiency({objectOf: "strings"})).toThrow('Proficiency is not a string');
});


/* Note: a valid proficiency is 'No Experience', 'Beginner', 'Amateur', 'Intermediate', 'Expert', 'Master' */

test('checkProficiency throws an error when the proficiency parameter is a string but not from the dropdown', () => {
  expect(() => clientValidation.checkProficiency('King')).toThrow('Proficiency must be a valid dropdown option');
});

test('checkProficiency throws an error when the proficiency parameter is a string but not from the dropdown', () => {
  expect(() => clientValidation.checkProficiency('Beginnuh')).toThrow('Proficiency must be a valid dropdown option');
});

/* This method is case sensitive since this is a dropdown menu, not an input! */

test('checkProficiency throws an error when the proficiency parameter is a string but not from the dropdown', () => {
  expect(() => clientValidation.checkProficiency('amateur')).toThrow('Proficiency must be a valid dropdown option');
});

test('checkProficiency returns the proficiency when the proficiency parameter is a member of the array', () => {
  expect(clientValidation.checkPassword('Expert')).toBe('Expert');
});

test('checkProficiency returns the proficiency when the proficiency parameter is a member of the array', () => {
  expect(clientValidation.checkProficiency('   Master   ')).toBe('Master');
}); 

test('checkProficiency returns the proficiency when the proficiency parameter is a member of the array', () => {
  expect(clientValidation.checkProficiency('Beginner')).toBe('Beginner');
});

test('checkProficiency returns the proficiency when the proficiency parameter is a member of the array', () => {
  expect(clientValidation.checkProficiency('   No Experience   ')).toBe('No Experience');
});

