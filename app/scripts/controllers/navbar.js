'use strict';
angular.module('salihcandusmezApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.isActive = function(param) {
      return param === $location.path();
    };
  });
