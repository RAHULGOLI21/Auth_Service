const UserRepository = require('../repository/user-repository');

const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig')

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in Service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
            return result;
        } catch (error) {
            console.log("error in creating token", error);
            throw error;
        }
    }

    verifyToken(token) {
        // this is what is returned by the verify token if the token is verified correctly
        // iat: issued at in millisec 
        // exp : expired at in millisec

        // {
        //     email: 'rahulgoli21@gmail.com',
        //     id: 1,
        //     iat: 1715442160, 
        //     exp: 1715528560
        // }
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log("error in verifying token", error);
            throw error;
        }
    }

}

module.exports = UserService;