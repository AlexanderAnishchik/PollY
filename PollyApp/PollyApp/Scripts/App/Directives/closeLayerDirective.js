PollyApp.directive('closeLayer', function () {

	return {
		template: '<div style="background-color: transparent; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index:20;"></div>',
		restrict: 'EA',
		scope: false,
		link: function (scope, element, attrs) {
			console.log(element);

			//add event handler to close
			element[0].onclick = function () {
				scope.$apply(function () {
					scope.$parent[attrs.handlerName]();
				});
				
			};

			//add watcher on specific property in specific object in parent scope
			scope.$parent.$watch(attrs.setting + "." + attrs.propName, function (newSett) {
				if (newSett == true) {
					element[0].style.display = 'block';
				}
				if (newSett == false) {
					element[0].style.display = 'none';
				}
			});

		}
	}
});