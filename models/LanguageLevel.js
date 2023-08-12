const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LanguageLevel extends Model {}

LanguageLevel.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'language_level', 
}
);

module.exports = LanguageLevel;