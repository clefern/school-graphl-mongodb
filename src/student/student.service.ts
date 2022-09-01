import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private repository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Student> {
    return this.repository.findOne({ where: { id } });
  }

  create(student: CreateStudentInput): Promise<Student> {
    student = this.repository.create({
      id: uuid(),
      ...student,
    });
    return this.repository.save(student);
  }

  async update(id: string, update: UpdateStudentInput): Promise<Student> {
    let student = await this.findOne(id);
    student = {
      ...student,
      ...update,
    };
    return this.repository.save(student);
  }

  async remove(id: string): Promise<Student> {
    const lesson = await this.findOne(id);
    const exist: DeleteResult = await this.repository.delete({ id });
    if (!exist.affected) {
      throw new NotFoundException(`Lesson with ID ${id} not found!`);
    }
    return lesson;
  }

  async getManyStudents(ids: string[] = []): Promise<Student[]> {
    const students = await this.repository.find({
      where: { id: { $in: ids } as any },
    });
    return students;
  }
}
