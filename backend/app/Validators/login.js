const Validator = require('./validator');

class login extends Validator {

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {

    return {
      'email.required': 'Email is required',
      'password.required': 'Password is required',
      email: 'Invalid email',
    };
  }

}

module.exports = login;
