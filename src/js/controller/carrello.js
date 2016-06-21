angular.module('app')

.controller("CartCtrl" ,['$http','CartService','CurrentUserService','GrowlService','$location','$q', function ($http,CartService,CurrentUserService,GrowlService,$location,$q) 
{
    this.cart;
    this.somma=0;
    this.userId;
    var self=this;
//    console.log(CurrentUserService.getUserId());
    self.userId=CurrentUserService.getUserId();
    
    
    
    
    this.update=function()
    {
        console.log('update');
        console.log(self.userId);
        CartService.getById(self.userId)
        .then(function(data)
        {
//            console.log(JSON.stringify(data));
            self.cart=data;
            self.sum();
    })
        
        
    }
//    self.update();
    
    self.cart=CartService.getAllCart();
    
    
    
    this.sum=function()
    {
        self.somma=0;
        for(c in self.cart.prodotto)
        {
          self.somma+=(self.cart.prodotto[c].details.quantita*self.cart.prodotto[c].details.price); 
        }
        
    }
   
    
    
//    console.log(self.cart.prodotto[0].details.quantita);
    this.removeToCart=function(id,quantita)
    {
     if(quantita==0)
        {

            CartService.deleteToCart(self.userId, id)
            .then(function(data)
            {
                self.update();
                GrowlService.showAlert(GrowlService.ALERT_INFO, "evento eliminato dal carrello");
                
            })
            .catch(function(err)
            {
              console.log(err);  
            })
         }
          for(c in self.cart.prodotto)
          {
              if(id == self.cart.prodotto[c].details.idEvento)
                {
                    self.cart.prodotto[c].details.quantita=quantita;
                    cart={'prodotto':[self.cart.prodotto[c]]};
                    
                    //sul server lo gestiamo come array quindi lo passiamo come array
                    CartService.addToCart(cart, self.userId)
                    .then(function(data)
                    {
                        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, "evento aggiornato con successo");
                        self.update();
                    })
                    .catch(function(err)
                    {
                        console.log(err);    
                    });
                
                }
           }
    };
            
        
    
    this.deleteToCart=function(id)
    {
        CartService.deleteToCart(self.userId,id)
        .then(function(data)
        {
            self.update();
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, "evento cancellato dal carrello");   
        })
        .catch(function(err)
        {
            console.log(err);
        });
    };

    
}])