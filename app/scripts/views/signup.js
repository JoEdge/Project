
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
      console.log(username);
      console.log(password);

      //Check if passwords match and add new user if true
      if ( password === ckpassword ){

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);

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
