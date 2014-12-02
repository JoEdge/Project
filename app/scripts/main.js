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
        App.router.navigate('login', {trigger: true});
      } else {
        currUsr = 'Welcome ' + App.user.attributes.username;
        $('#logOut').text('Log Out');
      }
      $('#loggedIn').html(currUsr);
    };

    App.updateUser();



}());
