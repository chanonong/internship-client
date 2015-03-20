
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/',
    {
        redirectTo: "/home"
    })
    // .when('/signin',
    // {
    //     templateUrl: "templates/signin.html",
    //     controller: "SigninCtrl",
    //     title: "Signin"
    // })

    .when('/home',
    {
        templateUrl: "templates/home.html",
        controller: "HomeCtrl",
        title: "Home"
    })
    .when('/thailand')
    {
        templateUrl: "templates/thailand.html",
        controller: "ThailandCtrl",
        title: "Thailand"
    }
    .otherwise({
        title: "ERROR 404",
        template: "<p><h1>&nbsp;&nbsp;&nbsp;อาร์มสีเออเร่อ ๔๐๔&nbsp;&nbsp;&nbsp;</h1></p>"
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        console.log("routeChangeSuccess");
        console.log(current.$$route.title);
        $rootScope.title = current.$$route.title;
    });
}]);

app.service('restService', function($http, $rootScope) {
    return {
        getPlace: function(){
            var path = 'http://128.199.76.147:8001/api/places';
            return $http.get(path, function (response) {
                return response.data;
            }).error(function(data, status) {
                    // TODO Handle
            });
        },
        getPlaceById: function(id) {
            var path = "http://128.199.76.147:8001/api/places/"+id;
            return $http.get(path, function (response) {
                return response.data;
            }).error(function(data, status) {
                // TODO Handle
            });
        },
        getTag: function(){
            var path = 'http://128.199.76.147:8001/api/tags';
            return $http.get(path, function (response) {
                return response.data;
            }).error(function(data, status) {
                    // TODO Handle
            });
        }

    };
});

