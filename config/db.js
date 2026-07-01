import {connect} from "mongoose";

const connectDb = async () => {
    try{
        await connect(process.env.MONGO_URI);
        console.log("mongo connected successfully")
    }
    catch (error) {
        console.log("Error connecting to db", error.message);
}
}

export default connectDb;