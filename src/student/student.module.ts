import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [StudentController],
    providers: [StudentService],
  })
  export class StudentModule { }