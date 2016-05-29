'use strict';
/**
 * @ngdoc function
 * @name salihcandusmezApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('salihcandusmezApp')
  .controller('ChatCtrl', 
    function ($scope, Ref, $firebaseObject, $firebaseArray, $timeout, Auth, $location, $anchorScroll) {
      
      function alert(msg) {
        $scope.err = msg;
        $timeout(function() {
          $scope.err = null;
        }, 5000);
      }

      $scope.goLastMessage = function(){
        $location.hash('last-message');
        $anchorScroll();
      };

      $scope.goFirstMessage = function(){
        $location.hash('0-msg');
        $anchorScroll();
      };

      var limitCounter = 1;
      $scope.loadingMore = true;
      $scope.loadMore = function() {
        $scope.loadingMore = true;
        
        limitCounter++;
        $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(2*limitCounter));
        $scope.messages.$loaded().then(function(){
          $scope.loadingMore = false;
        }).catch(alert);
        
      };

      var uid = Auth.$getAuth().uid;
      var userRef = $firebaseObject(Ref.child('users/' + uid));

      userRef.$loaded().then(function(){
        $scope.userName = userRef.userName;
      });

      
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(2));

    // display any errors
    $scope.messages.$loaded().then(function(){
      $scope.loadingMore = false;
      $timeout($scope.goLastMessage, 1000)
    }).catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      
      if( newMessage ) {
          // push a message to the end of the array
          var currentDate = new Date().getTime();
          $scope.messages.$add({
            text: newMessage, 
            username: $scope.userName, 
            createdDate: currentDate
          })
            // display any errors
            .catch(alert);
          $scope.goLastMessage();

      }      
    };

  });
