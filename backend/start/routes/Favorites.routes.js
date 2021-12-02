const Route = use('Route');

Route.get('/favorites', 'FavoriteController.index').middleware('auth');
Route.post('/favorites', 'FavoriteController.store').middleware('auth');
