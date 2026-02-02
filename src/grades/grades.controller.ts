import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  // ✅ PUBLIC (login + register)
  @Get()
  findAll() {
    return this.gradesService.findAll();
  }

  // 🔐 PROTÉGÉ
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

  // 🔐 TEACHER ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Post()
  create(@Body() body: any) {
    return this.gradesService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.gradesService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }
}

