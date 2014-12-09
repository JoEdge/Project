$( document ).ready(function(){

  App.Models.Events = Parse.Object.extend({

    className: 'Events',

    defaults: {

      eventName: '',
      eventDate: '',
      location: '',
      user:'',
      kids: []


    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());
