import express, { Application } from "express";
import bookRouter from "./routes/beeperRouter.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const PORT: string = process.env.PORT || "3000";
const app: Application = express();

app.use(express.json());

app.use("/api/beepers", bookRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
