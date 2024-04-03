// controllers/fileController.js
const asyncHandler = require("express-async-handler")
const File = require("../models/fileModel");;
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: process.env.AWS_REGION });
// console.log("s3Client--------",s3Client);

// const uploadFile = asyncHandler(async (req, res) => {
//   const file = req.file;
//   console.log("file--------",file);

//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const params = {
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: file.originalname,
//     Body: file.buffer
//   };
//   console.log("params--------",params);
//   try {
//     const command = new PutObjectCommand(params);
//     const data = await s3Client.send(command);
//     console.log("data--------",data);

//     const fileData = await File.create({
//         filename: file.originalname,
//         url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`
//     });

//       console.log("fileData--------",fileData);
//     // Save file data to database or return it as needed
//     res.status(200).json(fileData);
//   } catch (error) {
//     console.error('Error uploading file to S3:', error);
//     res.status(500).send('Error uploading file to S3.');
//   }
// });

//@desc Upload file to s3
//@route POST /api/files/upload
//@access private
const uploadFile = asyncHandler(async (req, res) => {
  const file = req.file;
  console.log("file--------", file);

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer
  };

  try {
    const command = new PutObjectCommand(params);
    // const data = await s3Client.send(command);
    // console.log("data--------",data);

    // const fileData = {
    //   filename: file.originalname,
    //   url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`
    // };
    const fileData = await File.create({
      filename: decodeURIComponent(file.originalname),
      size: file.size,
      url: `https://s3.tradepay.co.kr/tradepay-finance/logos/${file.originalname}`,
      user_id: req.user.id
    });
    console.log("fileData--------", fileData);

    // Save file data to database or return it as needed
    res.status(200).json(fileData);
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(500).send('Error uploading file to S3.');
  }
});

const getFileList = asyncHandler(async (req, res) => {
  const fileList = await File.find({ user_id: req.user.id });
  console.log("fileList backend", fileList);
  res.status(200).json(fileList);
});

//@desc Delete file by ID
//@route DELETE /api/files/:fileId
//@access private
const deleteFile = asyncHandler(async (req, res) => {

  const { fileId } = req.params;

  // Find the file by ID
  const file = await File.findById(fileId);

  // Check if the file exists
  if (!file) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  // Check if the user is authorized to delete the file
  if (file.user_id.toString() !== req.user.id) {
    res.status(403).json({ message: "Not authorized to delete this file" });
    return;
  }

  // Delete the file from the database
  await File.deleteOne(file);

  res.json({ message: "File deleted successfully" });
});

module.exports = {
  uploadFile,
  getFileList,
  deleteFile
};
