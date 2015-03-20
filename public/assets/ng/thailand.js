app.controller('ThailandCtrl', [
  '$scope','restService',
  function($scope, restService) {

    restService.getPlace().then(function(res) {
      console.log(res.data)
    })
    // var obj = {}
    // restService.getPlace().then(function(res) {
    //   restServe
    // })
    // $http.get("http://128.199.76.147:8001/api/places")
    // .success(function(response) {
    //   var places = response;
    //   $http.get("http://128.199.76.147:8001/api/tags")
    //   .success(function(response) {
    //     var tags = response;
    //     places.forEach(function(place) {
    //       var cat = [];
    //     })
    //     obj = { 'places' : places , 'filters' : tags }  
    //     $scope.places_in_thailand = obj;
    //   });
    // })
  }
])