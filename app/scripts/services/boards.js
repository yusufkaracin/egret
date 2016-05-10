'use strict';

/**
 * @ngdoc service
 * @name salihcandusmezApp.boards
 * @description
 * # boards
 * Factory in the salihcandusmezApp.
 */
angular.module('salihcandusmezApp')
  .factory('boards', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
