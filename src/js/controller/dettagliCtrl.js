angular.module('app')

.controller("dettagliCtrl" ,['$http','CurrentPoiService','CurrentUserService', function ($http,CurrentPoiService,CurrentUserService) 
{
    this.search=function(id)
    {
        console.log(id);
    }

}]);