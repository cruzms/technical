const User = use('App/Models/User');
const Favorite = use('App/Models/Favorite');

class FavoriteController {

  async index({ request, response, auth }) {
    const user = await auth.getUser();

    const favorites = await Favorite.query().where({ user_id: user.id }).fetch();
    return response.ok(favorites);
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser();
    const { id, name } = request.post();

    const favorite = await Favorite.findBy('favorite_id', id);

    if (favorite) {
      await favorite.delete();
      return response.ok({
        message: 'favorite change',
      });
    }
    const newFavorite = await Favorite.create({ user_id: user.id, name, favorite_id: id });

    return response.ok(newFavorite);
  }

}

module.exports = FavoriteController;
