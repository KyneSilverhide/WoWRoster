(function () {

var app = angular.module('ArmoryControllers', []);

    app.controller("ArmorySearchController", ['$scope', '$rootScope', 'ArmoryService', 'usSpinnerService',
        function ($scope, $rootScope, ArmoryService, usSpinnerService) {

        $scope.regions = [
            {label: 'US', value: 'us'},
            {label: 'Europe', value: 'eu'},
            {label: 'Korea', value: 'kr'},
            {label: 'Taiwan', value: 'tw'}
        ];

        $scope.findInStorage = function (storageKey) {
            if (typeof(Storage) !== "undefined") {
                return localStorage.getItem(storageKey);
            }
            return null;
        };

        $scope.realmsCache = {};
        $scope.realms = [];

        $scope.region = $scope.findInStorage("wow-roster-region");
        $scope.$watch('region', function (newRegion) {
            if (newRegion) {
                ArmoryService.setRegion(newRegion);
                $scope.fetchRealms();
            }
        });
        $scope.realm = $scope.findInStorage("wow-roster-realm");
        $scope.$watch('realm', function (newRealm) {
            if (newRealm) {
                ArmoryService.setRealm(newRealm);
            }
        });

        $scope.guildName = $scope.findInStorage("wow-roster-guild-name");
        $scope.$watch('guildName', function (newGuildName) {
            ArmoryService.setGuildName(newGuildName);
        });

        $scope.fetchRealms = function () {
            usSpinnerService.spin('armory-config-spinner');
            if (!$scope.realmsCache.hasOwnProperty(ArmoryService.getRegion())) {
                ArmoryService.getRealms(ArmoryService.getRegion())
                    .success(function (data) {
                        storeRealms(data, ArmoryService.getRegion());
                        usSpinnerService.stop('armory-config-spinner');
                    }).error(function (data, status, headers, config, statusText) {
                        AlertService.addAlert('danger', ArmoryService.asError(status, statusText));
                        usSpinnerService.stop('armory-config-spinner');
                    });
            } else {
                // Use realms in cache
                $scope.realms = $scope.realmsCache[$scope.region];
                usSpinnerService.stop('armory-config-spinner');
            }

            function storeRealms(data, region) {
                $scope.realmsCache[region] = [];
                angular.forEach(data.realms, function (value) {
                    var realm = {
                        value: value.name,
                        label: value.name + ' (' + value.type.toUpperCase() + ')'
                    };
                    $scope.realmsCache[region].push(realm);
                    $scope.realms = $scope.realmsCache[region];
                });
            }
        };

        $scope.notifyFetchCharacters = function () {
            $rootScope.$broadcast('fetch-characters');
        };
    }]);

})();
