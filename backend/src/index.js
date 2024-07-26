import connectDB from "./db/index.js";
import app from './app.js'
import dotenv from 'dotenv'

dotenv.config();

connectDB()
.then( () => {
    const port = process.env.PORT || 8080
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
})
.catch((err) =>{
        console.log("Mongo Db Conection Failed !!!",err)
})