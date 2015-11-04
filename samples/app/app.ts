namespace app {
    let appModule = angular.module('app', ['ngRoute', 'decorum']);

    appModule
        .config(($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider
                .when('/register', {
                    templateUrl: 'app/registration/register.html',
                    controller: 'registrationCtrl',
                    controllerAs: 'ctrl'
                })
                .otherwise({
                    redirectTo: '/register'
                });
        });
}