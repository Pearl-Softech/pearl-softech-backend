import express from "express";
import { checkAPIKey } from "../controllers/apiPolice.mjs";
import { businessMail, login } from "../controllers/index.mjs";
import { addBlog, deleteBlog, getBlog, getBlogs, incrementViews, updateBlog } from "../controllers/blog.mjs";
import { addCareer, deleteCareer, getCareer, getCareers, updateCareer } from "../controllers/career.mjs";

const router = express.Router();

router.use(checkAPIKey);

router.get("/", (req, res) => {
    res.status(200).json({
        type: "success",
        message: "This is the root end point of Pearl Softech Backend",
        payload: null
    });
});

// General routes
router.post("/login", login);
router.post("/business-mail", businessMail);

// Blog routes
router.get("/get-blogs", getBlogs);
router.get("/get-blog/:id", getBlog);
router.post("/add-blog", addBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.put("/update-blog/:id", updateBlog);
router.put("/blog/increment-views/:id", incrementViews);

// Career routes (added)
router.get("/get-careers", getCareers);
router.get("/get-career/:id", getCareer);
router.post("/add-career", addCareer);
router.delete("/delete-career/:id", deleteCareer);
router.put("/update-career/:id", updateCareer);

export default router;
