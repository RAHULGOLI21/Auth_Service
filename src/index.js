const express = require('express');
const { PORT } = require('./config/serverConfig')
const app = express();

prepareAndStartServer = () => {

    app.listen(PORT, () => {
        console.log(`Server started at PORT : ${PORT}`);
    })
}

prepareAndStartServer();