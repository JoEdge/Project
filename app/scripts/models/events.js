$( document ).ready(function(){

  App.Models.Events = Parse.Object.extend({

    className: 'Events',

    defaults: {

      eventName: '',
      eventDate: '',
      location: '',
      kids: '',

    },

    idAttribute: 'objectID',

    initialize: function(){
      console.log("my events");

    }

  });


}());
