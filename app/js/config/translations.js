angular.module("fileupload").config(['$translateProvider', '$translatePartialLoaderProvider',"Constants", function ($translateProvider, $translatePartialLoaderProvider,Constants) {
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{lang}/{part}.json'
    });
    $translatePartialLoaderProvider.addPart('angular-surveys');
    $translateProvider.preferredLanguage('en');
  }]);

angular.module("fileupload").run(['$rootScope', '$translate', function ($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function (data) {
      $translate.refresh();
    });
  }]);