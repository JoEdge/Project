$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'profile/id:' : 'profileInfo',
    },

    home: function() {
      new App.Views.UserProfileView ();
      new App.Views.MyKidsView();
      new App.Views.MyKidsList({collection: App.all_myKids});
    }

  });

}());
