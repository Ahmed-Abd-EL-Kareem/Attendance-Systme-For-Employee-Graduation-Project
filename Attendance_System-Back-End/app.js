// const express = require("express");
// const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
// const hpp = require("hpp");
// const cors = require("cors");
// const cloudinary = require("cloudinary");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
// const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");
// const employeesRouter = require("./routes/employeeRoutes");
// const accountsRouter = require("./routes/accountRoutes");
// const ReportRouter = require("./routes/reportRoutes");
// const departmentRouter = require("./routes/departmentRoutes");
// const shiftRouter = require("./routes/shiftRoutes");
// const faceRecognitionRouter = require("./routes/faceRecognitionRoutes");

// const app = express();
// // ! 1) GLOBAL MIDDLEWARES
// // Set security HTTP headers
// app.use(helmet());

// // Development logging
// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV.trim() === "development") {
//   app.use(morgan("dev"));
// }
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Allow Cross-Origin requests
// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL,
//       process.env.DASHBOARD_URL
//       // "https://attendance-system-mu.vercel.app",
//       // process.env.PRODUCTION_URL
//     ],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true
//   })
// );
// app.options("*", cors());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   fileUpload({
//     tempFileDir: "/tmp/",
//     useTempFiles: true
//   })
// );
// // Limit requests from same IP
// const limiter = rateLimit({
//   max: 5000,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!"
// });
// app.use("/api", limiter);

// // Body parser, reading data from body into req.body
// app.use(express.json({ limit: "10kb" }));

// // Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// // Data sanitization against XSS
// app.use(xss());

// // Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: ["duration", "limit", "sort", "fields"]
//   })
// );
// // Cloudinary configuration

// app.use("/api/v1/employees", employeesRouter);
// app.use("/api/v1/accounts", accountsRouter);
// app.use("/api/v1/departments", departmentRouter);
// app.use("/api/v1/shifts", shiftRouter);
// app.use("/api/v1/reports", ReportRouter);
// app.use("/api/v1/face-recognition", faceRecognitionRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

// app.use(globalErrorHandler);

// module.exports = app;
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const employeesRouter = require("./routes/employeeRoutes");
const accountsRouter = require("./routes/accountRoutes");
const ReportRouter = require("./routes/reportRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const shiftRouter = require("./routes/shiftRoutes");
const faceRecognitionRouter = require("./routes/faceRecognitionRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
app.use(helmet());

// Development logging
if (process.env.NODE_ENV.trim() === "development") {
  app.use(morgan("dev"));
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// CORS
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
      // "https://attendance-system-mu.vercel.app",
      process.env.PRODUCTION_URL
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  })
);
app.options("*", cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB limit
  storage: multer.memoryStorage() // Store file in memory as a Buffer
});

// Parse JSON and URL-encoded data
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

// Limit requests from same IP
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

// Data sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ["duration", "limit", "sort", "fields"]
  })
);

// Routes
app.use("/api/v1/employees", upload.single("image"), employeesRouter);
app.use("/api/v1/accounts", accountsRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/shifts", shiftRouter);
app.use("/api/v1/reports", ReportRouter);
app.use(
  "/api/v1/face-recognition",
  upload.single("image"),
  faceRecognitionRouter
);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
// const express = require("express");
// const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
// const hpp = require("hpp");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cloudinary = require("cloudinary");
// const cookieParser = require("cookie-parser");
// const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");
// const employeesRouter = require("./routes/employeeRoutes");
// const accountsRouter = require("./routes/accountRoutes");
// const ReportRouter = require("./routes/reportRoutes");
// const departmentRouter = require("./routes/departmentRoutes");
// const shiftRouter = require("./routes/shiftRoutes");
// const faceRecognitionRouter = require("./routes/faceRecognitionRoutes");

// const app = express();

// // 1) GLOBAL MIDDLEWARES
// app.use(helmet());

// // Development logging
// if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === "development") {
//   app.use(morgan("dev"));
// }

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // CORS
// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL,
//       process.env.DASHBOARD_URL,
//       process.env.PRODUCTION_URL
//     ],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true
//   })
// );
// app.options("*", cors());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// // Parse JSON and URL-encoded data
// app.use(bodyParser.json({ limit: "1mb" }));
// app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

// // Limit requests from same IP
// const limiter = rateLimit({
//   max: 5000,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!"
// });
// app.use("/api", limiter);

// // Data sanitization
// app.use(mongoSanitize());
// app.use(xss());
// app.use(
//   hpp({
//     whitelist: ["duration", "limit", "sort", "fields"]
//   })
// );

// // Routes
// app.use("/api/v1/employees", employeesRouter);
// app.use("/api/v1/accounts", accountsRouter);
// app.use("/api/v1/departments", departmentRouter);
// app.use("/api/v1/shifts", shiftRouter);
// app.use("/api/v1/reports", ReportRouter);
// app.use("/api/v1/face-recognition", faceRecognitionRouter);

// // Handle undefined routes
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

// app.use(globalErrorHandler);

// module.exports = app;
