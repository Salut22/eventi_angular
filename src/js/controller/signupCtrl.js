angular.module('app')

.controller("signupCtrl" ,['$http','CurrentUserService', function ($http,CurrentUserService) {
var self = this;
console.log("ziolalalala");

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
        .then(function(data){
           console.log(JSON.stringify(data));
       })
           /* var url=server+"/api/users";
             $http.post(url,{'users':user})
             .then(function(doc)
               {
                 console.log(doc);
                 if(doc.data.result==true)
                     {console.log("salvato")}
                 else
                     {
                         console.log(doc.data.error);
                     }
               });  
*/
        }
    }
}]);
