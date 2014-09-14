'use strict';
angular.module('app', [
    'ngRoute',
    //'app.authentication',
    'angular-loading-bar'
]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
        templateUrl: 'app/start/views/start.html',
        controller: 'startctrl'
    }).when('/seochlyssna', {
        templateUrl: 'app/seeandhear/views/seeandhear.html',
        controller: 'seeandhearctrl'
    }).when('/kontakt', {
        templateUrl: 'app/contact/views/contact.html',
        controller: 'contactctrl'
    }).otherwise({
        redirectTo: '/'
    });

}]).run(['$location', '$rootScope', function ($location, $rootScope) {
    var path = function () {
        return $location.path();
    };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activetab = newVal;
    });
}]);

