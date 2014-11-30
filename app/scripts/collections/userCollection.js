(function () {

  App.Collections.UserCollection = Parse.Collection.extend ({
    model: App.Models.UserProfile,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());
