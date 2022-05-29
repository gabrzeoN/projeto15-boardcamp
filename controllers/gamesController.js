import db from "../config/db.js";

export async function getAllGames(req, res){
    let {name} = req.query;
    try{
        let result = null;
        if(name){
            name = name.toLowerCase();
            result = await db.query(`
                SELECT games.*, categories.name as "categoryName" FROM games
                JOIN categories ON categories.id = games."categoryId"
                WHERE (lower(games.name) LIKE '%${name}%');`
            );
        }else{
            result = await db.query(`
                SELECT games.*, categories.name as "categoryName" FROM games
                JOIN categories ON categories.id = games."categoryId";`
            );
        }
        res.status(200).send(result.rows);
    }catch(error){
        res.sendStatus(500);
    }
}

export async function postGame(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try{
        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5);`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);  
    }
}