import {Router} from "express";
import { perfil, ranking } from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.js";

const userRoutes = Router();

userRoutes.get("/users/me", authValidation, perfil);
userRoutes.get("/ranking", ranking);

export default userRoutes;