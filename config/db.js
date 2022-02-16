const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database is Connected ...");
}).catch((err)=>{
    console.log("Database Error : ",err);
})


module.exports = mongoose;
