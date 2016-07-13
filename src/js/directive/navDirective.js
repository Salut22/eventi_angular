
angular.module('app.directiveModule')

.directive('navbar', function() {
 return {
    restrict: 'E',
    templateUrl: './templates/navbar.html',
	controller: ['CurrentUserService', '$rootScope',
	             function (CurrentUserService, $rootScope) 
	 	{
                
            this.logout=function()
            {
             return CurrentUserService.setLoggedOut();
            }
            
		}],
	controllerAs:'navBarCtrl' 
    
        }
});