app.controller('InternshipThaiCtrl', [
  '$scope','restService',
  function($scope, restService) {
    $scope.filter = []
    restService.getPlaceThailand().then(function(res) {
      var places = res.data
      console.log(places)
      restService.getTag().then(function(resp) {
        var tags = resp.data
        for(var i = 0; i < tags.length; i++) {
          for(var j = 0; j < tags[i].tags.length; j++) {
            $scope.filter.push(tags[i].tags[j].id)
          }
        }
        console.log('tags')
        console.log(tags)
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })

    $scope.filterplace = function(place) {
      console.log('filtering')
      console.log(place)
      for(var i = 0; i < place.tags.length; i++) {
        if($scope.filter.indexOf(place.tags[i].tag_id) == -1) {
          return false
        }
      }
      return true
    }

    $scope.filtercheck = function(val, option) {
      var index = $scope.filter.indexOf(option.id)

      if(val) {
        if(index == -1) {
          $scope.filter.push(option.id)
        }
      } else {
        if(index != -1) {
          $scope.filter.splice(index,1)
        }
      }
    }
  }
])

app.controller('InternshipOverseasCtrl', [
  '$scope','restService',
  function($scope, restService) {

    restService.getPlaceOverseas().then(function(res) {
      var places = res.data
      restService.getTag().then(function(resp) {
        var tags = resp.data
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })
  }
])