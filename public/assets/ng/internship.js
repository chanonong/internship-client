app.controller('InternshipThaiCtrl', [
  '$scope','restService',
  function($scope, restService) {
    restService.getPlaceThailand().then(function(res) {
      var places = res.data
      console.log(places)
      restService.getTag().then(function(resp) {
        var tags = resp.data
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })
  }
])

app.controller('InternshipOverseasCtrl', [
  '$scope','restService',
  function($scope, restService) {

    restService.getPlaceOverseas().then(function(res) {
      var places = res.data
      restService.getTag().then(function(resp) {
        var tags = resp.data
        restService.getAvailableCountry().then(function(countries){
            var ava_countries = countries.data
            var thai = -1;
            for(var i = 0 ; i < ava_countries.length ; ++i) {
              if(ava_countries[i].name == "Thailand")
                thai = i;
            }
            if(thai != -1){
              ava_countries.splice(thai, 1);
            }

            $scope.places_in_thailand = {'places' : places , 'filters': tags , 'ava_countries' : ava_countries}
        })
      })
    })   
  }
])