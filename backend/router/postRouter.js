const express = require("express");
const { getPageBlogs ,uploadBlog,getUserBlogs,updateBlog,deleteBlog,getblog} = require("./../controller/post");
const router = express.Router();



router.get("/api/get-blogs", getPageBlogs);

router.post("/api/post/create",uploadBlog);

router.get("/api/blogs",getUserBlogs);

router.get('/api/blog',getblog);

router.put("/api/blogs", updateBlog);

router.delete("/api/blogs/:id", deleteBlog);

router.get("/", (req, res) => {
  res.json("hello");
});

module.exports = router;
