const User = use('App/Models/User');
const axios = require('axios');

const Env = use('Env');

class UserController {

  async register({ request, response }) {
    const { email, password, name } = request.post();
    const user = await User.create({ email, password, name });

    return response.ok();
  }

  async login({ request, response, auth }) {
    const { email, password } = request.post();

    const token = await auth.attempt(email, password)
      .then(res => res.token)
      .catch(() => null);

    if (!token) {
      return response.status(401).json({
        message: 'The email is not registerd or incorrect password',
      });
    }

    const user = await User.query().where({ email }).first();
    user.token = token;

    return response.ok(user);
  }

  async getGHAccessToken({ request, response }) {
    const { code } = request.post();
    const data = { access_token: null, message: '' };

    try {
      const res = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: Env.get('GH_CLIENT_ID'),
          client_secret: Env.get('GH_CLIENT_SECRET'),
          code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (res.data.access_token) {
        data.access_token = res.data.access_token;
      } else {
        data.message = res.data.error_description;
        return response.badRequest(data);
      }
    } catch (err) {
      data.message = 'something went wrong';
      return response.badRequest(data);
    }
    return response.ok(data);
  }

}

module.exports = UserController;
