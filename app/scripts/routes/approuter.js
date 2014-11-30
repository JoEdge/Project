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
