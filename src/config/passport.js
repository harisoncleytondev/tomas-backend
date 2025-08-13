import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        if (!profile) {
          return cb(new Error('Falha ao obter perfil do usuário'));
        }

        let tokenSend = {
          register: false,
          token: '',
        };

        let user = await User.findOne({
          where: { email: profile.emails[0].value },
        });
        if (user == null) {
          const json = {
            email: profile.emails[0].value,
            password: null,
            username: profile.displayName,
            subscription_expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
            preferences: {
              backgroundColor: '#F9F9F9',
              textColor: '#fff',
              buttonColor: '#425989ff',
              extraColor: '#2463EB',
              fontOne: `'Baloo 2', sans-serif`,
              fontOneSize: 45,
              fontOneSpacing: 0.8,
              fontTwo: `'Lexend Deca', sans-serif`,
              fontTwoSize: 16,
              fontTwoSpacing: 0.8,
            },
          };

          const userToCreate = User.build(json);
          await userToCreate.save();
          user = await User.findOne({
            where: { email: profile.emails[0].value },
          });
          tokenSend.register = true;
        } else {
          tokenSend.register = false;
        }

        const token = jwt.sign(
          {
            email: user.email,
            username: user.username,
            admin: user.admin,
            preferences: user.preferences,
            icon:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : null,
          },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );

        tokenSend.token = token;
        return cb(null, tokenSend);
      }
    )
  );
};
