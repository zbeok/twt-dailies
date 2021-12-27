angular
  .module("MainCtrl", [])
  .controller("MainController", function(
    $scope,
    $window,
    AuthService,
    $http
  ) {

    $scope.user_check = async function(username = null) {
      return $http
        .get("/users?username=" + username)
        .then(function(res) {
          return res.data;
        })
        .catch(function(error) {
          console.log("Couldn't find user in my deeby with that username");
          return null;
        });
    };

    $scope.current_user = null;
    $scope.set_current_user = function() {
      return AuthService.authenticate().then(function (user) {
        console.log("Welcome 2 the zone "+user.username);
        $scope.current_user = user;
        return true;
      }).catch(function (error) {
        throw("Error setting current user: ", error);
      });
    };

    $scope.isAuthenticated = async function() {
      $scope.current_user = await AuthService.isAuthenticated();
      console.log("mainctrl isauthd", $scope.current_user);
      $scope.$apply();
      return $scope.current_user;      
    };
    $scope.logged_in = $scope.isAuthenticated();
    $scope.login = AuthService.login;
    $scope.logout = AuthService.logout;

  });
