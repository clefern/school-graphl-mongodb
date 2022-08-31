import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/create-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private repository: Repository<Lesson>,
  ) {}

  getAllLessons(): Promise<Lesson[]> {
    return this.repository.find();
  }

  getLesson(id: string): Promise<Lesson> {
    return this.repository.findOne({ where: { id } });
  }

  create(lesson: CreateLessonInput): Promise<Lesson> {
    lesson = this.repository.create({
      id: uuid(),
      ...lesson,
    });
    return this.repository.save(lesson);
  }

  async update(id: string, update: CreateLessonInput): Promise<Lesson> {
    let student = await this.getLesson(id);
    student = {
      ...student,
      ...update,
    };
    return this.repository.save(student);
  }

  async delete(id: string): Promise<Lesson> {
    const lesson = await this.getLesson(id);
    const exist: DeleteResult = await this.repository.delete({ id });
    if (!exist.affected) {
      throw new NotFoundException(`Lesson with ID ${id} not found!`);
    }
    return lesson;
  }
}
