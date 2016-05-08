'use strict';
/**
 * @ngdoc function
 * @name salihcandusmezApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('salihcandusmezApp')
  .controller('BoardsCtrl', function ($scope, toaster, user, $firebaseObject, $firebaseArray, Ref, $q, $timeout) {

    //login olmuş kullanıcının oluşturduğu projeler
    var query = Ref.child('projects').orderByChild("owner").equalTo(user.uid);
    $scope.createdProjectsByUser = $firebaseObject(query);

    // Bütün kullanıcıları çeker
    $scope.users = $firebaseObject(Ref.child('users'));


    $scope.createNewProject = function (params) {

      var projectInfo = {
        name: params.projectName,
        desc: params.projectDesc,
        members: params.projectMembers,
        startDate: params.projectStartDate,
        endDate: params.projectEndDate,
        owner: user.uid
      };

      var projects = $firebaseArray(Ref.child('projects/'));
      projects.$add(projectInfo)
      .then(function (ref) {

        var userRef = $firebaseObject(Ref.child('users/' + user.uid));
        
        userRef.$loaded().then(function(){
          var userProjects = userRef.projects;

          if (userProjects===undefined){
            userRef.projects = [ref.key()]
          } else {
            userProjects.push(ref.key());
          }
          
          userRef.$save().then(function(ref){
            toaster.pop('success', 'Başarılı', 'Proje çok güzel oluştu');
          }, function(err){
            toaster.pop('error', 'Başarısız', 'Proje çok güzel oluşmadı');
          });
        });
        
      }).catch(function (ref) {
        toaster.pop('error', 'Başarısız', 'Proje çok güzel oluşturulamadı');
      });


      // var project = projects.push();
      // project.set(projectInfo, projectCreated)
      // project.toString()

        //return def.promise;
      // toaster.pop('success', "Hoşgeldin", "Giriş Başarılı");
    }
  });


