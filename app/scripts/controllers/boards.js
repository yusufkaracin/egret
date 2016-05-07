'use strict';
/**
 * @ngdoc function
 * @name salihcandusmezApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('salihcandusmezApp')
  .controller('BoardsCtrl', function ($scope, user, $firebaseObject, Ref, $q, $timeout) {
    $scope.asd = 'asldasldö';
    $scope.users = $firebaseObject(Ref.child('users'));
    $scope.createNewProject = function (params) {
        var ref = Ref.child('users/'+ user.uid), def = $q.defer();
        ref.update({projects: [1,2,3]}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });
        //return def.promise;
      // toaster.pop('success', "Hoşgeldin", "Giriş Başarılı");
    }
  });


