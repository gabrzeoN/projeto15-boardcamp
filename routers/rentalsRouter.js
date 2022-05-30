import { Router } from "express";
import { postRental, postRentalReturn } from "../controllers/rentalsController.js";
import { validNewRental, validRentalExisits, validRentalReturn } from "../middwares/validRentalMiddware.js";

const rentalsRouter = Router();

// rentalsRouter.get("/customers", getAllCustomers);
// rentalsRouter.get("/customers/:customerId", validCustomerExisits, getCustomer);
rentalsRouter.post("/rentals", validNewRental, postRental);
rentalsRouter.post("/rentals/:rentalId/return", validRentalExisits, validRentalReturn, postRentalReturn);

export default rentalsRouter;