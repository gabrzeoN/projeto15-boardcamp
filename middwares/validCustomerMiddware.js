import customerSchema from "./../schemas/customerSchema.js";
import db from "../config/db.js";

export async function validCustomer(req, res, next){
    const {name, phone, cpf, birthday} = req.body;
    console.log(req.body)
    const {error} = customerSchema.validate(req.body);
    if(error){
        return res.status(400).send(error.details.map(detail => detail.message));
    }
    try {
        const resultCustomer = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        const customerExists = resultCustomer.rows[0];
        if(customerExists){
            return res.status(409).send("Customer already exists!");
        }
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}