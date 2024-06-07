//  libraries
const express =  require("express")
const cors  = require("cors")
const mysql = require("mysql")
const port = 5225

const app = express()

app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
    host:"localhost",
    database:"fakedata",
    user:"root",
    password:""    
})


db.connect(function(err){
    if(err){
        console.log("error" , err)
    }else{
        console.log("connected to database")
    }
})


app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});

//post

app.post("/post",(req,res)=>{
    const {id , name , address , age} = req.body
    const query="INSERT INTO `fake`(`id`, `name`, `address`, `age`) VALUES (?,?,?,?)"
    db.query(query,[id,name,address,age],(err,data)=>{
        if(err){
            res.send("error",err)
        }else{
            res.send(data)
        }
    })
})

//select

app.get("/fake/:id" , (req,res)=>{
    const id = req.params.id
    const query = "SELECT * FROM `fake` WHERE `id` = ? "
    db.query(query,id,(err,data)=>{
        if(err){
            res.send("err" , err)
        }else{
            res.send(data)
        }
    })
    })


//update

app.put("/fake/update/:id", (req, res) => {
    const id = req.params.id;
    const { name, address, age } = req.body;
    
    const query = "UPDATE `fake` SET `name` = ?, `address` = ?, `age` = ? WHERE `id` = ?";
    db.query(query, [name, address, age, id], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});



//delete

app.delete("/fake/delete/:id",(req,res)=>{
    const id = req.params.id
    const query = "DELETE FROM `fake` WHERE `id` = ?"
    db.query(query,[id],(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})

//listenning of the server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

