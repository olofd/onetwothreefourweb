angular.module('app.authentication').controller('LoginController', [
    '$scope', '$state', '$rootScope', 'authService', '$cookies', function ($scope, $state, $rootScope, authService, $cookies) {
        $scope.vm = $scope.vm || {};
        $scope.vm.rememberMe = ($cookies.pdmRememberMe == "true");
        $scope.vm.errorDescription = "";
        $scope.vm.login = function () {
            authService.login($scope.vm.userName, $scope.vm.password, $scope.vm.rememberMe).error(function (data, status, headers, config) {
                if (data["error_description"]) {
                    $scope.vm.errorDescription = data["error_description"];
                } else {
                    $scope.vm.errorDescription = "Login failed";
                }
                log.error($scope.vm.errorDescription);
            });
        };


        $scope.$watch('vm.rememberMe', function (value) {
            if (value !== undefined) {
                $cookies.pdmRememberMe = value.toString();
            }

        });
    }
]);