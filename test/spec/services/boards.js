'use strict';

describe('Service: boards', function () {

  // load the service's module
  beforeEach(module('salihcandusmezApp'));

  // instantiate service
  var boards;
  beforeEach(inject(function (_boards_) {
    boards = _boards_;
  }));

  it('should do something', function () {
    expect(!!boards).toBe(true);
  });

});
