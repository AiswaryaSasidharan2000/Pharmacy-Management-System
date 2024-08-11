const express = require("express");
const dotenv = require("dotenv");
const sequelize = require('./models/db');
const { userRoutes } = require("./routes/index");
const logger = require("./utils/logger");

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRoutes);

sequelize
    .sync()
    .then(() => {
        logger.info("Database synced successfully");
    })
    .catch((err) => {
        logger.error("Unable to sync database:", err);
    });

const port = process.env.PORT || 8080;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
});