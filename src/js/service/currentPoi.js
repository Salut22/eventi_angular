angular.module('app.serviceModule')




.service('CurrentPoiService', ['$q','$http','GrowlService', function ($q, $http, GrowlService) {
    
    this.poi=[];
    var self=this;
    this.fromJson=function(json)
    {
        for(j in json)
        {
            self.poi.push(json[j]);
        }
    }
    this.all_pois=function()
    {
        console.log(self.poi);
        return self.poi;
    }
    this.getById=function(id)
    {
        console.log('id '+id);
        for(p in self.poi)
            {
                if(id==self.poi[p]._id)
                {
                    return self.poi[p];    
                }
            }
        
    }
}])

.run(function(CurrentPoiService) {});