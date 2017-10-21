angular.module("fileupload").component('fileUpload', {
    bindings: {
        fileId: '@',
        pass: '@'
    },
    template: `
    <input id="{{$ctrl.fileId}}_fileinput"  type="file" name="file" data-url="{{$ctrl.url_api}}">
    <div class="progress">
        <div class="progress-bar progress-bar-success" ng-style="{'width': $ctrl.progress + '%' }"></div>
    </div>
    <span ng-show="$ctrl.url == ''">Status: {{$ctrl.status}}</span>
    <iframe ng-src="{{$ctrl.url}}" allowtransparency="true" frameborder="0" width="640" height="360" ng-show="$ctrl.url != ''"></iframe>
    </div>
    `,
    controller: ["$scope", "$timeout", "$sce", "$http", "Constants", "StringHelper", function ($scope, $timeout, $sce, $http, Constants, StringHelper) {
        var ctrl = this;
        ctrl.validateUpload = function () {
            $http({
                method: 'GET',
                url: StringHelper.format(Constants.WISTIA_URL_STATUS, [ctrl.hashid, ctrl.pass])
            }).then(function (response) {
                ctrl.status = response.data.status || '';
                if (ctrl.status == Constants.WISTIA_STATUS_READY)
                    ctrl.url = $sce.trustAsResourceUrl(StringHelper.format(Constants.WISTIA_URL_IFRAME, [ctrl.hashid]));
                else if (ctrl.status != Constants.WISTIA_STATUS_FAILED) {
                    $timeout(function () {
                        ctrl.validateUpload();
                    }, 5000);
                }
            });
        };

        ctrl.initJQueryComponent = function () {
            $timeout(function () {
                $('#' + ctrl.fileId + '_fileinput').fileupload({
                    dataType: 'json',
                    formData: {
                        api_password: ctrl.pass
                    },
                    add: function (e, data) {
                        ctrl.hashid = '';
                        ctrl.progress = 0;
                        ctrl.status = Constants.WISTIA_STATUS_UPLOADING;
                        ctrl.url = '';

                        data.submit();
                    },
                    done: function (e, data) {
                        if (data.result.hashed_id != '') {
                            ctrl.hashid = data.result.hashed_id;
                            ctrl.validateUpload();
                        }
                    },
                    progressall: function (e, data) {
                        if (data.total > 0) {
                            $scope.$apply(function () {
                                ctrl.progress = parseInt(data.loaded / data.total * 100, 10);
                            });
                        }
                    }
                });
            });
        }

        this.$onInit = function () {
            ctrl.url_api = Constants.WISTIA_URL_UPLOAD;
            ctrl.progress = 0;
            ctrl.status = Constants.WISTIA_STATUS_PENDING;
            ctrl.url = '';
            ctrl.initJQueryComponent();
        };
    }]
});