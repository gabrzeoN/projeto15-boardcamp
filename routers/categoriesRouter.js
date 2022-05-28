import { Router } from "express";
import { getAllCategories, postCategory } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.use("/categories", getAllCategories);
categoriesRouter.use("/categories", postCategory);

export default categoriesRouter;