var app;
(function (app) {
    (function (authentication) {
        var AuthService = (function () {
            function AuthService($http, $rootScope, $cookies) {
                this.$http = $http;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
            }
            AuthService.prototype.login = function (userName, password, rememberMe) {
                var that = this;
                return this.$http({
                    url: "/Token",
                    data: "grant_type=password&username=" + userName + "&password=" + password,
                    dataType: "json",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function (data, status, headers, config) {
                    if (data.access_token) {
                        var barer = 'Bearer ' + data.access_token;
                        if (rememberMe) {
                            that.$cookies.pdmAuthorization = barer;
                        }
                        that.$http.defaults.headers.common.Authorization = barer;
                        that.$rootScope.$broadcast('event:auth-loginConfirmed');
                    }
                }).error(function (data, status, headers, config) {
                });
            };
            AuthService.prototype.updateRequestHeaderFromCookie = function () {
                if (this.$cookies.pdmAuthorization) {
                    this.$http.defaults.headers.common.Authorization = this.$cookies.pdmAuthorization;
                }
            };
            AuthService.prototype.logOut = function () {
                this.loggedInUser = undefined;
                delete this.$http.defaults.headers.common.Authorization;
                delete this.$cookies.pdmAuthorization;
            };

            AuthService.prototype.getUserInfo = function (callback) {
                if (typeof callback === "undefined") { callback = undefined; }
                var that = this;
                if (callback !== undefined && this.loggedInUser) {
                    callback(this.loggedInUser);
                    return;
                }
                return this.$http.get("/api/Account/UserInfo").success(function (data, status, headers, config) {
                    if (data.UserName) {
                        that.loggedInUser = {};
                        that.loggedInUser.UserName = data.UserName;
                        that.$rootScope.$broadcast('event:auth-loginConfirmed');
                    }
                    if (callback !== undefined) {
                        callback(that.loggedInUser);
                    }
                }).error(function (data, status, headers, config) {
                    if (callback !== undefined) {
                        callback();
                    }
                });
            };
            AuthService.$inject = ['$http', '$rootScope', '$cookies'];
            return AuthService;
        })();
        authentication.AuthService = AuthService;
    })(app.authentication || (app.authentication = {}));
    var authentication = app.authentication;
})(app || (app = {}));
angular.module('app.authentication').service("authService", app.authentication.AuthService);
//# sourceMappingURL=authService.js.map
