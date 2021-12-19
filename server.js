require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const router = require("./routes");

const app = express();

console.log(process.env);

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

app.use(bodyParser.json());
app.use(cookieParser());
const whitelist = ['http://localhost:8081','http://localhost:6868','*'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
 
        if (whitelist.indexOf(origin) === -1) {
          var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
  };
  
app.use(cors(corsOptions));
app.use("/", router);

var swaggerOptions = {
    customCss: ' .swagger-ui .topbar { display: none; }',
    customSiteTitle: 'ShulNET NodeJS API'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOptions));


const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});