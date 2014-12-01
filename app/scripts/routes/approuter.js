$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'start': 'enterSite',
      'profile' : 'profileInfo',

    },

    home: function() {

    },

    enterSite: function() {

    },

    profileInfo: function() {
      new App.Views.UserProfileView ();
      new App.Views.MyKidsView();
      new App.Views.MyKidsList({collection: App.all_myKids});
      $('.enterSite').hide();
    }

  });

}());
