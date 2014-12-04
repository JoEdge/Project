$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {

      "submit #messageForm" : "sendMessage",

    },//end events

    template: $("#messagesTo").html(),

    initialize: function() {

      this.render();

    //  this.recieverQuery();

      $('#log_signup').html(this.$el);
    },//end initialize

    //
    //   var query= new Parse.Query(Parse.User);
    //   query.equalTo('username', 'recipient' );
    //   query.find({
    //     success: function(results) {
    //       alert("User added ");
    //       // Do something with the returned Parse.Object values
    //   },
    //     error: function(error) {
    //       alert("Error");
    //   }
    // });


    render: function() {

      this.$el.html(this.template);
    },//end render


    sendMessage: function(e) {
      e.preventDefault();

      // var reciever = App.all_users().where({username: "$('#recipient').val()"});
      //
      //   alert(reciever.length);

      var myMessage = new App.Models.MessageModel ({
        recipient: $('#recipient').val(),
        content: $('#content').val(),
        sender: App.user.attributes.username,

      });//end var myMessages

      //Set Control
      // var myMessageACL = new Parse.ACL(Parse.User.current());
      // myMessageACL.setPublicReadAccess(false);
      // myMessageACL.setWriteAccess(Parse.User.current(), true);
      //
      // myMessage.setACL(myMessageACL);

      //save
      myMessage.save(null, {
        success: function () {
          App.all_messages.add(myMessage);
        }//end success

      });//end myMessage.save

    }//end sendMessage

  });//end App.Views

}());
