
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
         
                
            this.logout=function()
            {
             return CurrentUserService.setLoggedOut();
            }
            
		}],
	controllerAs:'navBarCtrl' 
    
        }
});