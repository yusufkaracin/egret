'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('salihcandusmezApp')
  .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject, toaster, $timeout) {
    $scope.user = user;
    
    $scope.messages = [];
    var profile = $firebaseObject(Ref.child('users/'+user.uid));
    profile.$bindTo($scope, 'profile');
    

    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;
      if( !oldPass || !newPass ) {
        error('Lütfen tüm alanları doldurun');
      }
      else if( newPass !== confirm ) {
        error('Şifreler eşleşmiyor');
      }
      else {
        Auth.$changePassword({email: profile.email, oldPassword: oldPass, newPassword: newPass})
          .then(function() {
            success('Şifre güncellendi');
          }, error);
      }
    };

    $scope.changeEmail = function(pass, newEmail) {
      $scope.err = null;
      Auth.$changeEmail({password: pass, newEmail: newEmail, oldEmail: profile.email})
        .then(function() {
          profile.email = newEmail;
          profile.$save();
          success('Email güncellendi');
        })
        .catch(error);
    };

    function error(err) {
      alert(err, 'error');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      toaster.pop(type, msg);
      /*
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      */
      
      /*
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
      */
    }

  });
