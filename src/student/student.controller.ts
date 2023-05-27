import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('students')
@ApiTags('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents(
    
    @Query('pageNo') pageNo: number,
    @Query('pagelimit') pageLimit: number,
  ) {
    return this.studentService.getStudents(pageNo, pageLimit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filter students by ID' })
  @ApiOkResponse({ description: 'Filtered students fetched.' })
  filterStudents(@Param('id') id: string) {
    return this.studentService.filterStudents({ id });
  }
}

