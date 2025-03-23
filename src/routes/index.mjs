import express from "express";
import { checkAPIKey } from "../controllers/apiPolice.mjs";
import { businessMail, login } from "../controllers/index.mjs";
import { addBlog, deleteBlog, getBlog, getBlogs, incrementViews, updateBlog } from "../controllers/blog.mjs";

const router = express.Router();

router.use(checkAPIKey);
router.get("/", (req, res)=>{
    res.status(200).json({ type: "success", message: "This is the root end point of Pearl Softech Backend", payload: null });
})
.post("/login", login)
.post("/business-mail", businessMail)
.get("/get-blogs", getBlogs)
.get("/get-blog/:id", getBlog)
.post("/add-blog", addBlog)
.delete("/delete-blog/:id", deleteBlog)
.put("/update-blog/:id", updateBlog)
.put("/blog/increment-views/:id", incrementViews)

export default router;