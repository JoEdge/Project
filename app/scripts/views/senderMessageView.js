$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {

      "submit #messageForm" : "sendMessage",

    },//end events

    template: $("#messagesTo").html(),

    initialize: function() {

      this.render();

      $('#log_signup').html(this.$el);
    },//end initialize

    render: function() {

      this.$el.html(this.template);
    },//end render

    sendMessage: function(e) {
      e.preventDefault();

      var myMessage = new App.Models.MessageModel ({
        recipient: $('#recipient').val(),
        content: $('#content').val(),
        sender: App.user,

      });//end var myMessage

      // //Set Control
      var myMessageACL = new Parse.ACL(Parse.User.current());
      myMessageACL.setPublicReadAccess(false);
      myMessageACL.setWriteAccess(Parse.User.current(), true);

      myMessage.setACL(myMessageACL);

      //save
      myMessage.save(null, {
        success: function () {
          App.all_messages.add(myMessage);
        }//end success

      });//end myMessage.save

    }//end sendMessage

  });//end App.Views

}());
