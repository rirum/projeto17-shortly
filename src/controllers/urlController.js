import {db} from "../database/database.js";
import { nanoid } from "nanoid";

//post urls/shorten - rota autenticada

export async function encurtarLink(req,res){
const { url } = req.body;
const session = res.locals.session
const linkEncurtado = nanoid(8);

try{
    
    // const id = await db.query('SELECT * FROM sessions WHERE token = $1', [session])
    // const userId = id.rows[0].userId
   
    await db.query ('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, linkEncurtado, session.userId])
    console.log("passou")
    let urlId = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [linkEncurtado])
    urlId = urlId.rows[0].id
    console.log("passou2")
    return res.status(201).send({
        id: urlId,
        shortUrl: linkEncurtado
    })
} catch(error){
    res.status(500).send(error.message)
}

}

//get urls/id - rota NAO autenticada

export async function pegarLink(req, res){

}

//get urls/open/:shortUrl - rota nao autenticada

export async function redirecionaLink(req,res){

}

//delete urls/:id - rota autenticada

export async function deletaLink(req,res){
    
}