var modulos = ["pascalprecht.translate", "ui.router"];


angular.module("fileupload", modulos);


angular.module("fileupload").config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);