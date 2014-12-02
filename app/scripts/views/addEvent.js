$( document ).ready(function(){

  App.Views.AddEventView = Parse.View.extend ({

    className: "Events",

    events: {

      "submit #eventForm" : "addMyEvent",

    },//end events

    template: $("#eventInfo").html(),

    initialize: function() {

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    render: function() {

      this.$el.html(this.template);
    },//end render

    addMyEvent: function(e) {
      e.preventDefault();

      var myEvent = new App.Models.Events ({
        eventName: $('#eventName').val(),
        eventDate: $('#eventDate').val(),
        location: $('#location').val(),

      });//end var myEvent


      myEvent.save(null, {
        success: function () {
          App.all_events.add(myEvent);
        }//end success

      });//end myEvent.save

    }//end addMyEvent

  });//end App.Views

}());
