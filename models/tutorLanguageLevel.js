
// TutorLanguagePivot
// id
// tutor_id (FK to Tutors.id)
// Language_id (FK to Languages.id)

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TutorLanguagePivot extends Model { }

TutorLanguagePivot.init(
    {
        id: {
            typeof: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        tutor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tutor',
                key: 'id',
            },
        },
        language_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'language',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tutor_language_pivot',
    }
);

module.exports = TutorLanguagePivot;