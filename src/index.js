import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoriesRouter from "../routers/categoriesRouter.js";
import gamesRouter from "../routers/gamesRouter.js";
import customersRouter from "../routers/customersRouter.js";
import rentalsRouter from "../routers/rentalsRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server online on port ${port}!`));