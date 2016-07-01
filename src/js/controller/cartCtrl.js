angular.module('app')

.controller("CartCtrl" ,['$http','CartService','CurrentUserService','GrowlService','$location','$q','$timeout', function ($http, CartService,CurrentUserService,GrowlService,$location,$q,$timeout) 
{
    
    this.cart;
    this.somma=0;
    var self=this;
    
    
    
    
    this.update=function()
    {
     self.cart=CartService.getCart();
     self.sum();

    }
    
    self.cart=CartService.getCart();
    $timeout(10000);
    this.paga=function()
    {
        CartService.reset();
     GrowlService.showAlert(GrowlService.ALERT_SUCCESS,'Pagamento avvenuto con successo');
        self.update();
    }
    this.upCart=function(quantita,id)
    {
        CartService.updateCart(quantita,id);
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS,'Aggiornamento delle quantità avvenuto con successo');
        self.update();
    }
    this.delete=function(id)
    {
      CartService.deleteCart(id);
      GrowlService.showAlert(GrowlService.ALERT_WARNING,'Evento cancellato con successo');
      self.update();
      
    }
  this.sum=function()
    {
        self.somma=0;
        for(c in self.cart.prodotto)
        {
          self.somma+=(self.cart.prodotto[c].details.quantita*self.cart.prodotto[c].details.price); 
        }
        
    }
   
    
    
}])