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
      kids: '',
      user:'',

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
      console.log('here1');
    },//end render

    signUp: function(e) {

      var username = $('#newusername').val();
      var password = $('#newpassword').val();
      var ckpassword = $('#confirmpword').val();
      var email = $('#uEmail').val();
      // var firstName = $('#ufirstName').val();
      // var lastName = $('#ulastName').val();
      // var address1 = $('#uAddress1').val();
      // var address2 = $('#uAddress2').val();
      // var phone = $('#uPhone').val();
      // var image = $('#uimage').val();
      console.log(username);

      //Check if passwords match and add new user if true
      if ( password === ckpassword ){

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        // user.set('firstName', firstName);
        // user.set('lastName', lastName);
        // user.set('address1', address1);
        // user.set('address2', address2);
        // user.set('password', password);
        // user.set('phone', phone);
        // user.set('image', image);
        console.log(username);

        user.signUp (null, {
          success: function(user) {

            Parse.User.logIn(username, password, {
              success: function(user){
                App.user = user;      
              },//end success
              error: function(user, error) {
                alert("Error");
              }//end error
            });//end Parse.User.logIn
            App.router.navigate('profile', { trigger: true });
          },//end success user.signUp
          error: function(user, error){
            alert("Please choose another username.");
          }//end error user.signUp
        });//end user.signup

      } else {
        window.alert('Passwords Do Not Match');

        //Clear form
        $("#userForm")[0].reset();

        //end form reset

      }//end passwords don't match

    }//end event:signUp

  });//end if passwords match

}());

(function () {

  App.Views.EditUser = Parse.View.extend({

    tagName: 'ul',
    className: 'EditUser',

    events: {
      'submit #FormEditUser' : 'updateUser',

    },

    template: _.template($('#editedUser').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#log_signup').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.users.toJSON()));

    },

    updateUser: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.users.set({
        //image: imageFile,
        username: $('#update_username').val(),
        email: $('#update_email').val(),

      });

      // Save Instance
      this.options.users.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },


  });

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

$( document ).ready(function(){

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

    updateMyKids: function(e, listed) {
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
    //  "click #shareInfo" : "changeListed",
    },

    template: _.template($('#listMyKids').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

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

     },

    //  changeListed: function(e) {
    //    console.log('ha');
    //    e.preventDefault();
    //    this.listed = true;
    //  },


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
      'click #kidEditor' : 'updateKid',
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
      this.$el.html(this.template(this.options.kids.toJSON()));

    },

    updateKid: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.kids.set({
        image: imageFile,
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
      this.options.kids.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

    deleteKid: function (e) {
      e.preventDefault();

      // Remove Event
      this.options.events.destroy();

      // Return to home page
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

    },

    template: _.template($('#listMyEvents').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

      //this.collection.off();
      this.collection.on('sync', this.render, this);


      $('#myKidsOnly').html(this.$el);

    },


    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
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
      this.$el.html(this.template(this.options.events.toJSON()));

    },

    updateEvent: function (e) {
      e.preventDefault();
    
      // Update our Model Instance
      this.options.events.set({
        eventName: $("#update_event_name").val(),
        eventDate: $("#update_event_date").val(),
        location: $("#update_event_location").val(),
      });

      // Save Instance
      this.options.events.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

    deleteEvent: function (e) {
      e.preventDefault();

      // Remove Event
      this.options.events.destroy();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },


  });

}());

$( document ).ready(function(){

  App.Views.AddKid2EventView = Parse.View.extend ({

    className: "AddKid2Event",

    events: {
    //  "click #addKidBtn" : "addingKids",

    },//end events

    template: _.template($('#oneEvent').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

      $('#updateInfo').html(this.$el);
    },//end initialize

    render: function() {

      var self= this;

      //clears our element
      this.$el.empty();

      this.$el.html(this.template(this.options.adder.toJSON()));

    },


  });

}());

$( document ).ready(function(){

  App.Views.SenderMessageView = Parse.View.extend ({

    className: "Message",

    events: {
      //"click #shareInfo" : "changeACL",
      "submit #messageForm" : "sendMessage",

    },//end events

    template: _.template($('#messagesTo').html()),

    initialize: function(options) {
      this.options = options;

      this.render();

    //  this.queryRecipient();

    //  this.queryGetter();

      $('#updateInfo').html(this.$el);
    },//end initialize

    // queryGetter: function () {
    //   var queryGetter = new Parse.Query(Parse.User);
    //   queryGetter.get("reciever", this.options.getter );
    //     queryGetter.find({
    //     success: function(results) {
    //       console.log(this.options.getter);
    //     },
    //     error: function(object, error) {
    //       console.log(error);
    //     }
    //   });
    // },

    // Query who recieved message
    // queryRecipient: function () {
    //   var self= this;
    //
    //   var query= new Parse.Query (App.Models.MessageModel);
    //     query.equalTo('recipient', App.user.attributes.username);
    //     query.find({
    //
    //     success: function(results) {
    //       console.log(results);
    //     },
    //     error: function(error) {
    //       alert("Error");
    //     }
    //   });
    //
    // },

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

    sendMessage: function(e) {
      e.preventDefault();

      var myMessage = new App.Models.MessageModel ({
        recipient: $('#recipient').val(),
        content:  $('#content').val(),
        sender: App.user,
        senderName: $('#senderName').val(),
        kid: this.options.kid_id,

      });//end var myMessages
      console.log(this.options.kid_id);

      //Set Control on Message
      var myMessageACL = new Parse.ACL(Parse.User.current());
      myMessageACL.setPublicReadAccess(true);
      myMessageACL.setWriteAccess(Parse.User.current(), true);

      myMessage.setACL(myMessageACL);

      // //Set Control on Kid Profile
      // console.log(this.options.kid_id);
      //
      // var Kid = Parse.Object.extend('App.Models.MyKidProfile');
      // var oneKid = this.options.kid_id
      // console.log(oneKid);
      //
      // var thisKidACL = new Parse.ACL();
      // //thisKidACL.setPublicReadAccess(true);
      // //thisKidACL.setReadAccess("recipient", true);
      // //thisKidACL.setReadAccess(Parse.User.current(), true);
      //
      // oneKid.setACL(thisKidACL);
      // oneKid.save();

      //save
      myMessage.save(null, {
        success: function () {
          App.all_messages.add(myMessage);
          //clear my form
          $("#messageForm")[0].reset();

          // Now going to deal with the Kid Object
          // 1. Take the "kid" shared (this.options.kid_id)
          // 2. Update their ACL so that the recipient has access

        }//end success

      });//end myMessage.save

    }//end sendMessage

  });//end App.Views

}());

(function () {
  App.Views.MessageList = Parse.View.extend ({

    tagName: 'ul',
    className: 'MessageList',

    events: {

      'click #getMsg' : 'addNewKids',

    },

    template: _.template($('#messagesFrom').html()),

    initialize: function(options) {

      this.options = options;

      this.render();

  //    this.queryKid();

  //    this.queryRecipient();

      //this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#updateInfo').html(this.$el);

    },

  // Query who recieved message
  // queryRecipient: function () {
  //   var self= this;
  //
  //   var query= new Parse.Query (App.Models.MessageModel);
  //     query.equalTo('recipient', App.user.attributes.username);
  //     query.find({
  //
  //     success: function(results) {
  //
  //       self.collection.models = results;
  //
  //       self.render();
  //     },
  //     error: function(error) {
  //       alert("Error");
  //     }
  //   });
  //
  // },

    render: function(){
      var self = this;

      //clears our element
      this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });

    },

    addNewKids: function (e) {
      e.preventDefault();

      console.log("ha");
    },

  });

}());

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
    },

    myKidsInfo: function() {
      $('.enterSite').hide();
      new App.Views.MyKidsView();
      new App.Views.MyKidsList({collection: App.all_myKids});
    },

    addingKids: function(id) {
      $('.enterSite').hide();
      var ak = App.all_events.get(id);
      new App.Views.AddKid2EventView({adder: ak});
      new App.Views.MyKidsList({collection: App.all_myKids});
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
      //var RID = App.all_users.get(id);
      new App.Views.SenderMessageView({ kid_id: kidId });
      new App.Views.MyKidsList({collection: App.all_myKids});
    },

    editEventInfo: function (id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var e = App.all_events.get(id);
      new App.Views.EditEvent({events:e});
    },

    editKidInfo: function(id) {
      $('.enterSite').show();
      $('.main').hide();
      $('.sidebar').hide();
      var k = App.all_myKids.get(id);
      new App.Views.EditKid({kids:k});
    },

  });

}());

//Initialize Parse

Parse.initialize("rSMFx7NCERf7fOIu7UBDFhrVWQBNXQJLGkzGu0ML", "YNVYJv0m0llTc3tpH3AmS982AyhLx6memgnignCY");


$( document ).ready(function(){

    App.all_users = new App.Collections.UserCollection();

    App.all_users.fetch().done(function () {

      App.router = new App.Routers.approuter();

    });//end of fetch all_users
    App.all_messages = new App.Collections.MessageCollection();

    App.all_messages.fetch().done(function () {

      App.router = new App.Routers.approuter();

    });//end of fetch all_messages

    App.all_events = new App.Collections.EventCollection();

    App.all_events.fetch().done(function () {

      App.router = new App.Routers.approuter();

    });//end of fetch all_events

    App.all_myKids = new App.Collections.MyKidsCollection();

    App.all_myKids.fetch().done(function () {

      App.router = new App.Routers.approuter();

      Parse.history.start();

    });//end of fetch all_mykids


      // $(".dropdown-button").on('click', function() {
      //   $(".dropdown-menu").toggleClass("show-menu");
      //   $(".dropdown-menu > li").on('click',function(){
      //     $(".dropdown-menu").removeClass("show-menu");
      //   });
      //   $(".dropdown-menu.dropdown-select > li").on('click',function() {
      //     $(".dropdown-button").html($(this).html());
      //   });

    // Log Out
    $('#logOut').on('click', function (e) {
      e.preventDefault();

      Parse.User.logOut();
      App.updateUser();
      App.router.navigate('start', {trigger: true});
    });//end of logout function


    // Update User
    App.updateUser = function (){
      App.user = Parse.User.current();
      var currUsr;
      if (App.user == null){
        currUsr = '';
        $('#logOut').text('Log In');
        App.router.navigate('start', {trigger: true});
      } else {
        currUsr = 'Welcome ' + App.user.attributes.username;
        $('#logOut').text('Log Out');
        $('#loggedIn').html(currUsr);
      //  App.router.navigate('', {trigger: true});
      }//end of else statement

    };//end of App.updateUser function

    App.updateUser();


}());
