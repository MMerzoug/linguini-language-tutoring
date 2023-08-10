// Messages
// Id
// From_id (FK to users.id)
// To_id (FK to users.id)
// Message_text
// Sent (timestamp)

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
    },

    hooks: {
    beforeCreate: async (message, options) => {
        message.sent = Date.now();
    },
    afterCREATE: async (message, options) => {
        await message.create({
            message_id: message.id,
            to_id: message.to_id,
            message_type: 'message',
        });
    },
},
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'message',
    }
);

module.exports = Message;
