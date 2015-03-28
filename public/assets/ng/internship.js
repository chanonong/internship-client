app.controller('InternshipThaiCtrl', [
  '$scope','restService',
  function($scope, restService) {
    $scope.isThai = true
    $scope.filter = {}
    restService.getPlaceThailand().then(function(res) {
      var places = res.data
      console.log(places)
      restService.getTag().then(function(resp) {
        var tags = resp.data
        for(var i = 0; i < tags.length; i++) {
          $scope.filter[tags[i].id] = []
          for(var j = 0; j < tags[i].tags.length; j++) {
            $scope.filter[tags[i].id].push(tags[i].tags[j].id)
          }
        }
        $scope.places_in_thailand = {'places' : places , 'filters': tags}
      })
    })

    $scope.filterplace = function(place) {
      // console.log('filtering')
      // console.log(place)
      // for(var i = 0; i < place.tags.length; i++) {
      //   if($scope.filter.indexOf(place.tags[i].tag_id) != -1) {
      //     return true
      //   }
      // }
      // return false
      var place_tags = []
      for(var i = 0; i < place.tags.length; i++) {
        var cata_exist = false
        var cata_index = -1
        var tag = place.tags[i]
        for(var j = 0; j < place_tags.length; j++) {
          if(tag.tag_category_id == place_tags[j].tag_category_id) {
            cata_exist = true
            cata_index = j
            break
          }
        }

        if(cata_exist) {
          place_tags[cata_index].tags.push(tag.tag_id)
        } else {
          place_tags.push({'tag_category_id': tag.tag_category_id, 'tags': [tag.tag_id]})
        }
      }

      for(var i = 0; i < place_tags.length; i++) {
        var isPass = false
        for(var j = 0; j < place_tags[i].tags.length; j++) {
          // console.log($scope.filter[place_tags[i].tag_category_id])
          if($scope.filter[place_tags[i].tag_category_id].indexOf(place_tags[i].tags[j]) != -1) {
            isPass = true
            break
          }
        }
        if(!isPass) {
          return false
        }
      }

      return true


    }

    $scope.filtercheck = function(val, option) {
      var index = $scope.filter[option.tag_category_id].indexOf(option.id)
      if(val) {
        if(index == -1) {
          $scope.filter[option.tag_category_id].push(option.id)
        }
      } else {
        if(index != -1) {
          $scope.filter[option.tag_category_id].splice(index,1)
        }
      }
    }
  }
])

app.controller('InternshipOverseasCtrl', [
  '$scope','restService',
  function($scope, restService) {
    $scope.isThai = false
    $scope.filter = {}

    restService.getPlaceOverseas().then(function(res) {
      var places = res.data
      restService.getTag().then(function(resp) {
        var tags = resp.data
        for(var i = 0; i < tags.length; i++) {
          $scope.filter[tags[i].id] = []
          for(var j = 0; j < tags[i].tags.length; j++) {
            $scope.filter[tags[i].id].push(tags[i].tags[j].id)
          }
        }
        restService.getAvailableCountry().then(function(countries){
            var ava_countries = countries.data
            var thai = -1;
            $scope.filter['countries'] = []
            for(var i = 0 ; i < ava_countries.length ; ++i) {
              if(ava_countries[i].name == "Thailand") {
                thai = i;
              } else {
                $scope.filter['countries'].push(ava_countries[i].name)
              }
            }
            if(thai != -1){
              ava_countries.splice(thai, 1);
            }


            $scope.places_in_thailand = {'places' : places , 'filters': tags , 'ava_countries' : ava_countries}
        })
      })
    })

    $scope.filterplace = function(place) {
      // console.log('Filter')
      // console.log(place)
      var place_tags = []
      for(var i = 0; i < place.tags.length; i++) {
        var cata_exist = false
        var cata_index = -1
        var tag = place.tags[i]
        for(var j = 0; j < place_tags.length; j++) {
          if(tag.tag_category_id == place_tags[j].tag_category_id) {
            cata_exist = true
            cata_index = j
            break
          }
        }

        if(cata_exist) {
          place_tags[cata_index].tags.push(tag.tag_id)
        } else {
          place_tags.push({'tag_category_id': tag.tag_category_id, 'tags': [tag.tag_id]})
        }
      }
      // console.log(place_tags)
      for(var i = 0; i < place_tags.length; i++) {
        var isPass = false
        for(var j = 0; j < place_tags[i].tags.length; j++) {
          // console.log($scope.filter[place_tags[i].tag_category_id])
          if($scope.filter[place_tags[i].tag_category_id].indexOf(place_tags[i].tags[j]) != -1) {
            isPass = true
            break
          }
        }
        if(!isPass) {
          return false
        }
      }

      if($scope.filter['countries'].indexOf(place.country_name) == -1) {
        return false
      }
      return true
    }

    $scope.filtercheck = function(val, option) {
      // console.log($scope.filter)
      var index = $scope.filter[option.tag_category_id].indexOf(option.id)
      if(val) {
        if(index == -1) {
          $scope.filter[option.tag_category_id].push(option.id)
        }
      } else {
        if(index != -1) {
          $scope.filter[option.tag_category_id].splice(index,1)
        }
      }
    }

    $scope.filtercountry = function(val, option) {
      var index = $scope.filter['countries'].indexOf(option.name)
      if(val) {
        if(index == -1) {
          $scope.filter['countries'].push(option.name)
        }
      } else {
        if(index != -1) {
          $scope.filter['countries'].splice(index,1)
        }
      }
    }

  }
])