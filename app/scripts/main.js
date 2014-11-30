//Initialize Parse

Parse.initialize("rSMFx7NCERf7fOIu7UBDFhrVWQBNXQJLGkzGu0ML", "YNVYJv0m0llTc3tpH3AmS982AyhLx6memgnignCY");


$( document ).ready(function(){

    App.all_users = new App.Collections.UserCollection();

    App.all_users.fetch().done(function () {

      App.router = new App.Routers.approuter();

      Parse.history.start();

    });

    App.all_myKids = new App.Collections.MyKidsCollection();

    App.all_myKids.fetch().done(function () {

      App.router = new App.Routers.approuter();

    });


}());
