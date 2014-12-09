(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {

      "click #addKidBtn" : "addingKids",
    },

    template: _.template($('#listMyKids').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

    },

    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (myKid) {
        var kidPhoto = myKid.get("image");
        $('#profilePic').src = kidPhoto.url();
        self.$el.append(self.template(myKid.toJSON()));
      });
      //console.log(this.options.kidAdd);
      //add kid to event
      // this.$el.html(this.template(this.options.kidAdd.toJSON()));
      //
      // var kidsTemplate = _.template($('#listMyKids').html());
      // var kids_query = new Parse.Query(App.Models.MyKidsProfile);
      //
      // kids_query.equalTo('kids', this.options.kidAdd);
      //
      // this.$el.append('<ul class="add_kiddies"></ul>');
      //
      // kids_query.find({
      //   success: function (results) {
      //
      //     _.each(results, function(kiddy) {
      //       $('ul.add_kiddies').append(kidsTemplate(add_kiddies.toJSON()));
      //     })
      //   }
      // })

    },//end render

    addingKids: function(){
      console.log("fafafafaf");

      var adding = new App.Models.MyKidsProfile({

        firstName: $('#kfirstName').val(),
        lastName: $('#klastName').val(),
        kids: this.options.kidAdd

      });
       console.log('jamjam');
      adding.save(null, {
        success: function () {
          console.log('Kid added');
          App.router.navigate('', {trigger: true});
        },
        error: function(error) {
          console.log(error);
        }//end error
      });

    },

  });

}());
