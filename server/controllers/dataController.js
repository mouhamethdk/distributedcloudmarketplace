import mongoose from "mongoose";

// Connect to the target "datas" database
const targetConnection = mongoose.connection.useDb("datas");

// Function to handle the import of a CSV file as binary
export const uploadCSV = async (req, res) => {
  const file = req.file; // Handling a single file

  if (!file) {
      return res.status(400).json({ error: "No file provided." });
  }

  try {
      const collection = targetConnection.collection("datas");

      // Save the file in MongoDB
      const fileDocument = {
          filename: file.originalname,
          content: file.buffer,
          type: "datas",
          uploadedAt: new Date(),
      };

      await collection.insertOne(fileDocument);

      res.json({ message: `File "${file.originalname}" successfully uploaded.` });
  } catch (err) {
      console.error("Error while saving the file:", err);
      res.status(500).json({ error: "Internal server error." });
  }
};
