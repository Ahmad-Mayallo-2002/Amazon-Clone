import { config } from "dotenv";
import { Request } from "express";
import { VerifyCallback } from "jsonwebtoken";
import passport, { Profile } from "passport";
import { GoogleCallbackParameters, Strategy } from "passport-google-oauth20";
import { AppDataSource } from "../data-source";
import { User } from "../user/user.entity";

config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URIS } =
  process.env;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: GOOGLE_REDIRECT_URIS!,
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const userRepo = AppDataSource.getRepository(User);
      const email = profile.emails?.[0].value;
      const displayName = profile.displayName;
      const googleId = profile.id;
      const user = await userRepo.findOneBy([{ googleId }, { email }]);

      if (!user) {
        const newUser = userRepo.create({
          username: displayName,
          email,
          googleId,
        });
        await userRepo.save(newUser);
      } else {
        user.googleId = googleId;
        user.username = displayName;
        await userRepo.save(user);
      }

      return done(null, {
        ...profile,
        accessToken,
        refreshToken,
        tokenId: params.id_token,
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, (user as any).id));

passport.deserializeUser(async (id: string, done) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
