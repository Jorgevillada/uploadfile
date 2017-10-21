'use strict';

describe('Component: myComponent', function () {

  beforeEach(module('fileupload'));

  describe('with $compile', function () {

    var element;
    var scope;

    var eventListener,
      fakeFile = {};

    beforeEach(inject(function ($rootScope, $compile, $window) {
      scope = $rootScope.$new();
      element = angular.element('<file-upload file-id="{{fileId}}" pass="{{password}}"></file-upload>');
      element = $compile(element)(scope);
      scope.fileId = '123';
      scope.password = '543';
      scope.$apply();

    }));

    it('should render input type', function () {
      var input = element.find('input');
      var input1 = input[0];
      expect(input1.type).toBe('file');
    });
    it('should render correct ID ', function () {
      var input = element.find('input');
      var input1 = input[0];
      expect(input1.id).toBe(scope.fileId + "_fileinput");
    });
    it('should call ajax function ', function () {

      var eventListener = jasmine.createSpy();
      var dummyFileReader = { addEventListener: eventListener };
      spyOn(window, "FileReader").and.returnValue(dummyFileReader)
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        expect(e.target.result).toEqual('url');
      });

      var input = element.find('input');
      var input1 = input[0];
      //Click input upload
      input1.click();
      expect(eventListener.calls.mostRecent().args[0]).toEqual('load');
    });

  });

  describe('with $componentController', function () {

    var controller;
    var scope;
    beforeEach(inject(function ($rootScope, $componentController) {
      scope = $rootScope.$new();
      controller = $componentController('fileUpload', { $scope: scope }, { fileId: '123', pass: "123" });
    }));

    it('should be attached to the scope', function () {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should expose file ID', function () {
      expect(controller.fileId).toBeDefined();
      expect(controller.fileId).toBe('123');
    });

    it('should expose password', function () {
      expect(controller.pass).toBeDefined();
      expect(controller.pass).toBe('123');
    });
    it('should exist to validate upload function', function () {
      expect(controller.validateUpload).toBeDefined();
    });
    it('should exist to jquery upload file function', function () {
      expect(controller.initJQueryComponent).toBeDefined();
    });
    it('should call the jquery fileupload  function', function () {
      spyOn(controller, 'initJQueryComponent');
      controller.$onInit();
      expect(controller.initJQueryComponent).toHaveBeenCalled();
    });

  });

});