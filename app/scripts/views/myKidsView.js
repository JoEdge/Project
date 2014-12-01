$( document ).ready(function(){

  App.Views.MyKidsView = Parse.View.extend ({

    className: "MyKids",

    events: {

      "submit #myKidInfo" : "updateMyKids",

    },

    template: $("#kidInfo").html(),

    initialize: function() {

      this.render();

      $('#listInfo').html(this.$el);
    },

    render: function() {

      this.$el.html(this.template);
    },

    updateMyKids: function(e) {

      e.preventDefault();
      //on click event get a reference to the image file
      var image2file = $("#kImage")[0];
      if (image2file.files.length > 0) {
        var file = image2file.files[0];
        //electing to only allow .jpg files for images
        var name = "photo.jpg";

        var imageFile = new Parse.File(name, file);
        console.log(imageFile);
      }
      //save this new image file to Parse Cloud
      imageFile.save().then(function() {
      }, function(error) {
      });

      var myKid = new App.Models.MyKidsProfile({
        firstName: $('#kfirstName').val(),
        lastName: $('#klastName').val(),
        birthdate: $('#birthdate').val(),
        address1: $('#kAddress1').val(),
        address2: $('#kAddress2').val(),
        ec1Name: $('#Emergency1').val(),
        ec1Phone: $('#Emergency1Phone').val(),
        ec2Name: $('#Emergency2').val(),
        ec2Phone: $('#Emergency2Phone').val(),
        doctor: $('#doctor').val(),
        medical: $('#medical').val(),
        notes: $('#notes').val(),

      });

      myKid.set("image", imageFile);

      myKid.save(null, {
        success: function () {
          App.all_myKids.add(myKid);
        }
      });

    }

  });

}());
