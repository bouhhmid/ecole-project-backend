import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { AxesService } from './axes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('axes')
@UseGuards(JwtAuthGuard)
export class AxesController {
  constructor(private readonly axesService: AxesService) {}

  @Get('grade/:gradeId')
  findByGrade(@Param('gradeId') gradeId: string) {
    return this.axesService.findByGrade(+gradeId);
  }

  // 👉 CECI EST LA PARTIE QUI MANQUAIT
  @UseGuards(RolesGuard)
  @Roles('teacher')
  @Post()
  create(@Body() body: any) {
    return this.axesService.create(body);
  }
}
