angular.module('app.serviceModule')
.service('CartService', ['$q','$http','GrowlService', function ($q, $http, GrowlService) 
  {   // initialization
	this.cart;  	 		  		
    var self = this;
    this.getById=function(id)
    {
        var deferred = $q.defer();
        console.log('id '+id);
        var query = 'http://localhost:8080/getCart/'+id;
        console.log(query);
	   	$http.get(query)
        .success(function(doc)
        {
          self.cart = doc.result;
          deferred.resolve(doc);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':data, 'status':status});
		}
		);
        return deferred.promise; 	

    }
    this.getCounter=function (id)
    {
        for (i in self.cart.prodotto)
        {
            if (id ==self.cart.prodotto[i])
            {
                return self.cart.prodotto[i]details.quantita;
            }
                
        }
        
    }
    this.addToCart(cart,userId)
    {
        var deferred = $q.defer();
        console.log('id '+userId+' cart '+cart);
        var query = 'http://localhost:8080/addEvent;
        console.log(query);
	   	$http.post(query, cart)
        .success(function(doc)
        {
          self.cart = doc.result;
          deferred.resolve(doc);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':data, 'status':status});
		}
		);
        return deferred.promise;
    }
}])

.run(function(CartService) {});