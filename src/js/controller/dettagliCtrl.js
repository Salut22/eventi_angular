angular.module('app')

.controller("dettagliCtrl" ,['$http','CurrentPoiService','CurrentUserService','PreferitiService','GrowlService','CartService', function ($http,CurrentPoiService,CurrentUserService,PreferitiService,GrowlService,CartService) 
{
    this.poi;
    this.prezzo;
    this.present;
    var self=this;
    
    self.poi=CurrentPoiService.currentEvent();
    
        
    
    $("#title").html('titolo evento '+self.poi.properties.title);
    $("#street").html('via '+self.poi.details.address.street+", "+self.poi.details.address.title);
    $("#city").html('città '+self.poi.details.address.city+", "+self.poi.details.address.country);
    $("#email").html('email '+self.poi.details.contact.email);
    $("#website").html('sito web '+self.poi.details.contact.website);
    $("#phone").html('telefono '+self.poi.details.contact.phone);
    if(self.poi.details.price)
    {
        self.prezzo=self.poi.details.price.prc_info;
        $("#price").html(self.poi.details.price.prc_info);
    }
    else
    {
        $("#price").html("l'evento è gratuito");
    }
    
    $("#dateFrom").html('dal '+self.poi.properties.dataFromFormatted);
    $("#dateTo").html('al '+self.poi.properties.dateToFormatted);
    if(self.poi.details.desc)
    {$("#desc").html(self.poi.details.desc);}
    
    
    this.addToPreferiti=function()
    {
        
        var poi    = self.poi;
        var quantita= 0;
            
        
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
        var token = CurrentUserService.getToken();
        
        PreferitiService.addToPreferiti(preferiti,token)
        .then(function(data)
        {
          GrowlService.showAlert(GrowlService.ALERT_SUCCESS, "evento aggiunto nei preferiti");
        })
        .catch(function(err)
        {
            GrowlService.showAlert(GrowlService.ALERT_ERROR, "evento non aggiunto nei preferiti");
        });
    }
    
    this.esiste=function()
    {
        self.present=false;
       this.all_preferiti= PreferitiService.getAllPreferiti();
        for(p in self.all_preferiti.prodotto)
            {
                if(self.all_preferiti.prodotto[p].details.idEvento == self.poi._id)
                    {

                        self.present=true;
                    }
            }
       
    }
    
    this.addToCart=function()
    {
        
        var poi    = self.poi;
        
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
                      'quantita': 1
                    }
                }]  
            };
        CartService.setCart(preferiti);
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS,'Evento aggiunto al carrello');
      
    }

  
}]);