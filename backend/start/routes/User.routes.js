const Route = use('Route');

Route.group(() => {
  Route.post('/login', 'UserController.login').validator('login');
  Route.post('/register', 'UserController.register').validator('register');
  Route.post('/github', 'UserController.getGHAccessToken').middleware('auth');
}).prefix('user');
