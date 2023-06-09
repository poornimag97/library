if(process.env.NODE_ENV!=="prodution"){
    require("dotenv").config()
}
const express=require("express")
const mongoose=require("mongoose")
const blogRouter=require("./routes/blogRouter")
const methodOverride=require("method-override")
let app=express()

//register template engine
app.set("view engine","ejs")



//mongodb connection
  async function db() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Mongodb connected");
}
db()

//inbuilt middleware
app.use(express.urlencoded({extended:false}))

app.use(express.static("public"))
//method override
app.use(methodOverride("_method"))
//route middleware
app.use(blogRouter)



// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

//error page middleware
app.use((req,res)=>{
    res.render("404")
})

app.listen(process.env.PORT,(err)=>{
    if (err) {
      console.log(err);  
    }
    else{
        console.log(`server is running on port ${process.env.PORT}`);
    }
})