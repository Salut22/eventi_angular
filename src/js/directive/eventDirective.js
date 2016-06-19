
angular.module('app.directiveModule')

.directive('event', function() {
 return {
    restrict: 'E',
    templateUrl: './templates/event.html',
    scope: {evento: '='},
	controller: ['CurrentPoiService', '$scope', 
	             function (CurrentPoiService,$scope) 
	 	{
            this.poi=CurrentPoiService.getById($scope.evento);
            var self=this;
            
		}],
	controllerAs:'eventCtrl' 
    
        }
});