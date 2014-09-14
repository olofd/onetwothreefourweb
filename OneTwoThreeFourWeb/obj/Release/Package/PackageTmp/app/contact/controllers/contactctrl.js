var app;
(function (app) {
    var ContactCtrl = (function () {
        function ContactCtrl($scope, $http, $timeout) {
            this.$scope = $scope;
            this.$http = $http;
            $scope.vm = this;
            this.message = {};
            this.mailsent = false;
        }
        ContactCtrl.prototype.submit = function () {
            var _this = this;
            this.$http.post('/api/Contact', this.message).then(function (result) {
                _this.mailsent = true;
            }).catch(function (error) {
                alert("Ops.. något gick fel. Maila oss här istället: kontakt@onetwothreefour.se");
                _this.mailsent = false;
            });
        };
        ContactCtrl.$inject = ['$scope', '$http', '$timeout'];
        return ContactCtrl;
    })();
    app.ContactCtrl = ContactCtrl;
})(app || (app = {}));

angular.module('app').controller("contactctrl", app.ContactCtrl);
//# sourceMappingURL=contactctrl.js.map
