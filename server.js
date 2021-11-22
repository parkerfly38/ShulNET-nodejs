require("dotenv").config();
const express = require("express");
const cors = require("cors");
const memberRoutes = require("./routes/members");
const invoiceRoutes = require("./routes/invoice");

const app = express();

console.log(process.env);

var corsOptions = { origin: "*" };

app.use(cors(corsOptions));

app.use(express.json());

const db = require("./models/");

console.log(db.url);

db.mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch(err => {
        console.log("Cannot connect to the database.", err);
        process.exit();
    });

app.use("/members", memberRoutes);
app.use("/invoice", invoiceRoutes);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});