(function () {

  App.Views.EditKid = Parse.View.extend({

    tagName: 'ul',
    className: 'EditKid',

    events: {
      'submit #FormEditKid' : 'updateKid',
      'click #kidDelete' : 'deleteKid',
    },

    template: _.template($('#editedKid').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.kids.toJSON()));

    },

    updateKid: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.kids.set({
        //image: imageFile,
        firstName: $('#update_kfirstName').val(),
        lastName: $('#update_klastName').val(),
        birthdate: $('#update_birthdate').val(),
        address1: $('#update_kAddress1').val(),
        address2: $('#update_kAddress2').val(),
        ec1Name: $('#update_Emergency1').val(),
        ec1Phone: $('#update_Emergency1Phone').val(),
        ec2Name: $('#update_Emergency2').val(),
        ec2Phone: $('#update_Emergency2Phone').val(),
        doctor: $('#update_doctor').val(),
        medical: $('#update_medical').val(),
        notes: $('#update_notes').val(),

      });

      // Save Instance
      this.options.kids.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

    deleteKid: function (e) {
      e.preventDefault();

      // Remove Event
      this.options.events.destroy();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },


  });

}());
