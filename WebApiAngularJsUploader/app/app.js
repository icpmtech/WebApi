﻿(function () {
    'use strict';
    var appLmvAppSvr = angular.module("LmvAppSvr", ["ngRoute", "getAuthToken"])

    appLmvAppSvr.config(function ($routeProvider) {
        $routeProvider
        .when('/lmviewer', {
            controller: 'lmvCtrl',
            templateUrl: 'partials/lmviewer.html'
        })
        .otherwise({ redirectTo: '/lmviewer' })
    });

    appLmvAppSvr.controller('lmvCtrl', ['$scope', 'authTokenFactory',
        function ($scope, authTokenFactory) {
            //$scope.checkPlumbing = authTokenFactory();
            //console.log("checkPlumbing . . .", $scope.checkPlumbing);
            $scope.authToken = authTokenFactory(); // Only updated on initial model load, not on refresh called by viewer.

            initialize();

            function initialize() {
                // Change docUrn value to your Encoded URN see Step 10 from http://fast-shelf-9177.herokuapp.com/
                var docUrn = 'replace with your document URN generated with same client credentials as above';
                var viewerElement = document.getElementById('viewer');
                ViewerEmbed.initialize(getToken, docUrn, viewerElement);
            }

            function getToken() {
                return authTokenFactory();
            }
        }
    ]);
    var app = angular.module('app', ['ngResource', 'ngRoute', 'app.photo']);

    app.config(['$routeProvider', function ($routeProvider) {        

        $routeProvider.when('/welcome', {
            templateUrl: 'app/welcome.html',
            controller: 'welcome',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/photos', {
            templateUrl: 'app/photo/photos.html',
            controller: 'photos',
            controllerAs: 'vm',
            caseInsensitiveMatch: true            
        });
        $routeProvider.when('/model3D', {
            templateUrl: 'app/model3D/model3D.html',
            controller: 'model3D',
            controllerAs: 'vm',
            caseInsensitiveMatch: true
        });
        $routeProvider.when('/lmviewer', {
            controller: 'lmvCtrl',
            templateUrl: 'index.html'
        })
        
        $routeProvider.otherwise({
            redirectTo: '/welcome'
        });
    }]);


    // Handle routing errors and success events
    app.run([function () {        
    }]);
})();