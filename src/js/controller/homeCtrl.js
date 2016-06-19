angular.module('app')
.controller('homeCtrl',['CurrentUserService', function(CurrentUserService) {
    
    this.basic=CurrentUserService.getBasicInfo();
    var self=this;
    
        var myIndex = 0;
        carousel();

        function carousel() {
            var i;
            var x = document.getElementsByClassName("mySlides");
            for (i = 0; i < x.length; i++) {
               x[i].style.display = "none";
            }
            myIndex++;
            if (myIndex > x.length) {myIndex = 1}
            x[myIndex-1].style.display = "block";
            setTimeout(carousel, 2000); // Change image every 2 seconds
        }
    this.isLogged=function()
    {
     return CurrentUserService.isLogged();
    }
    this.logout=function()
    {
     return CurrentUserService.setLoggedOut();
    }
}]);