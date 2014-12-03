(function () {

  App.Collections.UserCollection = Parse.Collection.extend ({
    model: Parse.User,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());
