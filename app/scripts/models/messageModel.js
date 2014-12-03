$( document ).ready(function(){

  App.Models.MessageModel = Parse.Object.extend({

    className: 'Message',

    defaults: {

      sender: '',
      recipient: '',
      content: '',
      kids: '',

    },

    idAttribute: 'objectID',

    initialize: function(){
      console.log("my message");

    }

  });


}());
