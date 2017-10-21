angular.module('fileupload')
    .service('StringHelper', function () {
        this.format = function (str, params) {
            return str.replace(/{(\d+)}/g, function (match, number) {
                return typeof params[number] != 'undefined'
                    ? params[number]
                    : match
                    ;
            });
        };

    });
