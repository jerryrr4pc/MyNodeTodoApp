var express = require('express');
var router = express.Router();
var Todo=require('../models/Todo');

//*********  GET ALL TASKS OR GET TASK BY ID
router.get('/gettodos/:id?',function(req,res,next){

if(req.params.id){ //get a specific task

    Todo.getTaskById(req.params.id,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}
else{ //get all tasks

     Todo.getAllTasks(function(err,rows){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows[0]);//rows brings a MySQL complex object having resultset in 0 positition.
            }
     
        });
    }
});

router.post('/',function(req,res,next){

        Todo.addTask(req.body,function(err,count){

            //console.log(req.body);
            if(err)
            {
                res.json(err);
            }
            else{
                    res.json(req.body);//or return count for 1 & 0
            }
        });
});

 router.post('/:id',function(req,res,next){
  Todo.deleteAll(req.body,function(err,count){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(count);
    }
  });
});


router.delete('/mark/:id',function(req,res,next){

        Todo.markAsCompleted(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json({"isSuccessfull":true, message:"marked as completed"});
            }

        });
});

router.put('/:id',function(req,res,next){

    Todo.updateTask(req.params.id,req.body,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
module.exports=router;