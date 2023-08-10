// TutorRating
// Id
// tutor_id (FK to Tutor.id)
// Rating
// Review (text filed type)
// Submitted_by


const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Tutor = require('./Tutor');

class TutorRating extends Model {}

TutorRating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tutor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tutor',
                key: 'id',
            },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [1, 5],
            },
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        submitted_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'tutorRating',    
    }
);

module.exports = TutorRating;