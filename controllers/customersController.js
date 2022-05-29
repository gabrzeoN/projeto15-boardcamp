import db from "../config/db.js";

export async function getAllCustomers(req, res){
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

export async function postCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    try{
        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4);`,
            [name, phone, cpf, birthday]
        );
        res.sendStatus(201);
    }catch(error){
        res.sendStatus(500);  
    }
}