//DEFINING A CONTROLLER FOR MY LIST OF TASKS
myTodoApp.controller('todoMainController', ['$scope','$log','myTodoService','utilsService', function($scope, $log, myTodoService,utilsService) {
    
    $scope.todoForm = {};
    $scope.todoForm.isForTomorrowFlag = 0;

    myTodoService.getTasks().then(function(response){
      $scope.todoList = response.data;
    });
    
    //FUNCTION TO MARK CURRENT TASK AS COMPLETED!
    $scope.markTodoAsCompleted = function(todoID){
       myTodoService.deleteTask(todoID).then(function(response){

       		if(response.data.isSuccessfull)
       		{
       			$scope.deleteTaskFromList(todoID);
       		}

       });
    };

    //FUNCTION TO ADD NEW TASK
    $scope.addNewTask = function(){
    	$log.info("saving todo!: " + $scope.todoForm.DESCRIPTION);

    	myTodoService.createTask($scope.todoForm).then(function(response){
    		
    		$log.info("response object from backend:");
    		$log.info( response.data );
    		if(response.data.isSuccessfull)
    		{
    			$log.info("adding successfull..");
    			$scope.todoList.push( {TASK_ID:response.data.TASK_ID, DESCRIPTION: $scope.todoForm.DESCRIPTION} );
    			$scope.todoForm.DESCRIPTION="";
    		}

    	});

    };

    $scope.setIsForTomorrowFlag = function(isForTomorrowFlag){
    	$log.info("setting flag: " + isForTomorrowFlag);
    	$scope.todoForm.isForTomorrowFlag = isForTomorrowFlag;

    };

    $scope.getTextBoxPlaceholder = function(){
    	$log.info("getting placeholder...");
    	if($scope.todoForm.isForTomorrowFlag == 0)
    	{
    		return "What do you want to achieve for today?";
    	}
    	else
    	{
    		return "What do you want to achieve for tomorrow?";
    	}
    };

    //FILTER OUT SUCCESSFULLY DELETED TODO FROM UI LIST
    $scope.deleteTaskFromList = function(TASKID){

    	$scope.todoList = $scope.todoList.filter(function(currentValue){
    		return (currentValue.TASK_ID != TASKID);
    	});

    };

    $scope.editTodo = function(TASK){
        //Set task description to field
        $log.info(TASK);
        //set date from task to the datepicker
        $scope.todoForm.DESCRIPTION = TASK.DESCRIPTION;
        $scope.DATE_TAG = TASK.DATE_TAG;

        
        /*if( utilsService.isToday(TASK.DATE_AIM) )
        {
    
        }
        else if( false )
        {
            
        }
        else
        {
            
        }*/
        

    };

    $scope.deleteTodo = function(){

    };
    
}]);