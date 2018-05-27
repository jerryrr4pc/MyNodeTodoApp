myTodoApp.factory('utilsService', ['$log',function($log) {
	return {
		isToday : function(someDate) {
			var someDateObject;

			if( Object.prototype.toString.call(someDate) === '[object Date]' ){
				someDateObject = someDate.setHours(0,0,0,0);
			}
			else
			{
				someDateObject = new Date(someDate).setHours(0,0,0,0);
			}
			
			var todayDate = new Date().setHours(0,0,0,0);
			return someDateObject == todayDate;	
		}
	}
}]);