import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]), // ✅ accès DB
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService], // ✅ service injecté
})
export class AttachmentsModule {}
