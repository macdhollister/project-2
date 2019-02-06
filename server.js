const ejs = require("ejs");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

const dataRoutes = require("./routes/dataRoutes");
app.use(dataRoutes);

const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});