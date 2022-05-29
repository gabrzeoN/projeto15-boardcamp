import db from "../config/db.js";

export async function getAllCustomers(req, res){
    try{
        const result = await db.query(`SELECT * FROM customers;`);
        return res.status(200).send(result.rows);
    }catch(error){
        return res.sendStatus(500);
    }
}

export async function getCustomer(req, res){
    const {customer} = res.locals;
    return res.status(200).send(customer);
}

export async function postCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    try{
        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4);`,
            [name, phone, cpf, birthday]
        );
        return res.sendStatus(201);
    }catch(error){
        return res.sendStatus(500);  
    }
}

export async function updateCustomer(req, res){
    const {customerId} = req.params;
    const {name, phone, cpf, birthday} = req.body;
    try{
        await db.query(`
            UPDATE customers 
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5;`,
            [name, phone, cpf, birthday, customerId]
        );
        return res.sendStatus(200);
    }catch(error){
        return res.sendStatus(500);  
    }
}