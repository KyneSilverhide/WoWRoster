(function(angular) {
    var app = angular.module('GenericServices', []);

    app.factory('AlertService', function() {

        var alerts = [];
        var lastIndex = 0;

        return {
            getAlerts : function() {
                return alerts;
            },
            addAlert : function(type, msg) {
                alerts.push({type: type, msg:msg});
                lastIndex++;
                setTimeout(function() {
                    alerts.splice(0, 1);
                }, 3000);
            }
        }
    });

})(angular);