$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {

      "submit #messageForm" : "sendMessage",

    },//end events

    template: $("#messagesTo").html(),

    initialize: function(options) {
      this.options = options;

      this.render();

    //  this.queryKid();

      // Get the kid profile out of Parse with a query using this.kid_id.
       //this.kid =

      $('#updateInfo').html(this.$el);
    },//end initialize

    // Query who recieved message
    // queryKid: function () {
    //   var queryKid = new Parse.Query(App.Models.MyKidsProfile);
    //   queryKid.get("kid", App.all_myKids._byId );
    //     queryKid.find({
    //     success: function(results) {
    //       console.log(results);
    //     },
    //     error: function(object, error) {
    //       console.log(error);
    //     }
    //   });
    // },

    render: function() {

      this.$el.html(this.template);

    },//end render


    sendMessage: function(e) {
      e.preventDefault();

      var myMessage = new App.Models.MessageModel ({
        recipient: $('#recipient').val(),
        content: '',
        sender: App.user,
        senderName: $('#senderName').val(),
        kid: this.kid,
      });//end var myMessages

      //Set Control
      var myMessageACL = new Parse.ACL(Parse.User.current());
      myMessageACL.setPublicReadAccess(true);
      myMessageACL.setWriteAccess(Parse.User.current(), true);

      myMessage.setACL(myMessageACL);

      //save
      myMessage.save(null, {
        success: function () {
          App.all_messages.add(myMessage);
          console.log($('#recipient').val());
        }//end success

      });//end myMessage.save

    }//end sendMessage

  });//end App.Views

}());
