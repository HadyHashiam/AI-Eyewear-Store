const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const ApiError = require("../../utils/apiError");

// تحديد مسار تخزين الصور
const uploadDir = path.join(__dirname, "../../images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد تخزين الملفات باستخدام memoryStorage
const multerStorage = multer.memoryStorage();

// فلترة الملفات للسماح فقط بالصور
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only images are allowed", 400), false);
  }
};

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     const ext = path.extname(file.originalname); // ✅ استخراج الامتداد الأصلي
//     const baseName = path.basename(file.originalname, ext); // ✅ استخراج الاسم بدون الامتداد
//     cb(null, ${ uniqueSuffix } - ${ baseName }${ ext }); // ✅ توليد اسم بدون resized-
//   },
// });


const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// ميدل وير لتحميل صورة واحدة
exports.uploadSingleImage = (fieldName) => upload.single(fieldName);

// ميدل وير لتحجيم الصورة باستخدام sharp
exports.resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const ext = path.extname(req.file.originalname);
    const baseName = path.basename(req.file.originalname, ext);
    const filename = `${Date.now()}-${baseName}${ext}`;
    const imagePath = path.join(uploadDir, filename);

    await sharp(req.file.buffer)
      .resize(700, 376)
      .toFile(imagePath);

    req.file.filename = filename; // تحديث اسم الملف في الطلب
    req.file.path = imagePath;

    next();
  } catch (error) {
    console.error("Image processing error:", error);
    next(new ApiError("Failed to process image", 500));
  }
};
