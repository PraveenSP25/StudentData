export declare class StudentService {
    private students;
    constructor();
    getStudents(page: number, pageSize: number): Promise<any[]>;
    filterStudents(filterCriteria: any): Promise<any[]>;
    private loadStudentDetails;
}
