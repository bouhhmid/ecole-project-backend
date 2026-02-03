import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GradesModule } from './grades/grades.module';
import { LessonsModule } from './lessons/lessons.module';
import { AxesModule } from './axes/axes.module';
import { ExerciseModule } from './exercices/exercice.module';
import { AttachmentsModule } from './attachments/attachments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      ...(process.env.DATABASE_URL
        ? {
          // 🌍 PRODUCTION (Render + Neon)
          url: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false, // ❌ JAMAIS EN PROD
        }
        : {
          // 💻 LOCAL
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '123',
          database: 'education_db',
          ssl: false,
          synchronize: true, // OK en local
        }),

      autoLoadEntities: true,
    }),


    UsersModule,
    AuthModule,
    GradesModule,
    LessonsModule,
    AxesModule,
    ExerciseModule,
    AttachmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
