$( document ).ready(function(){

  App.Models.Events = Parse.Object.extend({

    className: 'Events',

    defaults: {

      eventName: '',
      eventDate: '',
      location: '',
      location2: '',
      user:'',
      kids: []


    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());
