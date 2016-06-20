angular.module('app.serviceModule')




.service('CurrentUserService', ['$q','$http','GrowlService','CartService','$rootScope', function ($q, $http, GrowlService,CartService,$rootScope) 
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
    EVENTS FIRED
================================================*/
this.USER_LOGGED_IN_EVENT    = "USER_LOGGED_IN_EVENT";
this.USER_LOGGED_OUT_EVENT   = "USER_LOGGED_OUT_EVENT";


   	
 
 // AT THE BOTTOM, THERE IS THE CALL TO _getCookie() FOR THE INITIALIZATION

 
 
 
/* ========================================
    FUNCTIONS
================================================*/
    
      
    var _resetUser = function()
    	{
	     _islogged  = false;
	     _info = {};
    	}
    	
    	
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
		 }
   
   this.getToken=function()
   {
       return _info.token;
   }
    this.isLogged = function() 
   		{return _islogged; };            
    
    this.getUserId = function()
     {
	    return _info._id;
     }
    
    this.getBasicInfo = function()
      {
		 return _info.basic;  
      }
  
 
       	
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
		   	  	 _islogged 	= true;
                 CartService.getById(user._id);

		   	  	 GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'login avvenuto');
$rootScope.titolo = _islogged;		   	  	 // cookie
		   	  	 _setCookie();
		   	  	 deferred.resolve(data);			  	 
		  	 })
	     .error(function(data, status, headers, config) 
			     {
				  _resetUser();
				  var msg = 'Registrazione fallita <br>' + JSON.stringify(data);
				 GrowlService.showAlert(GrowlService.ALERT_ERROR, msg);
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
                     _islogged 	= true;
			   	  	GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'login avvenuto');
$rootScope.titolo = _islogged;			   	  	 // cookie
			   	  	 _setCookie();
                     
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
	   	 _setCookie(-1);  // delete the cookie
	   $rootScope.titolo = _islogged;
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'logout avvenuto');
	     };    		
	
	
    	
    	
    	
    	
	 /* ======================== DATABASE ============================ */
      
  
      
   var _setCookie = function(duration)
		{
		  var expire = new Date();
		  var now = new Date();
		  expire.setTime(now.getTime() + (parseInt(duration) * 60000)); // duration in minutes
		  var user 	    	   = {'_id':'', 'basic':{}};
		  user._id 			   = _info._id;
		  user.basic 		   = _info.basic;
		  document.cookie = "eppoi_user" + '=' + escape(JSON.stringify(user)) + '; expires=' + expire.toGMTString() + '; path=/';
		} 
	
	var _getCookie = function()
		{
          if (document.cookie.length > 0)
			  {
			    var inizio = document.cookie.indexOf('eppoi_user=');
			    if (inizio != -1)
			    {
			      inizio = inizio + 'eppoi_user'.length + 1;
			      var fine = document.cookie.indexOf(";",inizio);
			      if (fine == -1) fine = document.cookie.length;
			      var credentials = unescape(document.cookie.substring(inizio,fine));;
			      return credentials;
			    }else{
			       return false;
			    }
			  }
	     return false;											
		}   
		
		
	        $rootScope.titolo = _islogged;
	
		
/* ========================================
    INITIALIZATION OF THE USER IF STORED AS COOKIE
================================================*/		

   cookie = _getCookie();
  if (cookie != false && !_islogged)
  	{
      cookie=JSON.parse(cookie);
	   _info = cookie;
    CartService.getById(cookie._id);
_islogged  = true; 
       // $rootScope.$broadcast(self.USER_LOGGED_IN_EVENT);
        $rootScope.titolo = _islogged;
        console.log(self.USER_LOGGED_IN_EVENT);
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, _info.basic.name+' ha loggato con il cookie');
       
  	}		  	 		  		
	   		  		
    
}])

//.run(function(CurrentUserService) {}
.run(function(CurrentUserService) {});
  //  console.log("porco mondo"+ self._isLogged);
//
//    $rootScope.$on(CurrentUserService.USER_LOGGED_IN_EVENT, function()
//    {
//        console.log("porcomondo 23 232");
//    });
//    $rootScope.$on(CurrentUserService.USER_LOGGED_OUT_EVENT, function()
//    {
//        console.log("porcomondo 23 232 fhidhfihfiwe");
//    });
//    $rootScope.$on(CurrentUserService.USER_LOGGED_IN_EVENT, function()
//            {
//                console.log("ziolatro");
//                self.user= CurrentUserService.isLogged();
//                if(self.user==true)
//
//                {
//                 var id = CurrentUserService.getUserId();
//                 self.basicUser = CurrentUserService.getBasicInfo(id);
//                }  
//            })
//});