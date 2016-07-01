angular.module('app')
.controller('searchCtrl',['$http','CityService','CurrentPoiService','$location',  function($http,CityService,CurrentPoiService,$location)
{ 
    this.regione;
    this.provincia=[];
    this.comune=[];
    this.matchProv=[];
    this.matchCity=[];
    this.location={};
    this.da;
    this.a;
    
    this.lista_regioni=CityService.lista();
    var self=this;
    
    this.localSearchProvincia = function(str)
    {
        self.provincia=[];
	     self.matchProv=CityService.localSearchProvincia(str,self.regione);
        for (p in self.matchProv)
        {
          self.provincia.push(self.matchProv[p]);
        }
        return self.provincia;
        
    }
    
    this.localSearchComune = function(str)
    { 
        self.comune=[];
        self.matchCity=CityService.localSearchComune(str,self.provincia); 
        for (p in self.matchCity)
        {
          self.comune.push(self.matchCity[p]);
        }
        return self.comune;
    }
    this.cerca=function()
    {
      self.location=
      {
        'da'        :self.da,
        'a'         :self.a,
        'regione'   :self.regione.title.toLowerCase(),    
        'provincia' :self.provincia.description.code,    
        'comune'    :self.comune.title.toLowerCase()
      }
      $http.post('http://localhost:8080/getEvent',self.location)
      .success(function(data)
      {
          CurrentPoiService.fromJson(data.result);
          $location.path("eventi");

      })
      .catch(function(err){
          
      })
    }
    
}]);