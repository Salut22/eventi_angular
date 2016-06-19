angular.module('app')

.controller("dettagliCtrl" ,['$http','CurrentPoiService','CurrentUserService','$location', function ($http,CurrentPoiService,CurrentUserService,$location) 
{
    this.poi;
    this.up;
    var self=this;
    
    this.search=function(id)
    {
        
       self.poi=CurrentPoiService.getById(id);
        $location.path('dettagli');
          self.aggiorna();
    }
this.aggiorna=function()
{
    console.log(self.poi._id);
    self.up=self.poi;
}
  
}]);