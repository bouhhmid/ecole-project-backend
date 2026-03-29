import {
  Controller, Get, Post, Delete,
  Param, Body, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExercisesService } from './exercises.service';
import cloudinary from '../config/cloudinary';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('exercises')
export class ExercisesController {
  constructor(private service: ExercisesService) {}

  @Get('grade/:gradeId')
  getByGrade(@Param('gradeId') gradeId: string) {
    return this.service.findByGrade(+gradeId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/tmp',
        filename: (_, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let uploadedUrl: string | null = null;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'raw', // 🔥 très important
        folder: 'exercises',
        type: 'upload',
        access_mode: 'public',
      });
      uploadedUrl = result.secure_url;
      console.log('UPLOAD RESULT:', result);

      fs.unlinkSync(file.path);
    }
    return this.service.create({
      title: body.title,
      description: body.description,
      gradeId: +body.gradeId,
      fileUrl: uploadedUrl || body.fileUrl || null,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}