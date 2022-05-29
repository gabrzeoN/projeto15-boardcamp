import { Router } from "express";
import { getAllCustomers, getCustomer, postCustomer, updateCustomer } from "../controllers/customersController.js";
import { validNewCustomer, validCustomerExisits } from "../middwares/validCustomerMiddware.js";

const customersRouter = Router();

customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:customerId", validCustomerExisits, getCustomer);
customersRouter.post("/customers", validNewCustomer, postCustomer);
customersRouter.put("/customers/:customerId", validNewCustomer, validCustomerExisits, updateCustomer);

export default customersRouter;