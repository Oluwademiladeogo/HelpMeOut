require("dotenv").config();
const fs = require("fs");
const { execSync: exec } = require("child_process");
const { Deepgram } = require("@deepgram/sdk");
const ffmpegStatic = require("ffmpeg-static");
const deepgram = new Deepgram(process.env.DEEPGRAM);

async function ffmpeg(command) {
  return new Promise((resolve, reject) => {
    exec(`${ffmpegStatic} ${command}`, (err, stderr, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}
async function transcribeAudio(audioFile) {
  const response = await deepgram.transcription.preRecorded(audioFile, {
    punctuation: true,
  });
  return response.results;
}

module.exports = async function (videoFile, audio, originalname) {
  try {
    //Use FFmpeg to extract audio from the video
    ffmpeg(`-hide_banner -y -i ${videoFile} ${audio}.m4a`);

    const audioFile = {
      buffer: fs.readFileSync(`${audio}.m4a`),
      mimetype: "audio/m4a",
    };

    // Transcribe the extracted audio
    await transcribeAudio(audioFile, originalname)
      .then((transcript) => {
        const transcriptString = JSON.stringify(transcript, null, 2);
        originalname = originalname.replace(/\.mp4$/, "");
        // Specify the file path where you want to write the transcript
        const filePath = `../compressedUploads/${originalname}.json`;

        // Write the transcript to the file
        fs.writeFileSync(filePath, transcriptString);

        console.log(`Transcript written to ${filePath}`);
      })
      .catch((ex) => console.log(ex.message));
  } catch (ex) {
    console.error("Error:", error);
  }
};
