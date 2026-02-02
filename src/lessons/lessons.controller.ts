import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LessonsService } from './lessons.service';
import { lessonStorage } from '../common/upload.config';
import { Express } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // ================= GET (PUBLIC) =================

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('axe/:axisId')
  findByAxis(@Param('axisId') axisId: string) {
    return this.lessonsService.findByAxis(Number(axisId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(Number(id));
  }

  // ================= CREATE (TEACHER ONLY) =================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      { storage: lessonStorage },
    ),
  )
  create(
    @Body() body: any,
    @UploadedFiles()
      files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    return this.lessonsService.create({
      title: body.title,
      description: body.description,
      gradeId: Number(body.gradeId) || 1,
      axisId: Number(body.axisId),
      youtubeUrl: body.youtubeUrl || null,
      imageUrls: files?.image
        ? `/uploads/images/${files.image[0].filename}`
        : body.imageUrls || null,
      videoUrl: files?.video
        ? `/uploads/videos/${files.video[0].filename}`
        : null,
    });
  }

  // ================= UPDATE (TEACHER ONLY) =================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      { storage: lessonStorage },
    ),
  )
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles()
      files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    return this.lessonsService.update(Number(id), {
      title: body.title,
      description: body.description,
      gradeId: body.gradeId ? Number(body.gradeId) : undefined,
      axisId: body.axisId ? Number(body.axisId) : undefined,
      youtubeUrl: body.youtubeUrl,
      imageUrls: files?.image
        ? `/uploads/images/${files.image[0].filename}`
        : undefined,
      videoUrl: files?.video
        ? `/uploads/videos/${files.video[0].filename}`
        : undefined,
    });
  }

  // ================= DELETE (TEACHER ONLY) =================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(Number(id));
  }
}
