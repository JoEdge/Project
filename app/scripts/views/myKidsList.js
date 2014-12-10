(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {

     "click .addKidBtn" : "addingKids",

    },

    template: _.template($('#listMyKids').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

    },

    addingKids: function(e){

      e.preventDefault();
      //get selected kid in array 'kids' located in event class
      var kiddyID = e.currentTarget.id;
      var kidPhoto = $(e.currentTarget).data('img');
      var kidArray = this.options.adder.attributes.kids;
      var kidObject = { kid: kiddyID, photo: kidPhoto };

      kidArray.push(kidObject);

      this.options.adder.save();

      // //query events for arrays of kids
      var queryKids = new Parse.Query(App.Models.Events);
      queryKids.equalTo('kids', kidObject);
      queryKids.find({
        success: function(result) {
          console.log(result);

        },
        error: function(error) {;
        }//end error
      });

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

    },//end render

  });

}());
