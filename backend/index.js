import express from "express"
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
import routes from "./routes/auth.js";
import connectDB from "./config/database.js";
import {errorHandles} from "./middlewares/error.js"
import { route } from "./routes/protect.js";
import toolRoute from "./routes/tools.js";


config();
connectDB();

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors());

app.use("/api/auth",routes)
app.use("/api/protect",route)
app.use("/api/tools",toolRoute)

app.use(errorHandles);

app.listen(process.env.PORT || 4000,()=>{
    console.log("Session Starts");
})