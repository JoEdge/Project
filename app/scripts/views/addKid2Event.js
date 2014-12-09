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

      this.$el.html(this.template(this.options.soloEvent.toJSON()));
      // this.$el.html(this.template(this.options.kidAdd.toJSON()));
      //
      // var kiddyTemplate = _.template($('#listMyKids').html());
      // var kiddy_query = new Parse.Query(App.Models.MyKidsProfile);
      //
      // kiddy_query.equalTo('kids', this.options.kidAdd);
      //
      // this.$el.append('<ul class="addedKids"></ul>');
      //
      // kiddy_query.find({
      //   success: function (results) {
      //
      //     _.each(results, function(kiddy) {
      //       $('ul.addedKids').append(kiddyTemplate(kiddy.toJSON()));
      //     })
      //   }
      // })

    },


  });

}());
