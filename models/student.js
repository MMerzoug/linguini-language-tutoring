// Student
// id
// user_id(FK to Users.id )

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Student = require('./User');

class Student extends Model { }

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'student',
    }
),

    module.exports = Student;

