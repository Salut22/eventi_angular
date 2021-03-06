angular.module('app.serviceModule')
.service('PreferitiService', ['$q','$http','$rootScope', function ($q, $http,$rootScope) 
  {   // initialization
	this.preferiti={
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
      
      this.getAllPreferiti=function()
      {
          return self.preferiti;
      }
      
    this.getById=function(token)
    {
        var deferred = $q.defer();
        var query = 'http://localhost:8080/getPreferiti/'+token;
	   	$http.get(query)
        .success(function(doc)
        {
            self.preferiti = doc.result;
            deferred.resolve(doc.result);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':doc, 'status':status});
		}
		);
        return deferred.promise; 	

    }
    
    this.c;
    this.getProduct=function()
    {
        self.c=0;
        for(i in self.preferiti.prodotto)
        {
            self.c=self.c+1; 
        }
     return self.c;
    }
   /* this.getCounter=function(id)
    {
        
        for (i in self.preferiti.prodotto)
        {

            if (id ==self.preferiti.prodotto[i].details.idEvento)
            {
                return self.preferiti.prodotto[i].details.quantita;
            }
                
        }
        var quantita=0;
        return quantita;

    }
    */
    this.addToPreferiti=function(preferiti,userId)
    {
        var deferred = $q.defer();
        var query = 'http://localhost:8080/addEvent';
	   	$http.post(query+'?token='+userId,{preferiti:preferiti.prodotto})
        .success(function(doc)
        {
          self.preferiti = doc.result;
          var preferiti=self.getProduct();
          $rootScope.preferiti=preferiti;
          deferred.resolve(doc.result);
        })
        .error(function(doc, status, headers, config) 
        {
		  deferred.reject({'error':doc, 'status':status});
		}
		);
        return deferred.promise;
    }
    
    this.deleteToPreferiti=function(userId, eventId)
    {
        var deferred = $q.defer();
        var query = 'http://localhost:8080/removeEvent';
        $http.post(query+'?token='+userId, {/*userId:userId, */eventId:eventId})        
        .success(function(doc)
        {
          self.preferiti = doc.result;
          var preferiti=self.getProduct();
          $rootScope.preferiti=preferiti;
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

.run(function(PreferitiService) {});