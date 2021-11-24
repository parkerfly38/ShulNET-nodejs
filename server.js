require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const express = require("express");
const cors = require("cors");
//const memberRoutes = require("./routes/members");
//const invoiceRoutes = require("./routes/invoice");
const router = require("./routes");

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

app.use("/", router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});