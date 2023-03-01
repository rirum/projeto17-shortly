import {db} from "../database/database.js";


///users/me - rota autenticada

export async function perfil(req,res){
const session = res.locals.session
console.log(session)
try {
    const resultado = await db.query(
        `SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount",
            json_agg(
                json_build_object(
                    'id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")
                    ) AS "shortenedUrl"
                FROM users
                JOIN urls ON users.id = urls."userId"
                WHERE users.id = $1
                GROUP BY users.id;`, [session.userId]
        );

    const err = resultado.rowCount === 0;
    if (err) return res.status(404).send("Não existe URL");

   res.status(200).send(resultado.rows[0]);
}catch(error) {
    res.status(500).send(error.message)
}
}

//ranking - rota NAO autenticada

export async function ranking(req,res){

}