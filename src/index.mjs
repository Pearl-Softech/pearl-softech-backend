import express from "express";
import "dotenv/config";
import cors from "cors";

import router from "./routes/index.mjs";
import { connectMongoDB } from "./connections/index.mjs";

const PORT = process.env.PORT || 8080;
connectMongoDB("mongodb://127.0.0.1:27017/pearl-softech");

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Enable CORS for all routes (move to top)
app.use(cors({
    origin: ['https://pearlsoftech.com', 'https://admin.pearlsoftech.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
}));

// Allow preflight OPTIONS request handling for all routes
app.options('*', cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 4. ✅ CORS debug logger middleware (place here)
app.use((req, res, next) => {
  res.on('finish', () => {
    if (req.method === 'OPTIONS') {
      console.log('OPTIONS response headers:', res.getHeaders());
    }
  });
  next();
});

// 5. ✅ Log incoming requests (optional)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server started listening at PORT ${PORT}`);
});
