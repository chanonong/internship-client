
var app = angular.module('app', ['ngRoute', 'angularFileUpload','internship.api', 'Showdown']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
    .when('/thailand',
    {
        templateUrl: "/templates/internship.html",
        controller: "InternshipThaiCtrl",
        title: "Internship Places"
    })
    .when('/overseas',
    {
        templateUrl: "/templates/internship.html",
        controller: "InternshipOverseasCtrl",
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
    .when('/edit-place/:id',{
        templateUrl: "/templates/add-place.html",
        controller: "AddPlaceCtrl",
        title: "Edit Place"
    })
    .when('/add-review/:placeid',{
        templateUrl: "/templates/add-review.html",
        controller: "AddReviewCtrl",
        title: "Add Review"
    })
    .when('/edit-review/:placeid/:reviewid',{
        templateUrl: "/templates/add-review.html",
        controller: "AddReviewCtrl",
        title: "Edit Review"
    })
    .when('/add/review/:placeid',{
        template: "<h1>added</h1>",
        controller: "PrintController",
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

app.run(['$location', '$rootScope', 'Login', function($location, $rootScope, Login) {
    $rootScope.$on('$routeChangeStart', function (event, current, previous) {
        console.log("routeChangeStart");
        console.log(current.$$route.originalPath)
        console.log(Login.isLoggedIn)
        if(current.$$route.originalPath == "/edit-review/:placeid/:reviewid" || current.$$route.originalPath == "/add-review/:placeid") {
            if(!Login.isLoggedIn) {
                console.log("LIGIN FIRST")
                event.preventDefault()
                Login.login()
            }
        }
        // alert('armse')
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
        getPlaceThailand: function(){
            var path = 'http://128.199.76.147:8001/api/places/thailand';
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        getPlaceOverseas: function(){
            var path = 'http://128.199.76.147:8001/api/places/overseas';
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        createPlace: function(object){
            var path = 'http://128.199.76.147:8001/api/places';
            return $http.post(path, object).success(function (response) {
                return response.data;
            })
        },
        getPlaceById: function(id) {
            var path = "http://128.199.76.147:8001/api/places/"+id;
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        editPlace: function(id, object) {
            var path = "http://128.199.76.147:8001/api/places/"+id;
            return $http.put(path, object).success(function (response) {
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
        createReview: function(object) {
            var path = "http://128.199.76.147:8001/api/reviews/";
            return $http.post(path, object).success(function (response) {
                return response.data;
            })
        },
        editReview: function(id, object) {
            var path = "http://128.199.76.147:8001/api/reviews/"+id;
            return $http.put(path, object).success(function (response) {
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
        },
        getCountries: function() {
            var path = "http://128.199.76.147:8001/api/countries";
            return $http.get(path).success(function (response) {
                return response.data;
            })
        },
        uploadImage: function(file) {
            var path = "http://128.199.76.147:8001/files";
            console.log(file)
            return $http.post(path, file, {headers: { 'Content-Type': undefined }}).success(function (response) {
                return response.data;
            })
        },
        getStudentById: function(id) {
            var path = "http://128.199.76.147:8001/api/students/" + id ;
            return $http.get(path).success(function (response) {
                return response.data;
            })
        }


    };
});

