// This sets up global apps

window.App = {};
App.Models = {};
App.Collections = {};
App.Views = {};
App.Routers = {};


$( document ).ready(function(){

  App.Models.MyKidsProfile = Parse.Object.extend({

    className: 'kidProfile',

    defaults: {
      image: '',
      firstName: '',
      lastName: '',
      birthdate: '',
      address1: '',
      address2: '',
      ec1Name:'',
      ec1Phone:'',
      ec2Name: '',
      ec2Phone: '',
      doctor: '',
      medical:'',
      notes: '',
      user:'',
      listed: '',
      eventKid:'',
    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());

$( document ).ready(function(){

  App.Models.Events = Parse.Object.extend({

    className: 'Events',

    defaults: {

      eventName: '',
      eventDate: '',
      location: '',
      location2: '',
      user:'',
      kids: []


    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());

$( document ).ready(function(){

  App.Models.MessageModel = Parse.Object.extend({

    className: 'Message',

    defaults: {

      sender: '',
      senderName: '',
      recipient: '',
      recipientName: '',
      content: '',
      share: '',
      kid: '',
    },

    idAttribute: 'objectID',

    initialize: function(){

    }

  });


}());

(function () {

  App.Collections.UserCollection = Parse.Collection.extend ({
    model: Parse.User,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());

(function () {

  App.Collections.MyKidsCollection = Parse.Collection.extend ({
    model: App.Models.MyKidsProfile,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());

(function () {

  App.Collections.EventCollection = Parse.Collection.extend ({
    model: App.Models.Events,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());

(function () {

  App.Collections.MessageCollection = Parse.Collection.extend ({
    model: App.Models.MessageModel,
    comparator: function (model) {
      return (model.get('createdAt'));
    },

  });

}());


(function(){

  App.Views.SignUp = Parse.View.extend({

    events: {
      "submit #userForm" : "signUp",
    },//end events

    template: $("#userSignup").html(),

    initialize: function() {
      this.render();

      $("#profiler").html(this.$el);

    },//end initialize


    render: function() {
      this.$el.html(this.template);
    },//end render

    signUp: function(e) {
      e.preventDefault();

      var username = $('#newusername').val();
      var password = $('#newpassword').val();
      var ckpassword = $('#confirmpword').val();
      var email = $('#uEmail').val();

      console.log(username);

      //Check if passwords match and add new user if true
      if ( password === ckpassword ){

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);

        console.log(username);

        user.signUp (null, {
          success: function(user) {
          },
          error: function(user, error){
            alert("Error Signup");
          }
        });

        console.log("sign up")

        Parse.User.logIn(username, password, {
            success: function(user){
              App.user = user;
              App.updateUser();
              console.log(App.user);
              },//end success
              error: function(user, error) {
                alert("Error");
              }//end error
            });//end Parse.User.logIn

          App.router.navigate('', { trigger: true });

      } else {
        window.alert('Passwords Do Not Match');
      }

        //Clear form
        $("#userForm")[0].reset();

    }//end event:signUp

  });//end if passwords match

}());


$( document ).ready(function(){

  App.Views.Login = Parse.View.extend ({

    className: "LogIn",

    events: {

      "submit #loginForm" : "logInUser",

    },

    template: $("#userLogin").html(),

    initialize: function() {
      this.render();

      $('#log_signup').html(this.$el);
    },

    render: function() {

      this.$el.html(this.template);
    },

    logInUser: function(e) {

      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();

      Parse.User.logIn(username, password, {
        success: function(user){
          App.user = user;
          App.updateUser();
          App.router.navigate('', {trigger: true});
          location.reload();
        },

        error: function(user, error) {
          alert("Your username or password is incorrect.");
        }

      });

      //clear my form
      $("#loginForm")[0].reset();
       App.router.navigate('', { trigger: true });
    },

  });

}());

(function(){

  App.Views.MyKidsView = Parse.View.extend ({

    className: "MyKids",

    events: {
      "submit #myKidInfo" : "updateMyKids",

    },//end events

    template: $("#kidInfo").html(),

    initialize: function() {

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    render: function() {

      this.$el.html(this.template);
    },//end render

    updateMyKids: function(e, listed, eventKid) {
      e.preventDefault();
      //on click event get a reference to the image file
      var image2file = $("#kImage")[0];
      if (image2file.files.length > 0) {
        var file = image2file.files[0];
        //electing to only allow .jpg files for images
        var name = "photo.jpg";
        var imageFile = new Parse.File(name, file);
        console.log(imageFile);
      }

      //imageFile.save()
      //save this new image file to Parse Cloud
      imageFile.save().then(function() {
      }, function(error) {
      });

      var myKid = new App.Models.MyKidsProfile({
        image: imageFile,
        firstName: $('#kfirstName').val(),
        lastName: $('#klastName').val(),
        birthdate: $('#birthdate').val(),
        address1: $('#kAddress1').val(),
        address2: $('#kAddress2').val(),
        ec1Name: $('#Emergency1').val(),
        ec1Phone: $('#Emergency1Phone').val(),
        ec2Name: $('#Emergency2').val(),
        ec2Phone: $('#Emergency2Phone').val(),
        doctor: $('#doctor').val(),
        medical: $('#medical').val(),
        notes: $('#notes').val(),
        user: App.user,
        listed: listed,
        eventKid: eventKid,

      });

      //Set Control
      var myKidACL = new Parse.ACL(Parse.User.current());
      myKidACL.setReadAccess(Parse.User.current(), true);
      myKidACL.setWriteAccess(Parse.User.current(), true);

      myKid.setACL(myKidACL);

      //save
      myKid.save(null, {
        success: function () {
          App.all_myKids.add(myKid);
          App.router.navigate('', {trigger: true});
        }
      });

    },


  });

}());

(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {

     //"click .addKidBtn" : "addingKids",

    },

    template: _.template($('#listMyKids').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

    },

    // addingKids: function(e){
    //
    //   e.preventDefault();
    //   //get selected kid in array 'kids' located in event class
    //   var kiddyID = e.currentTarget.id;
    //   var kidPhoto = $(e.currentTarget).data('img');
    //   var kidArray = this.options.adder.attributes.kids;
    //   var kidObject = { kid: kiddyID, photo: kidPhoto };
    //
    //   kidArray.push(kidObject);
    //
    //   this.options.adder.save();
    //
    //   // //query events for arrays of kids
    //   var queryKids = new Parse.Query(App.Models.Events);
    //   queryKids.equalTo('kids', kidObject);
    //   queryKids.find({
    //     success: function(result) {
    //       console.log(result);
    //
    //     },
    //     error: function(error) {;
    //     }//end error
    //   });
    //
    //  },

    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (myKid) {
        var kidPhoto = myKid.get("image");
        $('#profilePic').src = kidPhoto.url();
        self.$el.append(self.template(myKid.toJSON()));
      });

    },//end render

  });

}());

(function () {

  App.Views.SoloKid = Parse.View.extend({

    tagName: 'ul',
    className: 'SoloKid',

    events: {

      'click #backItUp' : 'goBack',

    },

    template: _.template($('#solokiddy').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.onekid.toJSON()));

    },

    goBack: function() {
      App.router.navigate('', {trigger: true});

    },


  });

}());

(function () {

  App.Views.EditKid = Parse.View.extend({

    tagName: 'ul',
    className: 'EditKid',

    events: {
      'submit #FormEditKid' : 'updateKid',
      'click #kidDelete' : 'deleteKid',
    },

    template: _.template($('#editedKid').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.kidE.toJSON()));

    },

    updateKid: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.kidE.set({
       // image: imageFile,
        firstName: $('#update_kfirstName').val(),
        lastName: $('#update_klastName').val(),
        birthdate: $('#update_birthdate').val(),
        address1: $('#update_kAddress1').val(),
        address2: $('#update_kAddress2').val(),
        ec1Name: $('#update_Emergency1').val(),
        ec1Phone: $('#update_Emergency1Phone').val(),
        ec2Name: $('#update_Emergency2').val(),
        ec2Phone: $('#update_Emergency2Phone').val(),
        doctor: $('#update_doctor').val(),
        medical: $('#update_medical').val(),
        notes: $('#update_notes').val(),

      });

      // Save Instance
      this.options.kidE.save();

      // Return to home page
      App.router.navigate('', {trigger: true});
      console.log('ha');
      App.router.navigate('mykids', {trigger: true});
      console.log('ha');
      App.router.navigate('', {trigger: true});


    },

    deleteKid: function (e) {
      e.preventDefault();

      // Remove Event
      this.options.kidE.destroy();

      // Return to home page
      console.log('ha');
      App.router.navigate('', {trigger: true});
      console.log('ha');
      App.router.navigate('mykids', {trigger: true});
      App.router.navigate('', {trigger: true});

    },

  });

}());

$( document ).ready(function(){

  App.Views.AddEventView = Parse.View.extend ({

    className: "Events",

    events: {

      "submit #eventForm" : "addMyEvent",

    },//end events

    template: $("#eventInfo").html(),

    initialize: function() {

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    render: function() {

      this.$el.html(this.template);
    },//end render

    addMyEvent: function(e) {
      e.preventDefault();

      var myEvent = new App.Models.Events ({
        eventName: $('#eventName').val(),
        eventDate: $('#eventDate').val(),
        location: $('#location').val(),
        location2: $('#location2').val(),
        user: App.user,

      });//end var myEvent

      // //Set Control
      var myEventACL = new Parse.ACL(Parse.User.current());
      myEventACL.setPublicReadAccess(false);
      myEventACL.setWriteAccess(Parse.User.current(), true);

      myEvent.setACL(myEventACL);

      //save
      myEvent.save(null, {
        success: function () {
          App.all_events.add(myEvent);
          App.router.navigate('', {trigger: true});
          App.router.navigate('event', {trigger: true});
        }//end success

      });//end myEvent.save

    }//end addMyEvent

  });//end App.Views

}());

(function () {
  App.Views.MyEvents = Parse.View.extend ({

    tagName: 'ul',
    className: 'myEventsList',

    events: {
      "click .toggle" : "show",
    },

    template: _.template($('#listMyEvents').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);


      $('#myKidsOnly').html(this.$el);

      $('.targeted').hide();

    },


    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });

    },

    show: function(e) {
      e.preventDefault();
  $(e.target.nextElementSibling).slideToggle('slow', function(){
          $(".buttons");
        });

    }

  });

}());

(function () {

  App.Views.EditEvent = Parse.View.extend({

    tagName: 'ul',
    className: 'EditEvent',

    events: {
      'submit #FormEditEvent' : 'updateEvent',
      'click #eventDelete' : 'deleteEvent',
    },

    template: _.template($('#editedEvent').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      console.log(this.options);
      this.$el.html(this.template(this.options.eventOne.toJSON()));

    },

    updateEvent: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.eventOne.set({
        eventName: $("#update_event_name").val(),
        eventDate: $("#update_event_date").val(),
        location: $("#update_event_location").val(),
        location2: $("#update_event_location2").val(),
      });

      // Save Instance
      this.options.eventOne.save();

      // Return to home page
      App.router.navigate('event', {trigger: true});

    },

    deleteEvent: function (e) {
      e.preventDefault();

      // Remove Event
      this.options.eventOne.destroy();

      // Return to home page
      App.router.navigate('event', {trigger: true});

    },


  });

}());

$( document ).ready(function(){

  App.Views.AddKid2EventView = Parse.View.extend ({

    className: "AddKid2Event",

    events: {
    //  "submit #updateInfo" : "addingKids",

    },//end events

    template: _.template($('#oneEvent').html()),

    initialize: function(options) {
      this.options = options;

      //this.addingKids();
      this.render();
      //this.addingKids();

      $('#updateInfo').html(this.$el);
    },//end initialize


    render: function() {

      var self= this;

      //clears our element
      this.$el.empty();

      this.$el.html(this.template(this.options.add2event.toJSON()));

    },

  });

}());

(function () {
  App.Views.Kids2Event = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList2',

    events: {

      "click .addKidBtn" : "addingKids",

    },

    template: _.template($('#listMyKids2').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

    },

    addingKids: function(e){

      e.preventDefault();
      //get selected kid in array 'kids' located in event class
      var kiddyID = e.currentTarget.id;
      var kidPhoto = $(e.currentTarget).data('img');
      var kidArray = this.options.adder.attributes.kids;
      var kidObject = { kid: kiddyID, photo: kidPhoto };

      kidArray.push(kidObject);

      this.options.adder.save();

      // //query events for arrays of kids
      var queryKids = new Parse.Query(App.Models.Events);
      queryKids.equalTo('kids', kidObject);
      queryKids.find({
        success: function(result) {
          console.log(result);

        },
        error: function(error) {;
        }//end error
      });

    },

    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (myKid) {
        var kidPhoto = myKid.get("image");
        $('#profilePic').src = kidPhoto.url();
        self.$el.append(self.template(myKid.toJSON()));
      });

    },//end render

  });

}());

(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {
      "submit #messageForm" : "sendMessage",

    },//end events

    template: _.template($('#messagesTo').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    sendMessage: function (e) {
      e.preventDefault();

      var self = this;

      var queryGetter = new Parse.Query(Parse.User);
      queryGetter.equalTo('username', $('#recipient').val());
      queryGetter.first({
        success: function(result) {
          console.log(result);
          self.saveMessage(result);
        },
        error: function(error) {;
        }//end error
      });
    },

    //function to insert relevant info
    saveMessage: function(recipient) {
      var self = this;

      var myMessage = new App.Models.MessageModel ({
        recipientName: $('#recipient').val(),
        recipient: recipient,
        content:  $('#content').val(),
        sender: App.user,
        senderName: $('#senderName').val(),
        kid: this.options.kid_id,
      });//end var myMessages

        myMessage.save(null, {
          success: function (myMessage) {

            self.controlSetter(myMessage);

            App.all_messages.add(myMessage);
            //clear my form
            $("#messageForm")[0].reset();
          },
          error: function(error) {

          }//end error
        })

      },
      //function to set controls
      controlSetter: function(myMessage) {
        //var self= this;

      //Set Control on Message
        var myMessageACL = new Parse.ACL(Parse.User.current());
        myMessageACL.setPublicReadAccess(true);
        myMessageACL.setWriteAccess(Parse.User.current(), true);

        myMessage.setACL(myMessageACL);

        //Set Control on Kid Profile
        var recipient = myMessage.attributes.recipient;
        var sender = myMessage.attributes.sender;

        var Kid = Parse.Object.extend('App.Models.MyKidProfile');
        var oneKid = this.options.kid_id;
        var thisKidACL = new Parse.ACL();

        thisKidACL.setReadAccess(recipient, true);
        thisKidACL.setReadAccess(sender, true);
        thisKidACL.setWriteAccess(sender, true);
        oneKid.setACL(thisKidACL);
        oneKid.save();

      },//end set control function

  //},

    render: function() {

      this.$el.html(this.template(this.options.kid_id.toJSON()));

        var kidTemplate = _.template($('#listMyKids').html());
        var kid_query = new Parse.Query(App.Models.MyKidsProfile);

        kid_query.equalTo('kid', this.options.kid_id);

        this.$el.append('<ul class="kiddy"></ul>');

        kid_query.find({
          success: function (results) {

            _.each(results, function(kiddy) {
              $('ul.kiddy').append(kidTemplate(kiddy.toJSON()));
            })
          }
        })

    },//end render

  });//end App.Views

}());

(function () {
  App.Views.MessageList = Parse.View.extend ({

    tagName: 'ul',
    className: 'MessageList',

    events: {

     'click #hideMsg' : 'deleteMessage',

    },

    template: _.template($('#messagesFrom').html()),

    initialize: function(options) {

      this.options = options;

      //this.render();

      this.queryRecipient();

      // MIGHT HAVE TO COME BACK TO THIS LATER!!
      //this.collection.off();
      //this.collection.on('sync', this.render, this);

      $('#updateInfo').html(this.$el);

    },

  // Query who recieved message
  queryRecipient: function () {
    var self= this;

    var query= new Parse.Query (App.Models.MessageModel);
      query.equalTo('recipient', App.user);
    //  query.equalTo('recipient', App.user.attributes.username);
      query.find({
        success: function(results) {
          self.render(results);
        },
        error: function(error) {
        }
    });

  },

    render: function(queryCollection){
      var self = this;

      //clears our element
      this.$el.empty();

      _.each(queryCollection, function (s) {
        self.$el.append(self.template(s.toJSON()));
      })

    },

     deleteMessage: function (e) {
       e.preventDefault();

       console.log("JAJAJAJA");
       console.log(this.options);
      // Remove Message
      //this.options.s.destroy();
    //
    //   // Return to home page
    //   App.router.navigate('', {trigger: true});

    },

  });

}());

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

//Initialize Parse

Parse.initialize("rSMFx7NCERf7fOIu7UBDFhrVWQBNXQJLGkzGu0ML", "YNVYJv0m0llTc3tpH3AmS982AyhLx6memgnignCY");


(function(){

    App.all_users = new App.Collections.UserCollection();

    App.all_users.fetch().done(function () {

      App.all_messages = new App.Collections.MessageCollection();

      App.all_messages.fetch().done(function () {

        App.all_events = new App.Collections.EventCollection();

        App.all_events.fetch().done(function () {

          App.all_myKids = new App.Collections.MyKidsCollection();

          App.all_myKids.fetch().done(function () {

            App.router = new App.Routers.approuter();

            Parse.history.start();

            App.updateUser();

          })
        })
      })
    });//end of fetch all_users

    //slide out menu

    $(document).ready(function(){
      $('.js-menu-trigger').on('click touchstart', function(e){
        $('.js-menu').toggleClass('is-visible');
        $('.js-menu-screen').toggleClass('is-visible');
        e.preventDefault();
      });

      $('.js-menu-screen').on('click touchstart', function(e){
        $('.js-menu').toggleClass('is-visible');
        $('.js-menu-screen').toggleClass('is-visible');
        e.preventDefault();
      });
    });

    // Log Out
    $('#logOut').on('click', function (e) {
      e.preventDefault();

      Parse.User.logOut();
      App.updateUser();
      App.router.navigate('start', {trigger: true});
    });//end of logout function

    $('#logOut').click(function() {
      location.reload();
    });

    // Update User
    App.updateUser = function (){
      App.user = Parse.User.current();
      var currUsr;
      if (App.user == null){
        currUsr = '';
        $('#logOut').text('Log In');
        $('#eventBtn').hide();
        $('#myKidsBtn').hide();
        $('#homeBtn').hide();
        
      } else {
        currUsr = 'Welcome Back ' + App.user.attributes.username;
        $('#logOut').text('Log Out');
        $('#eventBtn').show();
        $('#myKidsBtn').show();
        $('#homeBtn').show();
      }
        $('#loggedIn').html(currUsr);

    };//end of App.updateUser function

    App.updateUser();

}());
