angular.module('ProfCtrl', []).controller('ProfileController', function($scope,$routeParams) {
  // todo check if they exist
  $scope.user_check($routeParams.username, user_populater);
  
  function user_populater(response) {
    if (response!=null) {
      $scope.username = $routeParams.username;
      $scope.$apply();
    } else {
      var content = document.getElementsByClassName("content")[0];
      content.innerHTML = "<p>person not found... sowwy	( ͡° ʖ̯ ͡°)</p>"
      $scope.$apply();
    }
  }
  
});