const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const mongooseUri = require('./private-data');
const mongoose = require("mongoose")
const cors = require('cors');

const PORT = 3000
const app = new express();

app.use("/photos/", express.static('photos'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(req.method + ' method ' + JSON.stringify(req.body) + ' request received' + JSON.stringify(req.params));
    next();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use(routes);

mongoose.connect(mongooseUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connected!');
    app.listen(PORT, () => {
        console.log(`Server ${PORT} has started`);
    });
}).catch (err => {
    console.log('faled to connect ' + err);
});