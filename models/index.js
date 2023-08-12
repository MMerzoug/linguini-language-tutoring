const User = require('./User');
const Tutor = require ('./Tutor');
const Language = require ('./Language');
// const TutorRating = require ('./TutorRating');
const Student = require('./Student');
const ScheduledSession = require('./ScheduledSession');
const StudentTutorPivot = require('./StudentTutorPivot');

Student.belongsTo(User, {
  foreignKey: 'user_id',
});
// A user can have many languages
// User.hasOne(Language, {
//   foreignKey: 'user_id',
// });

// Language.belongsTo(User,{
//     foreignKey: 'user_id',
// });

// Tutor.hasOne(Language, {
//     foreignKey: 'tutor_id',
// });

// Language.belongsTo(Tutor,{
//     foreignKey: 'tutor_id',
// });

Tutor.hasMany(User, {
    foreignKey: 'tutor_id'
});

User.belongsTo(Tutor,{
    foreignKey: 'tutor_id',
});

// ScheduledSession.belongsTo(Tutor, {
//   foreignKey: 'tutor_id',
//  });


ScheduledSession.belongsTo(Student,{
  foreignKey: 'student_id',
 
})

Student.hasMany(ScheduledSession,{
  foreignKey: 'student_id',
})


// Export the models for use in other parts of the app
module.exports = {
  User,
  Tutor,
  Language,
  // TutorRating,
  Student,
  ScheduledSession,
  StudentTutorPivot,
};
