// LanguageLevel
// id
// Lang_id (FK to Language.id)
// level


const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LanguageLevel extends Model {}

LanguageLevel.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,            
        },
        lang_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'language',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'languageLevel',    
    }
);

module.exports = LanguageLevel;
