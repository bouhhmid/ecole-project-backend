import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
export class AttachmentsController {
  constructor(private service: AttachmentsService) {}

  // 📤 UPLOAD (teacher)
  @Post(':gradeId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/attachments',
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
  )
  async upload(
    @Param('gradeId') gradeId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const saved = [];

    for (const file of files) {
      const attachment = await this.service.create({
        gradeId: Number(gradeId),
        imageUrl: `/uploads/attachments/${file.filename}`,
      });

      saved.push(attachment);
    }

    return saved;
  }

  // 📥 GET (student + teacher)
  @Get('grade/:gradeId')
  findByGrade(@Param('gradeId') gradeId: string) {
    return this.service.findByGrade(Number(gradeId));
  }
}
