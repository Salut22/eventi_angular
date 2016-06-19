angular.module('app')
.controller('homeCtrl',['CurrentUserService', function(CurrentUserService) {
    
    this.basic=CurrentUserService.getBasicInfo();
    var self=this;

    this.isLogged=function()
    {
     return CurrentUserService.isLogged();
    }
    this.logout=function()
    {
     return CurrentUserService.setLoggedOut();
    }
}]);