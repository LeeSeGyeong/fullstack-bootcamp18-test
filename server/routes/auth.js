const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const { makeRefreshToken, verifyToken, makeAccessToken } = require("./middlewares/authorization");

router.post("/getAuthData", (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ error: "사용자 인증 오류가 발생하였습니다" });
    }

    const verifyAccessToken = verifyToken(refreshToken);
    if (verifyAccessToken.id) {
      const accessToken = makeAccessToken(verifyAccessToken.id);
      const refreshToken = makeRefreshToken(verifyAccessToken.id);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true
      });

      res.json({ user: req.cookies.user, accessToken });
    }

    res.status(400).json({ error: "사용자 인증 오류가 발생하였습니다" });
  } catch (err) {
    res.status(400).json({ error: "유효하지 않은 사용자입니다" });
  }
});

router.get("/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) next(err);

      res.clearCookie("user");
      res.clearCookie("token");
      res.clearCookie("accessToken");
      res.clearCookie("connect.sid");
    });

    res.send("ok");
  } catch (err) {
    res.status(400).json({ error: "유효하지 않은 사용자입니다" });
  }

});

router.get("/auth/google/callback",
  async (req, res) => {
    try {
      const { code } = req.query;

      if (!code) {
        return res.status(400).json({ error: "유효하지 않은 사용자입니다" });
      }

      const getToken = async (code) => {
        try {
          const tokenApi = await axios.post(`https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=http://localhost:3000/auth/google/callback&grant_type=authorization_code`);
          const accessToken = tokenApi.data.access_token;
          return accessToken;
        } catch (err) {
          return err;
        }
      };
      const accessToken = await getToken(code);
      const getUserInfo = async (accessToken) => {
        try {
          const userInfoApi = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            }
          );
          return userInfoApi;
        } catch (err) {
          return err;
        }
      };
      const user = await getUserInfo(accessToken);
      const dbUser = await User.findOne({ email: user.data.email });
      const secretKey = process.env.JWT_SECRET;

      if (!dbUser) {
        const signUpUser = await User.create({
          id: user.data.id,
          nick: user.data.name,
          email: user.data.email
        });
        const refreshToken = makeRefreshToken(signUpUser);

        res.cookie("refreshToken", refreshToken, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true
        });
      } else {
        const refreshToken = makeRefreshToken(dbUser);

        res.cookie("refreshToken", refreshToken, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true
        });
      }

      const payload = { email: user.data.email };
      const token = jwt.sign(payload, secretKey);

      res.cookie("user", user.data);
      res.cookie("accessToken", token);
      res.redirect(`/`);
    } catch (err) {
      return res.status(400).json({ error: "유효하지 않은 사용자입니다" });
    }
  }
);

module.exports = router;
