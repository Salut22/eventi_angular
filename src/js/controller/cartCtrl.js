angular.module('app')

.controller("CartCtrl" ,['$http','CartService','CurrentUserService','GrowlService','$location','$q', function ($http, CartService,CurrentUserService,GrowlService,$location,$q) 
{
    
    this.preferiti;
    this.somma=0;
    this.userId;
    var self=this;
//    console.log(CurrentUserService.getUserId());
    self.userId=CurrentUserService.getUserId();
    
    
    
    
    this.update=function()
    {
        console.log('update');
        console.log(self.userId);
        PreferitiService.getById(self.userId)
        .then(function(data)
        {
//            console.log(JSON.stringify(data));
            self.preferiti=data;
            self.sum();
    })
        
        
    }
//    self.update();
    
    self.preferiti=PreferitiService.getAllPreferiti();
    
    
    
    this.sum=function()
    {
        self.somma=0;
        for(c in self.preferiti.prodotto)
        {
          self.somma+=(self.preferiti.prodotto[c].details.quantita*self.preferiti.prodotto[c].details.price); 
        }
        
    }
   
    
    
//    console.log(self.preferiti.prodotto[0].details.quantita);
    this.removeToPreferito=function(id,quantita)
    {
     if(quantita==0)
        {

            PreferitiService.deleteToPreferiti(self.userId, id)
            .then(function(data)
            {
                self.update();
                GrowlService.showAlert(GrowlService.ALERT_INFO, "evento eliminato dai preferiti");
                
            })
            .catch(function(err)
            {
              console.log(err);  
            })
         }
          for(c in self.preferiti.prodotto)
          {
              if(id == self.preferiti.prodotto[c].details.idEvento)
                {
                    self.preferiti.prodotto[c].details.quantita=quantita;
                    preferiti={'prodotto':[self.preferiti.prodotto[c]]};
                    
                    //sul server lo gestiamo come array quindi lo passiamo come array
                    PreferitiService.addToPreferiti(preferiti, self.userId)
                    .then(function(data)
                    {
                        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, "evento aggiornato con successo");
                        self.update();
                    })
                    .catch(function(err)
                    {
                        console.log(err);    
                    });
                
                }
           }
    };
            
        
    
    this.deleteToPreferito=function(id)
    {
        PreferitiService.deleteToPreferiti(self.userId,id)
        .then(function(data)
        {
            self.update();
        GrowlService.showAlert(GrowlService.ALERT_SUCCESS, "evento cancellato dal carrello");   
        })
        .catch(function(err)
        {
            console.log(err);
        });
    };
    
    
}])