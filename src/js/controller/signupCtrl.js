angular.module('app')

.controller("signupCtrl" ,['$http','CurrentUserService','$location','GrowlService', function ($http,CurrentUserService,$location,GrowlService) {
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
         if(user.data>31/12/2000 || user.data<31/12/1916)
             {
                 GrowlService.showAlert(GrowlService.ALERT_ERROR, 'devi inserire una data deve essere compresa tra 31/12/1916 e 31/12/2000');
                 return;
             }
        CurrentUserService.registerUser(user)
        .then(function(data)
        {
            $location.path('home');
        })
        .catch(function(err)
        {
            GrowlService.showAlert(GrowlService.ALERT_ERROR,err);   
        });
        }
    }
}]);
