angular.module('app')

.controller("PreferitoCtrl" ,['$http','PreferitiService','CurrentUserService','GrowlService','$location','$q','CartService', function ($http,PreferitiService,CurrentUserService,GrowlService,$location,$q,CartService) 
{
    this.preferiti;
    var self=this;
    
    
    this.update=function()
    {
        var token = CurrentUserService.getToken();
        PreferitiService.getById(token)
        .then(function(data)
        {
            self.preferiti=data;
        })
        
        
    }
    
    self.preferiti=PreferitiService.getAllPreferiti();
    
    

   
    
    
    this.addCart=function(id)
    {
        var pref=self.preferiti;
       for(p in pref.prodotto)
        {
            if(pref.prodotto[p].details.idEvento==id)
            {
            var preferiti=
             {
                'prodotto':
                [{
                    'properties':
                    {
                      'title'   :pref.prodotto[p].properties.title,
                      'dateFrom':pref.prodotto[p].properties.dateFrom,
                      'dateTo'  :pref.prodotto[p].properties.dateTo
                    },
                    'details':
                    {
                      'idEvento':pref.prodotto[p]._id,
                      'photo'   :pref.prodotto[p].details.photo,
                      'price'   :pref.prodotto[p].details.price,
                      'quantita': 1
                    }
                }]  
             };
               CartService.setCart(preferiti);
               GrowlService.showAlert(GrowlService.ALERT_SUCCESS,'Evento aggiunto al carrello');
            }
        }
     

    }
        
    
    this.deleteToPreferito=function(id)
    {
       var token = CurrentUserService.getToken();
        PreferitiService.deleteToPreferiti(token,id)
        .then(function(data)
        {
        self.update();
        GrowlService.showAlert(GrowlService.ALERT_WARNING, "evento cancellato dal carrello");   
        })
        .catch(function(err)
        {
            console.log(err);
        });
    };

    
    
}])