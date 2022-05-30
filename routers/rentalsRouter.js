import { Router } from "express";
import { postRental } from "../controllers/rentalsController.js";
import { validNewRental, validRentalExisits } from "../middwares/validRentalMiddware.js";

const rentalsRouter = Router();

// rentalsRouter.get("/customers", getAllCustomers);
// rentalsRouter.get("/customers/:customerId", validCustomerExisits, getCustomer);
rentalsRouter.post("/rentals", validNewRental, postRental);
// rentalsRouter.put("/customers/:customerId", validNewCustomer, validCustomerExisits, updateCustomer);

export default rentalsRouter;