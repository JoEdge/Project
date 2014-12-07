$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {
      //"click #shareInfo" : "changeACL",
      "submit #messageForm" : "sendMessage",

    },//end events

    template: _.template($('#messagesTo').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

    //  this.queryRecipient();

    //  this.queryGetter();

      $('#updateInfo').html(this.$el);
    },//end initialize

    // queryGetter: function () {
    //   var queryGetter = new Parse.Query(Parse.User);
    //   queryGetter.get("reciever", this.options.getter );
    //     queryGetter.find({
    //     success: function(results) {
    //       console.log(this.options.getter);
    //     },
    //     error: function(object, error) {
    //       console.log(error);
    //     }
    //   });
    // },

    // Query who recieved message
    // queryRecipient: function () {
    //   var self= this;
    //
    //   var query= new Parse.Query (App.Models.MessageModel);
    //     query.equalTo('recipient', App.user.attributes.username);
    //     query.find({
    //
    //     success: function(results) {
    //       console.log(results);
    //     },
    //     error: function(error) {
    //       alert("Error");
    //     }
    //   });
    //
    // },

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

    sendMessage: function(e) {
      e.preventDefault();

      var myMessage = new App.Models.MessageModel ({
        recipient: $('#recipient').val(),
        content:  $('#content').val(),
        sender: App.user,
        senderName: $('#senderName').val(),
        kid: this.options.kid_id,

      });//end var myMessages
      console.log(this.options.kid_id);

      //Set Control on Message
      var myMessageACL = new Parse.ACL(Parse.User.current());
      myMessageACL.setPublicReadAccess(true);
      myMessageACL.setWriteAccess(Parse.User.current(), true);

      myMessage.setACL(myMessageACL);

      // //Set Control on Kid Profile
      // console.log(this.options.kid_id);
      //
      // var Kid = Parse.Object.extend('App.Models.MyKidProfile');
      // var oneKid = this.options.kid_id
      // console.log(oneKid);
      //
      // var thisKidACL = new Parse.ACL();
      // //thisKidACL.setPublicReadAccess(true);
      // //thisKidACL.setReadAccess("recipient", true);
      // //thisKidACL.setReadAccess(Parse.User.current(), true);
      //
      // oneKid.setACL(thisKidACL);
      // oneKid.save();

      //save
      myMessage.save(null, {
        success: function () {
          App.all_messages.add(myMessage);
          //clear my form
          $("#messageForm")[0].reset();

          // Now going to deal with the Kid Object
          // 1. Take the "kid" shared (this.options.kid_id)
          // 2. Update their ACL so that the recipient has access

        }//end success

      });//end myMessage.save

    }//end sendMessage

  });//end App.Views

}());
