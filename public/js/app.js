angular
  .module("mainApp", [
    "ngRoute",
    "ngStorage",
    "ngCookies",
    "appRoutes",
    "MainCtrl",
    "HomeCtrl",
    "ProfCtrl",
    "StatsCtrl"
  ])
  .service("Session", function($localStorage) {
    this.begin_create = function() {
      $localStorage.session={time:new Date()};
      $localStorage.logging_in = true;
    };
    this.mid_create = function(){
      return (!!$localStorage.session && !!$localStorage.logging_in);
    }
    this.session_exists = function(){
      return (!!$localStorage.session && !!$localStorage.session.user);
    }
  this.user = function() {
    return $localStorage.session.user;
  }
    this.finish_create = function(user) {
      if (user){
        $localStorage.session.user = user;    
      }
      delete $localStorage.logging_in;
    }
    this.destroy = function() {
      delete $localStorage.session;
    };
  })
  .factory("AuthService", function($http, $window, $localStorage, Session) {
    var authService = {};

    authService.login = function() {
      if (authService.isAuthenticated()) {
        $window.location.href = "/";
        return true;
      }
      return $http.get("/oauth").then(function(res) {
        if (!res.data.token) {
          throw ("Could not get oauth request token!");
        }
        Session.begin_create();  
        console.log("app login", Session);
        $window.location.href = "https://twitter.com/" + "oauth/authenticate?oauth_token=" + res.data.token;
        return true;
      }).catch(function (error){
        authService.logout();
        throw(error);
      });
    };
    authService.authenticate = function(){
      return $http.get("/me").then(function(res) {
        // hafta create new session! damn you three leg oauth
        Session.finish_create(res.data);
        return res.data;
      }).catch(function(error) {
        throw ("Couldn't find user in my deeby that fits you!");
      });
    };
  
    authService.isAuthenticated = function() {
      console.log("app isauthd", $localStorage);
      
      if (!Session.session_exists()) {
        if (!Session.mid_create()) { // not in the process and no session data > not logged in
          console.log("no session no mid create", $localStorage);
          return null;
        } // else during log in have to populate user data
          console.log("no session but mid create", $localStorage);
        return authService.authenticate().then(function(user) {
          console.log("authenticating you fully!")
          return user;
        }).catch(function(error) {
          throw error;
        });
      }
          console.log("session verified", $localStorage);
      
      return Session.user();
    };
  
    authService.logout = function() { 
      return $http.get("/logout").then(function(res) {
        // hafta create new session! damn you three leg oauth
        Session.destroy();
        $window.location.href = "/";
        return true;
      }).catch(function(error) {
        console.log("error destroying server-side session")
        Session.destroy();
        $window.location.href = "/";
        return false;
      });
    };

    return authService;
  });
