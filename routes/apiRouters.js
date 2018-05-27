var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//ESTABLISHING CONNECTION TO DATABASE
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A1r9e8g8",
    database:"todoapp"
});

/**********GET ALL TODO TASKS**************/
router.get('/gettodos', function(req, res, next){
    
    //ESTABLISHING CONNECTION TO DATABASE
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "A1r9e8g8",
        database:"todoapp"
    });
    
    con.connect(function(err) {
      if (err) throw err;
        // SENDING QUERY TO DB
        con.query("CALL SP_GET_TODAY_TASKS", function (err, result, fields) {
            if (err) throw err;
            res.json(result[0]);
        });
    });
});

/********** MARK TASK AS COMPLETED **************/
router.delete('/mark/:taskID', function(req, res, next){
    console.log("marking as completed..");
    
    //ESTABLISHING CONNECTION TO DATABASE
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "A1r9e8g8",
        database:"todoapp"
    });
    
    con.connect(function(err) {
      if (err) throw err;
        // SENDING QUERY TO DB
        var queryToBeSent = "CALL SP_MARK_TASK_AS_COMPLETED(" +  req.params.taskID + ")";
        console.log("marking as completed: " + queryToBeSent);
        con.query(queryToBeSent, function (err, result, fields) {
            if (err) throw err;
            res.json({"isSuccessfull":true, message:"marked as completed"});
        });
    });
});

/****************** STORE NEW TODO RECORD *********************/
router.post('/addtask', function(req, res, next){
    console.log("adding new todo, body:...");
    console.log(req.body);
    
    //ESTABLISHING CONNECTION TO DATABASE
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "A1r9e8g8",
        database:"todoapp"
    });
    
    con.connect(function(err) {
      if (err) throw err;
        // SENDING QUERY TO DB
        var queryToBeSent = "CALL SP_SAVE_TODO_TODAY_TASK('" +  req.body.DESCRIPTION + "', @newTaskId)";
        console.log("QUERY TO BE SENT TO ADD: " + queryToBeSent);
        con.query(queryToBeSent, function (err, result, fields) {
            if (err) throw err;
            
            res.json({"isSuccessfull":true, message:"new task added!", TASK_ID:result[0][0].NEXT_TASK_ID});
        });
    });
});


module.exports = router;