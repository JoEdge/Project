$( document ).ready(function(){

  App.Models.MessageModel = Parse.Object.extend({

    className: 'Message',

    defaults: {

      sender: '',
      senderName: '',
      recipient: '',
      content: '',
      share: '',

    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());
