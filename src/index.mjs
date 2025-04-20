import express from "express";
import "dotenv/config";
import cors from "cors";

import router from "./routes/index.mjs";
import { connectMongoDB } from "./connections/index.mjs";

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/pearl-softech");

const app = express();

// ✅ 1. CORS Middleware — must be before routes
app.use(cors({
  origin: ['https://pearlsoftech.com', 'https://admin.pearlsoftech.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
}));

// ✅ 2. OPTIONS Preflight Handler
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Api-Key");
  res.sendStatus(200);
});

// ✅ 3. Log All Requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ 4. Log OPTIONS response headers (for debug)
app.use((req, res, next) => {
  res.on('finish', () => {
    if (req.method === 'OPTIONS') {
      console.log('OPTIONS response headers:', res.getHeaders());
    }
  });
  next();
});

// ✅ 5. Body Parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ 6. Main Routes
app.use("/", router);

// ✅ 7. Start Server
app.listen(PORT, () => {
  console.log(`Server started listening at PORT ${PORT}`);
});
