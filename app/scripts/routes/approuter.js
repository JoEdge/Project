$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'profile/id:' : 'profileInfo',
    },

    home: function() {
      new App.Views.UserProfileView ({collection: App.all_users});
      new App.Views.MyKidsView({collection: App.all_myKids});
    }

  });

}());
