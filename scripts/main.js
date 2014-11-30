// This sets up global apps

window.App = {};
App.Models = {};
App.Collections = {};
App.Views = {};
App.Routers = {};


$( document ).ready(function(){

  App.Models.UserProfile = Parse.Object.extend({

    className: 'userProfile',

    defaults: {
      image: '',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      phone:'',
      email:'',
      kids: '',
    },

    idAttribute: 'objectID',

    initialize: function(){
      //console.log("I am the user");

    }

  });


}());

(function () {

  App.Collections.UserCollection = Parse.Collection.extend ({
    model: App.Models.UserProfile,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());

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

$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'profile/id:' : 'profileInfo',
    },

    home: function() {
      new App.Views.UserProfileView ({collection: App.all_users});

    }

  });

}());

//Initialize Parse

Parse.initialize("rSMFx7NCERf7fOIu7UBDFhrVWQBNXQJLGkzGu0ML", "YNVYJv0m0llTc3tpH3AmS982AyhLx6memgnignCY");


$( document ).ready(function(){

    App.all_users = new App.Collections.UserCollection();

    App.all_users.fetch().done(function () {

      App.router = new App.Routers.approuter();

    });


}());
