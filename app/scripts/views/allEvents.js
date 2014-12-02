(function () {
  App.Views.AllEvents = Parse.View.extend ({

    tagName: 'ul',
    className: 'AllEvents',

    events: {

    },

    template: _.template($('#allMyEvents').html()),

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

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });

    }

  });

}());
