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

    //Home Button force refresh
    $('#homeBtn').click(function() {
      location.reload();
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
        App.router.navigate('start', {trigger: true});
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
