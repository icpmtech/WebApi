(function () {
    'use strict';

    angular
        .module('app.model3D')
        .factory('model3DManagerClient', model3DManagerClient);

    model3DManagerClient.$inject = ['$resource'];

    function model3DManagerClient($resource) {
        return $resource("api/photo/:fileName",
                { id: "@fileName" },
                {
                    'query': {method:'GET'},
                    'save': { method: 'POST', transformRequest: angular.identity, headers: { 'Content-Type': undefined } },
                    'remove':{method: 'DELETE', url: 'api/photo/:fileName', params:{name:'@fileName'}}
                });
    }
})();