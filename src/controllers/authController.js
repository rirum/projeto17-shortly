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
//  const { userId, token} = res.locals.session;

    try {
        
        const logged = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (logged.rowCount === 0 ) return res.status(401).send("Usuário ou senha incorretos")
        logged = logged.rows[0]
        const userId = logged.id

        const compararSenha = bcrypt.compareSync(password, logged.password)
        console.log(logged.password)
        if (!compararSenha) return res.status(401).send("Usuário ou senha incorretos")

        const token = uuid();

        // if(logged.rowCount !== 0) {
        //     await db.query('UPDATE sessions SET token =$1 WHERE "userId"=$2', [token, userId])
        //     return res.send({tkn});
        // }
        
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [userId, token]);
        const tokenUser = {token}
        res.status(200).send(tokenUser);
    }catch(error){
        res.status(500).send(error.message)
    }
}

