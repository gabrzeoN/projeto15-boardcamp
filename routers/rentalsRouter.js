import { Router } from "express";
import { postRental, postRentalReturn, deleteRental } from "../controllers/rentalsController.js";
import { validNewRental, validRentalExisits, validRentalReturn } from "../middwares/validRentalMiddware.js";

const rentalsRouter = Router();

// rentalsRouter.get("/customers", getAllCustomers);
rentalsRouter.post("/rentals", validNewRental, postRental);
rentalsRouter.post("/rentals/:rentalId/return", validRentalExisits, validRentalReturn, postRentalReturn);
rentalsRouter.delete("/rentals/:rentalId", validRentalExisits, validRentalReturn, deleteRental);

export default rentalsRouter;