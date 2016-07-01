angular.module('app')
.controller("loginCtrl" ,['$http','CurrentUserService','$location', 'PreferitiService','$rootScope', function ($http,CurrentUserService,$location,PreferitiService,$rootScope) {
this.isLogged;
var self = this;

var server = 'http://localhost:8080';
    
    this.save = function()
    {  
        
        var user =
        {
            'username' :this.username,
            'password' :this.password
        };
        CurrentUserService.setLoggedIn(user)
       .then(function(data)
        {
           return;
       })
       .catch(function(err){console.log(err)})
       .then(function (data){
           
          var token=CurrentUserService.getToken();
           PreferitiService.getById(token)
           .then(function(cart){
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
