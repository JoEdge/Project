(function () {

  App.Collections.EventCollection = Parse.Collection.extend ({
    model: App.Models.Events,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());
