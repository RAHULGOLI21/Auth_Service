const { User, Role } = require('../models/index')

class UserRepository {

    async create(data) {
        try {
            console.log("data", data);
            const user = await User.create(data);
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

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            console.log("user in repo", user)
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            })
            console.log(user, adminRole);
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

}

module.exports = UserRepository;