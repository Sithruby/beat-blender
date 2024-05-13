const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.json());

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully Connected to the MongoDB!");
  })
  .catch(err => {
    console.log("Cannot connect to the MongoDB!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our Beat Blender :)." });
});


require("./app/routes/route.js")(app);
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});