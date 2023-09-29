const express = require("express");
const router = express.Router();
const multer = require("multer");
const hbjs = require("handbrake-js");
const upload = multer({ dest: "../compressedUploads" });
const moveAndRename = require("./fileHandler");
//Endpoint to receive uploads
//multiple res.writes with each having a key to access.
router.get("/", async (req, res) => {});
router.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ messagemulter: "No file uploaded" });
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");

    //get file and upload to uploads
    const input = req.file.path;
    //for compressedUploads
    const originalname = req.file.originalname;
    const options = {
      input: input,
      output: "compressedvideo",
      encoder: "x264",
      quality: 20,
    };
    //handbrake for compression
    await hbjs
      .spawn(options)
      .on("error", (err) => {
        console.error(err.message);
        res.status(500).json({ messagehbjs: "Compression failed" });
      })
      .on("progress", (progress) => {
        res.write(
          "Percent complete: %d, ETA: %d",
          progress.percentComplete,
          progress.eta
        );
      })
      .on("complete", () => {
        console.log("Compression complete!");
        res.status(200).write("Operation complete");
        moveAndRename(originalname, input);
      });
    res.end();
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
