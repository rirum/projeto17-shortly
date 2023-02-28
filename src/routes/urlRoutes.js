import {Router} from "express";
import { encurtarLink, pegarLink, redirecionaLink, deletaLink } from "../controllers/urlController.js";


const urlRoutes = Router();
urlRoutes.post("/urls/shorten", encurtarLink);
urlRoutes.get("/urls/:id", pegarLink);
//verificar link depois
urlRoutes.get("/urls/open/:shortUrl", redirecionaLink);
urlRoutes.delete("/urls/:id", deletaLink)

export default urlRoutes