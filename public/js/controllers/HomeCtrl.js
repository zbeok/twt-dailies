angular.module('HomeCtrl', []).controller('HomeController', function($scope,$localStorage) {
  if ($scope.$storage.user==null) {
    document.getElementById('homepage').style.display='none';
  }
  else {
    document.getElementById('login').style.display='none';
    console.log($scope.$storage.user);
    
  }
});