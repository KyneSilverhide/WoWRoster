(function () {
    'use strict';

    angular.module('WoWRoster', [
            'angularSpinner',
            'ui.bootstrap',
            'ArmoryControllers',
            'AlertControllers',
            'RosterControllers',
            'GenericServices',
            'ArmoryServices',
            'DataServices'
        ]);

    function startFrom () {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    }

    angular.module('WoWRoster').filter('startFrom', startFrom);
})();
