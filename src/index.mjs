import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.mjs";
import { connectMongoDB } from "./connections/index.mjs";

const PORT = process.env.PORT || 8080;
connectMongoDB("mongodb://127.0.0.1:27017/pearl-softech");

const app = express();

// ✅ Define CORS config once and reuse
const corsOptions = {
  origin: ["https://admin.pearlsoftech.com", "https://pearlsoftech.com"]
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-API-Key",
  ],
};

// ✅ Apply CORS for all routes and preflight
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started listening at PORT ${PORT}`);
});
