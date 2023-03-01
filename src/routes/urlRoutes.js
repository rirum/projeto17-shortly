import {Router} from "express";
import { encurtarLink, pegarLink, redirecionaLink, deletaLink } from "../controllers/urlController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {urlSchema} from "../schemas/urlSchema.js"


const urlRoutes = Router();
urlRoutes.post("/urls/shorten",validateSchema(urlSchema), authValidation, encurtarLink);
urlRoutes.get("/urls/:id", pegarLink);
//verificar link depois
urlRoutes.get("/urls/open/:shortUrl", redirecionaLink);
urlRoutes.delete("/urls/:id",authValidation, deletaLink)

export default urlRoutes