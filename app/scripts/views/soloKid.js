(function () {

  App.Views.SoloKid = Parse.View.extend({

    tagName: 'ul',
    className: 'SoloKid',

    events: {

      'click #backItUp' : 'goBack',

    },

    template: _.template($('#solokiddy').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.onekid.toJSON()));

    },

    goBack: function() {
      App.router.navigate('', {trigger: true});

    },


  });

}());
