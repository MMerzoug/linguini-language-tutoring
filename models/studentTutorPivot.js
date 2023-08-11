// StudentTutorPivot
// Id
// tutor_id (FK to Tutors.id)
// student_id(FK to Students.id)
// Language_id (FK to Languages.id)
// Languagelevel_id (FK to LanguageLevel.id)

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StudentTutorPivot extends Model { }

StudentTutorPivot.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'student',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        Language_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'language',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        Languagelevel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'languagelevel',
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
        modelName: 'student_tutor_pivot',
    }
);
module.exports = StudentTutorPivot;

