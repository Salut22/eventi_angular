angular.module('app')
.controller("loginCtrl" ,['$http','CurrentUserService','$location', 'CartService','$rootScope', function ($http,CurrentUserService,$location,CartService,$rootScope) {
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
        console.log(JSON.stringify(user));
       CurrentUserService.setLoggedIn(user)
       .then(function(data)
        {
           console.log(JSON.stringify(data));
           return;
       })
       .catch(function(err){console.log(err)})
       .then(function (data){
           
           var User_id = CurrentUserService.getUserId();
           console.log(User_id);
           CartService.getById(User_id)
           .then(function(cart){
            var product=CartService.getProduct();
            $rootScope.prodotto=product;
			   	  	 
            $location.path("home");

           })
           .catch(function(err){
            console.log(err);
           })
            
       })
          
        
       
       
    }
}]);
