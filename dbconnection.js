var mysql=require('mysql');
var connection=mysql.createPool({

host:'localhost',
user:'root',
password:'A1r9e8g8',
database:'todoapp'


});
module.exports=connection;