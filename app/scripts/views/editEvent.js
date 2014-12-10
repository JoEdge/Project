(function () {

  App.Views.EditEvent = Parse.View.extend({

    tagName: 'ul',
    className: 'EditEvent',

    events: {
      'submit #FormEditEvent' : 'updateEvent',
      'click #eventDelete' : 'deleteEvent',
    },

    template: _.template($('#editedEvent').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      console.log(this.options);
      this.$el.html(this.template(this.options.eventOne.toJSON()));

    },

    updateEvent: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.eventOne.set({
        eventName: $("#update_event_name").val(),
        eventDate: $("#update_event_date").val(),
        location: $("#update_event_location").val(),
        location2: $("#update_event_location2").val(),
      });

      // Save Instance
      this.options.eventOne.save();

      // Return to home page
      App.router.navigate('event', {trigger: true});

    },

    deleteEvent: function (e) {
      e.preventDefault();

      // Remove Event
      this.options.eventOne.destroy();

      // Return to home page
      App.router.navigate('event', {trigger: true});

    },


  });

}());
