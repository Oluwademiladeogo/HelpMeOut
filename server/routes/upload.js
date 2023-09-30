const express = require("express");
const router = express.Router();
const multer = require("multer");
const hbjs = require("handbrake-js");
const path = require("path");
const upload = multer({ dest: "../compressedUploads" });
const moveAndRename = require("../helperFunctions/fileHandler");
const transcribe = require("../helperFunctions/transcribe");
//Endpoint to receive uploads
//multiple res.writes with each having a key to access.
router.get("/", async (req, res) => {});
router.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ multerError: "No file uploaded" });
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");

    //get file and upload to uploads
    const input = req.file.path;
    const audioFile = path.join(
      __dirname,
      "../../compressedUploads/outputAudio"
    );
    //for compressedUploads
    const originalname = req.file.originalname;
    transcribe(input, audioFile, originalname);

    // const options = {
    //   input: input,
    //   output: "compressedvideo",
    //   encoder: "x264",
    //   quality: 20,
    // };
    // //handbrake for compression
    // try {
    //   await hbjs
    //     .spawn(options)
    //     .on("error", (err) => {
    //       console.error(err.message);
    //       res
    //         .status(500)
    //         .json({ hbjsError: "Compression failed please retry" });
    //     })
    //     .on("progress", (progress) => {
    //       console.log(
    //         "Percent complete: %d, ETA: %d",
    //         progress.percentComplete,
    //         progress.eta
    //       );
    //     })
    //     .on("complete", () => {
    //       console.log("Compression complete!");
    //       // res.status(200).send("Operation complete");
    //       moveAndRename(originalname, input);
    res.redirect("/videos?name=" + originalname);
    // });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
