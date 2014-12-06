$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {
      "click #kidInfo": "sendKidInfo",
      "submit #messageForm" : "sendMessage",

    },//end events

    template: _.template($('#messagesTo').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

    //  this.queryKid();

      // Get the kid profile out of Parse with a query using this.kid_id.
       //this.kid =

      $('#updateInfo').html(this.$el);
    },//end initialize

    // queryKid: function () {
    //   var queryKid = new Parse.Query(App.Models.MyKidsProfile);
    //   queryKid.get("kid", this.options.kid_id );
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

    //  this.$el.html(this.template);
      this.$el.html(this.template(this.options.kid_id.toJSON()));

        var kidTemplate = _.template($('#listMyKids').html());
        var kid_query = new Parse.Query(App.Models.MyKidsProfile);

        kid_query.equalTo('kid', this.options.kid_id);

        this.$el.append('<ul class="kiddy"></div>');

        kid_query.find({
          success: function (results) {

            _.each(results, function(kiddy) {
              $('ul.kiddy').append(kidTemplate(kiddy.toJSON()));
            })
          }
        })

    },//end render
    //
    sendKidInfo: function(e) {

      console.log("ha");

        this.options.kid_id.set({
          //image: imageFile,
          // firstName: $('#kfirstName').val(),
          // lastName: $('#klastName').val(),
          // birthdate: $('#birthdate').val(),
          // address1: $('#kAddress1').val(),
          // address2: $('#kAddress2').val(),
          // ec1Name: $('#Emergency1').val(),
          // ec1Phone: $('#Emergency1Phone').val(),
          // ec2Name: $('#Emergency2').val(),
          // ec2Phone: $('#Emergency2Phone').val(),
          // doctor: $('#doctor').val(),
          // medical: $('#medical').val(),
          // notes: $('#notes').val(),
          kid: this.options.kid_id

      });

      // Save Instance
      this.options.kid_id.save();

    },

    sendMessage: function(e) {
      e.preventDefault();

      var myMessage = new App.Models.MessageModel ({
        recipient: $('#recipient').val(),
        content: '',
        sender: App.user,
        senderName: $('#senderName').val(),
        kid: this.kid_id
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
        }//end success

      });//end myMessage.save

    }//end sendMessage

  });//end App.Views

}());
