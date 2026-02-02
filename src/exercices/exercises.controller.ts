import {
  Controller, Get, Post, Delete,
  Param, Body, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExercisesService } from './exercises.service';

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
        destination: './uploads/exercises',
        filename: (req, file, cb) => {
          const name = Date.now() + extname(file.originalname);
          cb(null, name);
        },
      }),
    }),
  )
  create(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.create({
      title: body.title,
      description: body.description,
      gradeId: +body.gradeId,
      fileUrl: body.fileUrl || null,
      filePath: file ? `/uploads/exercises/${file.filename}` : null,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
