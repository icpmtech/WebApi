(function () {
    'use strict';

    angular
        .module('app.model3D')
        .factory('model3DManager', model3DManager);

    model3DManager.$inject = ['$q', 'model3DManagerClient', 'appInfo'];

    function model3DManager($q, model3DManagerClient, appInfo) {
        var service = {
            model3D: [],
            load: load,
            upload: upload,
            remove: remove,
            model3DExists: model3DExists,
            status: {
                uploading: false
            }
        };

        return service;

        function load() {
            appInfo.setInfo({ busy: true, message: "loading model3D" })
            
            service.model3D.length = 0;

            return model3DManagerClient.query()
                                .$promise
                                .then(function (result) {                                    
                                    result.model3D
                                            .forEach(function (model3D) {
                                                service.model3D.push(model3D);
                                                });

                                    appInfo.setInfo({ message: "model3D loaded successfully" });

                                    return result.$promise;
                                },
                                function (result) {
                                    appInfo.setInfo({message: "something went wrong: " + result.data.message});
                                    return $q.reject(result);
                                })                   
                                ['finally'](
                                function () {
                                    appInfo.setInfo({busy: false});
                                });
        }

        function upload(model3D)
        {
            service.status.uploading = true;
            appInfo.setInfo({ busy: true, message: "uploading model3D" });

            var formData = new FormData();

            angular.forEach(model3D, function (model3D) {
                formData.append(model3D.name, model3D);
            });

            return model3DManagerClient.save(formData)
                                        .$promise
                                        .then(function (result) {
                                            if (result && result.model3D) {
                                                result.model3D.forEach(function (model3D) {
                                                    if (!model3DExists(model3D.name)) {
                                                        service.model3D.push(model3D);
                                                    }
                                                });
                                            }

                                            appInfo.setInfo({ message: "model3D uploaded successfully" });

                                            return result.$promise;
                                        },
                                        function (result) {
                                            appInfo.setInfo({message: "something went wrong: " + result.data.message});
                                            return $q.reject(result);
                                        })
                                        ['finally'](
                                        function () {
                                            appInfo.setInfo({ busy: false });                                            
                                            service.status.uploading = false;
                                        });
        }

        function remove(model3D) {
            appInfo.setInfo({ busy: true, message: "deleting model3D " + model3D.name });

            return model3DManagerClient.remove({ fileName: model3D.name })
                                        .$promise
                                        .then(function (result) {
                                            //if the photo was deleted successfully remove it from the photos array
                                            var i = service.model3D.indexOf(model3D);
                                            service.model3D.splice(i, 1);

                                            appInfo.setInfo({ message: "model3D deleted" });

                                            return result.$promise;
                                        },
                                        function (result) {
                                            appInfo.setInfo({message: "something went wrong: " + result.data.message});
                                            return $q.reject(result);
                                        })
                                        ['finally'](
                                        function () {
                                            appInfo.setInfo({busy: false});
                                        });
        }

        function model3DExists(model3DName) {
            var res = false
            service.model3D.forEach(function (model3D) {
                if (model3D.name === model3DName) {
                    res = true;
                }
            });

            return res;
        }
    }
})();