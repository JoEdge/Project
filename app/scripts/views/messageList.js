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

      this.querySender();

      this.queryRecipient();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#updateInfo').html(this.$el);

    },

    querySender: function () {

    var query = new Parse.Query (App.Models.MessageModel);
    //console.log(sender);
      query.equalTo('sender', App.user);
      //  query.include('Message');
      //  query.include('Message.sender');
      query.find({
        success: function(results) {
          console.log(results);
      },
        error: function(error) {
          alert("Error1");
      }
    });

  },

  queryRecipient: function () {
    var query= new Parse.Query (App.Models.MessageModel);
    query.equalTo('recipient', $('#recipient').val() );
    // query.include('message');
    // query.include('message.recipient');
    query.find({
      success: function(results) {
        console.log(results);
      },
      error: function(error) {
        alert("Error");
      }
    });

  },


    render: function(){
      var self = this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });

    }


  });

}());
