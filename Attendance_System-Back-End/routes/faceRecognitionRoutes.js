// routes/faceRecognitionRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
// const FormData = require("form-data");  // Keep commented if not used

router.post("/recognize", async (req, res) => {
  try {
    const response = await axios.post(
      "http://192.168.1.10:5000/recognize",
      req.body,
      {
        headers: {
          ...req.headers,
          "content-type": "multipart/form-data"
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Face recognition service failed" });
  }
});

module.exports = router;
