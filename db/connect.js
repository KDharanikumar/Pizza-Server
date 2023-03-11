const mongoose=require("mongoose");



db=async()=>{
    try {
       const res=await mongoose.connect(process.env.MONGO_URL ,{ useNewUrlParser: true, useUnifiedTopology: true });
       console.log("connection is established");
    //    console.log(res);
}
        
     catch (error) {

        console.log('Error',error);
        
    }
}
    

module.exports=db;