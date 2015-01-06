(function () {

var app = angular.module('AlertControllers', []);
 app.controller("WarningController", ['$scope', 'AlertService', function ($scope, AlertService) {

        this.getAlerts = function () {
            return AlertService.getAlerts();
        };

        this.closeAlert = function (index) {
            AlertService.getAlerts().splice(index, 1);
        };
	}]);

})();
