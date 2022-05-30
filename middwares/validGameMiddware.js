import gameSchema from "./../schemas/gameSchema.js";
import db from "../config/db.js";

export async function validGame(req, res, next){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    const {error} = gameSchema.validate(req.body);
    if(error){
        return res.status(400).send(error.details.map(detail => detail.message));
    }
    try {
        const result = await db.query(`SELECT * FROM categories WHERE id = $1;`, [categoryId]);
        const categoryExists = result.rows[0];
        if(!categoryExists){
            return res.status(400).send("Category doesn't exists!");
        }

        const resultGame = await db.query(`SELECT * FROM games WHERE name = $1;`, [name]);
        const gameExists = resultGame.rows[0];
        if(gameExists){
            return res.status(409).send("Game already exists!");
        }
        
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}