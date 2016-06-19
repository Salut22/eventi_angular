angular.module('app')
.controller('adminCtrl', [ '$q', '$http','$location', function( $q, $http, $location){
var server = 'http://localhost:8080';
var url=server+"/admin/validate";
$http.post(url)
    .then(function(doc)
    {
//    console.log(doc.data.result);
        if(doc.data.result==true)
        {console.log("Sei amministratore puoi procedere"+JSON.stringify(doc.data.token))}
        else
        {
            
            $location.path('home');
        }
    });  

}])