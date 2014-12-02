
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
