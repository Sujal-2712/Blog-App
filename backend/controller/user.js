const bcrypt = require("bcryptjs");
const User = require("./../model/user");
const jwt=require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode token
    return decoded;
  } catch (error) {
    console.error("JWT decoding error:", error);
    return null;
  }
};


async function signup(req,res){
    try {
        const { email, password, name } = req.body;
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists !!",error:1 });
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const newUser = new User({
          email,
          password: hashedPassword,
          name,
        });
    
        await newUser.save();
        res.status(201).json({
          message: "Signup successful",
          error: 0,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: 1 });
      }
}

async function signin(req,res){
    try {
        const { email, password } = req.body;
    
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials", error: 1 });
        }
    
        // Generate JWT token
        const token = generateToken(user);
    
        res.status(200).json({
          message: "Login successful",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          error: 0,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: 1 });
      }
}

async function getUser(req,res){
    try {
        const token=decodeToken(req.cookies.jwt);
        const user = await User.findById(token.userId);
        res.status(200).json({user});
      } catch (error) {
        console.log(error);
        res.json(error);
      }
}

module.exports={signup,signin,getUser};