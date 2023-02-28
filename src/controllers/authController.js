import {db} from "../database/database.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

//post sign-up - rota NAO autenticada

export async function cadastrarUsuario(req,res){
const {name, email, password} = req.body;
try{
    const usuario = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (usuario.rowCount > 0)
    return res.status(409).send("Esse email já existe");

    const passwordHashed = bcrypt.hashSync(password, 10);

    const resultado = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, passwordHashed]);
    if (resultado.rowCount === 0){
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
} catch(error){
    res.status(500).send(error.message)
}
}

//post sign-in - rota NAO autenticada

export async function logarUsuario(req,res){
 const { email, password } = req.body;
 const token = uuid();


    try {
        
        const logged = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (logged.rowCount === 0 ) return res.status(401).send("Usuário ou senha incorretos")
       

        const compararSenha = bcrypt.compareSync(password, logged.rows[0].password)
        console.log(logged.rows[0].password)
        if (!compararSenha) return res.status(401).send("Usuário ou senha incorretos")

        const tokenOk = await db.query('SELECT * FROM sessions WHERE "userId" = $1', [logged.rows[0].id])
        if (tokenOk.rowCount > 0) {
            await db.query('UPDATE sessions SET token = $1 WHERE "userId" = $2', [token, logged.rows[0].id])
        } else {
            await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [logged.rows[0].id, token])
        } res.status(200).send({token})
        

    }catch(error){
        res.status(500).send(error.message)
    }
}

