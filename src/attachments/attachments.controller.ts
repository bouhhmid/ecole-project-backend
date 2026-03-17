import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import cloudinary from '../config/cloudinary';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('attachments')
export class AttachmentsController {
  constructor(private service: AttachmentsService) {}

  // 📤 UPLOAD (teacher)
  @Post(':gradeId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/tmp',
        filename: (_, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )  async upload(
    @Param('gradeId') gradeId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const saved = [];

    for (const file of files) {

      // 🔥 upload vers cloudinary
      const result = await cloudinary.uploader.upload(file.path);

      // 🔥 sauvegarde URL cloudinary
      const attachment = await this.service.create({
        gradeId: Number(gradeId),
        imageUrl: result.secure_url,
      });

      saved.push(attachment);

      // 🧹 supprimer fichier local (optionnel mais propre)
      fs.unlinkSync(file.path);
    }

    return saved;
  }

  // 📥 GET
  @Get('grade/:gradeId')
  findByGrade(@Param('gradeId') gradeId: string) {
    return this.service.findByGrade(Number(gradeId));
  }
}