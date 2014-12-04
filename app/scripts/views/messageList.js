(function () {
  App.Views.MessageList = Parse.View.extend ({

    tagName: 'ul',
    className: 'MessageList',

    events: {

    },

    template: _.template($('#messagesFrom').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#updateInfo').html(this.$el);

    },
    // 
    // var query = new Parse.Query(MessageModel);
    //     query.get(senderID, {
    //       success: function(sender) {
    //         var whoSent = sender.get("User");
    //           whoSent.fetch({
    //             success: function(fetched) {
    //               console.log("User named");
    //             },
    //             error: function() {
    //             console.log("Error");
    //             }
    //           });
    //        }
    //     });


    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (myMessage) {
        self.$el.append(self.template(myMessage.toJSON()));
      });

    }

  });

}());
