$( document ).ready(function(){

  App.Views.AddKid2EventView = Parse.View.extend ({

    className: "AddKid2Event",

    events: {


    },//end events

    template: _.template($('#oneEvent').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    render: function() {

      var self= this;

      //clears our element
      this.$el.empty();
      console.log(this.options);
      this.$el.html(this.template(this.options.adder.toJSON()));

    },


  });

}());
