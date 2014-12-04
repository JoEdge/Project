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


    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });

    }

  });

}());
