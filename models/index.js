const User = require('./User');
const Tutor = require('./Tutor');
const Language = require('./Language');
const LanguageLevel = require('./LanguageLevel');
const TutorRating = require('./TutorRating');
const Student = require('./Student');
const ScheduledSession = require('./ScheduledSession');
const Message = require('./Message');
const Notification = require('./Notification');

Student.belongsTo(User, {
  foreignKey: 'user_id',
});

Tutor.belongsTo(User, {
  foreignKey: 'user_id',
});

// A user can have many languages
// User.hasOne(Language, {
//   foreignKey: 'user_id',
// });

Language.belongsTo(Student, {
  foreignKey: 'user_id',
});

Language.belongsTo(Tutor, {
  foreignKey: 'user_id',
});

LanguageLevel.belongsTo(Student, {
  foreignKey: 'language_level',
});

TutorRating.belongsTo(Tutor, {
  foreignKey: 'tutor_id',
});

Tutor.hasMany(TutorRating, {
  foreignKey: 'tutor_id',
});

// Student.hasOne(LanguageLevel, {
//     foreignKey: 'id',
// });

Tutor.hasOne(Language, {
    foreignKey: 'tutor_id',
});

Language.belongsTo(Tutor,{
    foreignKey: 'tutor_id',
});

Tutor.hasMany(User, {
    foreignKey: 'tutor_id'
});

User.belongsTo(Tutor,{
    foreignKey: 'tutor_id',
});

Message.belongsTo(Student, {
  foreignKey: 'student_id',
});

Message.belongsTo(Tutor, {
  foreignKey: 'tutor_id',
});

Notification.belongsTo(Message, {
  foreignKey:'message_id',
});

ScheduledSession.belongsTo(Tutor, {
  foreignKey: 'tutor_id',
});

ScheduledSession.belongsTo(Student, {
  foreignKey: 'student_id',
});

// Export the models for use in other parts of the app
module.exports = {
  User,
  Tutor,
  Language,
  LanguageLevel,
  TutorRating,
  Student,
  ScheduledSession,
  Message,
  Notification,
};
