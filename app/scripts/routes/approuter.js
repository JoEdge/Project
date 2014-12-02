$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'signup': 'SignUp',
      'start': 'LogIn',
      'profile' : 'profileInfo',

    },

    home: function() {

    },

    SignUp: function() {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      if(App.user) return App.router.navigate('/profile', {trigger: true});
        new App.Views.SignUp();

    },

    LogIn: function() {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      if(App.user) return App.router.navigate('/profile', {trigger: true});
        new App.Views.Login();

    },

    profileInfo: function() {
      $('.enterSite').hide();
      new App.Views.UserProfileView ();
      new App.Views.MyKidsView();
      new App.Views.MyKidsList({collection: App.all_myKids});
    }

  });

}());
