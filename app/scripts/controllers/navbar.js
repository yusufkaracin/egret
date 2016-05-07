'use strict';
angular.module('salihcandusmezApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.isActive = function(param) {
      return param === $location.path();
    };
    $scope.logout = function() {
      Auth.$unauth(); 
      $location.path('/');
    };
  });
