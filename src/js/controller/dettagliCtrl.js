angular.module('app')

.controller("dettagliCtrl" ,['$http','CurrentPoiService','CurrentUserService','$location', function ($http,CurrentPoiService,CurrentUserService,$location) 
{
    this.poi;
    var self=this;
    
    self.poi=CurrentPoiService.currentEvent();
    console.log(self.poi);
        
    
    $("#title").html('titolo evento '+self.poi.properties.title);
    $("#street").html('via '+self.poi.details.address.street+", "+self.poi.details.address.title);
    $("#city").html('città '+self.poi.details.address.city+", "+self.poi.details.address.country);
    $("#email").html('email '+self.poi.details.contact.email);
    $("#website").html('sito web '+self.poi.details.contact.website);
    $("#phone").html('telefono '+self.poi.details.contact.phone);
    $("#price").html(self.poi.details.price.prc_info);
    $("#dateFrom").html('dal '+self.poi.properties.dataFromFormatted);
    $("#dateTo").html('al '+self.poi.properties.dateToFormatted);
    $("#desc").html(self.poi.details.desc);
    
  
}]);