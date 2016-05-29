'use strict';
/**
 * @ngdoc function
 * @name salihcandusmezApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('salihcandusmezApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout, toaster) {

    var register = false;

    $scope.passwordLogin = function(email, pass, rememberMe) {
      $scope.err = null;
      Auth.$authWithPassword({email: email, password: pass}, {rememberMe: rememberMe}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, pass, confirm, userName) {
      register = true;
      console.log(userName);
      function createProfile(user) {
        var ref = Ref.child('users').child(user.uid), def = $q.defer();
        ref.set({email: email, userName: userName, name:firstPartOfEmail(email)}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });
        return def.promise;
      }

      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.$createUser({email: email, password: pass, userName: userName})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(createProfile)
          .then(redirect, showError);
      }

    };

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

  

    function redirect() {
      if(register) {
        toaster.pop('success', "Hoşgeldin", "Kayıt gerçekleşti");
      } else {
        toaster.pop('success', "Hoşgeldin", "Giriş Başarılı");
      }
      $location.path('/boards');
    }

    function showError(err) {
      $scope.err = err;
      toaster.pop('danger', "Hata", err);
    }


  });
