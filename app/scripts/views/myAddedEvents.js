(function () {
  App.Views.MyEvents = Parse.View.extend ({

    tagName: 'ul',
    className: 'myEventsList',

    events: {
      "click .toggle" : "show",
    },

    template: _.template($('#listMyEvents').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);


      $('#myKidsOnly').html(this.$el);

      $('.targeted').hide();

    },


    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });

    },

    show: function(e) {
      e.preventDefault();
  $(e.target.nextElementSibling).slideToggle('slow', function(){
          $(".buttons");
        });

    }

  });

}());
