app.controller('AddPlaceCtrl', [
  '$scope','restService','$routeParams','$location',
  function($scope, restService,$routeParams, $location) {
  	$scope.files = undefined
  	$scope.place = {file : ''}
  	$scope.isUpload = false
  	$scope.uploadButtonContent = "Upload Picture (Recommended 1200x900)"
  	$scope.bgImage = {'background-image':''}

  	$scope.post_re = {
      name: '',
      full_name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      about: '',
      website_url: '',
      file_id: ''
    }

  	$scope.processForm = function() {
  		console.log($scope.post_re)
  		restService.createPlace($scope.post_re).then(function(response) {
  			console.log(response.data)
  			$location.path('/places/' + response.data)
  		})
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