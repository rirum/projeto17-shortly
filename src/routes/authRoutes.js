import {Router} from "express";
import { cadastrarUsuario, logarUsuario } from "../controllers/authController.js";
//middlewares em breve

const authRoutes = Router();
authRoutes.post("/signup", cadastrarUsuario );
authRoutes.post("/signin", logarUsuario);