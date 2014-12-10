$( document ).ready(function(){

  App.Views.AddKid2EventView = Parse.View.extend ({

    className: "AddKid2Event",

    events: {
    //  "submit #updateInfo" : "addingKids",

    },//end events

    template: _.template($('#oneEvent').html()),

    initialize: function(options) {
      this.options = options;

      this.render();
      //this.addingKids();

      $('#updateInfo').html(this.$el);
    },//end initialize

    //query events for arrays of kids
    addingKids : function(e) {

      e.preventDefault();

      var queryKids = new Parse.Query(App.Models.Events);
        queryKids.containedIn('kids', []);
        queryKids.find({
          success: function(result) {
            console.log(result);

          },
          error: function(error) {;
          }//end error
      });

    },

    render: function() {

      var self= this;

      //clears our element
      this.$el.empty();

      this.$el.html(this.template(this.options.add2event.toJSON()));

    },

  });

}());
