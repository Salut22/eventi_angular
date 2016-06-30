/* ==== APP ====*/
angular.module('app.directiveModule',[])
angular.module('app.agucomplete',['angucomplete-alt'])
angular.module('app.serviceModule',[])
angular.module('app', ['ui.router','app.serviceModule','app.agucomplete','app.directiveModule','ngStorage'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider,$httpProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl as hmCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl as lgnCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl as sgnCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html',
      controller: 'searchCtrl as srhCtrl'
    })
 .state('loadEvent', {
     url: '/admin/loadEvent',
     templateUrl: 'templates/admin.html',
     controller: 'adminCtrl as admCtrl'
    })
 .state('eventi', {
     url: '/eventi',
     templateUrl: 'templates/eventi.html',
     controller: 'eventiCtrl as evnCtrl'

    })
.state('dettagli', {
     url: '/dettagli',
     templateUrl: 'templates/dettagli.html',
     controller: 'dettagliCtrl as detCtrl'

    })
.state('carrello', {
     url: '/carrello',
     templateUrl: 'templates/carrello.html',
     controller: 'CartCtrl as cartCtrl'

    })
.state('preferito', {
     url: '/preferiti',
     templateUrl: 'templates/preferiti.html',
     controller: 'PreferitoCtrl as preferitoCtrl'

    })

  $urlRouterProvider.otherwise('home');
  

}])
