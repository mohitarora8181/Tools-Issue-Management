import express from "express"
const routes = express.Router();

import {register,login,forgotPassword,resetPassword} from "../controllers/auth.js"

routes.route("/register").post(register);
routes.route("/login").post(login);
routes.route("/forgotpassword").post(forgotPassword);
routes.route("/resetpassowrd:resettoken").put(resetPassword);

export default routes;