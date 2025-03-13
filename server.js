require("dotenv").config();

const express = require("express");
const path = require("path");

// Routes
const users = require("./routes/users");
const authentications = require("./routes/authentications");
const enrollments = require("./routes/enrollments");
const certificates = require("./routes/certificates");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", users);
app.use("/api/authentications", authentications);
app.use("/api/enrollments", enrollments);
app.use("/api/certificates", certificates);

app.use(errorMiddleware);
app.use(
  "/certificates",
  express.static(path.join(__dirname, "public/certificates"))
);
app.use("/qrcodes", express.static(path.join(__dirname, "public/qrcodes")));

app.listen(process.env.PORT, process.env.HOST || "0.0.0.0", () => {
  console.log(
    `Server is running on http://${process.env.HOST || "0.0.0.0"}:${
      process.env.PORT
    }`
  );
});
