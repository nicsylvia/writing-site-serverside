import { Router } from "express";
import { AdminandUserLogin, RegisterUsers, GetEverybody } from "../Controllers/AdminController";

const adminroutes = Router();

adminroutes.route("/registerusers").post(RegisterUsers);
adminroutes.route("/admin-login").post(AdminandUserLogin);
adminroutes.route("/getallusers").get(GetEverybody);

export default adminroutes