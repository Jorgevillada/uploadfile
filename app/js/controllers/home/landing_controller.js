angular.module("fileupload").controller('LandingController', ["$scope", "Constants",
    function ($scope, Constants) {
        $scope.wistia_pass = Constants.WISTIA_PASSWORD;
    }]);