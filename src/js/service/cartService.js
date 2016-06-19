angular.module('app.serviceModule')




.service('CartService', ['$q','$http','GrowlService', function ($q, $http, GrowlService) 
  {   // initialization
	  	 		  		
	   		  		
    this.getById=function(id)
    {
        var deferred = $q.defer();
        console.log('id '+id);
        var query = 'http://localhost:8080/getCart/'+id;
        console.log(query);
	   	$http.get(query)
        .success(function(doc)
        {
          console.log(doc);
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