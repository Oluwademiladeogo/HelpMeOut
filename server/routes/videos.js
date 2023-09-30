const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
router.get("/", (req, res) => {
  if (!req.query.name) res.json({ message: "Include query parameter" });
  const videoname = req.query.name;
  const videopath = `../../compressedUploads/${videoname}`;
  console.log(videopath);
  const absolutePath = path.resolve(__dirname, videopath);

  // Send the video file as a response
  res.sendFile(absolutePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log("sent successfully");
  });
});
router.get("/transcript", (req, res) => {
  if (!req.query.name) res.json({ message: "Include query parameter" });
  const transcriptname = req.query.name;
  const transcriptpath = `../../compressedUploads/${transcriptname}`;
  console.log(transcriptpath);
  const absolutePath = path.resolve(__dirname, transcriptpath);

  // Send the video file as a response
  fs.readFile(absolutePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Send the parsed JSON data as the response
      res.json(jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ message: "Error parsing JSON" });
    }
  });
});
module.exports = router;
