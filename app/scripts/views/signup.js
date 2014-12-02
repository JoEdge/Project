
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
      var firstName = $('#ufirstName').val();
      var lastName = $('#ulastName').val();
      var address1 = $('#uAddress1').val();
      var address2 = $('#uAddress2').val();
      var phone = $('#uPhone').val();
      var image = $('#uimage').val();


      //Check if passwords match and add new user if true
      if ( password === ckpassword ){

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        user.set('firstName', firstName);
        user.set('lastName', lastName);
        user.set('address1', address1);
        user.set('address2', address2);
        user.set('password', password);
        user.set('phone', phone);
        user.set('image', image);


        user.signUp (null, {
          success: function(user) {
          },//end success user.signUp
          error: function(user, error){
            alert("Please choose another username.");
          }//end error user.signUp
        });//end user.signup

        Parse.User.logIn(username, password, {
          success: function(user){
            App.user = user;
            App.updateUser();
            App.router.navigate('profile', { trigger: true });
            //Clear form
            $("#userForm")[0].reset();
            //end form reset
          },//end success

        });//end Parse.User.logIn

      } else {
        window.alert('Passwords Do Not Match');
        App.router.navigate('/start', { trigger: true });
      }//end passwords don't match

    }//end event:signUp

  });//end if passwords match

}());
