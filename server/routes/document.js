const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Document = require("../models/Document");

router.get("/docs", async (req, res, next) => {
  try {
    const documentList = await Document.find();

    if (documentList) {
      return res.json(documentList);
    } else {
      return res.status(400).json({ error: "문서 목록이 존재하지 않습니다" });
    }
  } catch (err) {
    return res.status(400).json({ error: "문서 목록 조회 시 오류가 발생하였습니다" });
  }
});

router.post("/newDoc", async (req, res, next) => {
  try {
    const { title, tempContent } = req.body.document;
    const user = await User.findOne({ email: req.cookies.user.email });

    if (!user._id) {
      res.status(400).json({ error: "사용자 정보가 존재하지 않습니다" });
    }

    const createdDoc = await Document.create({
      title,
      author: user._id,
      tempContent: tempContent,
    });

    return res.json(createdDoc);
  } catch (err) {
    return res.status(400).json({ error: "문서 목록 조회 시 오류가 발생하였습니다" });
  }
});

router.get("/userDoc", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.json({ error: "사용자 정보가 존재하지 않습니다" });
    }
    const userDocumentList = await Document.find({ author: { $eq: user._id } });

    if (userDocumentList) {
      return res.json(userDocumentList);
    } else {
      return res.status(400).json({ error: "Document 정보가 없습니다" });
    }
  } catch (err) {
    return res.status(400).json({ error: "문서 목록 조회 시 오류가 발생하였습니다" });
  }
});

router.patch("/updateDoc", async (req, res, next) => {
  try {
    const updatedDoc = await Document.findOneAndUpdate(
      { _id: req.body._id },
      req.body.document,
      { new: true },
    );

    if (!updatedDoc) {
      return res.status(400).json({ error: "갱신된 Document 정보가 없습니다" });
    }
    return res.json(updatedDoc);
  } catch (err) {
    return res.status(400).json({ error: "문서 목록 조회 시 오류가 발생하였습니다" });
  }
});

module.exports = router;
