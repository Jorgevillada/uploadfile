angular.module("fileupload").config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider


                .state('home', {
                    abstract: true,
                    templateUrl: '/home.html',
                    controller: 'HomeController'
                })
                .state('landing', {
                    url: "/",
                    parent: "home",
                    templateUrl: '/landing.html',
                    controller: 'LandingController',
                })

                .state('404', {
                    url: "404",
                    templateUrl: '/error/404.html',
                    controller: 'NotFoundController'
                });

        $urlRouterProvider.otherwise('404');

    }]);