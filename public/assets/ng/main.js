
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
        templateUrl: "/templates/home.html",
        controller: "HomeCtrl",
        title: "Home"
    })
    .when('/internship',
    {
        templateUrl: "/templates/internship.html",
        controller: "InternshipCtrl",
        title: "Internship Places"
    })
    .when('/places/:id',
    {
        templateUrl: "/templates/place.html",
        controller: "PlaceCtrl",
        title: "Place"
    })
    .when('/reviews/:id',{
        templateUrl: "/templates/review.html",
        controller: "ReviewCtrl",
        title: "Review"
    })
    .when('/add-place',{
        templateUrl: "/templates/add-place.html",
        controller: "AddPlaceCtrl",
        title: "Add Place"
    })
    .when('/add-review/:placeid',{
        templateUrl: "/templates/add-review.html",
        controller: "AddReviewCtrl",
        title: "Add Review"
    })
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
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getPlaceById: function(id) {
            var path = "http://128.199.76.147:8001/api/places/"+id;
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getTag: function(){
            var path = 'http://128.199.76.147:8001/api/tags';
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getReviewsByPlaceId: function(id) {
            var path = "http://128.199.76.147:8001/api/reviews?place_id="+id;
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getReviewById: function(id) {
            var path = "http://128.199.76.147:8001/api/reviews/"+id;
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getTagCategories: function() {
            var path = "http://128.199.76.147:8001/api/tagcategories";
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getRatingCategories: function() {
            var path = "http://128.199.76.147:8001/api/ratingcategories";
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getTags: function() {
            var path = "http://128.199.76.147:8001/api/tags";
            return $http.get(path).success(function (response) {
                return response.data;
            })
        }
    };
});

