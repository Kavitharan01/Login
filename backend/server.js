const express=require("express");
const mysql=require('mysql');
const cors=require('cors');


const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"details"
})

app.get("/", (req, res)=>{
    const sql="select * from signup";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    });
});



app.post('/',(req,res)=>{
    const sql="INSERT INTO signup(`firstName`,`lastName`,`NIC`,`address`,`phoneNo`,`gender`,`email`,`profession`,`country`,`education`) VALUES(?)";
    const values=[
        req.body.firstName,
        req.body.lastName,
        req.body.NIC,
        req.body.address,
        req.body.phoneNo,
        req.body.gender,
        req.body.email,
        req.body.profession,
        req.body.country,
        req.body.education

    ]
    db.query(sql,[values],(err,data)=>{
        if(err)  return res.json("Error");
        return res.json(data);
    })
})

app.listen(8001,()=>{
    console.log("running");
})