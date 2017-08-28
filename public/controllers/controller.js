
myApp.controller('AppCtrl',['$scope','$http',
	function($scope,$http){
		console.log('Finally my controller ');

var refresh=function(){
	$http.get('/contactList').then(function(response){
		console.log("I got the requested data");
		$scope.contactList = response.data;
		$scope.contact={};
		});


};
refresh();		


		$scope.addContact=function(){
			console.log("To add "+ $scope.contact);
			$http.post('/contactList',$scope.contact).then(function(response){
				console.log(response);
				refresh();
			});

		};

		$scope.remove=function(id){
			console.log("ID to remove"+id);
			$http.delete('/contactList/'+id).then(function(response){
			console.log("to refresh after delete");
				refresh();
			});
		};

		$scope.edit=function(id){
			console.log("edit id"+id);
			$http.get('/contactList/'+id).then(function(response){
				$scope.contact=response.data;
			});

		};

		$scope.update=function(){
		console.log("update function"+ $scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id, $scope.contact).then(function(response){
		refresh();
	});
		};

		$scope.deselect=function(){
			$scope.contact="";		}

	}]);
	


