angular.module('app')

.controller("dettagliCtrl" ,['$http','CurrentPoiService','CurrentUserService','PreferitiService','GrowlService', function ($http,CurrentPoiService,CurrentUserService,PreferitiService,GrowlService) 
{
    this.poi;
    this.prezzo;
    this.userId;
    var self=this;
    
    self.poi=CurrentPoiService.currentEvent();
    self.userId = CurrentUserService.getUserId();
    
        
    
    $("#title").html('titolo evento '+self.poi.properties.title);
    $("#street").html('via '+self.poi.details.address.street+", "+self.poi.details.address.title);
    $("#city").html('città '+self.poi.details.address.city+", "+self.poi.details.address.country);
    $("#email").html('email '+self.poi.details.contact.email);
    $("#website").html('sito web '+self.poi.details.contact.website);
    $("#phone").html('telefono '+self.poi.details.contact.phone);
    if(self.poi.details.price)
    {
        //self.prezzo=self.poi.details.price.prc_info;
        self.prezzo=50;
        $("#price").html(self.poi.details.price.prc_info);
    }
    else
    {
        self.prezzo=0;
        $("#price").html("l'evento è gratuito");
    }
    
    $("#dateFrom").html('dal '+self.poi.properties.dataFromFormatted);
    $("#dateTo").html('al '+self.poi.properties.dateToFormatted);
    if(self.poi.details.desc)
    {$("#desc").html(self.poi.details.desc);}
    
    
    this.addToPreferiti=function()
    {
        
        var poi    = self.poi;
        var quantita= PreferitiService.getCounter(poi._id);
        console.log('sono la quantita '+quantita);
            
        quantita++;
        
        var preferiti=
            {
                'prodotto':
                [{
                    'properties':
                    {
                      'title'   :poi.properties.title,
                      'dateFrom':poi.properties.dateFrom,
                      'dateTo'  :poi.properties.dateTo
                    },
                    'details':
                    {
                      'idEvento':poi._id,
                      'photo'   :poi.details['ph-primary'],
                      'price'   :self.prezzo,
                      'quantita':quantita
                    }
                }]  
            };
        PreferitiService.addToPreferiti(preferiti,self.userId)
        .then(function(data)
        {
          console.log('aggiunto con successo');    
        })
        .catch(function(err)
        {
            console.log(err);    
        });
    }

  
}]);