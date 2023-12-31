require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/upload", require("./routes/upload"));
app.use("/videos", require("./routes/videos"));
app.get("/", (req, res) => {
  res.json({
    response: "connected",
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
