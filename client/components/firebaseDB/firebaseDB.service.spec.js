'use strict';

describe('Service: firebaseDB', function() {
  // load the service's module
  beforeEach(module('firebeaseDBService'));

  // instantiate service
  var firebaseDB;
  beforeEach(inject(function(_firebaseDB_) {
    firebaseDB = _firebaseDB_;
  }));

  it('should do something', function() {
    expect(!!firebaseDB).toBe(true);
  });
});
