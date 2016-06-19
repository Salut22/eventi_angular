angular.module('app')
.controller("loginCtrl" ,['$http','CurrentUserService','$location', function ($http,CurrentUserService,$location) {
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
           console.log(JSON.stringify(data));
           $location.path("home");
        })
       
       
    }
}]);
