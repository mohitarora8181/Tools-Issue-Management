import express from "express"
import { protectRoute } from "../controllers/protect.js";
export const route = express.Router();
import {protect} from "../middlewares/auth.js"

route.route("/").get(protect,protectRoute);

