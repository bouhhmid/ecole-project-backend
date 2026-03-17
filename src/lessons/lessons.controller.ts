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
import cloudinary from '../config/cloudinary';
import * as fs from 'fs';

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

  // ================= CREATE =================

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
  async create(
    @Body() body: any,
    @UploadedFiles()
      files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    let imageUrl = body.imageUrls || null;
    let videoUrl = null;

    // 🔥 IMAGE
    if (files?.image?.length) {
      const result = await cloudinary.uploader.upload(files.image[0].path, {
        folder: 'lessons/images',
      });

      imageUrl = result.secure_url;

      if (fs.existsSync(files.image[0].path)) {
        fs.unlinkSync(files.image[0].path);
      }
    }

    // 🔥 VIDEO
    if (files?.video?.length) {
      const result = await cloudinary.uploader.upload(files.video[0].path, {
        resource_type: 'video',
        folder: 'lessons/videos',
      });

      videoUrl = result.secure_url;

      if (fs.existsSync(files.video[0].path)) {
        fs.unlinkSync(files.video[0].path);
      }
    }

    return this.lessonsService.create({
      title: body.title,
      description: body.description,
      gradeId: Number(body.gradeId) || 1,
      axisId: Number(body.axisId),
      youtubeUrl: body.youtubeUrl || null,
      imageUrls: imageUrl,
      videoUrl: videoUrl,
    });
  }

  // ================= UPDATE =================

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
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles()
      files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    let imageUrl;
    let videoUrl;

    // 🔥 IMAGE
    if (files?.image?.length) {
      const result = await cloudinary.uploader.upload(files.image[0].path, {
        folder: 'lessons/images',
      });

      imageUrl = result.secure_url;

      if (fs.existsSync(files.image[0].path)) {
        fs.unlinkSync(files.image[0].path);
      }
    }

    // 🔥 VIDEO
    if (files?.video?.length) {
      const result = await cloudinary.uploader.upload(files.video[0].path, {
        resource_type: 'video',
        folder: 'lessons/videos',
      });

      videoUrl = result.secure_url;

      if (fs.existsSync(files.video[0].path)) {
        fs.unlinkSync(files.video[0].path);
      }
    }

    return this.lessonsService.update(Number(id), {
      title: body.title,
      description: body.description,
      youtubeUrl: body.youtubeUrl,
      imageUrls: imageUrl,
      videoUrl: videoUrl,
    });
  }

  // ================= DELETE =================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(Number(id));
  }
}