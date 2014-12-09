$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'event': 'eventInfo',
      'start': 'enterSite',
      'profile/:id' : 'profileInfo',
      'mykids' : 'myKidsInfo',
      'kidSingle/:id' : 'oneKid',
      'share/:id': 'shareKidInfo',
      'editEvent/:id': 'editEventInfo',
      'editKid/:id': 'editKidInfo',
      'addKids/:id': 'addingKids',

    },

    home: function() {
      $('.enterSite').hide();
      new App.Views.MyKidsList({collection: App.all_myKids});
      new App.Views.MessageList({collection: App.all_messages});
      $('#homeBtn').click(function() {
        location.reload();
      });
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
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var u = App.all_users.get(id);
      new App.Views.EditUser({users:u});
    },

    oneKid: function (id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var sk = App.all_myKids.get(id);
      new App.Views.SoloKid({onekid:sk});
      $('#logOut').click(function() {
        location.reload();
      });
    },

    myKidsInfo: function() {
      $('.enterSite').hide();
      new App.Views.MyKidsView();
      new App.Views.MyKidsList({collection: App.all_myKids});
      $('#shareInfo').click(function() {
        location.reload();
      });
    },

    addingKids: function(id) {
      $('.enterSite').hide();
      new App.Views.MyKidsList({collection: App.all_myKids})
      // var ak = App.all_myKids.get(id);
      // console.log(ak);
      // console.log(id);
      var se =  App.all_events.get(id);
      new App.Views.AddKid2EventView({soloEvent : se});
    },

    eventInfo: function() {
      $('.enterSite').hide();
      new App.Views.AddEventView();
      new App.Views.MyEvents({collection: App.all_events});
      $('#createEvent').click(function() {
        location.reload();
      });
      $('#editEvent').click(function() {
        location.reload();
      });
      $('#kidAdder').click(function() {
        location.reload();
      });
    },

    shareKidInfo: function(id) {
      $('.enterSite').hide();
      $('.main').show();
      $('.sidebar').show();
      var kidId = App.all_myKids.get(id);
      new App.Views.SenderMessageView({ kid_id: kidId });
      new App.Views.MyKidsList({collection: App.all_myKids});
    },

    editEventInfo: function (id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var e = App.all_events.get(id);
      new App.Views.EditEvent({events: e});
      $('#editor').click(function() {
        location.reload();
      });
      $('#eventDelete').click(function() {
        location.reload();
      });
    },

    editKidInfo: function(id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      console.log(id);
      var k = App.all_myKids.get(id);
      console.log(k);
      new App.Views.EditKid({kidE : k});
    }

  });

}());
