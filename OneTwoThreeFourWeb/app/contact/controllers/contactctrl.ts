module app {

    export class ContactCtrl {
        static $inject = ['$scope', '$http', '$timeout', '$rootScope'];
        message: any;
        mailsent : boolean;
        constructor(private $scope, private $http: ng.IHttpService, $timeout, $rootScope) {
            $scope.vm = this;
            this.message = {};
            this.mailsent = false;
            $rootScope.title = "Kontakta oss";
        }

        submit() {
            this.$http.post('/api/Contact', this.message).then((result)=> {
               
                this.mailsent = true;

            }).catch((error) => {
                alert("Ops.. något gick fel. Maila oss här istället: kontakt@onetwothreefour.se");
                this.mailsent = false;
            });
        }

    }

}

angular.module('app').controller("contactctrl", app.ContactCtrl);