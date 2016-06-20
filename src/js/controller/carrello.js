angular.module('app')

.controller("CartCtrl" ,['$http','CartService','$location', function ($http,CartService,$location) 
{
    this.cart=CartService.getAllCart();
    var self=this;
    console.log(self.cart.prodotto[0].details.quantita);
    
    this.removeToCart=function()
    {
        
        var poi    = self.poi;
        var quantita= CartService.getCounter(poi._id);
        console.log('sono la quantita '+quantita);
            
        quantita--;
        if(quantita<0)
        {
            GrowlService.showAlert(GrowlService.ALERT_ERROR, "L'evento non è nel carrello");
            return;
        }
        else if(quantita==0)
        {
            CartService.deleteToCart(self.userId, self.poi._id);
            GrowlService.showAlert(GrowlService.ALERT_INFO, "evento eliminato dal carrello");
            return;
        }
            
        var cart=
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
        CartService.addToCart(cart,self.userId)
        .then(function(data)
        {
          console.log('aggiunto con successo');    
        })
        .catch(function(err)
        {
            console.log(err);    
        });
    }
    this.deleteToCart=function()
    {
        CartService.deleteToCart(self.userId,self.poi._id)
        .then(function(data)
        {
            console.log('evento cancellato dal carrello');   
        })
        .catch(function(err)
        {
            console.log(err);
        });
    }

    
}])