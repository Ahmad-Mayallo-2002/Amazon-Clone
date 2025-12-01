import { config } from "dotenv";
import { Request } from "express";
import { VerifyCallback } from "jsonwebtoken";
import passport, { Profile } from "passport";
import { GoogleCallbackParameters, Strategy } from "passport-google-oauth20";

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
    (
      req: Request,
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: Profile,
      done: VerifyCallback
    ) =>
      done(null, {
        ...profile,
        accessToken,
        refreshToken,
        tokenId: params.id_token,
      })
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user as any));
