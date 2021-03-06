
$( document ).ready(function(){

  App.Views.Login = Parse.View.extend ({

    className: "LogIn",

    events: {

      "submit #loginForm" : "logInUser",

    },

    template: $("#userLogin").html(),

    initialize: function() {
      this.render();

      $('#log_signup').html(this.$el);
    },

    render: function() {

      this.$el.html(this.template);
    },

    logInUser: function(e) {

      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();

      Parse.User.logIn(username, password, {
        success: function(user){
          App.user = user;
          App.updateUser();
          App.router.navigate('', {trigger: true});
          location.reload();
        },

        error: function(user, error) {
          alert("Your username or password is incorrect.");
        }

      });

      //clear my form
      $("#loginForm")[0].reset();
       App.router.navigate('', { trigger: true });
    },

  });

}());
