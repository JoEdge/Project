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

      console.log("kid info");

      var myKid = new App.Models.MyKidsProfile({
        image: $('#uImage').val(),
        firstName: $('#kfirstName').val(),
        lastName: $('#klastName').val(),
        address1: $('#kAddress1').val(),
        address2: $('#kAddress2').val(),
        ec1Name: $('#Emergency1').val(),
        ec1Phone: $('#Emergency1Phone').val(),
        ec2Name: $('#Emergency2').val(),
        ec2Phone: $('#Emergency2Phone').val(),
        doctor: $('#doctor').val(),
        medical: $('medical').val(),
        notes: $('#notes').val(),

      });


      myKid.save(null, {
        success: function () {
          App.all_myKids.add(myKid);
        }
      });

    }

  });

}());
