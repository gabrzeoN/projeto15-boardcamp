import categorySchema from "./../schemas/categorySchema.js";
import db from "../config/db.js";

export async function validCatName(req, res, next){
    const {name} = req.body;

    const {error} = categorySchema.validate({name});
    if(error){
        return res.status(400).send(error.details.map(detail => detail.message));
    }

    try {
        const result = await db.query(`SELECT * FROM categories WHERE name = $1;`, [name]);
        const categoryExists = result.rows[0];

        if(categoryExists){
            return res.status(409).send("Category already exists!");
        }
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}