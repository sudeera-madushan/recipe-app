import mongoose from "mongoose";

export async function connect() {
   try {   
       mongoose.connect(process.env.DATABASE_URI!)   
       const connection = mongoose.connection;

       // on connected database
       connection.on('connected', () => {
           console.log('MongoDB connected successfully')
       })

       // on database connection error
       connection.on('error', (err: any) => {
           console.log('MongoDB connection error', err)
           process.exit()
       })
   } catch (error) {
       console.log('dbConnect', error)
   }
   
}