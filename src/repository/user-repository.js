const { User } = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            console.log("data", data);
            const user = User.create(data);
            console.log("user", user);
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            User.destroy({
                where: {
                    id: userId
                }
            })
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async getByemail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            return user;
        } catch (error) {

        }
    }

}

module.exports = UserRepository;