$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'event': 'eventInfo',
      'start': 'enterSite',
      'profile' : 'profileInfo',
      'share/:id': 'shareKidInfo',
      'editEvent/:id': 'editEventInfo',

    },

    home: function() {
      $('.enterSite').hide();
      new App.Views.AllEvents({collection: App.all_events});
      new App.Views.MessageList({collection: App.all_messages});
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
    },

    eventInfo: function() {
      $('.enterSite').hide();
      new App.Views.AddEventView();
      new App.Views.MyEvents({collection: App.all_events});
    },

    shareKidInfo: function(id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      new App.Views.SenderMessageView();
    },

    editEventInfo: function (id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var e = App.all_events.get(id);
      new App.Views.EditEvent({events:e});
    },

  });

}());
