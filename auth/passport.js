// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_KEY,
// };

// const strategy = new JwtStrategy(options, async (payload, done) => {
//   try {
//     const user = await User.findOne({ _id: payload.sub });
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = (passport) => {
//   passport.use(strtegy);
// };
