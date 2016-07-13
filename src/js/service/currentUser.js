angular.module('app.serviceModule')




.service('CurrentUserService', ['$q','$http','GrowlService','PreferitiService','$rootScope','$localStorage','CartService', function ($q, $http, GrowlService,PreferitiService,$rootScope,$localStorage,CartService) 

  {   // initialization
    var self = this;
    var _islogged  = false;
    var _info = { 
	      		  "_id" : "",
	      	      "basic":{/* fb_id; name; img.. */},
                  "token":""
                };
    var cookie; // initialated at the bottom of the page



 
 
 
/* ========================================
    FUNCTIONS
================================================*/
    
      
    var _resetUser = function()
    	{
	     _islogged  = false;
	     _info = {};
    	}
    	
    	/*
    this.requireLogin = function()
		{
		 if (!self.isLogged())
		 	{
			 console.error ('you must be logged in !!!');
			 $('#force-login').modal(); // check it out in miscDirective.js
			 return false;
		 	}
		 else
		 	{return true;}
		 }*/
   
   this.getToken=function()
   {
       return _info.token;
   }
    this.isLogged = function() 
   		{return _islogged; };            
   
    
  
 
       	
   	this.registerUser = function(userInfo)
   	{
	  var deferred = $q.defer();
	  var query = 'http://localhost:8080/api/users';
	  $http.post(query, userInfo)
		 .success(function(data, status, headers, config)
		  	 {  	  
			  	 var user      = data.result;
		   	  	 _info._id     = user._id;
		   	  	 _info.basic   = user.basic;
		   	  	 //_islogged 	= true;
                 //PreferitiService.getById(user._id);

		   	  	 GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'Registrazione avvenuta con successo');
                 $rootScope.isLogged = _islogged;
                 //PreferitiService.getById(token)
                 // cookie
		   	  	 //_setCookie();
		   	  	 deferred.resolve(data);			  	 
		  	 })
	     .error(function(data, status, headers, config) 
			     {
				  _resetUser();
				  var msg = 'Registrazione fallita <br>' + JSON.stringify(data.error);
				 GrowlService.showAlert(GrowlService.ALERT_ERROR, 'email o nickname già presenti');
				  deferred.reject(false);
			     }
			    );		  	 
	  return deferred.promise; 	
   	}
   	
   	
   				
    this.setLoggedIn = function(credentials) 
   		{ 
	   	 var deferred = $q.defer();
	   	 	   		
	   	 if(_islogged) {deferred.resolve(true); return deferred.promise;} // already logged
	   	 // ==============
	   
	   	 var query = 'http://localhost:8080/users/authenticate';//, _info._id);
	   	 $http.post(query, credentials)
		 .success(function(data, status, headers, config)
		  	 {  var user = data.result;
			     if (data.result._id.length>0)
		   	  	   { 
			   	  	 _info._id     = user._id;
			   	  	 _info.basic   = user.basic;
                     _info.token   = data.token;
                       $rootScope.nickname = _info.basic.nickname
                     _islogged 	= true;
			   	  	GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'login avvenuto');
                    $rootScope.isLogged = _islogged;			   	  	 // cookie
			   	  	 _setCookie();
//                     $localStorage.cart={'cart='};        
			   	  	 deferred.resolve(true);
		   	  	   } 
		   	     else
		   	       {
			   	     _resetUser();
			   	     GrowlService.showAlert(GrowlService.ALERT_ERROR, 'login fallito');
			   	     deferred.reject(false);
			   	    }	 
		   	  
		  	 })
	     .error(function(data, status, headers, config) 
			     {
			   	     GrowlService.showAlert(GrowlService.ALERT_ERROR, data.msg);
				  _resetUser();
				  deferred.reject({'error':data, 'status':status});
			     }
			    ); 
		  return deferred.promise;  
	   	};     
    
    
    
 
   

 // ==========================================================================       
 
 
   this.setLoggedOut = function() 
   		{ 
	   	 _resetUser();
	   	 $localStorage.$reset();  // delete the cookie
	   $rootScope.isLogged = _islogged;
       CartService.reset();
       
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'logout avvenuto');
	     };    		
	
	
    	
    	
    	
    	
	 /* ======================== DATABASE ============================ */
      
  
      
   var _setCookie = function(duration)
		{
		  var expire = new Date();
		  var now = new Date();
		  expire.setTime(now.getTime() + (parseInt(duration) * 60000)); // duration in minutes
		  var user 	    	   = {'basic':{}};
          user.token		   = _info.token;
          if(_info.basic)
          {
		      user.basic           = _info.basic.nickname;
          }
		  $localStorage.user = "user" + '=' + escape(JSON.stringify(user)) + '; expires=' + expire.toGMTString() + '; path=/';
		} 
	
	var _getCookie = function()
		{
          if ( $localStorage.user && $localStorage.user.length > 0)
			  {
			    var inizio =  $localStorage.user.indexOf('user=');
			    if (inizio != -1)
			    {
			      inizio = inizio + 'user'.length + 1;
			      var fine =  $localStorage.user.indexOf(";",inizio);
			      if (fine == -1) fine =  $localStorage.user.length;
			      var credentials = unescape( $localStorage.user.substring(inizio,fine));;
			      return credentials;
			    }else{
			       return false;
			    }
			  }
	     return false;											
		}   
		
		
	        $rootScope.isLogged = _islogged;
	
		
/* ========================================
    INITIALIZATION OF THE USER IF STORED AS COOKIE
================================================*/		

   cookie = _getCookie();
  if (cookie != false && !_islogged)
  	{
      cookie=JSON.parse(cookie);

       _info.basic.nickname=cookie.basic;
       _info.token=cookie.token;
    PreferitiService.getById(cookie.token)
    .then(function(doc)
    {
       var preferiti=PreferitiService.getProduct();
       $rootScope.preferiti=preferiti;
    })
    _islogged  = true; 
        $rootScope.isLogged = _islogged;
        $rootScope.nickname = _info.basic.nickname;

        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, _info.basic.nickname+' ha loggato con il cookie');
       
  	}		  	 		  		
	   		  		
    
}])

.run(function(CurrentUserService) {});
