const PasswordHash = require("./PasswordHash");

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrpyt, saltRound = 10) {
    super();
    this._bcrypt = bcrpyt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }
}

module.exports = BcryptPasswordHash;