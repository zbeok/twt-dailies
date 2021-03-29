angular.module('StatsCtrl', []).controller('StatsController', function($scope,$window,$routeParams) {
  if ($scope.$storage.user==null) {
      $window.open("/", "_self");
  }
  else {
    var stage = document.getElementsByClassName('content')[0]
    var role = $scope.$storage.user.role;
    var pts = $scope.$storage.user.pts;
    stage.innerHTML = role + pts
    console.log($scope.$storage.user)
  }
});