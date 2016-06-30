angular.module('app')

.controller("CartCtrl" ,['$http','CartService','CurrentUserService','GrowlService','$location','$q', function ($http, CartService,CurrentUserService,GrowlService,$location,$q) 
{
    
    this.cart;
    this.somma=0;
    var self=this;
    self.userId=CurrentUserService.getUserId();
    
    
    
    
    this.update=function()
    {
        console.log('update');
    self.cart=CartService.getCart();
    self.sum();
    }
    //self.update();
    
    self.cart=CartService.getCart();
    
    this.paga=function()
    {
        CartService.reset();
        self.update();
    }
    this.upCart=function(quantita,id)
    {
        CartService.updateCart(quantita,id);
        self.update();
    }
    this.delete=function(id)
    {
      CartService.deleteCart(id);
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