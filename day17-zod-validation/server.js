
const express = require("express");
const validateUser = require("./middleware/validateUser");

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Day 17 Zod Validation API is running",
  });
});

// User validation route
app.post("/users", validateUser, (req, res) => {
  const user = req.validatedUser;

  res.status(201).json({
    success: true,
    message: "User validated successfully",
    user: {
      name: user.name,
      email: user.email,
      age: user.age,
    },
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
