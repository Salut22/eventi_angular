angular.module('app')
.controller("loginCtrl" ,['CurrentUserService','$location','PreferitiService','$rootScope','$localStorage', function (CurrentUserService,$location,PreferitiService,$rootScope,$localStorage) {
this.isLogged;
var self = this;

    
    this.save = function()
    {  
        
        var user =
        {
            'username' :this.username,
            'password' :this.password
        };
        CurrentUserService.setLoggedIn(user)
       .then(function (data)
        {
            var token=CurrentUserService.getToken();
            console.log(token);
            PreferitiService.getById(token)
         .then(function(cart){
            var prodotto={};
            $localStorage.cart = "cart" + '=' + escape(JSON.stringify(prodotto));
            var preferiti=PreferitiService.getProduct();
            $rootScope.preferiti=preferiti;     
  	  	    
            $location.path("home");

           })
           .catch(function(err){
            console.log(err);
           })
            
       })
          
        
       
       
    }
}]);
