import express, { json } from 'express'
import { configDotenv } from 'dotenv';
import cors from "cors"
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import categoriesRoute from './routes/categories.js';
import multer from 'multer';

const DB_NAME = "blog";
const app = express()
configDotenv()

app.use(json())
mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
    
})
.catch((err) => {
    console.log(err);  
})

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "./images");
    }, filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})


app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoriesRoute);




app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})