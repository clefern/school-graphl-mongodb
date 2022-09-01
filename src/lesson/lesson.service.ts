import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './inputs/create-lesson.input';
import { AssignStudentsToLesson } from './inputs/assign-students-to-lesson.input';

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
    console.log({ lesson });

    return this.repository.save(lesson);
  }

  async update(id: string, input: CreateLessonInput): Promise<Lesson> {
    let lesson = await this.getLesson(id);
    const students = lesson?.students || [];
    lesson = {
      ...lesson,
      ...input,
      students: [...students, ...input?.students],
    };
    return this.repository.save(lesson);
  }

  async delete(id: string): Promise<Lesson> {
    const lesson = await this.getLesson(id);
    const exist: DeleteResult = await this.repository.delete({ id });
    if (!exist.affected) {
      throw new NotFoundException(`Lesson with ID ${id} not found!`);
    }
    return lesson;
  }

  async assignStudentsToLesson(input: AssignStudentsToLesson): Promise<Lesson> {
    const lesson = await this.getLesson(input?.lessonId);
    const students = lesson?.students || [];
    lesson.students = [...students, ...input?.studentIds];
    return this.repository.save(lesson).catch((err) => {
      console.log({ err });
      throw err;
    });
  }
}
