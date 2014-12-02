// This sets up global apps

window.App = {};
App.Models = {};
App.Collections = {};
App.Views = {};
App.Routers = {};

$( document ).ready(function(){

  App.Models.UserProfile = Parse.Object.extend({

    className: 'userProfile',

    defaults: {
      image: '',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      phone:'',
      email:'',
      kids: '',
    },

    idAttribute: 'objectID',

    initialize: function(){
      //console.log("I am the user");

    }

  });


}());


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
    },

    idAttribute: 'objectID',

    initialize: function(){
      console.log("my kids info");

    }

  });


}());

(function () {

  App.Collections.UserCollection = Parse.Collection.extend ({
    model: App.Models.UserProfile,
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


(function(){

  App.Views.SignUp = Parse.View.extend({

    events: {
      "submit #userForm" : "signUp",
    },

    template: $("#userSignup").html(),

    initialize: function() {
      this.render();

      $("#log_signup").html(this.$el);

    },


    render: function() {
      this.$el.html(this.template);
    },

    signUp: function(e) {

      e.preventDefault();

      var username = $('#newusername').val();
      var password = $('#newpassword').val();
      var ckpassword = $('#confirmpword').val();
      console.log(username);
      console.log(password);

      //Check if passwords match and add new user if true
      if ( password === ckpassword ){

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);

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
          },

          error: function(user, error) {
            alert("Error");
          }

        });

        App.router.navigate('', { trigger: true });

      } else {
        window.alert('Passwords Do Not Match');
      }

      //Clear form

      $("#userForm")[0].reset();
    }

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
          alert("Error");
        }

      });

      //clear my form
      $("#loginForm")[0].reset();
      App.router.navigate('', { trigger: true });
    },

  });

}());

$( document ).ready(function(){

  App.Views.UserProfileView = Parse.View.extend ({

    className: "Profile",

    events: {

      "submit #myInfo" : "updateProfile",

    },

    template: $("#userInfo").html(),

    initialize: function() {

      this.render();

      $('#updateInfo').html(this.$el);
    },

    render: function() {

      this.$el.html(this.template);
    },

    updateProfile: function(e) {

      e.preventDefault();

      console.log("user info");

      var user = new App.Models.UserProfile({
        image: $('#uImage').val(),
        firstName: $('#ufirstName').val(),
        lastName: $('#ulastName').val(),
        address1: $('#uAddress1').val(),
        address2: $('#uAddress2').val(),
        phone: $('#uPhone').val(),
        email: $().val('#uEmail'),

      });


      user.save(null, {
        success: function () {
          App.all_users.add(user);
        }
      });

    }

  });

}());

$( document ).ready(function(){

  App.Views.MyKidsView = Parse.View.extend ({

    className: "MyKids",

    events: {

      "submit #myKidInfo" : "updateMyKids",

    },

    template: $("#kidInfo").html(),

    initialize: function() {

      this.render();

      $('#listInfo').html(this.$el);
    },

    render: function() {

      this.$el.html(this.template);
    },

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
      //save this new image file to Parse Cloud
      imageFile.save().then(function() {
      }, function(error) {
      });

      var myKid = new App.Models.MyKidsProfile({
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

      });

      myKid.set("image", imageFile);

      myKid.save(null, {
        success: function () {
          App.all_myKids.add(myKid);
        }
      });

      //attempt get 1
      console.log(myKid);
      var kidPhoto = myKid.get("image");
      $('#profilePic')[0].src = kidPhoto.url();
      console.log(kidPhoto);
      //attempt get 2
      //var image = myKid.get("image").url();

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

      if (this.options.sort != undefined) {

        var list_collection = this.collection.sortBy( function (model) {
          return model.get(self.options.sort);
        });
        _.each(list_collection, function (s) {
          self.$el.append(self.template(s.toJSON()));
        })
      } else {
      
      this.collection.sort();
      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });
    }
      return this;
    },

  });

}());

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

//Initialize Parse

Parse.initialize("rSMFx7NCERf7fOIu7UBDFhrVWQBNXQJLGkzGu0ML", "YNVYJv0m0llTc3tpH3AmS982AyhLx6memgnignCY");


$( document ).ready(function(){

    App.all_users = new App.Collections.UserCollection();

    App.all_users.fetch().done(function () {

      App.router = new App.Routers.approuter();


    });

    App.all_myKids = new App.Collections.MyKidsCollection();

    App.all_myKids.fetch().done(function () {

      App.router = new App.Routers.approuter();

      Parse.history.start();

    });

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
      }
      $('#loggedIn').html(currUsr);
    };

    App.updateUser();



}());
