angular.module('app.serviceModule')
.service('CartService', ['$q','$http','GrowlService','$rootScope','$localStorage', function ($q, $http, GrowlService,$rootScope,$localStorage) 
{
    this.cart={
                'prodotto':
                [{
                    'properties':
                    {
                      'title'   :"",
                      'dateFrom':"",
                      'dateTo'  :""
                    },
                    'details':
                    {
                      'idEvento':"",
                      'photo'   :"",
                      'price'   :0,
                      'quantita':0
                    }
                }]  
                };
    this.setCart=function(carrello)
    {
         var expire = new Date();
		  var now = new Date();
		  //expire.setTime(now.getTime() + (parseInt(duration) * 60000)); // duration in minutes
          var cart={};
		  cart.prodotto 	   = carrello.prodotto;
          $localStorage.cart = "cart" + '=' + escape(JSON.stringify(cart)) + '; expires=' + expire.toGMTString() + '; path=/';
    }
}
])
.run(function(CartService) {});