import { Router } from "express";
import { getAllCategories, postCategory } from "../controllers/categoriesController.js";
import { validCatName } from "../middwares/validCatNameMiddware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getAllCategories);
categoriesRouter.post("/categories", validCatName, postCategory);

export default categoriesRouter;