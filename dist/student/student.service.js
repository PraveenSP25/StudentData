"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let StudentService = class StudentService {
    constructor() {
        this.loadStudentDetails()
            .then((students) => {
            this.students = students;
        })
            .catch((error) => {
            console.error('Failed to load student details:', error);
        });
    }
    async getStudents(page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedStudents = this.students.slice(startIndex, endIndex);
        return paginatedStudents;
    }
    async filterStudents(filterCriteria) {
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
    async loadStudentDetails() {
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
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map