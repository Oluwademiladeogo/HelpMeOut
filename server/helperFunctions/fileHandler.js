module.exports = (originalname, filePath) => {
  const fs = require("fs");
  const path = require("path");

  // Define the source file and destination directory
  const sourceFilePath = path.join(__dirname, "../compressedvideo");
  const destinationDirectory = path.join(__dirname, "../../compressedUploads"); //

  // Check if the source file exists
  if (fs.existsSync(filePath)) {
    // Check if the destination directory exists, and create it if it doesn't
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory, { recursive: true });
    }

    // Define the destination file path
    const destinationFilePath = path.join(destinationDirectory, originalname);

    // Move the file from the source to the destination
    fs.renameSync(filePath, destinationFilePath);

    console.log("File moved successfully.");
  } else {
    console.error("Source file does not exist.");
  }
  //delete original file
  // fs.unlink(filePath, (err) => {
  //   if (err) {
  //     console.error("Error deleting file:", err);
  //   } else {
  //     console.log("File deleted successfully.");
  //   }
  // });
};
