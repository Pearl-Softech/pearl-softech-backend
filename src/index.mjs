import express from "express";
import "dotenv/config";
import cors from "cors";

import router from "./routes/index.mjs";
import { connectMongoDB } from "./connections/index.mjs";

const PORT = process.env.PORT || 8080;
connectMongoDB("mongodb://127.0.0.1:27017/pearl-softech");

const app = express();

// Enable CORS for all routes (move to top)
app.use(cors({
    origin: '*', // Allow all origins
    methods: '*', // Allow specific HTTP methods
    allowedHeaders: '*', // Allow specific headers
}));

// Allow preflight OPTIONS request handling for all routes
app.options('*', cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}`);
});
