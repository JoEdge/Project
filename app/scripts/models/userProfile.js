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
