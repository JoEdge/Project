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
      $('.enterSite').hide();
      new App.Views.AddEventView();
    },

    enterSite: function() {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      if(App.user) return App.router.navigate('start', {trigger: true});
        new App.Views.SignUp();
        new App.Views.Login();
      $('#logOut').click(function() {
          location.reload();
      });

    },

    profileInfo: function() {
      $('.enterSite').hide();
      new App.Views.MyKidsView();
      new App.Views.MyKidsList({collection: App.all_myKids});
    }

  });

}());
