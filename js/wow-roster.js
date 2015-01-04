(function(angular) {

    var app = angular.module('WoWRoster',
        [
            'ArmoryControllers',
            'ArmoryServices',
            'GenericServices',
            'DataServices',
            'angularSpinner',
            'ui.bootstrap'
        ]);

    app.filter('startFrom', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        }
    });

})(angular);