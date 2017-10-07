angular.module('itemController', [])

	// inject the Item service factory into controller
	.controller('mainController', ['$scope','$http','Items', function($scope, $http, Items) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all items and show them
		// use the service to get all the items
		Items.get()
			.success(function(data) {
				$scope.items = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createItem = function() {

			// validating the formData
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined && $scope.formData.name != undefined) {
				$scope.loading = true;

				// create function from service (returns a promise object)
				Items.create($scope.formData)

					// if successful creation, call get function to get all the new items
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so user is ready to enter another
						$scope.items = data; // assign new list of items
					});
			}
		};

		// DELETE ==================================================================
		// delete an item after checking it
		$scope.deleteItem = function(id) {
			$scope.loading = true;

			Items.delete(id)
				// if successful creation, call get function to get all the new items
				.success(function(data) {
					$scope.loading = false;
					$scope.items = data; // assign new list of items
				});
		};
	}]);