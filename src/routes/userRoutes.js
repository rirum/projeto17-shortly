import {Router} from "express";
import { perfil, ranking } from "../controllers/userController.js";


const userRoutes = Router();

userRoutes.get("/users/me", perfil);
userRoutes.get("/ranking", ranking);

export default userRoutes;