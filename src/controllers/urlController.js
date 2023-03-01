import {db} from "../database/database.js";
import { nanoid } from "nanoid";

//post urls/shorten - rota autenticada

export async function encurtarLink(req,res){
const { url } = req.body;
const session = res.locals.session
const linkEncurtado = nanoid(8);

try{
    
    await db.query ('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, linkEncurtado, session.userId])
    
    let urlId = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [linkEncurtado])
    urlId = urlId.rows[0].id
    
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
    const {id} = req.params
    const session = res.locals.session

    try{
        
        const linkExiste = await db.query('SELECT * FROM urls WHERE id = $1', [id])
        if (linkExiste.rowCount === 0) return res.status(404).send("Esse link não existe")
        if (session.userId !== linkExiste.rows[0].userId) return res.sendStatus(401)

        await db.query('DELETE FROM urls WHERE id = $1', [id]);
        return res.sendStatus(204)
    }catch(error) {
        res.status(500).send(error.message)
    }

    
}