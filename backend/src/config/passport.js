import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// 1. Tell Passport how to use the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 2. Look in our database for a user with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // If they exist, tell Passport "Everything is good, here is the user!"
          return done(null, user);
        }

        // 3. If no Google ID, check if their email already exists in our DB
        // (Maybe they signed up with a password before)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link the Google ID to their existing account
          user.googleId = profile.id;
          user.isVerified = true; // Google emails are already verified
          await user.save();
          return done(null, user);
        }

        // 4. If the user is brand new, create them!
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isVerified: true,
        });

        done(null, newUser);
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        // If something goes wrong, tell Passport there was an error
        done(error, null);
      }
    },
  ),
);

export default passport;
