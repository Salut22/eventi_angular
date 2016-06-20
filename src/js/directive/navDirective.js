
angular.module('app.directiveModule')

.directive('navbar', function() {
 return {
    restrict: 'E',
    templateUrl: './templates/navbar.html',
	controller: ['CurrentUserService', '$rootScope',
	             function (CurrentUserService, $rootScope) 
	 	{
            this.basicUser;
            this.user;
            var self = this;
            $rootScope.$on(CurrentUserService.USER_LOGGED_IN_EVENT, function ()
            {
                self.user= CurrentUserService.isLogged();
                if(self.user==true)

                {
                 var id = CurrentUserService.getUserId();
                 self.basicUser = CurrentUserService.getBasicInfo(id);
                }  
            })

            this.logout=function()
            {
             self.user = false;
             return CurrentUserService.setLoggedOut();
            }
            
		}],
	controllerAs:'navBarCtrl' 
    
        }
});