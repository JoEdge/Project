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

      var recipient;
      var query= new Parse.Query(Parse.User);
        query.equalTo('username', "$('#recipient').val()");
        query.find({
          success: function(results) {
            alert("Successfully retrieved " + results.length);
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              alert(object.id + ' - ' + object.get('username'));
            }
          },
          error: function(error) {
            alert("Error: ");
          }
        });

      var myMessage = new App.Models.MessageModel ({
        recipient: recipient,
        content: $('#content').val(),
        sender: App.user,

      });//end var myMessages


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
