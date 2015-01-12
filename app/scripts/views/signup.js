
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

      console.log(username);

      //Check if passwords match and add new user if true
      if ( password === ckpassword ){

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);

        console.log(username);

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
              },//end success
              error: function(user, error) {
                alert("Error");
              }//end error
            });//end Parse.User.logIn

          App.router.navigate('', { trigger: true });

      } else {
        window.alert('Passwords Do Not Match');
      }

        //Clear form
        $("#userForm")[0].reset();

    }//end event:signUp

  });//end if passwords match

}());
