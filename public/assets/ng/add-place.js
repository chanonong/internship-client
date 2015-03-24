app.controller('AddPlaceCtrl', [
  '$scope','restService','$routeParams','$location', 'Login',
  function($scope, restService,$routeParams, $location, Login) {
    if($routeParams.id) $scope.state = "EDIT"
    else $scope.state = "ADD"


    $scope.post_re = {
      name: '',
      full_name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      about: '',
      website_url: '',
      file_id: '',
      country_id: ''
    }


    restService.getCountries().then(function(response) {
      $scope.countries = response.data
    })


    $scope.bgImage = {'background-image':''}
    $scope.uploadButtonContent = "Upload Picture (Recommended 1200x900)"
    $scope.isUpload = false
    $scope.files = undefined


    if($scope.state == "ADD") {
      console.log('Add')
    	// $scope.place = {file : ''}
    	
    } else {
      console.log('edit')
      restService.getPlaceById($routeParams.id).then(function(response) {
        var place = response.data
        $scope.post_re.name = place.name
        $scope.post_re.full_name = place.full_name
        $scope.post_re.address = place.address
        $scope.post_re.latitude = place.latitude
        $scope.post_re.longitude = place.longitude
        $scope.post_re.about = place.about
        $scope.post_re.website_url = place.website_url
        $scope.post_re.file_id = place.file_id
        $scope.post_re.country_id = place.country_id
        $scope.bgImage['background-image'] = "url(http://128.199.76.147:8001/" + place.url + ")"
      })
    }
    $scope.Login = Login
  	
  	$scope.processForm = function() {
  		console.log($scope.post_re)
      if($scope.state == "ADD") {
    		restService.createPlace($scope.post_re).then(function(response) {
    			console.log(response.data)
    			$location.path('/places/' + response.data)
    		})
      }
      else {
        restService.editPlace($routeParams.id, $scope.post_re).then(function(response) {
          console.log("HAHAHAHAHHA")
          console.log(response.data)
          $location.path('/places/' + response.data)
        })
      }
  	}

  	$scope.$watch('files', function() {
      if($scope.files && $scope.files.length) {
      	var fd = new FormData();
        fd.append('file',$scope.files[0]);
        $scope.uploadButtonContent = "Uploading..."
        $scope.isUpload = true
      	restService.uploadImage(fd).then(function(response) {
      		$scope.uploadButtonContent = "Upload Picture (Recommended 1200x900)"
      		$scope.isUpload = false
      		$scope.bgImage['background-image'] = "url(http://128.199.76.147:8001/" + response.data.url + ")"
      		$scope.post_re.file_id = response.data.file_id
      	})
      }
   });
  }
])