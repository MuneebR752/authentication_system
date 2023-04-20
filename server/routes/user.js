const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const user = {
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  };

  try {
    let newUser = await User.create(user);
    let jwtToken = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET
    );
    return res.status(201).json({ message: "User created", token: jwtToken });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    let jwtToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return res
      .status(201)
      .json({ message: "Login Successfully", token: jwtToken });
  }
  return res.status(400).json({ message: "Incorrect password" });
});

router.delete("/", async (req, res) => {
  await User.deleteMany({}).then((result) => {
    res.status(200).json({ message: "All Users deleted" });
  });
});

router.post("/auth", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ authentication: false });
    } else {
      return res.status(200).json({ authentication: true });
    }
  });
});

//Mine code

// router.post("/signup", async (req, res) => {
//   const { username } = req.body;
//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     return res.status(400).json({ message: "Username already exists" });
//   } else {
//     const user = new User({
//       username: req.body.username,
//       password: bcrypt.hashSync(req.body.password, 3),
//     });
//     user
//       .save()
//       .then((result) => {
//         res.status(201).json({
//           message: "user created",
//           user: result,
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           error: err.message,
//         });
//       });
//   }
// });

// router.post("/login", async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
//   if (passwordMatch) {
//     return res.status(201).json({ message: "User found" });
//   } else {
//     return res.status(400).json({ message: "User not found" });
//   }
// });

module.exports = router;
