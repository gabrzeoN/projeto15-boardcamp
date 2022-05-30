import dayjs from "dayjs";
import db from "../config/db.js";
import {compareDate} from "./../src/utils.js";

export async function getAllRentals(req, res){
    let {customerId, gameId} = req.query;
    try{
        let resultRental = null;
        if(customerId){
            resultRental = await db.query(`
                SELECT 
                    rentals.*,
                    customers.id as "customerId",
                    customers.name as "customerName",
                    games.name as "gameName",
                    games."categoryId",
                    categories.name as "categoryName"
                FROM rentals
                JOIN customers ON rentals."customerId" = customers.id
                JOIN games ON rentals."gameId" = games.id
                JOIN categories ON games."categoryId" = categories.id
                WHERE "customerId" = $1;`,
                [customerId]
            );
        }else if(gameId){
            resultRental = await db.query(`
                SELECT 
                    rentals.*,
                    customers.id as "customerId",
                    customers.name as "customerName",
                    games.name as "gameName",
                    games."categoryId",
                    categories.name as "categoryName"
                FROM rentals
                JOIN customers ON rentals."customerId" = customers.id
                JOIN games ON rentals."gameId" = games.id
                JOIN categories ON games."categoryId" = categories.id
                WHERE "gameId" = $1;`,
                [gameId]
            );
        }else{
            resultRental = await db.query(`
                SELECT 
                    rentals.*,
                    customers.id as "customerId",
                    customers.name as "customerName",
                    games.name as "gameName",
                    games."categoryId",
                    categories.name as "categoryName"
                FROM rentals
                JOIN customers ON rentals."customerId" = customers.id
                JOIN games ON rentals."gameId" = games.id
                JOIN categories ON games."categoryId" = categories.id;`
            );
        }
        const allRentals = resultRental.rows;
        if(!allRentals) return res.status(200).send(allRentals);

        const allRentalsFormatted = [];
        for(let i = 0; i < allRentals.length; i++){
            const rental = {
                id: allRentals[i].id,
                customerId: allRentals[i].customerId,
                gameId: allRentals[i].gameId,
                rentDate: allRentals[i].rentDate,
                daysRented: allRentals[i].daysRented,
                returnDate: allRentals[i].returnDate,
                originalPrice: allRentals[i].originalPrice,
                delayFee: allRentals[i].delayFee,
                customer: {
                    id: allRentals[i].customerId,
                    name: allRentals[i].customerName
                },
                game: {
                    id: allRentals[i].gameId,
                    name: allRentals[i].gameName,
                    categoryId: allRentals[i].categoryId,
                    categoryName: allRentals[i].categoryName
                }
            };
            allRentalsFormatted.push(rental);
        }
        return res.status(200).send(allRentalsFormatted);
    }catch(error){
        console.log(error)
        return res.sendStatus(500);
    }
}

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const {originalPrice} = res.locals;

    const returnDate = null;
    const delayFee = null;
    const rentDate = dayjs().format('YYYY-MM-DD');
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