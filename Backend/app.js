const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./src/Routes/AuthRoutes");
const AdminRoute = require("./src/Routes/AdminRoute");
const productRoute = require("./src/Routes/ProductRoute");
const dbgr = require("debug")("development:app");
require("./src/config/mongoose-connection");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.ORIGIN2],
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/uploads/profiles", express.static("./public/uploads/profiles"));
app.use("/uploads/products", express.static("./public/uploads/products"));

app.use("/api/auth", AuthRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/product", productRoute);

app.listen(PORT, () => {
  dbgr(`Listening on http://localhost:${PORT}`);
});
