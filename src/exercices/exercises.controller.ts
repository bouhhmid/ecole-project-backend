import {
  Controller, Get, Post, Delete,
  Param, Body, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExercisesService } from './exercises.service';
import cloudinary from '../config/cloudinary';
import * as streamifier from 'streamifier';

@Controller('exercises')
export class ExercisesController {
  constructor(private service: ExercisesService) {}

  @Get('grade/:gradeId')
  getByGrade(@Param('gradeId') gradeId: string) {
    return this.service.findByGrade(+gradeId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let uploadedUrl: string | null = null;

    if (file) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto', // 🔥 support PDF + images
            folder: 'exercises',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      uploadedUrl = result.secure_url;
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