(function () {
    'use strict';

    angular
        .module('app.model3D')
        .directive('egmodel3DUploader', egmodel3DUploader);

    egmodel3DUploader.$inject = ['appInfo', 'model3DManager'];

    function egmodel3DUploader(appInfo, model3DManager) {

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'app/model3D/egmodel3DUploader.html',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.hasFiles = false;
            scope.model3D = [];
            scope.upload = model3DManager.upload;
            scope.appStatus = appInfo.status;
            scope.model3DManagerStatus = model3DManager.status;
        }
    }

})();