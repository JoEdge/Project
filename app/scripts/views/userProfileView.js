$( document ).ready(function(){

  App.Views.UserProfileView = Parse.View.extend ({

    className: "Profile",

    events: {

      "submit #myInfo" : "updateProfile",

    },

    template: $("#userInfo").html(),

    initialize: function() {

      this.render();

      $('#updateInfo').html(this.$el);
    },

    render: function() {

      this.$el.html(this.template);
    },

    updateProfile: function(e) {

      e.preventDefault();

      console.log("user info");

      var user = new App.Models.UserProfile({
        image: $('#uImage').val(),
        firstName: $('#ufirstName').val(),
        lastName: $('#ulastName').val(),
        address1: $('#uAddress1').val(),
        address2: $('#uAddress2').val(),
        phone: $('#uPhone').val(),
        email: $().val('#uEmail'),

      });


      user.save(null, {
        success: function () {
          App.all_users.add(user);
        }
      });

    }

  });

}());
