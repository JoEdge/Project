$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {
      "submit #messageForm" : "sendMessage",

    },//end events

    template: _.template($('#messagesTo').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    //function to query recipient
    // main: function(e) {
    //   e.preventDefault();

    sendMessage: function (e) {
      e.preventDefault();

      var self = this;

      var queryGetter = new Parse.Query(Parse.User);
      queryGetter.equalTo('username', $('#recipient').val());
      queryGetter.first({
        success: function(result) {
          console.log(result);
          self.saveMessage(result);
        },
        error: function(error) {
          console.log(error + "1");
        }//end error
      });
    },

    //function to insert relevant info
    saveMessage: function(recipient) {
      var self = this;

      var myMessage = new App.Models.MessageModel ({
        recipientName: $('#recipient').val(),
        recipient: recipient,
        content:  $('#content').val(),
        sender: App.user,
        senderName: $('#senderName').val(),
        kid: this.options.kid_id,
      });//end var myMessages

        myMessage.save(null, {
          success: function (myMessage) {
            console.log(recipient);
            self.controlSetter(myMessage);
          //  self.controlSetter(recipient);
            App.all_messages.add(myMessage);
            //clear my form
            $("#messageForm")[0].reset();
          },
          error: function(error) {
            console.log(error + "2");
          }//end error
        })

      },
      //function to set controls
      controlSetter: function(myMessage) {
        //var self= this;

      //Set Control on Message
        var myMessageACL = new Parse.ACL(Parse.User.current());
        myMessageACL.setPublicReadAccess(true);
        myMessageACL.setWriteAccess(Parse.User.current(), true);

        myMessage.setACL(myMessageACL);

        //Set Control on Kid Profile
        console.log(this.options.kid_id);
        //console.log(self.recipient);
        //console.log(recipient);
        var recipient = myMessage.attributes.recipient;
        var sender = myMessage.attributes.sender;
        console.log(recipient);
        console.log(sender);

        var Kid = Parse.Object.extend('App.Models.MyKidProfile');
        var oneKid = this.options.kid_id;
        var thisKidACL = new Parse.ACL();

        thisKidACL.setReadAccess(recipient, true);
        thisKidACL.setReadAccess(sender, true);
        thisKidACL.setWriteAccess(sender, true);
        oneKid.setACL(thisKidACL);
        oneKid.save();

      },//end set control function

  //},

    render: function() {

      this.$el.html(this.template(this.options.kid_id.toJSON()));

        var kidTemplate = _.template($('#listMyKids').html());
        var kid_query = new Parse.Query(App.Models.MyKidsProfile);

        kid_query.equalTo('kid', this.options.kid_id);

        this.$el.append('<ul class="kiddy"></ul>');

        kid_query.find({
          success: function (results) {

            _.each(results, function(kiddy) {
              $('ul.kiddy').append(kidTemplate(kiddy.toJSON()));
            })
          }
        })

    },//end render

  });//end App.Views

}());
