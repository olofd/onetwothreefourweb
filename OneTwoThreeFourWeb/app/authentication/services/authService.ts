
module app.authentication {
    export class AuthService {
        static $inject = ['$http', '$rootScope', '$cookies'];
        loggedInUser: app.users.User;
        constructor(private $http, private $rootScope, private $cookies) {
        }
        login(userName: string, password: string, rememberMe: boolean) {
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

                }).
                error(function (data, status, headers, config) {


                });
        }
        updateRequestHeaderFromCookie() {
            if (this.$cookies.pdmAuthorization) {
                this.$http.defaults.headers.common.Authorization = this.$cookies.pdmAuthorization;
            }
        }
        logOut() {
            this.loggedInUser = undefined;
            delete this.$http.defaults.headers.common.Authorization;
            delete this.$cookies.pdmAuthorization;
        }

        getUserInfo(callback = undefined) {
            var that = this;
            if (callback !== undefined && this.loggedInUser) {
                callback(this.loggedInUser);
                return;
            }
            return this.$http.get("/api/Account/UserInfo").
                success(function (data, status, headers, config) {
                    if (data.UserName) {
                        that.loggedInUser = {};
                        that.loggedInUser.UserName = data.UserName; 
                        that.$rootScope.$broadcast('event:auth-loginConfirmed');
                    }
                    if (callback !== undefined) {
                        callback(that.loggedInUser);
                    }

                }).
                error(function (data, status, headers, config) {
                    if (callback !== undefined) {
                        callback();
                    }
                });


        }
    }
}
angular.module('app.authentication').service("authService", app.authentication.AuthService);
