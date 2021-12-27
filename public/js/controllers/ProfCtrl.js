angular
  .module("ProfCtrl", [])
  .controller("ProfileController", function($scope, $window, $routeParams) {
    if (!$routeParams.username && $scope.current_user) {
      $routeParams.username = $scope.current_user.username;
    }
    $scope.user_check($routeParams.username).then(function(user_data) {
      if (user_data != null) {
        $scope.username = $routeParams.username;
        $scope.user_profile=user_data;
        $scope.$apply();
      } else {
        $scope.username = "who?";
        $scope.$apply();
        var content = document.getElementsByClassName("content")[0];
        content.innerHTML +=
          " \
<p>person not found... back to main page?</p> \
<div class='divider'></div> \
<a href='/'><button>( ͡° ʖ̯ ͡°) ok</button></a>";
        $scope.$apply();
      }
    });
  });
