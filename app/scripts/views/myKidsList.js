(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {

    },

    template: _.template($('#listMyKids').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

    },

    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
        var list_collection = this.collection.sortBy( function (model) {
          return model.get(self.options.sort);
        });
        _.each(list_collection, function (s) {
          self.$el.append(self.template(s.toJSON()));
        })
      } else {
        // Sort from our default

      this.collection.sort();
      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });
    }
      return this;
    },

  });

}());
