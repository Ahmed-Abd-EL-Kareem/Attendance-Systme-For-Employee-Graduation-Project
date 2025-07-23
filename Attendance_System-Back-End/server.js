const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

process.on("uncaughtException", err => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥💥💥 Shutting down...");
  process.exit(1);
});
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database connected successfully😁😁😁😁!");
  });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}😁😁😁😁!`);
});

process.on("uncaughtException", err => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥💥💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
