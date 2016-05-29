'use strict';

angular.module('salihcandusmezApp')
  .controller('BoarddetailCtrl', function ($scope, $firebaseObject, Ref, $routeParams, $firebaseArray, toaster, user) {
    
    var projectId = $routeParams.id;
    
    $scope.isProjectOwner = false;
    
    var query = $firebaseObject(Ref.child('projects/' + projectId));
    $scope.users = [];
    query.$loaded()
      .then(function(project) {
        $scope.users = project.members;
        $scope.isProjectOwner = (user.uid == project.owner);
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
        members: params.members,
        detail: params.taskDetail
      };
      var tasks = $firebaseArray(Ref.child('tasks/'));

      tasks.$add(taskInfo)
        .then(function (projectRef) {
          toaster.pop('success', 'Başarılı', 'Görev çok güzel oluştu');
      })
        .catch(function (ref) {
          toaster.pop('error', 'Başarısız', 'Görev çok güzel oluşturulamadı');
      });
    };
    $scope.deleteTask = function (id, title) {
      if(confirm(title + ' görevini siliyorsunuz?')) {
        var query = $firebaseObject(Ref.child('tasks/' + id));
        query.$remove().then(function (ref) {
          toaster.pop('info', 'Başarılı', title + 'çok güzel silindi');
        }).catch(function (err) {
          toaster.pop('error', 'Hata', title + 'çok güzel silinemedi');
        });
      }
    };

  });
