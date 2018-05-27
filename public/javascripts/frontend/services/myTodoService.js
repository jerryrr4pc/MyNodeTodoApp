myTodoApp.factory('myTodoService', ['$http',function($http) {
	return {
		createTask : function(todoData) {
			return $http.post('/todosapi/addtask', todoData);
		},
		deleteTask : function(id) {
			return $http.delete('/todosapi/mark/' + id);
		},
        getTasks: function(){
            return $http.get('/todosapi/gettodos');
        }
	}
}]);