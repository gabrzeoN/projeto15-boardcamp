import { Router } from "express";
import { getAllCustomers, postCustomer } from "../controllers/customersController.js";
import { validCustomer } from "../middwares/validCustomerMiddware.js";

const customersRouter = Router();

customersRouter.get("/customers", getAllCustomers);
customersRouter.post("/customers", validCustomer, postCustomer);

export default customersRouter;