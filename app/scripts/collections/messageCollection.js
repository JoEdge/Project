(function () {

  App.Collections.MessageCollection = Parse.Collection.extend ({
    model: App.Models.MessageModel,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());
