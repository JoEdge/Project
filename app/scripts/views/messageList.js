(function () {
  App.Views.MessageList = Parse.View.extend ({

    tagName: 'ul',
    className: 'MessageList',

    events: {

      'click #getMsg' : 'addNewKids',

    },

    template: _.template($('#messagesFrom').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

  //    this.queryKid();

      this.queryRecipient();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#updateInfo').html(this.$el);

    },

  //Query who sent message
  //   queryKid: function () {
  //
  //   var query = new Parse.Query (App.Models.MessageModel);
  //   //console.log(kid);
  //     query.equalTo('kid', this.options.kid_id);
  //     query.find({
  //       success: function(results) {
  //         console.log(results);
  //
  //     },
  //       error: function(error) {
  //         alert("Error1");
  //     }
  //   });
  // },

  // Query who recieved message
  queryRecipient: function () {
    var self= this;

    var query= new Parse.Query (App.Models.MessageModel);
      query.equalTo('recipient', App.user.attributes.username);
      query.find({

      success: function(results) {

        self.collection.models = results;

        self.render();
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

    },

    addNewKids: function (e) {
      e.preventDefault();

      console.log("ha");
    },

  });

}());
