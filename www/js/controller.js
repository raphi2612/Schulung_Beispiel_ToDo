var controllerModule = angular.module('toDo.controller', []);

controllerModule.controller("MainController", function($scope, $ionicPopup){

    // hole tasks aus localStorage
    var tasks = window.localStorage['tasks'];
    $scope.tasks = angular.fromJson(tasks);
    if ($scope.tasks === undefined || $scope.tasks === null) {
        $scope.tasks = new Array();
    }

    $scope.newTask = function () {
        $scope.data = {};
        $ionicPopup.show({
            template: ' Titel <input type="text" ng-model="data.title"><br> Beschreibung <input type="text" ng-model="data.description" > ',
            title: 'Lege einen neuen Task an',
            subTitle: 'Bitte wähle dafür einen Titel und eine Beschreibung',
            scope: $scope,
            buttons: [
                {text: 'Abbrechen' },
                {
                    text: '<b>Speichern</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.title || ! $scope.data.description) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            $scope.tasks.push($scope.data);
                            $scope.save();
                        }
                    }
                }
            ]
        });
    };

    $scope.save = function () {
        window.localStorage['tasks'] = angular.toJson($scope.tasks);
    };
});

