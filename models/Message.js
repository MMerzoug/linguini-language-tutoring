// Add message type field.This field could be used to indicate the type of message, such as a text message, a file message, or a voice message. This would be helpful for filtering and displaying messages in the UI. (Nice to do)

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model { }

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        from_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
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
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        message_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sent: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true,
            },
            get() {
                return new Date(this.getDataValue('sent')).toDateString();
            },
            set(value) {
                this.setDataValue('sent', value);
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,
        },
    },
    {
        hooks: {
            beforeCreate: async (message, options) => {
                message.sent = Date.now();
            },
            // afterCreate: async (message, options) => {
            //     await createNotification(message.id, message.to_id);
            // },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'message',
    }
);
// const createNotification = async (messageId, toId) => {
//     const notification = await Message.create({
//         message_id: messageId,
//         to_id: toId,
//         message_type: 'message',
//     });
//     return notification;
// };

module.exports = Message;
