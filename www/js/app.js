'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller:'loginController',
        data: {
            requireAuth: false
        }
    })
    .state('forgot', {
        url: '/forgot',
        templateUrl: 'views/forgot/forgot.html',
        controller:'forgotController',
        data: {
            requireAuth: false
        }
    })
    .state('register', {
        url: '/register',
        templateUrl: 'views/register/register.html',
        controller:'registerController',
        data: {
            requireAuth: false
        }
    })
    .state('home', {
        url: '',
        templateUrl: 'views/home/home.html',
        controller:'homeController',
        data: {
            requireAuth: true
        }
    });
})
// Changue this for your Firebase App URL.
.constant('FURL', 'https://localsavelogin.firebaseio.com/')
.run(function($ionicPlatform, $rootScope, Auth, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams){

        if(!(toState.data.requireAuth && !!Auth.userLogged())){

            if(!toState.data.requireAuth && Auth.userLogged()){
                event.preventDefault();
                $state.go('home');
            }

            if(toState.data.requireAuth && !!!Auth.userLogged()){
                event.preventDefault();
                $state.go('login');
            }
        }
    });
});
