module.exports = (originalname) => {
  const fs = require("fs");
  const path = require("path");

  // Define the source file and destination directory
  const sourceFilePath = path.join(__dirname, "../compressedvideo"); // Replace with your source file path
  const destinationDirectory = path.join(__dirname, "../../compressedUploads"); // Replace with your destination directory path

  // Check if the source file exists
  if (fs.existsSync(sourceFilePath)) {
    // Check if the destination directory exists, and create it if it doesn't
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory, { recursive: true });
    }

    // Define the destination file path
    const destinationFilePath = path.join(destinationDirectory, "originalname"); // Replace with the desired destination file name

    // Move the file from the source to the destination
    fs.renameSync(sourceFilePath, destinationFilePath);

    console.log("File moved successfully.");
  } else {
    console.error("Source file does not exist.");
  }
};
