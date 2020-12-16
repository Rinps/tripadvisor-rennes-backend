// Load packages
const express = require("express");
const formidable = require("express-formidable");
const dotenv = require("dotenv");
const cors = require("cors");

// Setup server
const app = express();
app.use(formidable());
app.use(cors());

// Import routes
const submitRoute = require("./routes/submit");
app.use(submitRoute);

// Define routes

app.get("/", async (req, res) => {
  res.send("Yep, this is working");
});

// If the route is not known
app.all("*", (req, res) => {
  res.status(404).json({ message: "Ressource not found" });
});

app.listen("3000", () => {
  console.log("3, 2, 1, TO THE MOON!");
});
