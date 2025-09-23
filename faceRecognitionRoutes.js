// routes/faceRecognitionRoutes.js
const express = require("express");

const router = express.Router();
const axios = require("axios");
// const FormData = require("form-data");

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
const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

router.post("/recognize", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: "capture.jpg",
      contentType: req.file.mimetype
    });

    const response = await axios.post(
      "http://192.168.1.10:5000/recognize",
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Face recognition error:", error);
    res.status(500).json({ error: "Face recognition service failed" });
  }
});

module.exports = router;
const express = require("express");

const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

router.post("/recognize", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: "capture.jpg",
      contentType: req.file.mimetype
    });
    if (req.body.employeeId) {
      formData.append("employeeId", req.body.employeeId); // Forward employeeId
    }

    const response = await axios.post(
      "http://192.168.1.10:5000/recognize",
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    // console.error("Face recognition error:", error);
    res.status(500).json({ error: "Face recognition service failed" });
  }
});

module.exports = router;
// // routes/faceRecognitionRoutes.js
// const express = require("express");
// const router = express.Router();

// router.post("/recognize", async (req, res) => {
//   try {
//     const { employeeId, employeeName, imageBase64 } = req.body;

//     if (!employeeId || !employeeName || !imageBase64) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // No saving, just return success
//     return res.status(200).json({
//       status: "success",
//       employee_id: employeeId,
//       employee_name: employeeName,
//       message: "Face recognition data received successfully."
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message || "Internal server error" });
//   }
// });

// module.exports = router;
