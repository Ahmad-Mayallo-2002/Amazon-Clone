import { NextFunction, Request, Response, Router } from "express";
import "./passport.auth";
import passport from "passport";
import { checkToken } from "../middlewares/checkToken.middleware";

const router = Router();

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/google-login", async (req, res) =>
  res.status(200).send("<a href='/auth/google'>Authenticate with Google</a>")
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/protected", checkToken, async (req, res) => {
  console.log(req.user);
  res.status(200).send("Hello!");
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

router.get("/auth/failure", async (req, res) =>
  res.status(200).send("something went wrong..")
);

router.get("/logout", async (req, res) => {
  req.logout({ keepSessionInfo: false }, () => null);
  res.status(200).send("logout");
});

export default router;
