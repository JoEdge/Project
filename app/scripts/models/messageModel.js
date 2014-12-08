$( document ).ready(function(){

  App.Models.MessageModel = Parse.Object.extend({

    className: 'Message',

    defaults: {

      sender: '',
      senderName: '',
      recipient: '',
      recipientName: '',
      content: '',
      share: '',
      kid: '',
    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());
