import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // bisa pakai req.baseUrl atau req.path buat ngecek route
    if (req.baseUrl.includes("event")) {
      cb(null, "public/images/event");
    } else if (req.baseUrl.includes("artikel")) {
      cb(null, "public/images/artikel");
    } else if (req.baseUrl.includes("partners")) {
      cb(null, "public/images/partners");
    } else {
      cb(null, "public/images"); // default
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

export default upload;