import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Axe } from './axe.entity';
import { AxesService } from './axes.service';
import { AxesController } from './axes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Axe])],
  providers: [AxesService],
  controllers: [AxesController],
})
export class AxesModule {}
