const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});