import rentalSchema from "./../schemas/rentalSchema.js";
import db from "../config/db.js";

export async function validNewRental(req, res, next){
    const {customerId, gameId, daysRented} = req.body;
    const {error} = rentalSchema.validate(req.body);
    if(error){
        return res.status(400).send(error.details.map(detail => detail.message));
    }
    try {
        const resultGame = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        const gameExists = resultGame.rows[0];
        if(!gameExists){
            return res.status(400).send("Game doesn't exist!");
        }

        const resultCustomer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        const customerExists = resultCustomer.rows[0];
        if(!customerExists){
            return res.status(400).send("Customer doesn't exists!");
        }

        const resultRental = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1;`, [gameId]);
        if(resultRental.rows.length >= gameExists.stockTotal){
            return res.status(400).send("There is no copy left of this game in stock!");
        }
        res.locals.originalPrice = (gameExists.pricePerDay * daysRented);
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function validRentalExisits(req, res, next){
    const {customerId} = req.params;
    try {
        const resultCustomer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        const customerExists = resultCustomer.rows[0];
        if(!customerExists){
            return res.status(404).send("Customer doesn't exists!");
        }
        res.locals.customer = customerExists;
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}