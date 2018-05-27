var db=require('../dbconnection');

var Todo={

getAllTasks:function(callback){

return db.query("CALL SP_GET_ALL_TASKS",callback);

},
getTaskById:function(id,callback){

    return db.query("SELECT  * FROM TBTASKS WHERE TASK_ID=?",[id],callback);
},
addTask:function(Task,callback){
   console.log("inside service");
   console.log(Task.Id);
return db.query("CALL SP_SAVE_TODO_TODAY_TASK(?, @newTaskId)",[Task.DESCRIPTION],callback);

},
deleteTask:function(id,callback){
    return db.query("delete from task where Id=?",[id],callback);
},
updateTask:function(id,Task,callback){
    return  db.query("update task set Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
},
markAsCompleted:function(id,callback){
    return  db.query("CALL SP_MARK_TASK_AS_COMPLETED(?)",[id],callback);
},
deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){

       delarr[i]=item[i].Id;
   }
   return db.query("delete from task where Id in (?)",[delarr],callback);
}
};
module.exports=Todo;