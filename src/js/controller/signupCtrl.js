angular.module('app')

.controller("signupCtrl" ,['$http','CurrentUserService','$location', function ($http,CurrentUserService,$location) {
var self = this;

var server = 'http://localhost:8080';
    
    this.save = function()
    {  
        
        var user =
        {
            'nome'     :this.nome,
            'cognome'  :this.cognome,
            'email'    :this.email,
            'username' :this.username,
            'password' :this.password,
            'data'     :this.data
        };
        
       
        
        if(user.nome!=undefined && user.cognome!=undefined && user.email!=undefined && user.username != undefined && user.password != undefined && user.data != undefined) 
        {
        CurrentUserService.registerUser(user)
        .then(function(data)
        {
            $location.path('home');
        })
        .catch(function(err)
        {
            console.log(JSON.stringify(err));    
        });
        }
    }
}]);
