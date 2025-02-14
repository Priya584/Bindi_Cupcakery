import mongoose from 'mongoose'

const connectToDB = async () => {
    const connectionURL = "mongodb+srv://priyabhanderi2:6353482450@cluster0.lb5dp.mongodb.net/Menu?retryWrites=true&w=majority&appName=Cluster0"

    mongoose.connect(connectionURL).then(()=>{
        console.log("Database is successfully connected");
    }).catch((err)=>{console.log("No connection")})
    
    }
export default connectToDB;

