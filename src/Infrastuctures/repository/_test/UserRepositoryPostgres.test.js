const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('UserRepositoryPostgres', () => { 
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyAvailableUsername', () => { 
    it('should throw InvariantError when username not available', async () => {
      await UsersTableTestHelper.addUser({ username: 'dicoding' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).rejects.toThrowError('InvariantError');
    })

    it('should not throw InvariantError when username available', async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      await expect(userRepositoryPostgres.verifyAvailableUsername('dicoding')).resolves.not.toThrowError('InvariantError');
    })
  })

  describe('addUser function', () => { 
    it('should persist register user', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia'
      });
      const fakeIdGenerator = () => '123'; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await userRepositoryPostgres.addUser(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });

    it('should return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia'
      });
      const fakeIdGenerator = () => '123'; // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      // Assert
      expect(registeredUser).toEqual(new RegisteredUser({
        id: 'user-123',
        username: 'dicoding',
        fullname: 'Dicoding Indonesia'
      }));
    });
  });
});