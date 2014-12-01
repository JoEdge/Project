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

      console.log("kid info");

      var myKid = new App.Models.MyKidsProfile({
        image: $('#uImage').val(),
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

      this.collection.off();
      this.collection.on('sync', this.render, this);

      $('#myKidsOnly').html(this.$el);

    },

    render: function(){
      var self= this;

      //clears our element
      this.$el.empty();

      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
        var list_collection = this.collection.sortBy( function (model) {
          return model.get(self.options.sort);
        });
        _.each(list_collection, function (s) {
          self.$el.append(self.template(s.toJSON()));
        })
      } else {
        // Sort from our default

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


}());
