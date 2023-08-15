// Notification
// Id
// message_id (FK to messages.id)
// Type
// To_id (FK to users.id)
// content
// read
// createdAt and updatedAt

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model { }

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        message_id: {
            type: DataTypes.INTEGER,
            allowNull: true,  // This assumes not all notifications are tied to messages
            references: {
                model: 'message',
                key: 'id',
            },
        },
        to_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // createdAt: {
        //     type: DataTypes.DATE,
        //     default: DataTypes.NOW,
        // },
        // updatedAt: {
        //     type: DataTypes.DATE,
        //     default: DataTypes.NOW,
        // },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'notification',
    }
);

module.exports = Notification;
