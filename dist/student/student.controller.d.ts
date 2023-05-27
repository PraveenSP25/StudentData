import { StudentService } from './student.service';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    getStudents(pageNo: number, pageLimit: number): Promise<any[]>;
    filterStudents(id: string): Promise<any[]>;
}
