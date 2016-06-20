angular.module('app')
.controller('adminCtrl', [ '$q', '$http','$location', function( $q, $http, $location){
/*var server = 'http://localhost:8080';
var url=server+"/admin/validate";
$http.post(url)
    .then(function(doc)
    {
       if(doc.data.result==true)
        {console.log("Sei amministratore puoi procedere"+JSON.stringify(doc.data.token))}
        else
        {
            $location.path('home');
        }
    });  
*/
    
    
    this.res;
    this.load;
    var self=this;
    
    this.carica=function()
    {
        $http.post('http://localhost:8080/admin/loadEvent',self.load)
        .success(function(doc)
        {
            self.res="";
            console.log(JSON.stringify(doc.result));
            if(doc.result.titoloPresente)
            {    self.res='<p style="color:red">TITOLI PRESENTI <p>';
                for(c in doc.result.titoloPresente)
                {
                    self.res+='<p style="color:blue">'+doc.result.titoloPresente[c]+'\n<p>';    
                }
            }
            if(doc.result.idPresente)
            {
                for(i in doc.result.idPresente)
                {
                    self.res+=doc.result.idPresente[c]+"\n";
                }
            }    
            self.res+=doc.result.salvati+"\n";
            $("#risultat").html(self.res);

        })
        .catch(function(err)
        {
            self.res=err;    
        })
    }
}])