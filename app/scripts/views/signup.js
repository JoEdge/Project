
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
