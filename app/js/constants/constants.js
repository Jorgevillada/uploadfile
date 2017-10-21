angular.module('fileupload')
    .constant('Constants', {
        WISTIA_URL_UPLOAD: "https://upload.wistia.com",
        WISTIA_URL_STATUS: "https://api.wistia.com/v1/medias/{0}.json?api_password={1}",
        WISTIA_URL_IFRAME: "http://fast.wistia.net/embed/iframe/{0}",
        WISTIA_PASSWORD: "<%= WISTIA_PASSWORD %>",
        WISTIA_STATUS_PENDING: "pending",
        WISTIA_STATUS_FAILED: "failed",
        WISTIA_STATUS_READY: "ready",
        WISTIA_STATUS_UPLOADING: "uploading"
    });