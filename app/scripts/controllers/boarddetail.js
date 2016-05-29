'use strict';

angular.module('salihcandusmezApp')
  .controller('BoarddetailCtrl', function ($scope, $firebaseObject, Ref, $routeParams, $firebaseArray, toaster) {
    
    var projectId = $routeParams.id;

    var query = $firebaseObject(Ref.child('projects/' + projectId))
    
    $scope.users = [];
    query.$loaded()
      .then(function(project) {
        $scope.users = project.members
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
    

    

    $scope.tasks =  $firebaseObject(Ref.child('tasks').orderByChild("projectId").equalTo(projectId));

    $scope.addNewItem = function (params) {
      var taskInfo = {
        projectId: projectId,
        taskName: params.taskName,
        projectEndDate: params.projectEndDate,
        members: params.members
      };
      var tasks = $firebaseArray(Ref.child('tasks/'));

      tasks.$add(taskInfo)
        .then(function (projectRef) {
          toaster.pop('success', 'Başarılı', 'Proje çok güzel oluştu');
      })
        .catch(function (ref) {
          toaster.pop('error', 'Başarısız', 'Proje çok güzel oluşturulamadı');
      });
    };
  });
