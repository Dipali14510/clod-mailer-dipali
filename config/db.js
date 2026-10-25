import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL)
                console.log(`MongoDB connected`)

    }
    catch (error) {
        console.log(error.message)

    }
}

export default connectDB