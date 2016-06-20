angular.module('app.serviceModule')
.service('CartService', ['$q','$http','GrowlService', function ($q, $http, GrowlService) 
  {   // initialization
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
    var self = this;
      
      this.getAllCart=function()
      {
          return self.cart;
      }
      
    this.getById=function(id)
    {
        var deferred = $q.defer();
        var query = 'http://localhost:8080/getCart/'+id;
	   	$http.get(query)
        .success(function(doc)
        {
          if(doc.result.prodotto[0] && doc.result.prodotto[0].properties  )
              {
                self.cart = doc.result;
              }
          
          deferred.resolve(self.cart);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':doc, 'status':status});
		}
		);
        return deferred.promise; 	

    }
    
    this.getProduct=function()
    {var c=0;
        for(i in self.cart.prodotto)
        {
            console.log(self.cart.prodotto[i].properties.title);
           c++; 
        }
     return c;
    }
    this.getCounter=function(id)
    {
        
        for (i in self.cart.prodotto)
        {

            if (id ==self.cart.prodotto[i].details.idEvento)
            {
                return self.cart.prodotto[i].details.quantita;
            }
                
        }
        var quantita=0;
        return quantita;

    }
    this.addToCart=function(cart,userId)
    {
        var deferred = $q.defer();
        console.log('id '+userId+' cart '+JSON.stringify(cart));
        var query = 'http://localhost:8080/addEvent';
        console.log(cart);
	   	$http.post(query, {cart:cart.prodotto, userId:userId})
        .success(function(doc)
        {
          self.cart = doc.result;
          deferred.resolve(doc);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':doc, 'status':status});
		}
		);
        return deferred.promise;
    }
    
    this.deleteToCart=function(userId, eventId)
    {
        var deferred = $q.defer();
        console.log('id '+userId+' eventId '+eventId);
        var query = 'http://localhost:8080/removeEvent';
        console.log(query);
	   	$http.post(query, {userId:userId, eventId:eventId})
        .success(function(doc)
        {
          self.cart = doc.result;
          deferred.resolve(doc);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':doc, 'status':status});
		}
		);
        return deferred.promise;
    } 
}])

.run(function(CartService) {});