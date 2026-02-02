import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

export const lessonStorage = diskStorage({
  destination: (req, file, cb) => {
    const basePath = path.join(process.cwd(), 'uploads');
    const folder =
      file.fieldname === 'image' ? 'images' : 'videos';

    const uploadPath = path.join(basePath, folder);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
