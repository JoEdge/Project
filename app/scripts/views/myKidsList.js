(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {
    //  "click #shareInfo" : "changeListed",
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

      //add kid to event
      // this.$el.html(this.template(this.options.kidAdd.toJSON()));
      //
      // var kidTemplate = _.template($('#listMyKids').html());
      // var kid_query = new Parse.Query(App.Models.MyKidsProfile);
      //
      // kid_query.equalTo('kids', this.options.kidAdd);
      //
      // this.$el.append('<ul class="add_kiddy"></ul>');
      //
      // kid_query.find({
      //   success: function (results) {
      //
      //     _.each(results, function(kiddy) {
      //       $('ul.add_kiddy').append(kidTemplate(add_kiddy.toJSON()));
      //     })
      //   }
      // })

    },//end render

    //  changeListed: function(e) {
    //    console.log('ha');
    //    e.preventDefault();
    //    this.listed = true;
    //  },

    // addingKids: function(){
    //   console.log("fafafafaf");
    //
    //   var adding = new App.Models.MyKidsProfile({
    //
    //     firstName: $('#kfirstName').val(),
    //     lastName: $('#klastName').val(),
    //     kids: this.options.kidAdd
    //
    //   });
    //
    //   adding.save(null, {
    //     success: function () {
    //       console.log('Kid added');
    //       App.router.navigate('', {trigger: true});
    //     }
    //   });
    //
    // },

      addingKids:function(myKid){
        //childAdd.set('eventKid', true);

        console.log('jamjam');
      },

  });

}());
