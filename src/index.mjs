import express from "express";
import "dotenv/config"
import cors from "cors";

import router from "./routes/index.mjs";
import { connectMongoDB } from "./connections/index.mjs";

const PORT = process.env.PORT || 8080;
connectMongoDB("mongodb://127.0.0.1:27017/pearl-softech")

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.options('*', cors()); // Enable CORS preflight for all routes
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-API-Key'], // Allow specific headers, including X-API-Key
}));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}`)
});