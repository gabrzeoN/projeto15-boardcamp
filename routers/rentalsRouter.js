import { Router } from "express";
import { getAllRentals, postRental, postRentalReturn, deleteRental } from "../controllers/rentalsController.js";
import { validNewRental, validRentalExisits, validRentalReturn } from "../middwares/validRentalMiddware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getAllRentals);
rentalsRouter.post("/rentals", validNewRental, postRental);
rentalsRouter.post("/rentals/:rentalId/return", validRentalExisits, validRentalReturn, postRentalReturn);
rentalsRouter.delete("/rentals/:rentalId", validRentalExisits, validRentalReturn, deleteRental);

export default rentalsRouter;