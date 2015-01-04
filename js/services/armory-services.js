(function(angular) {
    var app = angular.module('ArmoryServices', []);

    app.factory('ArmoryService', ['$http', function($http) {

        var data = {
            region: '',
            realm: '',
            guildName: ''
        };

        return {
            getRealms : function() {
                return $http.jsonp('https://' + this.getRegion().toLowerCase() + '.battle.net/api/wow/realm/status?jsonp=JSON_CALLBACK');
            },
            getCharacters : function() {
              return $http.jsonp('https://' + this.getRegion().toLowerCase() + '.battle.net/api/wow/guild/' + this.getRealm() + '/' + this.getGuildName() + '?fields=members&jsonp=JSON_CALLBACK&callback=JSON_CALLBACK');
            },
            asError : function(status, statusText) {
                return "Unable to fetch data from armory (Code " + status + ") : " + '\n' + statusText;
            },
            getRegion: function () {
                return data.region;
            },
            setRegion: function (region) {
                data.region = region;
            },
            getRealm: function () {
                return data.realm;
            },
            setRealm: function (realm) {
                data.realm = realm;
            },
            getGuildName: function () {
                return data.guildName;
            },
            setGuildName: function(guildName) {
                data.guildName = guildName;
            },
            saveInStorage : function() {
                if(typeof(Storage) !== "undefined") {
                    localStorage.setItem("wow-roster-region", data.region);
                    localStorage.setItem("wow-roster-realm", data.realm);
                    localStorage.setItem("wow-roster-guild-name", data.guildName);
                }
            }
        }
    }]);

})(angular);