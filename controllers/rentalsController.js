import dayjs from "dayjs";
import db from "../config/db.js";
import {compareDate} from "./../src/utils.js";

// export async function getAllCustomers(req, res){
//     try{
//         const result = await db.query(`SELECT * FROM customers;`);
//         return res.status(200).send(result.rows);
//     }catch(error){
//         return res.sendStatus(500);
//     }
// }

// export async function getCustomer(req, res){
//     const {customer} = res.locals;
//     return res.status(200).send(customer);
// }

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const {originalPrice} = res.locals;

    const returnDate = null;
    const delayFee = null;
    const rentDate = dayjs().format('YYYY-MM-DD'); // TODO: test me
    try{
        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, daysRented, rentDate, returnDate, originalPrice, delayFee]
        );
        return res.sendStatus(201);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);  
    }
}

export async function postRentalReturn(req, res){
    const {rental} = res.locals;
    const {rentDate, daysRented, originalPrice} = rental;
    const {rentalId} = req.params;

    const pricePerDay = originalPrice / daysRented;
    let delayFee = 0;
    const returnDate = new Date();
    const daysPassed = compareDate(rentDate, returnDate);

    if(daysPassed > daysRented){
        delayFee = ((daysPassed - daysRented) * pricePerDay);
    }

    try{
        await db.query(`
            UPDATE rentals 
            SET "returnDate" = $1, "delayFee" = $2
            WHERE id = $3;`,
            [returnDate, delayFee, rentalId]
        );
        return res.sendStatus(200);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);  
    }
}

export async function deleteRental(req, res){
    const {rentalId} = req.params;
    try{
        await db.query(`
            DELETE FROM rentals 
            WHERE id = $1;`,
            [rentalId]
        );
        return res.sendStatus(200);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);  
    }
}