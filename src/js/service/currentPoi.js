angular.module('app.serviceModule')




.service('CurrentPoiService', ['$q','$http','GrowlService', function ($q, $http, GrowlService) {
    this.pois=[]
    this.poi;
    var self=this;
    
    this.fromJson=function(json)
    { self.pois=[];
        for(j in json)
        {
            self.pois.push(json[j]);
        }
    }
    
    
    this.all_pois=function()
    {
        return self.pois;
    }
    
    this.currentEvent=function()
    {
        return self.poi;
    }
    
    this.getById=function(id)
    {
        for(p in self.pois)
            {
                if(id==self.pois[p]._id)
                {
                    self.poi=self.pois[p];
                    return self.poi;    
                }
            }
        
    }
}])

.run(function(CurrentPoiService) {});