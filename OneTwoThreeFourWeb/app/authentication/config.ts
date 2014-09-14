angular.module('app.authentication',
    [
        'http-auth-interceptor',
        'ngCookies'

    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: "app/authentication/views/login.html",
            controller: 'LoginController'
        });
    }]).run(['authService',  function (authService: app.authentication.AuthService) {
        authService.updateRequestHeaderFromCookie();
        //authService.getUserInfo(function (user) {

        //});
    }]);