const User = require ('./User');
const Tutor = require ('./Tutor');
const Language = require ('./Language');
const TutorRating = require ('./tutorRating');

// A user can have many languages
User.hasOne(Language, {
  foreignKey: 'user_id',
});

Language.belongsTo(User,{
    foreignKey: 'user_id',
});

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


// Export the models for use in other parts of the app
module.exports = {
    User,
    Tutor,
    Language,
    TutorRating,
  };
  




