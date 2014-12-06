(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {
    //  'click #shareInfo': 'sendKidInfo',
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

    //   var MessageTemplate = _.template($('#messageTo').html());
    //   this.$el.html(this.template(this.options.kid_id.toJSON()));
    //
    //   var kidTemplate = _.template($('#listMyKids').html());
    //   var kid_query = new Parse.Query(App.Models.MyKidsProfile);
    //
    //   kid_query.equalTo('kid', this.options.kid_id);
    //
    //   this.$el.append('<div class="kiddy"></div>');
    //
    //   kid_query.find({
    //     success: function (results) {
    //
    //       _.each(results, function(kiddy) {
    //         $('div.kiddy').append(kidTemplate(kiddy.toJSON()));
    //       })
    //     }
    //   })
    //
     },
    //
    // sendKidInfo: function(e) {
    //
    //   console.log("ha");
    //
    //   this.options.kid_id.set({
    //     //image: imageFile,
    //     firstName: $('#kfirstName').val(),
    //     lastName: $('#klastName').val(),
    //     birthdate: $('#birthdate').val(),
    //     address1: $('#kAddress1').val(),
    //     address2: $('#kAddress2').val(),
    //     ec1Name: $('#Emergency1').val(),
    //     ec1Phone: $('#Emergency1Phone').val(),
    //     ec2Name: $('#Emergency2').val(),
    //     ec2Phone: $('#Emergency2Phone').val(),
    //     doctor: $('#doctor').val(),
    //     medical: $('#medical').val(),
    //     notes: $('#notes').val(),
    //     kid: this.options.kid_id
    //
    //   });
    //
    //   // Save Instance
    //   this.options.kid_id.save();
    //
    // },

  });

}());
