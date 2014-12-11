(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'event': 'eventInfo',
      'start': 'enterSite',
      'mykids' : 'myKidsInfo',
      'kidSingle/:id' : 'oneKid',
      'share/:id': 'shareKidInfo',
      'editEvent/:id': 'editEventInfo',
      'editKid/:id': 'editKidInfo',
      'addKids/:id': 'addingKids',

    },

    home: function() {
      console.log('loading home');
      $('.enterSite').hide();
      new App.Views.MyKidsList({collection: App.all_myKids});
      new App.Views.MessageList({collection: App.all_messages});
    },

    enterSite: function() {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      if(App.user) return App.router.navigate('start', {trigger: true});
        new App.Views.SignUp();
        new App.Views.Login();
    },

    oneKid: function (id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var sk = App.all_myKids.get(id);
      new App.Views.SoloKid({onekid:sk});
      $('#backItUp').click(function() {
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
      console.log(id);
      var se =  App.all_events.get(id);
      console.log(se);
      new App.Views.AddKid2EventView({add2event : se});
      new App.Views.Kids2Event({collection: App.all_myKids, adder: se});
    },

    eventInfo: function() {
      $('.enterSite').hide();
      new App.Views.AddEventView();
      new App.Views.MyEvents({collection: App.all_events});

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
      new App.Views.EditEvent({eventOne: e});
      $('#eventDelete').click(function() {
        location.reload();
      });
      $('#editor').click(function() {
        location.reload();
      });


    },

    editKidInfo: function(id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var k = App.all_myKids.get(id);
      new App.Views.EditKid({kidE : k});
      $('#kidDelete').click(function() {
        location.reload();
      });
      $('#kidEditor').click(function() {
        location.reload();
      });

    },

  });

}());
