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



    $scope.users = $firebaseObject(Ref.child('users'));
    $scope.createNewProject = function (params) {
      var project = Ref.child('projects/');

      var projectInfo = {
        name: params.projectName,
        desc: params.projectDesc,
        members: params.projectMembers,
        startDate: params.projectStartDate,
        endDate: params.projectEndDate,
        owner: user.uid
      };
      
      project.push(projectInfo, function (err) {
        $timeout(function() {
          if( err ) {
            toaster.pop('danger', "Başarısız", err);
          }
          else {
            // todo: kullanıcının altına projects oluştur ve gelen projenin idisni ekle
            //var ref = Ref.child('users/'+ user.uid + '/projects');

          }
        });
      });


        //return def.promise;
      // toaster.pop('success', "Hoşgeldin", "Giriş Başarılı");
    }
  });


