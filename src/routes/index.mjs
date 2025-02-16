import express from "express";
import { checkAPIKey } from "../controllers/apiPolice.mjs";
import { verifyJWT } from "../controllers/jwt.mjs";
import { businessMail, login } from "../controllers/index.mjs";

const router = express.Router();

router.use(checkAPIKey);
router.get("/", (req, res)=>{
    res.status(200).json({ type: "success", message: "This is the root end point of Pearl Softech Backend", payload: null });
})
.post("/login", login)
.post("/business-mail", businessMail)

export default router;