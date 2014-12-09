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

      var kiddyID = e.currentTarget.id;
      console.log(kiddyID);

      console.log(this.options);
      // 1. Access to the event object we are on
      var kidArray = this.options.adder.attributes.kids;
      console.log(kidArray);

      kidArray.push(kiddyID);

      this.options.adder.save();

      console.log(kidArray);

      // 2. Grab the `kids` property
      // 3. Then `.push()` the `kiddyID` onto that properyt
      // 4. Save the data


      // var kidArray = this.collection;
      //   console.log(kidArray);
      //
      // for (var i = 0; i < kidArray.length; i++) {
      //   var kidNFO = kidArray[i];
      //   console.log(kidNFO);
      // }

        // var query = new Parse.Query(App.Models.MyKidsProfile);
        // query.find({
        //   success: function(kidNFO) {
        //     console.log(kidNFO[1].id);
        //   }
        // });
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
