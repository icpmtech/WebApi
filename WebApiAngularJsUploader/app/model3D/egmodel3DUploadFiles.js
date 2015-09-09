(function() {
    'use strict';

    angular
        .module('app.model3D')
        .directive('egmodel3DFiles', egmodel3DFiles);

    function egmodel3DFiles() {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                files: '=egmodel3DFiles',
                hasFiles: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {                         
            element.bind('change', function () {
                scope.$apply(function () {
                    if (element[0].files) {
                        scope.files.length = 0;

                        angular.forEach(element[0].files, function (f) {
                            scope.files.push(f);
                        });
                        
                        scope.hasFiles = true;
                    }                    
                });
            });
                        
            if (element[0].form) {
                angular.element(element[0].form)
                        .bind('reset', function () {
                            scope.$apply(function () {
                                scope.files.length = 0;
                                scope.hasFiles = false;
                            });
                });
            }
        }
    }
})();