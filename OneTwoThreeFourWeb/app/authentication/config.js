angular.module('app.authentication', [
    'http-auth-interceptor',
    'ngCookies'
]).config([
    '$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: "app/authentication/views/login.html",
            controller: 'LoginController'
        });
    }]).run([
    'authService', function (authService) {
        authService.updateRequestHeaderFromCookie();
        //authService.getUserInfo(function (user) {
        //});
    }]);
//# sourceMappingURL=config.js.map
