const Validator = require('./validator');

class register extends Validator {

  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required|min:6',
      name: 'required|min:2|max:30',
    };
  }

  get messages() {

    return {
      'email.required': 'Email is required',
      'name.required': 'Name is required',
      'password.required': 'Password is required',
      'password.min': 'Password should be at least 6 characters',
      email: 'Invalid email',
    };
  }

}

module.exports = register;
