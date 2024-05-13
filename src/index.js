const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index');

const app = express();
const db = require('./models/index')

// const { User, Role } = require('./models/index');

prepareAndStartServer = async() => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }))

    app.use('/api', apiRoutes);

    app.listen(PORT,() => {
        console.log(`Server started at PORT : ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true})
        }
    })

    // const user = await User.findByPk(7);
    // const role = await Role.findByPk(1);
    // user.addRole(role);



}

prepareAndStartServer();