import db from "../config/db.js";

export async function getAllCategories(req, res){
    try {
        const result = await db.query(`SELECT * FROM categories;`);
        res.status(200).send(result.rows);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function postCategory(req, res){
    // const {name} = req.body;
}