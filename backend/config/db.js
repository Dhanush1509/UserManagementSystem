import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const CONNECT_DB=async()=>{
    try{
    await mongoose.connect(
      process.env.DATABASE_URL,
      {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected!!!");
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
export default CONNECT_DB;