import {Router} from "express";
import { cadastrarUsuario, logarUsuario } from "../controllers/authController.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/userSchema.js";

const authRoutes = Router();
authRoutes.post("/signup", validateSchema(userSchema), cadastrarUsuario);
authRoutes.post("/signin",validateSchema(loginSchema), logarUsuario);

export default authRoutes;