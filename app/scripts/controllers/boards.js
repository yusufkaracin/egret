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

    var queryAllProjects = Ref.child('projects/');
    queryAllProjects = $firebaseObject(queryAllProjects);

    var userEmail = user.auth.token.email;
    $scope.projectsByInUser = [];
    queryAllProjects.$loaded()
      .then(function(projects) {
        angular.forEach(projects, function (value, key) {
          var isUserInProject = (value.members.indexOf(userEmail) != -1);
          var isUserProjectOwner = (value.owner == user.uid);

          if (isUserInProject && !isUserProjectOwner) {
            value.key = key;
            $scope.projectsByInUser.push(value);
          }
        })
      })
      .catch(function(error) {
        console.log("Error:", error);
      });

    // Bütün kullanıcıları çeker
    $scope.users = $firebaseObject(Ref.child('users'));



    $scope.createNewProject = function (params)
    {

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
        .then(function (projectRef) {
          toaster.pop('success', 'Başarılı', 'Proje çok güzel oluştu');
      })
        .catch(function (ref) {
          toaster.pop('error', 'Başarısız', 'Proje çok güzel oluşturulamadı');
      });
    }
  });

