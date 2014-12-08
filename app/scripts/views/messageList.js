(function () {
  App.Views.MessageList = Parse.View.extend ({

    tagName: 'ul',
    className: 'MessageList',

    events: {

    //  'click #hideMsg' : 'hideMessage',

    },

    template: _.template($('#messagesFrom').html()),

    initialize: function(options) {

      this.options = options;

      //this.render();

      this.queryRecipient();

      // MIGHT HAVE TO COME BACK TO THIS LATER!!
      //this.collection.off();
      //this.collection.on('sync', this.render, this);

      $('#updateInfo').html(this.$el);

    },

  // Query who recieved message
  queryRecipient: function () {
    var self= this;

    var query= new Parse.Query (App.Models.MessageModel);
      query.equalTo('recipient', App.user);
    //  query.equalTo('recipient', App.user.attributes.username);
      query.find({

      success: function(results) {

        self.render(results);

      },
      error: function(error) {
        alert("messageList");
      }
    });

  },

    render: function(queryCollection){
      var self = this;

      //clears our element
      this.$el.empty();

      _.each(queryCollection, function (s) {
        self.$el.append(self.template(s.toJSON()));
      })

    },

    // hideMessage: function (e) {
    //   e.preventDefault();
    //
    //   var aMessage = this.collection.models[0];
    //   console.log(aMessage);
    //
    // //  aMessage.hide();
    //
    //   console.log("hideme");
    // },

  });

}());
