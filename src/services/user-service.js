const UserRepository = require('../repository/user-repository');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig')

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    //signUp
    async create(data) {
        try {
            const user = this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in Service layer");
            throw error;
        }
    }

    async signin(email, plainpassword) {
        try {
            // step:1 -> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step:2 -> check if the passwords match
            const passwordMatch = this.checkPasswod(plainpassword,user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw { error: "Incorrect Password"}
            }
            
            // step:3 -> if passwords match Create new JWT token and return it
            const newJWT = this.createToken({email: user.email , password: user.password}); 
            return newJWT 
        } catch (error) {
            console.log("Something went wrong in SignIn process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw { error: "Invalid token"}
            }

            // This is to useful when the user token is not  expired but the user may be deleted
            // so it checks for the user even if the token is valid
            const user = this.userRepository.getByEmail(response.email);
            if(!user){
                throw { error: "No user with corresponding token exists"}
            }
            return user.id;

        } catch (error) {
            console.log("Something went wrong in Auth process", error);
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

    checkPasswod(userInputPlainPassord, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassord, encryptedPassword)
        } catch (error) {
            console.log("error in checking password")
            throw error;
        }
    }

}

module.exports = UserService;