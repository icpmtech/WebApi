﻿(function() {
    'use strict';

    angular
        .module('app.model3D')
        .directive('egmodel3DUpload', egUpload);

    egUpload.$inject = ['$timeout'];
    
    function egUpload($timeout) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                upload: '&egmodel3DUpload'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            var parentForm = element[0].form;
            if (parentForm) {
                element.on('click', function (event) {
                    return scope.upload().then(function () {
                        //see:https://docs.angularjs.org/error/$rootScope/inprog?p0=$digest for why there is a need to use timeout to avoid conflict
                        $timeout(function () {
                            parentForm.reset();
                        });
                    });
                });
            }
        }
    }
})();