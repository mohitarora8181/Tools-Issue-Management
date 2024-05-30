import express from "express"
const toolRoute = express.Router();

import {addTool, changeStatus, deleteTool, getAllTools, getPreviousIssues, getSingle, issueTool} from "../controllers/tools.js";

toolRoute.route("/single").post(getSingle);
toolRoute.route("/issue").post(issueTool);
toolRoute.route("/getissues").get(getPreviousIssues);
toolRoute.route("/all").get(getAllTools);
toolRoute.route("/add").post(addTool);
toolRoute.route("/").delete(deleteTool);
toolRoute.route("/").put(changeStatus);

export default toolRoute;