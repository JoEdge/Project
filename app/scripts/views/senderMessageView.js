$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {
      //"click #shareInfo" : "changeACL",
      "submit #messageForm" : "setInformation",

    },//end events

    template: _.template($('#messagesTo').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    //function to query recipient
    setInformation: function (e) {
      e.preventDefault();

      var queryGetter = new Parse.Query(Parse.User);
        queryGetter.equalTo('username', $('#recipient').val());
        queryGetter.first({
          success: function(result) {
            this.recipient = result;
            console.log(this.recipient);
          },
          error: function(error) {
            console.log(error);
          }//end error
      })
    },
      //function to insert relevant info
      insertMessageInfo: function() {
        var myMessage = new App.Models.MessageModel ({
          recipient: $('#recipient').val(),
          content:  $('#content').val(),
          sender: App.user,
          senderName: $('#senderName').val(),
          kid: this.options.kid_id,
        });//end var myMessages

          myMessage.save(null, {
            success: function () {
              App.all_messages.add(myMessage);
              //clear my form
              $("#messageForm")[0].reset();
            },
            error: function(error) {
              console.log(error);
            }//end error
          })

      },
          //function to set controls
          controlSetter: function() {
          //Set Control on Message
            var myMessageACL = new Parse.ACL(Parse.User.current());
                myMessageACL.setPublicReadAccess(true);
                myMessageACL.setWriteAccess(Parse.User.current(), true);

                myMessage.setACL(myMessageACL);

          //Set Control on Kid Profile
                console.log(this.options.kid_id);
                console.log(this.recipient);
                var Kid = Parse.Object.extend('App.Models.MyKidProfile');
                var oneKid = this.options.kid_id

                var thisKidACL = new Parse.ACL();

                //thisKidACL.setPublicReadAccess(true);
                  thisKidACL.setReadAccess(this.recipient, true);
                //thisKidACL.setReadAccess(Parse.User.current(), true);

                    oneKid.setACL(thisKidACL);
                    oneKid.save();

          },//end set control function

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
