import express from "express";
import "dotenv/config"
import cors from "cors";

import router from "./routes/index.mjs";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Server started listening at PORT ${PORT}`)
});