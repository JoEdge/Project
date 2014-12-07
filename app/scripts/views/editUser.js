(function () {

  App.Views.EditUser = Parse.View.extend({

    tagName: 'ul',
    className: 'EditUser',

    events: {
      'submit #FormEditUser' : 'updateUser',

    },

    template: _.template($('#editedUser').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.users.toJSON()));

    },

    updateUser: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.users.set({
        //image: imageFile,
        username: $('#update_username').val(),
        email: $('#update_email').val(),

      });

      // Save Instance
      this.options.users.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },


  });

}());
