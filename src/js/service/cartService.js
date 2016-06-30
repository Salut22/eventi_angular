angular.module('app.serviceModule')
.service('CartService', ['$q','$http','GrowlService','$rootScope','$localStorage', function ($q, $http, GrowlService,$rootScope,$localStorage) 
{
    this.cart={};
    this.exist;
    var self=this;
    self.cart.prodotto=[];
    
    this.getCart=function()
    {
        return self.cart;
    }
    
    this.reset=function()
    {
        $localStorage.cart={};        
        this.cart.prodotto=[];

    }
    
    this.updateCart=function(quantita,id)
    {
     
        for(p in self.cart.prodotto)
            {
                if(self.cart.prodotto[p].details.idEvento==id)
                    {
                      self.cart.prodotto[p].details.quantita=quantita;
                    }
            }  
        $localStorage.cart={}
        _setCartCookie();
    }
    
    this.deleteCart=function(id)
    {
        for(p in self.cart.prodotto)
            {
                if(self.cart.prodotto[p].details.idEvento==id)
                    {
                      self.cart.prodotto.splice(p,1);
                    }
            }  
         $localStorage.cart={}        
          _setCartCookie();
    }
    
    this.setCart=function(carrello)
    {
        self.exist=false;
        for(p in self.cart.prodotto)
            {
                if(self.cart.prodotto[p].details.idEvento==carrello.prodotto[0].details.idEvento)
                    {
                      self.cart.prodotto[p].details.quantita=self.cart.prodotto[p].details.quantita+1;
                      self.exist=true;
                    }
                
            }
        
                if(self.exist==false)
                {
                    self.cart.prodotto.push(carrello.prodotto[0]);
                }
        
        if($localStorage.cart)
        {
            $localStorage.cart={}        
        }
            _setCartCookie();
    }
    
    var _setCartCookie=function(duration)
    {
        var expire = new Date();
		  var now = new Date();
		  expire.setTime(now.getTime() + (parseInt(duration) * 60000)); // duration in minutes
          
          $localStorage.cart = "cart" + '=' + escape(JSON.stringify(self.cart.prodotto)) + '; expires=' + expire.toGMTString() + '; path=/';
    }
var _getCookie = function()
		{
          if ( $localStorage.cart && $localStorage.cart.length > 0)
			  {
			    var inizio =  $localStorage.cart.indexOf('cart=');
			    if (inizio != -1)
			    {
			      inizio = inizio + 'cart'.length + 1;
			      var fine =  $localStorage.cart.indexOf(";",inizio);
			      if (fine == -1) fine =  $localStorage.cart.length;
			      var credentials = unescape( $localStorage.cart.substring(inizio,fine));;
			      return credentials;
			    }else{
			       return false;
			    }
			  }
	     return false;											
		}   
var cockie=_getCookie();
    if(cockie!=false)
    {
    var cockie=JSON.parse(cockie);
    self.cart.prodotto=cockie;
    console.log(JSON.stringify(cockie,null,2));
    }
}
])
.run(function(CartService) {});