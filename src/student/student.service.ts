import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class StudentService {
  private  students: any[]; // Replace 'any' with an appropriate type for your student details

  constructor() {
    this.loadStudentDetails()
      .then((students) => {
        this.students = students;
      })
      .catch((error) => {
        console.error('Failed to load student details:', error);
      });
  }

  async getStudents(page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedStudents = this.students.slice(startIndex, endIndex);

    return paginatedStudents;
  }

  async filterStudents(filterCriteria: any) {
    const { id, name, totalMarks } = filterCriteria;

    const filteredStudents = this.students.filter((student) => {
      if (id && student.id !== id) {
        return false;
      }
      if (name && !student.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      if (totalMarks && student.totalMarks !== totalMarks) {
        return false;
      }
      return true;
    });

    return filteredStudents;
  }

  private async loadStudentDetails(): Promise<any[]> {
    const fileContents = await fs.promises.readFile('C:\\Users\\Praveen P\\grid-system-backend\\src\\file\\student.csv', 'utf8');
    const students = fileContents.split('\n').map((row) => {
      const values = row.split(',');
      const student = {
        id: values[0],
        name: values[1],
        totalMarks: values[2],
      };
      return student;
    });
    
    return students;
  }
}
