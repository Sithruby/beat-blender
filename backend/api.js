const express = require("express");
const app = express();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our Beat Blender :)." });
});

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});