import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadfile } from "../controller/file.controller.js";
import { extractContent } from "../controller/extraction.controller.js";

const router =express.Router()

router.post("/upload",authMiddleware,upload.single("file"),uploadfile)
router.post("/extract",authMiddleware,upload.single("screenshot"), extractContent)

export default router