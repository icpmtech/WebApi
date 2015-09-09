(function () {
    'use strict';

    angular
        .module('app.model3D')
        .controller('model3D', model3D);

    model3D.$inject = ['model3DManager'];

    function model3D(model3DManager) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'model3D manager';
        vm.model3D = model3DManager.model3D;
        vm.uploading = false;
        vm.previewmodel3D;
        vm.remove = model3DManager.remove;
        vm.setPreviewmodel3D = setPreviewmodel3D;

        activate();

        function activate() {
            model3DManager.load();
        }

        function setPreviewmodel3D(model3D) {
            vm.previewmodel3D = model3D
        }

        function remove(model3D) {
            model3DManager.remove(model3D).then(function () {
                setPreviewmodel3D();
            });
        }
    }
})();
