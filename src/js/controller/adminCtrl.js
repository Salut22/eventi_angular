angular.module('app')
.controller('adminCtrl', [ '$q', '$http','$location','CurrentUserService','GrowlService', function( $q, $http, $location,CurrentUserService,GrowlService){

this.res;
this.load;
var token=CurrentUserService.getToken();
var self=this;
var server = 'http://localhost:8080';
var url=server+"/admin/validate";
$http.post(url+'?token='+token)
    .then(function(doc)
    {
      console.log(doc.data.result)
       if(doc.data.result==true)
        {
         console.log("Sei amministratore puoi procedere ")
         GrowlService.showAlert(GrowlService.ALERT_SUCCESS, 'Sei amministratore puoi procedere');

        }
        else
        {
          GrowlService.showAlert(GrowlService.ALERT_ERROR, 'non sei amministratore non puoi procedere');

            $location.path('home');
        }
    });  

    
    
   
    
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