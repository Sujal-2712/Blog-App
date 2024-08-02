const BlogPost = require("./../model/post");
const User = require("./../model/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode token
    return decoded;
  } catch (error) {
    console.error("JWT decoding error:", error);
    return null;
  }
};

async function getPaginatedPosts(page, pageSize, filter = {}) {
  const skip = (page - 1) * pageSize;
  const totalPosts = await BlogPost.countDocuments(filter);
  const totalPages = Math.ceil(totalPosts / pageSize);

  const posts = await BlogPost.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(pageSize)
    .select("title author date category tags content id");

  const formattedPosts = posts.map((post) => ({
    ...post._doc,
    date: formatDate(post.date), // format the date
  }));

  return {
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts: formattedPosts,
  };
}

async function getPageBlogs(req, res) {
  const page = parseInt(req.query.page) || 1;
  const tag = req.query.tag;
  const category = req.query.category;
  const id = req.query.id;

  const filter = {};

  if (tag) {
    filter.tags = { $regex: tag, $options: "i" };
  }

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  if (id) {
    filter.id = id;
  }

  try {
    const result = await getPaginatedPosts(page, 5, filter);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function uploadBlog(req, res) {
  const { title, content, category, tags } = req.body;
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid token", error: 1 });
  }

  if (!title || !content || !category || !tags) {
    return res
      .status(400)
      .json({ message: "All fields are required", error: 1 });
  }

  const username = await User.findOne({ _id: decoded.userId });

  try {
    const newBlogPost = new BlogPost({
      id: new mongoose.Types.ObjectId().toString(), // Generate a new ID
      title,
      content,
      author: username.name,
      category,
      tags: tags.map((tag) => tag.trim()),
    });

    await newBlogPost.save();

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found", error: 1 });
    }
    user.blogs.push(newBlogPost._id);
    await user.save();

    res.status(201).json({
      message: "Blog post created successfully",
      post: newBlogPost,
      error: 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: 1 });
  }
}

async function getUserBlogs(req, res) {
  const id = req.query.userId;
  try {
    const user = await User.findById(id).populate("blogs");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateBlog(req, res) {
  const id = req.query.id;

  const { title, author, category, content, date, tags } = req.body;

  try {
    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        author,
        category,
        content,
        date: Date.now(),
        tags,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found", error: 0 });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteBlog(req, res) {
  const id = req.params.id;
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", error: 1 });
    }

    const deletedBlog = await BlogPost.findByIdAndDelete(id);

    const user = await User.findOne({ email: decoded.email });
    user.blogs = user.blogs.filter((blog) => blog._id != id);
    await user.save();

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found", error: 1 });
    }
    res.json(deletedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: 1 });
  }
}

async function getblog(req, res) {
  const id = req.query.blogId || null;
  try {
    const result = await BlogPost.find({ id });
    const result2 = await BlogPost.find({ category: result[0].category });
    return res.json({ blog: result[0], relatedBlogs: result2, error: 0 });
  } catch (error) {
    console.log(error);
    return res.json({ message: error, error: 1 });
  }
}

module.exports = {
  getPageBlogs,
  uploadBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
  getblog,
};
