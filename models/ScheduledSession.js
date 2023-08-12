// ScheduledSession
// Id
// Student_id (FK to Students.id)
// Tutor_id (FK to Tutors.id)
// Session_begin (timestamp)
// Session_end (timestamp)
// meeting_link

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ScheduledSession extends Model {}

ScheduledSession.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'student',
                key: 'id',
            },
            //onUpdate: 'CASCADE',
            //onDelete: 'CASCADE',
        },
        tutor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tutor',
                key: 'id',
            },
            //onUpdate: 'CASCADE',
            //onDelete: 'CASCADE',
        },
        session_begin: {
            type: DataTypes.DATE,
            // allowNull: false,
            // defaultValue: DataTypes.NOW,
            // validate: {
            //     isDate: true,
            // },
            get() {
                return new Date(this.getDataValue('sent')).toDateString();
            },
            set(value) {
                this.setDataValue('sent', value);
            },
            
        },
        session_end: {
            type: DataTypes.DATE,
            // allowNull: false,
            // defaultValue: DataTypes.NOW,
            // validate: {
            //     isDate: true,
            // },
            get() {
                return new Date(this.getDataValue('sent')).toDateString();
            },
            set(value) {
                this.setDataValue('sent', value);
            },
        },
        meeting_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
hooks: {
      beforeSave:function(model) {
        // Checks that the session_begin and session_end timestamps are valid dates.
        // if (!moment(model.session_begin).isValid() || !moment(model.session_end).isValid()) {
        //   throw new Error('Invalid session dates');
        // }
        // Generates a unique meeting link for the session.
        // model.meeting_link = uuid.v4();
      },
},
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'scheduledSession',
    }
);

module.exports = ScheduledSession;