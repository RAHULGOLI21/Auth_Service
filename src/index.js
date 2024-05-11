const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index');

const app = express();

const UserService = require('./services/user-service')

prepareAndStartServer = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }))

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at PORT : ${PORT}`);
        // code snippet to verify token
        // const service = new UserService();
        // // const token = service.createToken({ email: 'rahulgoli21@gmail.com', id: 1 })
        // // console.log(token);
        // const res = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVsZ29saTIxQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE3MTU0NDI0MTksImV4cCI6MTcxNTQ0MjQxOX0.ZoX_o6_OYtPCAuVTMUwNQwwWXii6N-OjFG0_1A7EWeI'
        // const isTrue = service.verifyToken(res);
        // console.log(isTrue);
    })



}

prepareAndStartServer();