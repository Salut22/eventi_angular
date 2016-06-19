angular.module('app')

.controller("eventiCtrl" ,['$http','CurrentPoiService', function ($http,CurrentPoiService) {

    this.pois=CurrentPoiService.all_pois();

}]);