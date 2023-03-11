const express=require("express");
require("dotenv").config()
const db=require("./db/connect");
const cors=require("cors")
const userRouter=require("./router/userRouter")
const productRouter=require("./router/productRouter")
const app=express();
app.use(express.json());
// connection
db();
app.use(cors())
//Middleware
// app.use("/api",userRouter);
// app.use("/api",productRouter);
console.log(process.env.PORT)
const port= process.env.PORT;


app.get('/', (req, res) => {
    res.send('Welcome to my pizza server!');
})

app.use("/products", productRouter);
app.use("/users", userRouter);


app.listen(port,()=>{
    console.log(`App is Running http://localhost:${port}`);
});