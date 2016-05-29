'use strict';

describe('Controller: BoarddetailCtrl', function () {

  // load the controller's module
  beforeEach(module('salihcandusmezApp'));

  var BoarddetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BoarddetailCtrl = $controller('BoarddetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
