const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const dataRoutes = require("./routes/dataRoutes");
app.use(dataRoutes);

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}`);
});
