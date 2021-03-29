angular.module('MainCtrl', []).controller('MainController', function($scope,$window,$localStorage,$sessionStorage) {
  
  
  $scope.init = function () {
    
    $scope.$storage = $localStorage.$default({
      user:null
    });
  }
  $scope.init();
  
	$scope.login = function() {
    var user_input = document.getElementById('username');
    var pass_input = document.getElementById('password');
    $.ajax({
      url: "/login",
      type: "PUT",
      data:{name:user_input.value,pass:pass_input.value},
      success: function(result) {
        $scope.$storage.user=result;
        $scope.$evalAsync(function(){
          $window.open("/profile/"+result.name, "_self");
        });
      },
      error: function(data, textStatus, xhr){
        $window.alert("epic fail, try again?");
      }
    });
  }
	$scope.register = function() {
    var user_input = document.getElementById('username');
    var pass_input = document.getElementById('password');
    $.ajax({
      url: "/register",
      type: "POST",
      data:{name:user_input.value,pass:pass_input.value},
      success: function(result) {
        $scope.$storage.user=result;
        $window.open("/", "_self");
      },
      error: function(data, textStatus, xhr){
        $window.alert("epic fail, try again?");
      }
    });
    
  }
  $scope.logout = function () {
    $scope.$storage.$reset();
  }
  
  $scope.user_check = function (username,callback) {
    $.ajax({
      url: "/user?name="+username,
      type: "GET",
      success: function(data, textStatus, xhr) {  
        callback(data);
      },
      error: function(data, textStatus, xhr){
        callback(null);
      }
    });
    
  }
  
});