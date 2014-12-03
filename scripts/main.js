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
    },

    idAttribute: 'objectID',

    initialize: function(){
      console.log("my kids info");

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
      console.log("my events");

    }

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
            console.log("har");
          },//end success user.signUp
          error: function(user, error){
            alert("Please choose another username.");
          }//end error user.signUp
        });//end user.signup

        // Parse.User.logIn(username, password, {
        //   success: function(user){
        //     console.log("show me");
        //     App.user = user;
        //   //  App.updateUser();
        //     console.log(App.user);
        //   },//end success
        //
        //   error: function(user, error) {
        //     alert("Error");
        //   }//end error
        //
        // });//end Parse.User.logIn

        App.router.navigate('profile', { trigger: true });
        
      } else {
        window.alert('Passwords Do Not Match');

        //Clear form
        $("#userForm")[0].reset();

        //end form reset

      }//end passwords don't match

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

    updateMyKids: function(e) {
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

      imageFile.save()
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
      //  user: App.user,

      });

      // //Set Control
      // var myKidACL = new Parse.ACL(App.user);
      // myKidACL.setPublicReadAccess(false);
      // myKidACL.setWriteAccess(App.user, true);
      //
      // myEvent.setACL(myEventACL);
      //
      // //save


      myKid.save(null, {
        success: function () {
          App.all_myKids.add(myKid);
        }
      });

    }

  });

}());

(function () {
  App.Views.MyKidsList = Parse.View.extend ({

    tagName: 'ul',
    className: 'myKidsList',

    events: {

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

    }

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
        //  user: App.user,

      });//end var myEvent

      // //Set Control
      // var myEventACL = new Parse.ACL(App.user);
      // myEventACL.setPublicReadAccess(false);
      // myEventACL.setWriteAccess(App.user, true);
      //
      // myEvent.setACL(myEventACL);

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
  App.Views.AllEvents = Parse.View.extend ({

    tagName: 'ul',
    className: 'AllEvents',

    events: {

    },

    template: _.template($('#allMyEvents').html()),

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

$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    },

    routes: {
      '' : 'home',
      'event': 'eventInfo',
      'start': 'enterSite',
      'profile' : 'profileInfo',

    },

    home: function() {
      $('.enterSite').hide();
      new App.Views.AllEvents({collection: App.all_events});
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

  });

}());

//Initialize Parse

Parse.initialize("rSMFx7NCERf7fOIu7UBDFhrVWQBNXQJLGkzGu0ML", "YNVYJv0m0llTc3tpH3AmS982AyhLx6memgnignCY");


$( document ).ready(function(){

    // App.all_users = new App.Collections.UserCollection();
    //
    // App.all_users.fetch().done(function () {
    //
    //   App.router = new App.Routers.approuter();
    //
    // });//end of fetch all_users

    App.all_events = new App.Collections.EventCollection();

    App.all_events.fetch().done(function () {

      App.router = new App.Routers.approuter();

    });//end of fetch all_events

    App.all_myKids = new App.Collections.MyKidsCollection();

    App.all_myKids.fetch().done(function () {

      App.router = new App.Routers.approuter();

      Parse.history.start();

    });//end of fetch all_mykids

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
        App.router.navigate('', {trigger: true});
      }//end of else statement

    };//end of App.updateUser function

    App.updateUser();

}());
