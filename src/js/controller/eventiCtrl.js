angular.module('app')

.controller("eventiCtrl" ,['$http','CurrentPoiService','$location', function ($http,CurrentPoiService,$location) {

    this.pois=CurrentPoiService.all_pois();
      
    this.search=function(id)
    {
        CurrentPoiService.getById(id);
        $location.path('dettagli');
    }
}]);