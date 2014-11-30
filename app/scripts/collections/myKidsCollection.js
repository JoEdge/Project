(function () {

  App.Collections.MyKidsCollection = Parse.Collection.extend ({
    model: App.Models.MyKidsProfile,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());
