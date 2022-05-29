import { Router } from "express";
import { getAllCustomers, getCustomer, postCustomer, updateCustomer } from "../controllers/customersController.js";
import { validNewCustomer, validUpdateCustomer } from "../middwares/validCustomerMiddware.js";

const customersRouter = Router();

customersRouter.get("/customers", getAllCustomers);
customersRouter.post("/customers", validNewCustomer, postCustomer);
customersRouter.put("/customers/:customerId", validNewCustomer, validUpdateCustomer, updateCustomer);

export default customersRouter;