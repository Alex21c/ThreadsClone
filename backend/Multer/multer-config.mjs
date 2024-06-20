import multer from "multer";
import { nanoid } from "nanoid";
import 'dotenv/config';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = nanoid(9) + "." + file.originalname.split(".").at(-1);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept files only if they are images
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: Number(process.env.MAX_ALLOWED_FILE_UPLOAD_SIZE) * 1024 },
});

const multerUploadMiddleware = upload.single('bodyImage');

export default multerUploadMiddleware;
