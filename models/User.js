const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
 }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8],
                },
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
    },

    {
        hooks: {
            beforeCreate: async (user) => {
                try {
                    newUser.password = await bcrypt.hash(user.password, 10);
                    return user;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            },
            beforeUpdate: async (updatedUser) => {
                try {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                    return updatedUser;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;