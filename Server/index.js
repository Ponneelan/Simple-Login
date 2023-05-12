const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

let connection = mysql.createConnection({
    host: process.env.HOST_NAME,
    port: process.env.PORT,
    user: process.env.USER_NAME || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE_NAME || ''
});
connection.connect();

app.use(express.json());
app.use(cors({
    origin :'*',
    methods: ['POST','PUT']
}));

app.post('/login',(req,res)=>{
    let sql = 'select username, password from users where username = ? and password = ?';
    const  {userName,passWord} = req.body;
    console.log(userName,passWord);
    connection.query(sql,[userName,passWord],(error,result)=>{
        if(error){
            console.log('Error',error);
        }else{
            console.log(result);
            if(result.length > 0){
                let response = {code:true,message:'Login successfuly'};
                res.json(response);
            }else{
                let response = {code:false,message:"No user Found"};
                res.json(response);
            }
        }
    })

})

app.listen(3000,()=>{
    console.log('app running on port 3000');
})
