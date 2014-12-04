$( document ).ready(function(){

  App.Models.Events = Parse.Object.extend({

    className: 'Events',

    defaults: {

      eventName: '',
      eventDate: '',
      location: '',
      kids: '',
      user:'',

    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());
