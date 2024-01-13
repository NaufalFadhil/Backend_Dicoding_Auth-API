const PassworHash = require('../PasswordHash');

describe('PasswordHash interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const passwordHash = new PassworHash();

    await expect(passwordHash.hash('dummy_password')).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});